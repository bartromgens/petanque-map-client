import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

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
    CoreModule,
    NavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
