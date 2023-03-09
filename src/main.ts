import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

createApp(App).use(router).use(createPinia()).mount('#app');

import { getUserInfoFromICE } from './api/user';

const params = new URLSearchParams(window.location.search);
console.log(params.get('apptoken'));

const user = getUserInfoFromICE().then((data: any) => {
  if (data.ret === '0') {
    return data.data;
  } else {
    console.log('登录失败');
  }
});
