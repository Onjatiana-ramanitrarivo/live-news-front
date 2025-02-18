import { SessionStorage } from 'quasar';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: 'Index',
          prefetch: true
        },
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!SessionStorage.has('loggedUser') && to.name !== 'login') {
        return next({ name: 'login' });
      }
      return next();
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/AuthPage.vue'),
  },
  {
    name: 'synchronization',
    path: '/init-synchronization',
    component: () => import('pages/InitSynchronization.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
