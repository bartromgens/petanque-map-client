import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularOpenlayersModule } from 'ngx-openlayers';

/**
 * The Shared module contains general modules and components to be used in feature modules.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularOpenlayersModule
  ],
  declarations: [
  ],
  exports: [
    // external shared modules
    CommonModule,
    FormsModule,
    AngularOpenlayersModule
  ],
})
export class SharedModule {
}
