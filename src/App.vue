<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>

<template>
  <div class="container">
    <van-row>
      <van-col span="24">
        <van-image width="100%" height="3rem" :block="true"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      </van-col>
      <van-col span="24">
        <van-image width="100%" height="9rem" :block="true"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      </van-col>
      <van-col offset="1" span="22">
        <van-row>
          <van-col span="24">
            <div class="title"><van-icon name="chat-o" size="1.3rem" />工作台 ></div>
          </van-col>
          <van-col span="24">
            <div class="panel">
              <div class="panel-title">
                <div class="blue-badge"></div>信息填报
              </div>
              <van-divider :style="{ margin: '.1rem' }" />
              <van-grid :column-num="3" :gutter="10" :border="false">
                <van-grid-item icon="photo-o" text="数据填报" />
                <van-grid-item icon="photo-o" text="数据审核" />
                <van-grid-item icon="photo-o" text="数据查询" />
              </van-grid>
            </div>
          </van-col>
          <van-col span="24">
            <div class="panel">
              <div class="panel-title">
                <div class="blue-badge"></div>任务板
              </div>
              <van-divider :style="{ margin: '.1rem' }" />
              <van-grid :column-num="3" :gutter="10" :border="false">
                <van-grid-item icon="photo-o" text="待完成" />
                <van-grid-item icon="photo-o" text="正在进行" />
                <van-grid-item icon="photo-o" text="已完成" />
              </van-grid>
            </div>
          </van-col>
          <van-col span="24">
            <div class="panel">
              <div class="panel-title">
                <div class="blue-badge"></div>工作发文
              </div>
              <van-divider :style="{ margin: '.1rem' }" />
              <van-grid :column-num="3" :gutter="10" :border="false">
                <van-grid-item icon="photo-o" text="工作下发" />
                <van-grid-item icon="photo-o" text="工作下发查询" />
              </van-grid>
            </div>
          </van-col>
          <van-col span="24">
            <div class="panel">
              <div class="panel-title">
                <div class="blue-badge"></div>角色/权限管理
              </div>
              <van-divider :style="{ margin: '.1rem' }" />
              <van-grid :column-num="3" :gutter="10" :border="false">
                <van-grid-item icon="photo-o" text="人员管理" />
                <van-grid-item icon="photo-o" text="角色管理" />
                <van-grid-item icon="photo-o" text="权限管理" />
              </van-grid>
            </div>
          </van-col>
        </van-row>
      </van-col>
      <van-tabbar v-model="active" :placeholder="true">
        <van-tabbar-item icon="home-o">采购</van-tabbar-item>
        <van-tabbar-item icon="search">调运</van-tabbar-item>
        <van-tabbar-item icon="friends-o">销售</van-tabbar-item>
        <van-tabbar-item icon="setting-o">工作台</van-tabbar-item>
      </van-tabbar>
    </van-row>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(235, 235, 235);
}

.content {
  width: 96%;
}

.title {
  font-weight: bolder;
  font-family: '黑体';
  font-size: 1.3rem;
}

.panel {
  background-color: white;
  padding: 2%;
  margin: 10px 0;
  border-radius: 2%;
}

.panel-title {
  font-weight: bolder;
  font-family: '黑体';
  font-size: 1.2rem;
}

.blue-badge {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 0.3rem 0.3rem 0;
  background-color: rgb(34, 122, 220);
  border-radius: 0.5rem;
  display: inline-block;
}
</style>
