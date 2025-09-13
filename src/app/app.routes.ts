import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/views/not-found-404/not-found-404.component').then(
        m => m.NotFound404
      )
  },
];
