<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">
          数据填报{{ pageStatus === "process" ? "审核" : "" }}
        </div>
      </div>
      <div class="action-btns">
        <template v-if="pageStatus === 'add'">
          <el-button
            type="info"
            :icon="Document"
            round
            @click="saveSubmit('save')"
            >保存</el-button
          >
          <el-button
            type="primary"
            :icon="CircleCheck"
            round
            @click="saveSubmit('submit')"
            >提交</el-button
          >
        </template>
        <template v-else>
          <el-button type="info" :icon="CircleClose" round @click="reject"
            >驳回</el-button
          >
          <el-button
            type="primary"
            :icon="CircleCheck"
            round
            @click="saveSubmit('pass')"
            >提交</el-button
          >
        </template>
      </div>
    </div>
    <div class="panel">
      <el-scrollbar height="75vh">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="circle-primary"></span>
              <span>{{ pageInfo.fillName }}</span>
            </div>
          </template>
          <div class="list-card-body">
            <el-table :data="planTable" stripe style="width: 100%">
              <el-table-column
                v-for="col in planTableColumn"
                :prop="col.prop"
                :label="col.label"
                :key="col.prop"
                show-overflowDirection-tooltip
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <div v-if="row.id && !changePlanStatus">
                    {{ row[col.prop] }}
                  </div>
                  <template v-else>
                    <el-select
                      v-if="col.type === 'select'"
                      v-model="row[col.prop]"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in col.options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <el-input v-else v-model="row[col.prop]" />
                  </template>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              v-if="pageStatus === 'add'"
              type="primary"
              :icon="Plus"
              round
              @click="addPlan"
              >新增行</el-button
            >
            <template v-else>
              <el-button
                type="primary"
                :icon="Refresh"
                round
                @click="changePlan"
                >变更</el-button
              >
            </template>
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
                show-overflowDirection-tooltip
                align="center"
              />
            </el-table>
          </div>
        </el-card>
      </el-scrollbar>
    </div>
    <el-dialog
      v-model="opinionDialogVisb"
      :title="opinionDialogTitle"
      width="30vw"
    >
      <div class="form-label"></div>
      <el-input
        v-model="pageInfo.opinion"
        class="form-content"
        type="textarea"
        :rows="5"
        resize="none"
      />
      <template #footer>
        <el-button type="primary" @click="dialogConfirm"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Plus,
  CircleCheck,
  Document,
  ArrowLeftBold,
  CircleClose,
  Refresh,
} from "@element-plus/icons-vue";
import {
  supplierOptions,
  stationNameOptions,
  coalOptions,
  flowDirectionOptions,
  userOptions,
  contractTypeOptions,
} from "./selectOptions";
import moment from "moment";
import { ElMessage } from "element-plus";
import {
  saveFillData,
  dispatchFillData,
  getFillDetailByFillCode,
  getFillFlowByFillCode,
  rejectFillData,
} from "@/api/dashboard";

// 路由参数
const router = useRouter();
const currentRoute = useRoute();
const pageStatus = computed(() => currentRoute.query.pageStatus);
const fillCode = computed<string>(() => currentRoute.query.fillCode as string);

// 页面title、操作、opinion
const date = moment().format("YYYY年MM月DD日");
const pageInfo = reactive({
  fillName: `监装站计划填报单 - ${date} `,
  opinion: "",
  operation: "",
});
// 表格data
const planTableColumn = [
  {
    prop: "staionName",
    label: "站台",
    type: "select",
    options: stationNameOptions,
  },
  {
    prop: "supplier",
    label: "供应商",
    type: "select",
    options: supplierOptions,
  },
  { prop: "effectiveStock", label: "有效库存(吨)" },
  { prop: "reportingPlan", label: "提报计划(列)" },
  {
    prop: "flowDirection",
    label: "流向",
    type: "select",
    options: flowDirectionOptions,
  },
  {
    prop: "user",
    label: "用户",
    type: "select",
    options: userOptions,
  },
  {
    prop: "coalType",
    label: "煤种",
    type: "select",
    options: coalOptions,
  },
  {
    prop: "contractType",
    label: "合同类型",
    type: "select",
    options: contractTypeOptions,
  },
];
const planTable = ref<any>([]);
const recordTableColumn = [
  { label: "操作", prop: "operation" },
  { label: "意见", prop: "opinion" },
  { label: "用户", prop: "userName" },
  { label: "时间", prop: "operationTime" },
];
const recordTable = ref([]);

