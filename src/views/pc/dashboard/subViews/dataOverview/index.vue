<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">计划填报总览</div>
      </div>
    </div>
    <el-card class="panel">
      <el-row class="search">
        <el-col :span="20" class="search-items">
          <div class="search-item">
            <div class="label">编号：</div>
            <el-input v-model="searchQuery.fillName" placeholder="请输入编号" />
          </div>
          <div class="search-item">
            <div class="label">状态：</div>
            <el-select
              v-model="searchQuery.status"
              placeholder="请选择"
              clearable
            >
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
        @click="
          router.push({
            path: '/dashboard-dataFilling',
            query: { pageStatus: 'add' },
          })
        "
      >
        新增计划
      </el-button>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllJoinFillDataByUserId } from "@/api/dashboard";
import {
  Search,
  ArrowLeftBold,
  RefreshRight,
  Plus,
} from "@element-plus/icons-vue";
import moment from "moment";

const router = useRouter();
const statusOptions = [
  { label: "未提交", value: "未提交" },
  { label: "待审核", value: "待审核" },
  { label: "已完成", value: "已完成" },
  { label: "已驳回", value: "已驳回" },
];
const searchQuery = ref({ fillName: "", status: "" });

// 表格
const planTableColumn = [
  { prop: "index", label: "序号" },
  { prop: "fillName", label: "编号" },
  { prop: "createBy", label: "创建人" },
  { prop: "createTime", label: "创建时间" },
  { prop: "actingOperator", label: "代操作人" },
  { prop: "status", label: "状态" },
];
const planTable = ref<any[]>([]);

const search = () => {
  getAllJoinFillDataByUserId(searchQuery.value).then((res: any) => {
    console.log(res, "====res");
    planTable.value = res.data.map((item: any, index: number) => {
      item.index = index + 1;
      item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
      return item;
    });
  });
};
const reset = () => {
  searchQuery.value = { fillName: "", status: "" };
};

onMounted(() => {
  search();
});
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
