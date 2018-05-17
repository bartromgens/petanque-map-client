import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourtsComponent } from './courts.component';

const courtsRoutes: Routes = [
  {
    path: '',
    component: CourtsComponent,
    data: {
      title: 'Petanque Courts'
    },
  },
];


@NgModule({
  imports: [ RouterModule.forChild(courtsRoutes) ],
  exports: [ RouterModule ]
})
export class CourtsRoutingModule {}
