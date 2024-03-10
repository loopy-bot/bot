import { defineStore } from 'pinia';
// import { login } from '@/services/login';
import _ from 'lodash';
import { setToken, removeToken } from '@/utils/auth';

/**
 * @return {*}
 * @description: 登录
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    person: {
      username: '',
      age: '',
      avatar: '',
    },
    token: '',
    roles: [],
  }),
  actions: {
    setPerson (info,) {
      this.$patch((state) => {
        // 避免引用、此处应该复制
        Object.assign(state, _.cloneDeep({
          person: info,
        }));
      });
    },
    async login (params) {
      // const res = await login(params);
      // this.setPerson(res?.data);
      setToken('12');
      this.setPerson({
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202105%2F29%2F20210529001057_aSeLB.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662521586&t=fa6e63f58241fdd6a8ea3597d7c21b20'
      });
    },
    async logout() {
      return new Promise((resolve, reject) => {
        removeToken();
        resolve(null);
      });
    },
  }
});