<template>
  <div id="layout-container">
    <!-- <van-col span="24"> -->
    <van-image width="100%" height="2rem" :block="true" :src="headerImg" />
    <!-- </van-col> -->
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </router-view>
    <van-tabbar v-model="active" :placeholder="true" route>
      <van-tabbar-item icon="home-o" to="/purchase">采购</van-tabbar-item>
      <van-tabbar-item icon="search" to="/transportation">调运</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/sales">销售</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/dashboard">工作台</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue';
import headerImg from '../assets/icon/header.png'
export default defineComponent({
  components: {

  },
  setup() {
    return {
      active: ref(0),
      headerImg
    };
  },
});
</script>
<style>

</style>