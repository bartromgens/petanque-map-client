import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from './nav/full-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    loadChildren: () => import('./map/map.module').then(m => m.MapModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
