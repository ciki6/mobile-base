<template>
  <div id="layout-container">
    <!-- <van-col span="24"> -->
    <van-image width="100%" :block="true" :src="headerImg" />
    <van-image width="100%" :block="true" :src="profileImg" />
    <!-- </van-col> -->
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <suspense>
          <template #default>
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
            />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </router-view>
    <van-tabbar v-model="active" :placeholder="true" route>
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
import { defineComponent, ref } from "vue";
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
<style></style>
