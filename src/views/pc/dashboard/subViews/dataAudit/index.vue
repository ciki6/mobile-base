<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">数据审核总览</div>
      </div>
    </div>
    <el-card class="panel">
      <el-row class="search">
        <el-col :span="20" class="search-items">
          <div class="search-item">
            <div class="label">编号：</div>
            <el-input v-model="searchQuery.number" placeholder="请输入编号" />
          </div>
          <div class="search-item">
            <div class="label">状态：</div>
            <el-select v-model="searchQuery.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            /></el-select>
          </div>
        </el-col>
        <el-col :span="4" class="search-btns">
          <el-button type="primary" :icon="Search" round @click="search">
            查询
          </el-button>
        </el-col>
      </el-row>
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
          <el-table-column>
            <template v-slot="{ row, $index }">
              <el-button type="primary" round @click="setRole(row)">
                角色配置
              </el-button>
              <el-button type="primary" round @click="setOrgnization(row)">
                组织配置
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { Search, ArrowLeftBold } from "@element-plus/icons-vue";

const router = useRouter();
const statusOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];
const searchQuery = ref({ number: "", status: "" });

// 表格data
const planTableColumn = [
  { prop: "index", label: "序号" },
  { prop: "number", label: "编号" },
  { prop: "createPerson", label: "创建人" },
  { prop: "createTime", label: "创建时间" },
  { prop: "actingOperator", label: "代操作人" },
  { prop: "status", label: "状态" },
];
const planTable = ref<any>([
  {
    index: 1,
    number: "监装站计划提报单2023/2/20",
    createPerson: "李四",
    createTime: "2023年2月20日 16：28：48",
    actingOperator: "  ",
    status: "未提交",
  },
]);

const search = () => {};
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
  }
}
</style>
