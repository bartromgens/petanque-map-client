import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerrainMapComponent } from './terrain-map.component';

const mapRoutes: Routes = [
  {
    path: '',
    component: TerrainMapComponent,
    data: {
      title: 'Petanque Map'
    },
  },
  {
    path: 'terrain/:id',
    component: TerrainMapComponent,
    data: {
      title: 'Petanque Map Terrain'
    },
  },
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class MapRoutingModule {}
