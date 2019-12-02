import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponent } from './app-routing.module';
import {FormsModule } from '@angular/forms';
import { TopBilledComponent } from './Components/Shared/top-billed/top-billed.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    TopBilledComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
