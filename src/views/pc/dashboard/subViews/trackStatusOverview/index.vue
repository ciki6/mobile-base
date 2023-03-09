<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">在轨信息填报总览</div>
      </div>
    </div>
    <el-card class="panel">
      <el-row class="search">
        <el-col :span="20" class="search-items">
          <div class="search-item">
            <div class="label">编号：</div>
            <el-input v-model="searchQuery.number" placeholder="请输入编号" />
          </div>
        </el-col>
        <el-col :span="4" class="search-btns">
          <el-button type="primary" :icon="Search" round @click="search">
            查询
          </el-button>
          <el-button type="info" :icon="RefreshRight" round @click="reset">
            重置
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="planTable" max-height="55vh" stripe style="width: 100%">
        <el-table-column
          v-for="col in planTableColumn"
          :prop="col.prop"
          :label="col.label"
          :key="col.prop"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        :icon="Plus"
        round
        @click="router.push('dashboard-trackStatusFilling')"
      >
        新增在轨信息
      </el-button>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  Search,
  ArrowLeftBold,
  RefreshRight,
  Plus,
} from "@element-plus/icons-vue";

const router = useRouter();

const searchQuery = ref({ number: "" });

// 表格data
const planTableColumn = [
  { prop: "index", label: "序号" },
  { prop: "number", label: "编号" },
  { prop: "createPerson", label: "创建人" },
  { prop: "createTime", label: "创建日期" },
  { prop: "actingOperator", label: "代操作人" },
];
interface tableRowProps {
  index: number;
  number: string;
  createPerson: string;
  createTime: string;
  actingOperator: string;
}
const planTable = ref<tableRowProps[]>([
  {
    index: 1,
    number: "监装站计划提报单2023/2/20",
    createPerson: "李四",
    createTime: "2023年2月20日",
    actingOperator: "王五",
  },
]);

const search = () => {};
const reset = () => {
  searchQuery.value = { number: "" };
};
const setRole = (row: any) => {
  console.log(row);
};
const setOrgnization = (row: any) => {
  console.log(row);
};

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
    height: 75vh;
    .search {
      margin-bottom: 20px;
      .search-items {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 100px;
        .search-item {
          display: flex;
          align-items: center;
          padding: 10px 80px 10px 0;
          .el-input,
          .el-select {
            width: 300px;
            height: 36px;
            line-height: 36px;
            :deep(.el-input__wrapper) {
              background-color: rgb(245, 247, 248);
            }
            :deep(.select-trigger) {
              height: 100%;
            }
            :deep(.el-input) {
              height: 100%;
            }
          }
          .label {
            white-space: nowrap;
            font-size: 18px;
            margin-right: 10px;
          }
        }
      }
      .search-btns {
        display: flex;
        align-items: center;
      }
    }
    :deep(.el-table th.el-table__cell) {
      background-color: #e5f3ff;
    }
    .el-table {
      margin-bottom: 28px;
    }
  }
}
</style>
