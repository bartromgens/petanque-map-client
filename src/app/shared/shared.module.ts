import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';

import { AngularOpenlayersModule } from 'ngx-openlayers';

/**
 * The Shared module contains general modules and components to be used in feature modules.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollapseModule,
    ModalModule,
    SidebarModule,
    AngularOpenlayersModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  exports: [
    // external shared modules
    CommonModule,
    FormsModule,
    CollapseModule,
    ModalModule,
    SidebarModule,
    AngularOpenlayersModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {
}
