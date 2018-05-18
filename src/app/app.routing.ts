import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from './nav/full-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: './map/map.module#MapModule',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
