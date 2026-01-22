import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('asten_token');
    const userJson = localStorage.getItem('user_data');

    const userData = userJson ? JSON.parse(userJson) : null;
    const userRole = userData?.role;

    const publicPages = ['/', '/register', '/login'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !token) {
      return next('/');
    }

    if (to.meta.role && to.meta.role != userRole) {
      return next(userRole === 'admin' ? 'admin/dashboard' : 'citizen/dashboard');
    }

    next();
  });

  return Router;
});

/*Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('asten_token');
    const userRole = localStorage.getItem('user_role');

    const publicPages = ['/', '/register', '/login'];
    const authRequired = !publicPages.includes(to.path);

    //se nao tive logado fica em /
    if (authRequired && !token) {
      return next('/');
    }

    //se logar verifica pra onde vai mandar
    if (token && publicPages.includes(to.path)) {
      return next(userRole == 'admin' ? 'admin/dashboard' : 'citizen/dashboard');
    }

    //se tentar acessar uma page que nao o pertence manda pro dashboard respetivo
    if (to.meta.role && to.meta.role != userRole) {
      return next(userRole == 'admin' ? 'admin/dashboard' : 'citizen/dashboard');
    }
    next();
  });*/
