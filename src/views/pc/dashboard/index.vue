<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import dataFilling from "../../../assets/icon/dashboard_dataFilling.png";
import IssueWork from "../../../assets/icon/dashboard_issueWork.png";
import dataAudit from "../../../assets/icon/dashborad_dataReview.png";
import workIssueOverview from "../../../assets/icon/dashborad_dataReview.png";
import fillingProcess from "../../../assets/icon/dashborad_dataReview.png";

export default defineComponent({
  setup() {
    const router = useRouter();
    const jump = (path: string) => {
      router.push("dashboard-" + path);
    };
    const enterList = [
      {
        name: "数据填报",
        icon: dataFilling,
        path: "dataFilling",
      },
      {
        name: "工作下发",
        icon: IssueWork,
        path: "issueWork",
      },
      {
        name: "数据审核总览",
        icon: dataAudit,
        path: "dataAudit",
      },
      {
        name: "工作下发总览",
        icon: workIssueOverview,
        path: "workIssueOverview",
      },
      {
        name: "填报流程",
        icon: dataFilling,
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
    return {
      enterList,
      dataCheck,
      jump,
    };
  },
});
</script>
<template>
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
            @click="jump(o.path)"
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
          <div v-for="o in dataCheck" :key="o.id" class="list-item">
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
          <div v-for="o in dataCheck" :key="o.id" class="list-item">
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
            <span>工作下发（已完成）</span>
          </div>
        </template>
        <div class="list-card-body">
          <div v-for="o in dataCheck" :key="o.id" class="list-item">
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
</template>
<style scoped>
.container {
  padding: 0 8%;
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
  margin-bottom: 50px;
}
</style>
