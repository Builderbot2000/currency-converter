import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { FomanticUIModule } from 'ngx-fomantic-ui';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CurrenciesService } from './common/services/currencies.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocus } from './common/directives/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AutoFocus
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FomanticUIModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CurrenciesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
