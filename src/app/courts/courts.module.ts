import { NgModule } from '@angular/core';

import { CourtsRoutingModule } from './courts-routing.module';
import { CourtsComponent } from './courts.component';

/**
 * The User module contains view components related
 * to user profile and user management.
 */
@NgModule({
  imports: [
    CourtsRoutingModule,
  ],
  declarations: [
    CourtsComponent
  ],
})
export class CourtsModule { }
