<template>
  <el-form :model="issuesData" label-width="100px" label-position="left">
    <el-form-item label="任务名称：" prop="name">
      <!-- <el-input v-model="issuesData.name" /> -->
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
      <Editor v-model="issuesData.taskDescription" />
    </el-form-item>
    <el-form-item label="附件：" prop="fileList">
      <template>
        <div v-for="item in issuesData.fileList">{{ (item as any).name }}</div>
      </template>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import Editor from "./basicEditor.vue";

const emit = defineEmits(["update:modelValue"]);

const issuesData = ref({
  name: "",
  level: "",
  startTime: "",
  endTime: "",
  taskDescription: "",
  fileList: [],
});

watch(
  () => {
    return { ...issuesData.value };
  },
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
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
