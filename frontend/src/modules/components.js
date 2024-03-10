// 组件
import ArcoVue, { Notification } from '@arco-design/web-vue';
import globalCompos from '../components';
import '@arco-design/web-vue/dist/arco.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

// arco
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// svg
import 'virtual:svg-icons-register';
import svgIcon from '@/icons/SvgIcon.vue';
import remixIcon from '@/icons/RemixIcon.vue';

export default (app, settings) => {
  // 组件安装
  app.use(ArcoVue, {
    size: localStorage.getItem('size') || settings.defaultSize,
  });
  app.use(ElementPlus);
  app.use(globalCompos);
  Notification._context = app._context;

  app.component('SvgIcon', svgIcon);
  app.component('RemixIcon', remixIcon);
  app.use(ArcoVueIcon);
};
