import { Component, OnInit, ViewChild } from '@angular/core';

import { TerrainService } from '../core/terrain.service';
import { Terrain } from '../core/terrain';

/**
 * Map page component.
 */
@Component({
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {
  @ViewChild(ChildComponent) child: ChildComponent;
  terrains: Terrain[];
  zoom = 8;

  opened = true;

  private onSidebarToggle() {
    console.log('onSidebarToggle');
    this.opened = !this.opened;
    contourmap.map.updateSize();
  }

  constructor(private terrainService: TerrainService) {}

  ngOnInit(): void {
    this.terrainService.getTerrains().subscribe(terrains => {
      console.log(terrains);
      this.terrains = terrains;
    });
  }
}
