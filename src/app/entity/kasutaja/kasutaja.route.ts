import { Routes } from '@angular/router';
import { KasutajaComponent } from './kasutaja.component';
import { KasutajaDetailComponent } from './kasutaja-detail.component';
import { KasutajaUpdateComponent } from './kasutaja-update.component';
import { Error404Component } from '../error/error-404.component';

export const kasutajaRoute: Routes = [
  {
    path: '',
    component: KasutajaComponent,
  },
  {
    path: ':id/view',
    component: KasutajaDetailComponent,
  },
  {
    path: ':id/update',
    component: KasutajaUpdateComponent,
  },
  {
    path: 'new',
    component: KasutajaUpdateComponent,
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '**',
    component: Error404Component
  }
];
