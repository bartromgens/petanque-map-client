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
            this.selectTerrain(terrain.id);
            this.longitude = terrain.location.lon;
            this.latitude = terrain.location.lat;
            this.zoom = TerrainMapComponent.ZOOM_SELECTED;
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
    console.log(event);
    const features = this.map.instance.getFeaturesAtPixel(event.pixel);
    if (features === null) {
      return;
    }
    for (let feature of features) {
      feature = <Feature> feature;
      const osmId = <number> feature.getId();
      const terrain = this.terrainService.getTerrainByOSMId(this.terrains, osmId);
      this.selectTerrain(terrain.id);
    }
  }

  selectTerrain(terrainId: number): void {
    this.terrainService.getTerrain(terrainId).subscribe(response => {
      this.terrainSelected = response;
      this.sidebarOpened = true;
      this.location.go('/terrain/' + this.terrainSelected.osmId);
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
}
