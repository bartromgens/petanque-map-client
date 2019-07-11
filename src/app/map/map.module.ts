import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MapRoutingModule } from './map-routing.module';
import { TerrainMapComponent } from './terrain-map.component';
import { UploadImageComponent } from './upload-image.component';
import { RatingComponent } from './rating.component';

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
    TerrainMapComponent,
    UploadImageComponent,
    RatingComponent
  ],
})
export class MapModule { }
