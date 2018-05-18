import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map.component';

const mapRoutes: Routes = [
  {
    path: '',
    component: MapComponent,
    data: {
      title: 'Petanque Map'
    },
  },
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class MapRoutingModule {}
