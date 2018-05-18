import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MapModule } from './map-routing.module';
import { MapComponent } from './map.component';

/**
 * The User module contains view components related
 * to user profile and user management.
 */
@NgModule({
  imports: [
    SharedModule,
    MapModule
  ],
  declarations: [
    MapComponent
  ],
})
export class MapModule { }
