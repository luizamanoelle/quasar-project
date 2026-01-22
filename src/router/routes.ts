import type { RouteRecordRaw } from 'vue-router';
import { RouterView } from 'vue-router';

const routes: RouteRecordRaw[] = [
  //sem o main layout rotas comuns
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'register', component: () => import('pages/CreateAccount.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
    ],
  },

  //só pra cidadão
  {
    path: '/citizen',
    component: RouterView,
    meta: { authRequired: true, role: 'citizen' },
    children: [
      //com layout
      {
        path: '',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: 'dashboard', component: () => import('pages/DashboardPage.vue') }],
      },
      // sem layout
      { path: 'report', component: () => import('pages/ReportPage.vue') },
      { path: 'cam', component: () => import('pages/CameraPage.vue') },
    ],
  },

  //só pra admin c/ layout proprio
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: () => import('pages/DashboardAdmin.vue') },
      { path: 'report/:id', component: () => import('pages/ReportView.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
