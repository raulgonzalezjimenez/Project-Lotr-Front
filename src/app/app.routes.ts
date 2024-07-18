import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./core/register/register.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.component'),
  },
  {
    path: 'menu',
    loadComponent: () => import('./core/menu/menu.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./core/createform/createform.component'),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./core/details/details.component'),
  },
  {
    path: 'races',
    loadComponent: () => import('./core/races/races.component'),
  },
  {
    path: 'races/:data',
    loadComponent: () => import('./core/list/list.component'),
  },
  {
    path: 'account',
    loadComponent: () => import('./core/account/account.component'),
  },
];
