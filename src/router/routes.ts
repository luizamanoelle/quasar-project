import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    //sem o main layout
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: 'dashboard', component: () => import('pages/DashboardPage.vue') }],
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('pages/ReportPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/CreateAccount.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },

  { path: '/cam', component: () => import('pages/CameraPage.vue') },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
