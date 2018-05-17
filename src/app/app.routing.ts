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
        redirectTo: 'courts',
        pathMatch: 'full'
      },
      {
        path: 'courts',
        loadChildren: './courts/courts.module#CourtsModule',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
