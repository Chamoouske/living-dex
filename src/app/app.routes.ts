import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'boxes',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/views/not-found-404/not-found-404.component').then(
        m => m.NotFound404
      )
  },];
