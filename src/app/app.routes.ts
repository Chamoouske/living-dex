import { BreadcrumbObject } from 'xng-breadcrumb/lib/types/breadcrumb.config';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () =>
      import('./core/views/not-found-404/not-found-404.component').then(
        m => m.NotFound404
      ),
    data: {
      breadcrumb: { label: 'Not Found 404' } as BreadcrumbObject,
    },
  },];
