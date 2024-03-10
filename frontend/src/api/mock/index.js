import Fly from 'flyio/dist/npm/fly';
import { Notification } from '@arco-design/web-vue';
import { getBaseUrl } from '../apiConfig';

const fly = new Fly();

//添加请求拦截器
fly.interceptors.request.use((request)=>{
  const baseUrl = getBaseUrl();
  request.baseURL = baseUrl;
  return request;
})

export default fly;