// 查询日志
const getRecordTable = () => {
  getFillFlowByFillCode(fillCode.value).then((res: any) => {
    console.log(res, "=====getFillFlowByFillCode");
    recordTable.value = res.data
      .map((item: any) => {
        item.operationTime = moment(item.operationTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return item;
      })
      .sort(
        (a: any, b: any) =>
          new Date(b.operationTime).getTime() -
          new Date(a.operationTime).getTime()
      );
  });
};

onMounted(() => {
  if (fillCode.value) {
    // 查询数据 planTable recordTable
    getFillDetailByFillCode(fillCode.value).then((res: any) => {
      planTable.value = res.data.fillDetailList.map((item: any) => {
        item.reportingPlan =
          item.dispatchingDepartment ||
          item.businessDepartment ||
          item.loadSupervisionStaion;
        item.dispatchingDepartment
          ? (item.currentReportingPlanKey = "dispatchingDepartment")
          : item.businessDepartment
          ? (item.currentReportingPlanKey = "businessDepartment")
          : (item.currentReportingPlanKey = "loadSupervisionStaion");
        return item;
      });
    });
    getRecordTable();
  }
});

const addPlan = () => {
  const newRow = {
    staionName: "",
    supplier: "",
    effectiveStock: "",
    reportingPlan: "",
    flowDirection: "",
    user: "",
    coalType: "",
    contractType: "",
  };
  planTable.value.push(newRow);
};

// 校验函数
const validate = () => {
  return new Promise((resolve, reject) => {
    const nullValue = planTable.value.find((item: any, index: number) =>
      planTableColumn.find((propItem) => !item[propItem.prop])
    );
    if (nullValue) {
      ElMessage.error("请填写完成所有字段");
      reject(false);
    } else {
      resolve(true);
    }
  });
};

// 保存 提交 变更
const saveSubmit = (type: string) => {
  validate().then((valid) => {
    const data = planTable.value.map((item: any) => {
      item[item.currentReportingPlanKey || "loadSupervisionStaion"] =
        item.reportingPlan;
      return item;
    });

    if (type === "save") {
      pageInfo.opinion = "";
      pageInfo.operation = "保存填报信息";
      saveFillData(data, pageInfo).then((res: any) => {
        ElMessage.success("保存成功");
      });
    } else if (type === "submit") {
      pageInfo.opinion = "通过";
      pageInfo.operation = "提交审核";
      dispatchFillData(data, pageInfo).then((res: any) => {
        ElMessage.success("提交成功");
        router.go(-1);
      });
    } else if (type === "changePlan") {
      // 变更信息
      pageInfo.operation = "变更信息";
      saveFillData(data, pageInfo).then((res: any) => {
        ElMessage.success("变更成功");
        getRecordTable();
        opinionDialogVisb.value = false;
        changePlanStatus.value = false;
      });
    } else if (type === "pass") {
      if (changePlanStatus.value) {
        ElMessage.error("请先完成信息变更");
      } else {
        pageInfo.opinion = "通过";
        pageInfo.operation = "审批通过";
        dispatchFillData(data, pageInfo).then((res: any) => {
          ElMessage.success("审批成功");
          router.go(-1);
        });
      }
    } else if (type === "reject") {
      pageInfo.operation = "驳回";
      rejectFillData({
        fillCode: fillCode.value,
        operation: pageInfo.operation,
        opinion: pageInfo.opinion,
      }).then((res: any) => {
        opinionDialogVisb.value = false;
        ElMessage.success("审批成功");
        router.go(-1);
      });
    }
  });
};

// 变更信息
const changePlanStatus = ref(false);
const opinionDialogVisb = ref(false);
const opinionDialogTitle = ref("");
const changePlan = () => {
  if (changePlanStatus.value) {
    validate().then((valid) => {
      // 填写意见
      opinionDialogTitle.value = "请填写变更理由";
      opinionDialogVisb.value = true;
    });
  } else {
    changePlanStatus.value = true;
  }
};
// 驳回
const reject = () => {
  pageInfo.opinion = "";
  opinionDialogTitle.value = "请填写驳回理由";
  opinionDialogVisb.value = true;
};

// 意见弹窗confirm
const dialogConfirm = () => {
  if (changePlanStatus.value) {
    saveSubmit("changePlan");
  } else {
    saveSubmit("reject");
  }
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
