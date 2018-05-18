import { Component, OnInit } from '@angular/core';

import { TerrainService } from '../core/terrain.service';
import { Terrain } from '../core/terrain';

/**
 * Map page component.
 */
@Component({
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {
  terrains: Terrain[];
  zoom = 8;

  constructor(private terrainService: TerrainService) {}

  ngOnInit(): void {
    this.terrainService.getTerrains().subscribe(terrains => {
      console.log(terrains);
      this.terrains = terrains;
    });
  }
}
