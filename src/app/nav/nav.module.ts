import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';

import { FullLayoutComponent } from './full-layout.component';
import { HeaderComponent } from './header/header.component';

/**
 * The Nav module contains all user navigation components
 * such as sidebar, navbar (header), breadcrumbs and footer.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule,
    BsDropdownModule,
  ],
  declarations: [
    FullLayoutComponent,
    HeaderComponent
  ],
})
export class NavModule { }
