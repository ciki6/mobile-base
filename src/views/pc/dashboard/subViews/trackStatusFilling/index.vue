<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">在轨信息填报</div>
      </div>
      <div class="action-btns">
        <el-button type="info" :icon="Document" round @click="save"
          >保存</el-button
        >
        <el-button type="primary" :icon="CircleCheck" round @click="submit"
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
                  <el-select
                    v-if="col.prop === 'trackStatus'"
                    v-model="row.trackStatus"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in trackStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  /></el-select>
                  <div v-else-if="!row.new">{{ row[col.prop] }}</div>
                  <el-input v-else v-model="row[col.prop]" />
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template v-slot="{ row }">
                  <el-button
                    v-if="row.id"
                    type="primary"
                    size="small"
                    round
                    @click="handleConfirmTrainOut(row)"
                  >
                    <!-- 确认过出站的数据 -->
                    <!-- :disabled="row.xx" -->
                    确认出站
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" :icon="Plus" round @click="addPlan"
              >新增行</el-button
            >
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
const trackStatusOptions = [
  { label: "空车到站", value: 0 },
  { label: "装车作业", value: 1 },
  { label: "装车完毕", value: 2 },
  { label: "重车出战", value: 3 },
];
// 表格data
const planTableColumn = [
  { prop: "station", label: "站台" },
  { prop: "supplier", label: "供应商" },
  { prop: "trainNumber", label: "列车号" },
  { prop: "trackStatus", label: "在轨信息" },
  { prop: "flow", label: "流向" },
  { prop: "user", label: "用户" },
  { prop: "coalType", label: "煤种" },
];
const planTable = ref<any>([]);

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
  planTable.value.push(newRow);
};

// 前端保存 new判断 必填项校验
const save = () => {};

const handleConfirmTrainOut = (row: any) => {
  // 确认出站
  console.log(row, "=======此数据 出站=======");
};

// 提交newRows
const submit = () => {
  // console.log(newRows.value, "======newRows");
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
