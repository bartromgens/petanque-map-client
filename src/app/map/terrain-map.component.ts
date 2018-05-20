import { Component, OnInit, ViewChild } from '@angular/core';

import { TerrainService } from '../core/terrain.service';
import { Terrain } from '../core/terrain';

import { MapComponent } from 'ngx-openlayers';

/**
 * Map page component.
 */
@Component({
  templateUrl: 'terrain-map.component.html',
})
export class TerrainMapComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;
  sidebarOpened = true;
  terrains: Terrain[];
  zoom = 8;

  constructor(private terrainService: TerrainService) {}

  ngOnInit(): void {
    this.terrainService.getTerrains().subscribe(terrains => {
      console.log(terrains);
      this.terrains = terrains;
    });
  }

  onSidebarToggle() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
