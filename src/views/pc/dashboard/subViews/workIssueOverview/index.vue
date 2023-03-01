<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">工作下发总览</div>
      </div>
    </div>
    <el-card class="panel">
      <div class="search">
        <el-row class="search-row">
          <el-col :span="8" class="search-item">
            <div class="label">名称：</div>
            <el-input v-model="searchQuery.number" placeholder="请输入名称" />
          </el-col>
          <el-col :span="8" class="search-item">
            <div class="label">状态：</div>
            <el-select v-model="searchQuery.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            /></el-select>
          </el-col>
          <el-col :span="8" class="search-item">
            <div class="label">等级：</div>
            <el-select v-model="searchQuery.level" placeholder="请选择">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            /></el-select>
          </el-col>
        </el-row>
        <el-row class="search-row">
          <el-col :span="8" class="search-item">
            <div class="label">参与人员：</div>
            <el-input v-model="searchQuery.participants" />
          </el-col>
          <el-col :span="8" class="search-item">
            <div class="label">时间：</div>
            <el-date-picker v-model="searchQuery.time" type="datetime" />
          </el-col>
          <el-col :span="8" class="search-item">
            <div class="label">~</div>
            <el-input v-model="searchQuery.participants" />
          </el-col>
        </el-row>
        <div class="search-btns">
          <el-button type="primary" :icon="Search" round @click="search">
            查询
          </el-button>
          <el-button type="info" :icon="RefreshRight" round @click="reset"
            >重置</el-button
          >
        </div>
      </div>
      <el-scrollbar height="65vh">
        <el-table :data="planTable" stripe style="width: 100%">
          <el-table-column
            v-for="col in planTableColumn"
            :prop="col.prop"
            :label="col.label"
            :key="col.prop"
            align="center"
          >
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  CircleCheck,
  Search,
  ArrowLeftBold,
  RefreshRight,
  User,
} from "@element-plus/icons-vue";

const router = useRouter();
const statusOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];
const levelOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];
const searchQuery = ref({
  number: "",
  status: "",
  level: "",
  participants: "",
  time: "",
});

// 表格data
const planTableColumn = [
  { prop: "number", label: "序号" },
  { prop: "taskName", label: "任务名称" },
  { prop: "taskLevel", label: "任务等级" },
  { prop: "participants", label: "参与人员" },
  { prop: "start", label: "开始时间" },
  { prop: "end", label: "结束时间" },
  { prop: "status", label: "状态" },
];
const planTable = ref<any>([
  {
    number: "监装站计划提报单2023/2/20",
    taskName: "测试任务1",
    taskLevel: "一般任务",
    participants: "李四，张三",
    start: "2023年2月20日",
    end: "  ",
    status: "未提交",
  },
]);

const search = () => {};
const reset = () => {};

onMounted(() => {});
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding: 0 8%;
  background-color: #e6e5e9;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    .title-left {
      display: flex;
      align-items: center;
      .title-icon {
        cursor: pointer;
        margin-right: 10px;
      }
      .title-text {
        font-size: 22px;
        font-weight: 600;
      }
    }
  }
  .panel {
    .search {
      margin: 20px 0;
      .search-row {
        // padding-left: 100px;
        margin-bottom: 18px;
        padding: 0 20px;
        .search-item {
          display: flex;
          align-items: center;
          .label {
            width: 100px;
            text-align: right;
            white-space: nowrap;
            font-size: 18px;
            margin-right: 10px;
          }
          //   padding: 10px 80px 10px 0;
          .el-input,
          .el-select {
            width: 300px;
            height: 36px;
            line-height: 36px;
            :deep(.el-input__wrapper) {
              background-color: #f5f7f8;
            }
            :deep(.select-trigger) {
              height: 100%;
            }
            :deep(.el-input) {
              height: 100%;
            }
          }
        }
      }
      .search-btns {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
    :deep(.el-table th.el-table__cell) {
      background-color: #e5f3ff;
    }
    :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
      width: 300px;
      height: 36px;
      background-color: #f5f7f8;

      .el-input__wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: #f5f7f8;
      }
    }
  }
}
</style>
