import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { KasutajaDetailComponent } from './entity/kasutaja/kasutaja-detail.component';
import { KasutajaUpdateComponent } from './entity/kasutaja/kasutaja-update.component';
import { KasutajaComponent } from './entity/kasutaja/kasutaja.component';
import { kasutajaRoute } from './entity/kasutaja/kasutaja.route';
import { Error404Component } from './entity/error/error-404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KasutajaComponent,
    KasutajaDetailComponent,
    KasutajaUpdateComponent,
    Error404Component,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(kasutajaRoute)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
