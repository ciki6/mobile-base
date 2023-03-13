import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { getUserInfoFromICE } from '../api/user';

export const userStore = defineStore('user', {
  state: () => {
    return {
      id: '',
      username: '',
    };
  },
  actions: {
    async login(apptoken: string) {
      const { data, ret } = await getUserInfoFromICE(apptoken);
      if (ret !== 0) {
        ElMessage.error(`调用ICE登录接口失败`);
        return Promise.reject('error');
      }
      const username = data?.username;
      this.username = username;
    },
  },
});
