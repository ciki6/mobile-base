<template>
  <div id="layout-container">
    <van-image width="100%" :block="true" :src="headerImg" />
    <van-image width="100%" :block="true" :src="profileImg" />
    <router-view v-slot="{ Component, route }">
      <suspense>
        <template #default>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </router-view>
    <van-tabbar v-if="showTab" v-model="active" placeholder route>
      <van-tabbar-item to="/purchase">
        <span>采购</span>
        <template #icon="props">
          <img
            :src="props.active ? iconList[0].active : iconList[0].inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/transportation">
        <span>调运</span>
        <template #icon="props">
          <img
            :src="props.active ? iconList[1].active : iconList[1].inactive"
          /> </template
      ></van-tabbar-item>
      <van-tabbar-item to="/sales">
        <span>销售</span>
        <template #icon="props">
          <img
            :src="props.active ? iconList[2].active : iconList[2].inactive"
          /> </template
      ></van-tabbar-item>
      <van-tabbar-item to="/dashboard">
        <span>工作台</span>
        <template #icon="props">
          <img
            :src="props.active ? iconList[3].active : iconList[3].inactive"
          /> </template
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import headerImg from "../assets/icon/header.png";
import purchaseIcon from "../assets/icon/tab_purchase.png";
import profileImg from "../assets/icon/profile.png";
import transportationIcon from "../assets/icon/tab_transportation.png";
import salesIcon from "../assets/icon/tab_sales.png";
import dashboardIcon from "../assets/icon/tab_dashboard.png";
import purchaseActiveIcon from "../assets/icon/tab_purchase_a.png";
import transportationActiveIcon from "../assets/icon/tab_transportation_a.png";
import salesActiveIcon from "../assets/icon/tab_sales_a.png";
import dashboardActiveIcon from "../assets/icon/tab_dashboard_a.png";
const active = ref(0);

const route = useRoute();
console.log(route, "====route");
const showTab = computed(() => !route.meta.hideTabBar);
const iconList = [
  {
    active: purchaseActiveIcon,
    inactive: purchaseIcon,
  },
  {
    active: transportationActiveIcon,
    inactive: transportationIcon,
  },
  {
    active: salesActiveIcon,
    inactive: salesIcon,
  },
  {
    active: dashboardActiveIcon,
    inactive: dashboardIcon,
  },
];
</script>
<style lang="less" scoped>
#layout-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  // display: flex;
  // flex-direction: column;

  // background-color: #fff;
}
</style>
