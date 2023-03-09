<template>
  <el-scrollbar height="100%">
    <div class="container">
      <div class="title">工作台</div>
      <div class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>快捷入口</span>
            </div>
          </template>
          <div class="card-body">
            <div
              v-for="o in enterList"
              :key="o.name"
              class="enter-item"
              @click="jump(o)"
            >
              <img class="enter-icon" :src="o.icon" />
              <div class="enter-text">{{ o.name }}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>数据审核</span>
            </div>
          </template>
          <div class="list-card-body">
            <div
              v-for="o in dataCheck"
              :key="o.id"
              class="list-item"
              @click="
                jump({
                  path: 'dataFilling',
                  query: { id: o.id, pageStatus: 'process' },
                })
              "
            >
              <el-row>
                <el-col :span="18">{{ o.title }}</el-col>
                <el-col :span="3">{{ o.user }}</el-col>
                <el-col :span="3">{{ o.date }}</el-col>
              </el-row>
              <el-divider />
            </div>
          </div>
        </el-card>
      </div>
      <div class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>工作下发（待完成）</span>
            </div>
          </template>
          <div class="list-card-body">
            <div
              v-for="o in dataCheck"
              :key="o.id"
              class="list-item"
              @click="
                jump({
                  path: 'issueWork',
                  query: { id: o.id, pageStatus: 'fill' },
                })
              "
            >
              <el-row>
                <el-col :span="18">{{ o.title }}</el-col>
                <el-col :span="3">{{ o.user }}</el-col>
                <el-col :span="3">{{ o.date }}</el-col>
              </el-row>
              <el-divider />
            </div>
          </div>
        </el-card>
      </div>
      <div class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>工作下发（待审核）</span>
            </div>
          </template>
          <div class="list-card-body">
            <div
              v-for="o in dataCheck"
              :key="o.id"
              class="list-item"
              @click="
                jump({
                  path: 'issueWork',
                  query: { id: o.id, pageStatus: 'process' },
                })
              "
            >
              <el-row>
                <el-col :span="18">{{ o.title }}</el-col>
                <el-col :span="3">{{ o.user }}</el-col>
                <el-col :span="3">{{ o.date }}</el-col>
              </el-row>
              <el-divider />
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </el-scrollbar>
  <el-dialog v-model="jumpChooseVisb" title="请选择" width="20vw">
    <div class="option-item" @click="jump({ path: 'dataOverview' })">
      计划填报
    </div>
    <el-divider />
    <div class="option-item" @click="jump({ path: 'trackStatusOverview' })">
      在轨信息填报
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import dataFilling from "../../../assets/icon/dashboard_dataFilling.png";
import IssueWork from "../../../assets/icon/dashboard_issueWork.png";
import dataOverview from "../../../assets/icon/dashboard_dataOverview.png";
import workIssueOverview from "../../../assets/icon/dashboard_workIssueOverview.png";
import fillingProcess from "../../../assets/icon/dashboard_fillingProcess.png";
import dataUpload from "../../../assets/icon/dashboard_dataUpload.png";
import trackStatus from "../../../assets/icon/dashboard_trackStatus.png";
const router = useRouter();

const jumpChooseVisb = ref(false);
const jump = (enterObject: any) => {
  if (enterObject.path) {
    if (jumpChooseVisb.value) jumpChooseVisb.value = false;
    router.push({
      path: "dashboard-" + enterObject.path,
      query: enterObject.query,
    });
  } else {
    switch (enterObject.feature) {
      case "upload":
        console.log("=====upload=====");
        break;
      case "overview":
        jumpChooseVisb.value = true;
        break;
      default:
        break;
    }
  }
};
const enterList = [
  {
    name: "数据填报",
    icon: dataFilling,
    path: "dataFilling",
    query: { pageStatus: "add" },
  },
  {
    name: "在轨信息填报",
    icon: trackStatus,
    path: "trackStatusFilling",
  },
  {
    name: "数据上传",
    icon: dataUpload,
    feature: "upload",
    // path: "dataFilling",
  },
  {
    name: "工作下发",
    icon: IssueWork,
    path: "issueWork",
    query: { pageStatus: "add" },
  },
  {
    name: "数据填报总览",
    icon: dataOverview,
    feature: "overview",
  },
  {
    name: "工作下发总览",
    icon: workIssueOverview,
    path: "workIssueOverview",
  },
  {
    name: "填报流程",
    icon: fillingProcess,
    path: "fillingProcess",
  },
];
const dataCheck = [
  {
    id: 1,
    title: "建装站计划提报单1",
    user: "李四",
    date: "2023年2月20日",
  },
  {
    id: 2,
    title: "建装站计划提报单2",
    user: "李四",
    date: "2023年2月20日",
  },
  {
    id: 3,
    title: "建装站计划提报单3",
    user: "李四",
    date: "2023年2月20日",
  },
];
</script>

<style scoped>
.container {
  padding: 0 8% 2%;
  background-color: rgb(230, 229, 233);
}

.title {
  height: 100px;
  display: flex;
  align-items: center;
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.enter-item {
  cursor: pointer;
  width: 99px;
  height: 165px;
}

.enter-icon {
  width: 100px;
  height: 100px;
}

.enter-text {
  text-align: center;
}

.panel {
  background-color: #ffffff;
}
.panel + .panel {
  margin-top: 50px;
}

.option-item {
  cursor: pointer;
  text-align: center;
  font-size: 18px;
}
.list-item {
  cursor: pointer;
}
</style>
