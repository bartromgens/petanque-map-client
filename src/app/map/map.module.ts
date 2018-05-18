import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

/**
 * The User module contains view components related
 * to user profile and user management.
 */
@NgModule({
  imports: [
    SharedModule,
    MapRoutingModule
  ],
  declarations: [
    MapComponent
  ],
})
export class MapModule { }
