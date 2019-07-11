import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TerrainService } from '../core/terrain.service';
import { Terrain } from '../core/terrain';

import { MapComponent } from 'ngx-openlayers';
import { Feature } from 'openlayers';
import { extent } from 'openlayers';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

/**
 * Map page component.
 */
@Component({
  templateUrl: 'terrain-map.component.html',
})
export class TerrainMapComponent implements OnInit {
  private static DEFAULT_LONGITUDE = 5.1539268;
  private static DEFAULT_LATITUDE = 52.0827217;
  private static DEFAULT_ZOOM = 9;
  private static ZOOM_SELECTED = 18;

  @ViewChild(MapComponent, { static: true }) map: MapComponent;

  terrainsVisible: Terrain[];
  zoom = TerrainMapComponent.DEFAULT_ZOOM;
  longitude = TerrainMapComponent.DEFAULT_LONGITUDE;
  latitude = TerrainMapComponent.DEFAULT_LATITUDE;
  sidebarOpened = false;
  terrainSelected: Terrain;
  private terrains: Terrain[];
  markerRadius: number;
  markerStrokeWidth: number;
  modalUploadImageRef: BsModalRef;
  images = new Array<ImageResized>();

  constructor(private terrainService: TerrainService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService) {}

  ngOnInit(): void {
    this.markerRadius = 6 * Math.sqrt(window.devicePixelRatio);
    this.markerStrokeWidth = 1.5 * Math.sqrt(window.devicePixelRatio);
    this.terrainService.getTerrains().subscribe(terrains => {
      this.terrains = terrains;
      this.route.params.subscribe(params => {
        if (params['id']) {
          const osmId = Number(params['id']);
          const terrain = this.terrainService.getTerrainByOSMId(this.terrains, osmId);
          if (terrain) {
            this.longitude = terrain.location.lon;
            this.latitude = terrain.location.lat;
            this.zoom = TerrainMapComponent.ZOOM_SELECTED;
            this.selectTerrain(terrain.id);
          }
        }
        this.updateTerrainsVisible(terrains);
      });
    });
  }

  private updateTerrainsVisible(terrains: Terrain[]): void {
    const mapExtent: ol.Extent = this.map.instance.getView().calculateExtent(this.map.instance.getSize());
    this.terrainsVisible = [];
    // if (this.getZoomLevel() < 6) {
    //   return;
    // }
    for (let i = 0; i < terrains.length; i++) {
      if (extent.containsCoordinate(mapExtent, terrains[i].getOlCoordinate())) {
        this.terrainsVisible.push(terrains[i]);
      }
    }
  }

  onSidebarToggle(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  onMapClick(event): void {
    console.log('onMapClick');
    const features = this.map.instance.getFeaturesAtPixel(event.pixel);
    if (features === null) {
      return;
    }
    if (features.length > 0) {
      const feature = <Feature> features[0];
      const osmId = <number> feature.getId();
      console.log('feature', osmId);
      const terrain = this.terrainService.getTerrainByOSMId(this.terrains, osmId);
      this.selectTerrain(terrain.id);
    }
  }

  private selectTerrain(terrainId: number): void {
    console.log('selectTerrain', terrainId);
    this.images = new Array<ImageResized>();
    this.terrainService.getTerrain(terrainId).subscribe(terrain => {
      this.terrainSelected = terrain;
      this.sidebarOpened = true;
      this.location.go('/terrain/' + this.terrainSelected.osmId);
      this.loadImages(terrain);
    });
  }

  onMapMove(event): void {
    if (this.terrains) {
      this.updateTerrainsVisible(this.terrains);
    }
  }

  private getZoomLevel(): number {
    return this.map.instance.getView().getZoom();
  }

  openUploadImageModal(template: TemplateRef<any>) {
    this.modalUploadImageRef = this.modalService.show(template);
  }

  private loadImages(terrain: Terrain) {
    console.log('loadImages');
    for (const image of terrain.images) {
      console.log(image.url);
      this.terrainService.getTerrainImageUrl(image.id, 200).subscribe(imageUrl200 => {
        const imageResized = new ImageResized();
        this.images.push(imageResized);
        imageResized.url200 = imageUrl200;
        this.terrainService.getTerrainImageUrl(image.id, 1000).subscribe(imageUrl1000 => {
          imageResized.url1000 = imageUrl1000;
        });
      });
    }
  }
}

class ImageResized {
  url200: string;
  url1000: string;
}
