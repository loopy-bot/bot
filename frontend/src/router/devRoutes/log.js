import Layout from '@/layouts';

export const route = [
  {
    path: '/log',
    component: Layout,
    redirect: '/card',
    meta: {
      title: 'log',
      remixIcon: 'ri-bug-line',
    },
    children: [
      {
        path: 'log',
        name: 'log',
        component: () => import('@/pages/log/table/index.vue'),
        meta: { title: 'log', cachePage: false, arcoIcon: 'IconBgColors', },
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/pages/log/test/index.vue'),
        meta: { title: '测试', cachePage: false, arcoIcon: 'IconBgColors', },
      },
    ],
  },
];

export default route;
