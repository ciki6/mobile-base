<template>
  <div class="layout-container">
    <el-container>
      <el-header :height="'100px'">
        <div class="header-container">
          <el-image :src="headerImg" />
          <div>多云</div>
          <div>23° 12°/31°</div>
          <div>管理员01</div>
        </div>
      </el-header>
      <el-container class="main-container">
        <el-aside width="214px">
          <el-menu
            default-active="dashboard"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            :router="true"
          >
            <el-menu-item index="purchase">
              <img
                class="menu-icon"
                :src="
                  activeMenu === 'purchase' ? purchaseActiveIcon : purchaseIcon
                "
              />
              <span>采购</span>
            </el-menu-item>
            <el-menu-item index="transportation">
              <img
                class="menu-icon"
                :src="
                  activeMenu === 'transportation'
                    ? transportationActiveIcon
                    : transportationIcon
                "
              />
              <span>调运</span>
            </el-menu-item>
            <el-menu-item index="sales">
              <img
                class="menu-icon"
                :src="activeMenu === 'sales' ? salesActiveIcon : salesIcon"
              />
              <span>销售</span>
            </el-menu-item>
            <el-menu-item index="dashboard">
              <img
                class="menu-icon"
                :src="
                  activeMenu === 'dashboard'
                    ? dashboardActiveIcon
                    : dashboardIcon
                "
              />
              <span>工作台</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import headerImg from "../assets/images/header.png";
import purchaseIcon from "../assets/icon/tab_purchase.png";
import transportationIcon from "../assets/icon/tab_transportation.png";
import salesIcon from "../assets/icon/tab_sales.png";
import dashboardIcon from "../assets/icon/tab_dashboard.png";
import purchaseActiveIcon from "../assets/icon/tab_purchase_a.png";
import transportationActiveIcon from "../assets/icon/tab_transportation_a.png";
import salesActiveIcon from "../assets/icon/tab_sales_a.png";
import dashboardActiveIcon from "../assets/icon/tab_dashboard_a.png";
let activeMenu = ref("dashboard");
let route = useRoute();
watch(
  () => route.path,
  (newValue) => {
    let currentPath = newValue;
    if (newValue.includes("/dashboard")) {
      currentPath = "/dashboard";
    }
    handleSelect(currentPath.slice(1), []);
  }
);
const handleSelect = (key: string, keyPath: string[]) => {
  activeMenu.value = key;
};
</script>
<style>
.el-main {
  padding: 0;
}
.el-container,
.layout-container {
  height: 100vh;
}
.main-container {
  height: 90vh;
}

.el-menu-item {
  height: 120px;
  color: rgb(164, 164, 164);
  font-size: 20px;
  font-weight: 500;
}

.el-menu-item.is-active {
  background-color: rgb(229, 243, 254);
  color: #000000;
}

.el-header {
  display: flex;
  align-items: center;
  background-color: rgb(241, 241, 241);
}

.header-container {
  display: flex;
  height: 65px;
}

.menu-icon {
  height: 40px;
  margin-right: 20px;
  margin-left: 8px;
}
</style>
