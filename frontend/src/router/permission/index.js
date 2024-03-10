export default [
  {
    path: 'roleIndex',
    component: () => import('@/pages/permission'),
    name: 'Permission',
    meta: {
      title: 'Role Index',
      // roles: ['admin'] // or you can only set roles in sub nav
    },
  },
  {
    path: 'page',
    component: () => import('@/pages/permission/page.vue'),
    name: 'PagePermission',
    meta: {
      title: 'Page Permission',
      roles: ['admin'], // or you can only set roles in sub nav
    },
  },
  {
    path: 'directive',
    component: () => import('@/pages/permission/directive.vue'),
    name: 'DirectivePermission',
    meta: {
      title: 'Directive Permission',
      // if do not set roles, means: this page does not require permission
    },
  },
  {
    path: 'code-index',
    component: () => import('@/pages/permission/CodePermission.vue'),
    name: 'CodePermission',
    meta: {
      title: 'Code Index',
    },
  },
  {
    path: 'code-page',
    component: () => import('@/pages/permission/CodePage.vue'),
    name: 'CodePage',
    meta: {
      title: 'Code Page',
      code: 1,
    },
  },
];
