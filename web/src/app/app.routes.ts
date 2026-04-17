import { Routes } from '@angular/router';
import { AppDashboard } from '@pages/app-dashboard';
import { AppAuth } from '@pages/app-auth';

export const routes: Routes = [
  {
    path: '',
    title: 'Log in',
    component: AppAuth,
  },
  {
    path: 'dashboard/inventory',
    title: 'Inventory',
    loadComponent: () => import('@pages/app-inventory').then((m) => m.AppInventory),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: AppDashboard,
  },
];
