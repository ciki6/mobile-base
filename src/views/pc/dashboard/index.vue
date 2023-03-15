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
      <div v-if="data2CheckList.length > 0" class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>数据审核</span>
            </div>
          </template>
          <div class="list-card-body">
            <div
              v-for="o in (data2CheckList as any)"
              :key="o.fillCode"
              class="list-item"
              @click="
                jump({
                  path: 'dataFilling',
                  query: { fillCode: o.fillCode, pageStatus: 'process' },
                })
              "
            >
              <el-row>
                <el-col :span="18">{{ o.fillName }}</el-col>
                <el-col :span="3">{{ o.userName }}</el-col>
                <el-col :span="3">{{ o.createTime }}</el-col>
              </el-row>
              <el-divider />
            </div>
          </div>
        </el-card>
      </div>
      <div v-if="waitCompleteList.length > 0" class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>工作下发（待完成）</span>
            </div>
          </template>
          <div class="list-card-body">
            <div
              v-for="o in (waitCompleteList as any)"
              :key="o.distId"
              class="list-item"
              @click="
                jump({
                  path: 'issueWork',
                  query: { distId: o.distId, pageStatus: 'fill' },
                })
              "
            >
              <el-row>
                <el-col :span="18">{{ o.name }}</el-col>
                <el-col :span="3">{{ o.userName }}</el-col>
                <el-col :span="3">{{ o.startTime }}</el-col>
              </el-row>
              <el-divider />
            </div>
          </div>
        </el-card>
      </div>
      <div v-if="verifyList.length > 0" class="panel">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>工作下发（待审核）</span>
            </div>
          </template>
          <div class="list-card-body">
            <div
              v-for="o in (verifyList as any)"
              :key="o.distId"
              class="list-item"
              @click="
                jump({
                  path: 'issueWork',
                  query: { distId: o.distId, pageStatus: 'process' },
                })
              "
            >
              <el-row>
                <el-col :span="18">{{ o.name }}</el-col>
                <el-col :span="3">{{ o.userName }}</el-col>
                <el-col :span="3">{{ o.startTime }}</el-col>
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
  <UploadDialog v-model:visible="uploadDialogVisb" accept=".xls,.xlsx" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dataFilling from "../../../assets/icon/dashboard_dataFilling.png";
import IssueWork from "../../../assets/icon/dashboard_issueWork.png";
import dataOverview from "../../../assets/icon/dashboard_dataOverview.png";
import workIssueOverview from "../../../assets/icon/dashboard_workIssueOverview.png";
import fillingProcess from "../../../assets/icon/dashboard_fillingProcess.png";
import dataUpload from "../../../assets/icon/dashboard_dataUpload.png";
import trackStatus from "../../../assets/icon/dashboard_trackStatus.png";
import moment from "moment";
import {
  getAllMenuByUserId,
  getAllFillDataByUserId,
  findWorkDistributeFlowByUserId,
} from "@/api/dashboard";
import UploadDialog from "./components/dataFill-upload-dialog.vue";
const router = useRouter();

const uploadDialogVisb = ref(false);

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
        uploadDialogVisb.value = true;
        break;
      case "overview":
        jumpChooseVisb.value = true;
        break;
      default:
        break;
    }
  }
};
// 快捷入口
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
const data2CheckList = ref([]); // 数据审核列表
const verifyList = ref([]); // 工作下发-待审核列表
const waitCompleteList = ref([]); // 工作下发-待完成列表
onMounted(() => {
  getAllMenuByUserId().then((res: any) => {});
  getAllFillDataByUserId().then((res: any) => {
    data2CheckList.value = res.data.map((item: any) => {
      item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
      return item;
    });
  });
  findWorkDistributeFlowByUserId().then((res: any) => {
    console.log(res, "======findWorkDistributeFlowByUserId");
    waitCompleteList.value = (res.data?.waitComplete || []).map((item: any) => {
      item.startTime = moment(item.startTime).format("YYYY-MM-DD HH:mm:ss");
      return item;
    });
    verifyList.value = (res.data?.verify || []).map((item: any) => {
      item.startTime = moment(item.startTime).format("YYYY-MM-DD HH:mm:ss");
      return item;
    });
  });
});
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
  padding-left: 20px;
}
</style>
