<script setup lang="ts">
import { userStore } from './store/user';
import router from './router';
const user_store = userStore()
let apptoken = '';
const params = new URLSearchParams(window.location.search);
if (params.get('apptoken') !== null) {
  apptoken = params.get('apptoken') as string;
} else {
  console.log('获取apptoken失败');
}

user_store.login(apptoken).then(() => {
  router.push('/dashboard')
}).catch(d => {
  console.log(d)
});

</script>

<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #ebebeb;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
