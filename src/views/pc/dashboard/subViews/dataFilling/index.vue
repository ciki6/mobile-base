<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">数据填报</div>
      </div>
      <div class="action-btns">
        <el-button type="info" :icon="Document" round @click="save"
          >保存</el-button
        >
        <el-button
          type="primary"
          :icon="CircleCheck"
          round
          @click="submit"
          :disabled="newRows.some((item) => item.new)"
          >提交</el-button
        >
      </div>
    </div>
    <div class="panel">
      <el-scrollbar height="75vh">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="circle-primary"></span>
              <span>建装站计划填报单-2023/2/10</span>
            </div>
          </template>
          <div class="list-card-body">
            <el-table :data="planTable" stripe style="width: 100%">
              <el-table-column
                v-for="col in planTableColumn"
                :prop="col.prop"
                :label="col.label"
                :key="col.prop"
                show-overflow-tooltip
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <div v-if="!row.new">{{ row[col.prop] }}</div>
                  <el-input v-else v-model="row[col.prop]" />
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" :icon="Plus" round @click="addPlan"
              >新增行</el-button
            >
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="circle-primary"></span>
              <span>操作日志</span>
            </div>
          </template>
          <div class="list-card-body">
            <el-table :data="recordTable" stripe style="width: 100%">
              <el-table-column
                v-for="col in recordTableColumn"
                :prop="col.prop"
                :label="col.label"
                :key="col.prop"
                show-overflow-tooltip
                align="center"
              />
            </el-table>
          </div>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Plus,
  CircleCheck,
  Document,
  ArrowLeftBold,
} from "@element-plus/icons-vue";

const router = useRouter();

// 表格data
const planTableColumn = [
  { prop: "station", label: "站台" },
  { prop: "supplier", label: "供应商" },
  { prop: "effectiveStock", label: "有效库存(吨)" },
  { prop: "reportingPlan", label: "提报计划(列)" },
  { prop: "flow", label: "流向" },
  { prop: "user", label: "用户" },
  { prop: "coalType", label: "煤种" },
  { prop: "contractType", label: "合同类型" },
];
const planTable = ref<any>([
  {
    id: 1,
    station: "物资万1",
    supplier: "东辰",
    effectiveStock: "900",
    reportingPlan: "3",
    flow: "区内外购",
    user: "XX电厂",
    coalType: "外购4500",
    contractType: "长协",
  },
  {
    id: 2,
    station: "物资万2",
    supplier: "东辰",
    effectiveStock: "900",
    reportingPlan: "3",
    flow: "区内外购",
    user: "XX电厂",
    coalType: "外购4500",
    contractType: "长协",
  },
]);
const recordTableColumn = [
  { label: "操作", prop: "action" },
  { label: "意见", prop: "suggestion" },
  { label: "用户", prop: "user" },
  { label: "时间", prop: "time" },
];
const recordTable = ref([
  {
    action: "提交审核",
    suggestion: "xxx",
    user: "李四",
    time: "2023年2月20日 16:28:48",
  },
]);

// 新数据
const newRows = ref<any[]>([]);
const addPlan = () => {
  const newRow = {
    new: true,
    station: "",
    supplier: "",
    effectiveStock: "",
    reportingPlan: "",
    flow: "",
    user: "",
    coalType: "",
    contractType: "",
  };
  newRows.value.push(newRow);
  planTable.value.push(newRow);
};

// 前端保存 new判断 必填项校验
const save = () => {
  newRows.value.forEach((item) => {
    delete item.new;
  });
};

// 提交newRows
const submit = () => {
  console.log(newRows.value, "======newRows");
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding: 0 8%;
  background-color: rgb(230, 229, 233);
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
    .box-card + .box-card {
      margin-top: 20px;
    }
    .box-card {
      .circle-primary {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgb(64, 158, 255);
        margin-right: 20px;
      }
    }
    .list-card-body {
      .el-table {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
