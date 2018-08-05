import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TerrainService } from '../core/terrain.service';
import { Terrain } from '../core/terrain';

import { MapComponent } from 'ngx-openlayers';
import { Feature } from 'openlayers';
import { extent } from 'openlayers';

/**
 * Map page component.
 */
@Component({
  templateUrl: 'terrain-map.component.html',
})
export class TerrainMapComponent implements OnInit {
  private static DEFAULT_LONGITUDE = 5.1539268;
  private static DEFAULT_LATITUDE = 52.0827217;
  private static DEFAULT_ZOOM = 8;
  private static ZOOM_SELECTED = 17;

  @ViewChild(MapComponent) map: MapComponent;

  terrainsVisible: Terrain[];
  zoom = TerrainMapComponent.DEFAULT_ZOOM;
  longitude = TerrainMapComponent.DEFAULT_LONGITUDE;
  latitude = TerrainMapComponent.DEFAULT_LATITUDE;
  sidebarOpened = false;
  private terrains: Terrain[];
  private terrainSelected: Terrain;

  constructor(private terrainService: TerrainService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.terrainService.getTerrains().subscribe(terrains => {
      this.terrains = terrains;
      this.updateTerrainsVisible(terrains);
      this.route.params.subscribe(params => {
        console.log('terrain id: ' + params['id']);
        if (params['id']) {
          const osmId = Number(params['id']);
          const terrain = this.terrainService.getTerrainById(this.terrains, osmId);
          if (terrain) {
            this.terrainSelected = terrain;
            this.longitude = terrain.location.lon;
            this.latitude = terrain.location.lat;
            this.zoom = TerrainMapComponent.ZOOM_SELECTED;
          }
        }
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
      this.terrainSelected = this.terrainService.getTerrainById(this.terrains, osmId);
      console.log(this.terrainSelected);
    }
  }

  onMapMove(event): void {
    if (this.terrains) {
      this.updateTerrainsVisible(this.terrains);
    }
  }

  private getZoomLevel(): number {
    return this.map.instance.getView().getZoom();
  }
}
