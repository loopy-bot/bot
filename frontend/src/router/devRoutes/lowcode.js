import Layout from '@/layouts';

export const route = [
  {
    path: '/lowcode',
    component: Layout,
    redirect: 'editor',
    meta: {
      title: 'lowcode',
      remixIcon: 'ri-code-s-slash-line',
    },
    children: [
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/pages/lowcode/editor/index.vue'),
        meta: { title: 'editor', cachePage: true, icon: 'edit', },
      },
      {
        path: 'demo',
        name: 'demo',
        component: () => import('@/pages/lowcode/demo/index.vue'),
        meta: { title: 'demo', cachePage: true, icon: 'guide', },
      },
    ],
  },
];

export default route;
