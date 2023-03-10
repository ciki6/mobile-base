<template>
  <van-field
    v-model="dateText"
    :label="label"
    :name="name"
    :rules="rules"
    :label-width="labelWidth"
    :label-align="labelAlign"
    :input-align="inputAlign"
    right-icon="calendar-o"
    readonly
    @click="popShow = !popShow"
  />
  <van-popup v-model:show="popShow" round position="bottom">
    <van-date-picker
      v-model="date"
      title="选择日期"
      @cancel="popShow = !popShow"
      @confirm="onConfirm"
    />
  </van-popup>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
const props = defineProps({
  modelValue: { type: Array, default: [] },
  name: { type: String, default: "" },
  rules: { type: Array, default: [] },
  labelWidth: { type: String, default: "" },
  label: { type: String, default: "" },
  labelAlign: { type: String, default: "left" },
  inputAlign: { type: String, default: "left" },
});
const emit = defineEmits(["update:modelValue"]);
const dateText = ref("");
const popShow = ref(false);

const date = computed({
  get() {
    return props.modelValue;
  },
  set(val) {},
});

const onConfirm = ({ selectedValues }: any) => {
  dateText.value =
    selectedValues[0] +
    " 年 " +
    selectedValues[1] +
    " 月 " +
    selectedValues[2] +
    " 日";
  emit("update:modelValue", selectedValues);
  popShow.value = false;
};
onMounted(() => {});
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
