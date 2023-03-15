<template>
  <SubViewsHead :head-title-icon="titleIcon" />
  <div class="dashboard-container">
    <div class="data-title">
      <img class="title-icon" src="@/assets/icon/dataProcessIcon.png" alt="" />
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
              label-width="7rem"
            />
            <VanSelect
              v-else-if="colItem.type === 'picker'"
              v-model="item[colItem.prop]"
              :columns="colItem.options"
              :label="colItem.label"
              :name="colItem.prop"
              label-width="7rem"
            />
            <van-field
              v-else-if="colItem.type === 'button'"
              class="btn-field"
              :label="colItem.label"
              label-width="7rem"
            >
              <template #input @click="colItem.handleClick?.(item)">
                确认出站
              </template>
            </van-field>
          </template>
        </van-cell-group>
      </van-form>
      <div class="add-btn" @click="addForm">
        <van-icon name="plus" />
        新增
      </div>
    </div>
  </div>
  <SubViewsFooter :btns-options="footerOptions" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SubViewsHead from "../../components/subViewsHead.vue";
import SubViewsFooter from "../../components/subViewsFooter.vue";
import titleIcon from "@/assets/icon/icon_计划.png";
import moment from "moment";
import VanSelect from "../../../../../components/vanSelect.vue";
const date = moment().format("YYYY/MM/DD");
const fillingData = ref<any>([
  {
    id: 1,
    station: "物资万1",
    supplier: "dongchen",
    trainNumber: "900",
    trackStatus: "3",
    flow: "区内外购",
    user: "XX电厂",
    coalType: "外购4500",
    contractType: "长协",
  },
]);

const confirmOut = (item: any) => {
  console.log(item, "=====item");
};
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
      { value: "dongchen", text: "东辰" },
      { value: "hah", text: "哈哈" },
    ],
  },
  { prop: "trainNumber", label: "列车号", type: "input" },
  { prop: "trackStatus", label: "在轨信息", type: "picker" },
  { prop: "flow", label: "流向", type: "picker" },
  { prop: "user", label: "用户", type: "picker" },
  { prop: "coalType", label: "煤种", type: "picker" },
  {
    prop: "confirmOut",
    label: "重车出站确认",
    type: "button",
    handleClick: confirmOut,
  },
];

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

const footerOptions = [
  {
    text: "保存",
    type: "gray",
    icon: new URL("@/assets/icon/save.png", import.meta.url).href,
    handler: () => {
      console.log("save");
    },
  },
  {
    text: "提交",
    icon: new URL("@/assets/icon/circle_check.png", import.meta.url).href,
    handler: () => {
      console.log("submit");
    },
  },
];
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

        .van-field {
          position: relative;
          display: flex;
          align-items: center;
          :deep(.van-field__label) {
            color: #000;
            font-size: 0.9rem;
          }
          :deep(.van-field__value) {
            padding: 0.1rem 1rem;
            border-radius: 0.4rem;
            background-color: #ebebeb;
            .van-field__control {
              color: #808080;
            }
          }
          :deep(.van-cell__right-icon) {
            position: absolute;
            right: 1.2rem;
            transform: rotate(90deg);
          }
        }
        .btn-field {
          :deep(.van-field__value) {
            background-color: #a3cef1;
            border-radius: 1rem;
            text-align: center;
            .van-field__control {
              display: block;
              text-align: center;
              color: #000;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
    .form-card + .form-card {
      margin-top: 1rem;
    }

    .add-btn {
      margin: 1rem 0;
      background-color: #1989fa;
      color: #fff;
      padding: 0.1rem 1.5rem;
      border-radius: 1rem;
    }
    .confirm-out {
      width: 100%;
      font-size: 0.9rem;
      border-radius: 1rem;
      text-align: center;
      color: #000;
      background: #a3cef1;
    }
  }
}
</style>
<style>
.van-popover__content {
  max-width: 60vw;
  padding: 0.5rem;
  color: #808080;
}
</style>
