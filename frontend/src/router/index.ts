import { createRouter, createWebHashHistory } from 'vue-router';
import { appRoutes } from './routes';
import Layout from '@/layouts';
// import pChilds from './permission';
import dChilds from './devRoutes';

export const constantRoutes = [
  {
    path: '/',
    redirect: '/hello',
    name: 'Dashboard',
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: { title: '登录' },
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/pages/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/pages/error-page/401.vue'),
    hidden: true,
  },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
  ...appRoutes,
  ...dChilds,
];

// export const asyncRoutes = [
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/page',
//     alwaysShow: true,
//     name: 'Permission',
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'],
//       cachePage: true,
//     },
//     children: pChilds,
//   },
// ];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

export default router;
