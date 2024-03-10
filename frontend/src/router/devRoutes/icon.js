import Layout from '@/layouts';
import settings from '../../settings';

export default [
  {
    path: '/icon',
    component: Layout,
    name: 'iconHome',
    hidden: settings?.isProduct,
    redirect: '/icon/index',
    children: [
      {
        path: 'index',
        // 需要与组件名对应
        name: 'Icon',
        component: () => import('@/pages/icons/index.vue'),
        meta: { title: 'icon', remixIcon: 'ri-image-line', cachePage: true },
      },
    ],
  },
];
