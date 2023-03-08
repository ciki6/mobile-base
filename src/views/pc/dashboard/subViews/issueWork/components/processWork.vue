<template>
  <el-form :model="issuesData" label-width="100px" label-position="left">
    <el-form-item label="任务名称：" prop="name">
      <div>{{ issuesData.name }}</div>
    </el-form-item>
    <el-form-item label="任务等级：" prop="level">
      <div>{{ issuesData.level }}</div>
    </el-form-item>
    <el-form-item label="开始时间：" prop="startTime">
      <div>{{ issuesData.startTime }}</div>
    </el-form-item>
    <el-form-item label="结束时间：" prop="endTime">
      <div>{{ issuesData.endTime }}</div>
    </el-form-item>
    <el-form-item label="任务描述：" prop="taskDescription">
      <div v-html="issuesData.taskDescription"></div>
    </el-form-item>
    <el-form-item label="附件：" prop="fileList">
      <template>
        <div v-for="item in issuesData.fileList" @click="downloadFile">
          {{ (item as any).name }}
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineProps, defineEmits, watch, computed } from "vue";

const props = defineProps({
  modelValue: { required: true },
});

const issuesData = computed(() => {
  console.log(11111, "======");
  return props.modelValue as any;
});

const downloadFile = () => {};
</script>
<style lang="less" scoped>
.el-input,
.el-select {
  width: 300px;
}
.el-textarea {
  width: 50%;
}
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: 300px;
  .el-input__wrapper {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
