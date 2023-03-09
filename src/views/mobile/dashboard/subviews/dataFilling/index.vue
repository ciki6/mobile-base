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
    <!-- <div class="form-card"></div> -->
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

        <van-popup
          v-model:show="showPicker"
          position="bottom"
          :lazy-render="false"
        >
          <!--   :lazy-render="false" 一定要加 -->
          <van-picker
            v-model="selectedValues"
            :columns="currentOptions"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </van-cell-group>
    </van-form>

    <div class="footer">
      <van-button
        type="primary"
        icon="plus"
        round
        size="small"
        @click="addForm"
      >
        新 增
      </van-button>
    </div>
  </div>
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
onMounted(() => {});
</script>
<style lang="less" scoped>
.dashboard-container {
  padding: 2% 4%;
  //   background-color: #ebebeb;
}
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

.form-card {
  .van-cell-group--inset {
    margin: 0;
  }
}
.form-card + .form-card {
  margin-top: 1rem;
}
.footer {
  display: flex;
  justify-content: center;
  padding: 0.6rem 0;
}
</style>
