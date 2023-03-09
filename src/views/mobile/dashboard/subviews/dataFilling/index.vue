<template>
  <SubViewsHead :head-title-icon="titleIcon" />
  <div class="dashboard-container">
    <div class="data-title">
      <img
        class="title-icon"
        src="src/assets/icon/dataProcessIcon.png"
        alt=""
      />
      <div class="title-text">监装站计划提报单-{{ date }}</div>
    </div>
    <div class="filling-part">
      <van-form v-for="item in fillingData" class="form-card">
        <van-cell-group inset>
          <template v-for="colItem in formProps" :key="colItem.prop">
            <van-field
              v-if="colItem.type === 'input'"
              v-model="item[colItem.prop]"
              :label="colItem.label"
              :rules="colItem.rules"
            />
            <van-field
              v-else-if="colItem.type === 'picker'"
              v-model="item[colItem.prop]"
              :label="colItem.label"
              :rules="colItem.rules"
              is-link
              readonly
              @click="pickerClick(item, colItem)"
            />
          </template>
        </van-cell-group>
      </van-form>
      <div class="add-btn" @click="addForm">
        <van-icon name="plus" />
        新增
      </div>
    </div>
    <div class="operation">
      <div class="operation-title">
        <div class="blue-circle"></div>
        <div class="operation-title-text">操作日志</div>
      </div>
      <div class="operation-table">
        <van-cell-group inset>
          <van-row gutter="10">
            <van-col span="6" class="table-cell">操作</van-col>
            <van-col span="6" class="table-cell">意见</van-col>
            <van-col span="4" class="table-cell">用户</van-col>
            <van-col span="8" class="table-cell">时间</van-col>
          </van-row>
          <van-row v-for="item in operationLogData" :key="item.id" gutter="10">
            <van-col span="6" class="table-cell">{{ item.action }}</van-col>
            <van-col span="6">
              <van-popover placement="top-start">
                <div>{{ item.opinion }}</div>
                <template #reference>
                  <div class="table-cell">{{ item.opinion }}</div>
                </template>
              </van-popover></van-col
            >
            <van-col span="4" class="table-cell">{{ item.user }}</van-col>
            <van-col span="8" class="table-cell">{{ item.time }}</van-col>
          </van-row>
        </van-cell-group>
      </div>
    </div>

    <div class="footer">
      <div class="footer-btn">保存</div>
      <div class="footer-btn">提交</div>
    </div>
  </div>
  <teleport to="body">
    <van-popup v-model:show="showPicker" position="bottom" :lazy-render="false">
      <!--   :lazy-render="false" 一定要加 -->
      <van-picker
        v-model="selectedValues"
        :columns="currentOptions"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </teleport>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SubViewsHead from "../../components/subviewsHead.vue";
import titleIcon from "@/assets/icon/icon_计划.png";
import moment from "moment";

const date = moment().format("YYYY/MM/DD");
const fillingData = ref<any>([
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
]);
const formProps = [
  {
    prop: "station",
    label: "站台",
    type: "input",
    rules: [{ required: true, message: "请填写站台" }],
  },
  {
    prop: "supplier",
    label: "供应商",
    type: "picker",
    options: [
      { value: "东辰", text: "东辰" },
      { value: "xyz", text: "xyz" },
    ],
  },
  { prop: "effectiveStock", label: "有效库存(吨)" },
  { prop: "reportingPlan", label: "提报计划(列)", type: "picker" },
  { prop: "flow", label: "流向", type: "picker" },
  { prop: "user", label: "用户", type: "picker" },
  { prop: "coalType", label: "煤种", type: "picker" },
  { prop: "contractType", label: "合同类型", type: "picker" },
];

// 选择器
const showPicker = ref(false);
let currentFormItem = ref<any>({});
let currentProp = "";
const currentOptions = ref<any[]>([]);
const selectedValues = ref<any>([""]);
const pickerClick = (formItem: any, fromPropItem: any) => {
  currentProp = fromPropItem.prop;
  currentFormItem.value = formItem;
  currentOptions.value = fromPropItem.options || [];
  selectedValues.value.shift();
  selectedValues.value.push(formItem[fromPropItem.prop]);
  console.log(
    currentOptions.value,
    selectedValues.value,
    "====selectedValues.value"
  );
  showPicker.value = true;
};
const onConfirm = ({ selectedOptions }: any) => {
  currentFormItem.value[currentProp] = selectedOptions[0]?.text;
  showPicker.value = false;
};

// 新增
const addForm = () => {
  fillingData.value.push({
    station: "",
    supplier: "",
    effectiveStock: "",
    reportingPlan: "",
    flow: "",
    user: "",
    coalType: "",
    contractType: "",
  });
};

// 操作日志
const operationLogData = ref<any[]>([
  {
    id: 1,
    action: "提交审核",
    opinion:
      "不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行",
    use: "李四",
    time: "2023/2/20 16:48:48",
  },
  {
    id: 2,
    action: "提交审核",
    opinion:
      "不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行",

    use: "李四",
    time: "2023/2/20 16:48:48",
  },
  {
    id: 3,
    action: "提交审核",
    opinion:
      "不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行不行",

    use: "李四",
    time: "2023/2/20 16:48:48",
  },
]);

// tooltip
const showPopover = ref(false);
onMounted(() => {});
</script>
<style lang="less" scoped>
.dashboard-container {
  padding: 2% 4%;
  .data-title {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    .title-icon {
      width: 1.5rem;
      margin-right: 0.2rem;
    }
    .title-text {
      font-size: 1rem;
      font-weight: 600;
      color: rgb(31, 47, 77);
    }
  }

  .filling-part {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-card {
      width: 100%;
      .van-cell-group--inset {
        margin: 0;
      }
    }
    .form-card + .form-card {
      margin-top: 1rem;
    }

    .add-btn {
      margin: 1rem 0;
      background-color: #1989fa;
      color: #fff;
      padding: 0.2rem 1rem;
      border-radius: 1rem;
    }
  }

  .operation {
    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 0.8rem;
      .blue-circle {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: #1989fa;
        margin-right: 0.2rem;
      }
      &-text {
        font-size: 1rem;
        font-weight: 600;
        color: rgb(31, 47, 77);
      }
    }
    &-table {
      .van-cell-group--inset {
        margin: 0;
        .van-row {
          padding: 0.4rem 0.5rem;
          display: flex;
          align-items: center;
        }
        .table-cell {
          text-align: center;
          font-size: 0.8rem;
          color: #808080;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .van-row:nth-of-type(even) {
          background-color: #f7f7f7;
        }
      }
    }
  }
}
</style>
<style>
.van-popover__content {
  max-width: 15rem;
  padding: 0.5rem;
  color: #808080;
}
</style>
