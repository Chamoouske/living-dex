import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'boxes/:boxId',
    loadComponent: () => import('./features/box/box.component').then(m => m.BoxComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/views/not-found-404/not-found-404.component').then(
        m => m.NotFound404
      )
  },
];
