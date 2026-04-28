import { Routes } from '@angular/router';
import { AppAuth } from '@pages/app-auth';
import { DashboardLayout } from './layouts/app-dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    title: 'Log in',
    component: AppAuth,
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () => import('@pages/app-dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'inventory',
        title: 'Inventory',
        loadComponent: () => import('@pages/app-inventory').then((m) => m.Inventory),
      },
      {
        path: 'products',
        title: 'Products',
        loadComponent: () => import('@pages/app-products').then((m) => m.Products),
      },
    ],
  },
];
