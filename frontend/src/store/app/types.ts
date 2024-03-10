export interface PageProps {
  path: string;
  title: string | object;
  name: string;
  fullPath: string;
  query?: any;
  meta?: any;
  hidden?: boolean;
}

export interface PageState {
  pages: Set<string>;
  tags: Array<PageProps>;
}
