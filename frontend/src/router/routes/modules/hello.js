import Layout from '@/layouts';

export const route = [
  {
    path: '/hello',
    component: Layout,
    redirect: '/',
    meta: {
      title: 'hello',
      remixIcon: 'ri-code-s-slash-line',
    },
    children: [
      {
        path: '',
        name: 'hello',
        component: () => import('@/pages/hello/index.vue'),
        meta: { title: '你好！', cachePage: true, icon: 'edit' },
      },
    ],
  },
];

export default route;
