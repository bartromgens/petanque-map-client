import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CollapseModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { MatomoModule } from 'ngx-matomo';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    SidebarModule.forRoot(),
    CoreModule,
    NavModule,
    MatomoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
