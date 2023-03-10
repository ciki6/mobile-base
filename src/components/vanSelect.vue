<template>
  <div>
    <van-field
      v-model="selectedText"
      :label="label"
      :name="name"
      :rules="rules"
      :label-width="labelWidth"
      :label-align="labelAlign"
      :input-align="inputAlign"
      is-link
      readonly
      arrow-direction="down"
      @click="popShow = !popShow"
    >
    </van-field>
    <van-popup v-model:show="popShow" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="popShow = !popShow"
        @confirm="onConfirm"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "", required: true },
  columns: { type: Array, default: [] },
  name: { type: String, default: "" },
  rules: { type: Array, default: [] },
  labelWidth: { type: String, default: "" },
  label: { type: String, default: "" },
  labelAlign: { type: String, default: "left" },
  inputAlign: { type: String, default: "left" },
});

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  nextTick(() => {
    reShow();
  });
});

const popShow = ref(false);
const selectedText = ref("");
const selectedValue = ref("");
const onConfirm = ({ selectedOptions }: any) => {
  selectedText.value = selectedOptions[0]?.text;
  selectedValue.value = selectedOptions[0]?.value;
  popShow.value = false;
};
// 回显
const reShow = () => {
  if (props.modelValue) {
    selectedText.value =
      (
        props.columns.find(
          (item: any) => item.value === props.modelValue
        ) as any
      )?.text ?? "";
    // console.log(props.modelValue, selectedText, "=====selectedText");
  }
};
watch(selectedValue, (newVal, oldVal) => {
  emit("update:modelValue", newVal);
});

watch(
  () => props.columns,
  (newVal, oldVal) => {
    //处理异步数据回显
    reShow();
  }
);
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    //处理异步数据回显
    reShow();
  }
);
</script>
<style lang="less" scoped>
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
  }
}
.van-field--label-top {
  :deep(.van-cell__right-icon) {
    top: 2.5rem;
  }
}
</style>
