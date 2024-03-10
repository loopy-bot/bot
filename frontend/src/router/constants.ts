import { PageProps } from '@/store/app/types';

export const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
];

export const NOT_FOUND = {
  name: 'notFound',
};

export const REDIRECT_ROUTE_NAME = 'Redirect';

export const FIRST_ROUTE_NAME = 'Dashboard';

export const DEFAULT_ROUTE: PageProps = {
  path: '/analysis',
  fullPath: '/visualization/analysis',
  name: FIRST_ROUTE_NAME,
  title: 'dashBoard',
};
