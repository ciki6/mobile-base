<template>
  <el-form :model="issuesData" label-width="100px" label-position="left">
    <el-form-item label="任务名称：" prop="name">
      <el-input v-model="issuesData.name" />
    </el-form-item>
    <el-form-item label="任务等级：" prop="level">
      <el-select v-model="issuesData.level" placeholder="请选择">
        <el-option
          v-for="optionItem in levelOptions"
          :key="optionItem.value"
          :label="optionItem.label"
          :value="optionItem.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="开始时间：" prop="startTime">
      <el-date-picker v-model="issuesData.startTime" type="datetime" />
    </el-form-item>
    <el-form-item label="结束时间：" prop="endTime">
      <el-date-picker v-model="issuesData.endTime" type="datetime" />
    </el-form-item>
    <el-form-item label="任务描述：" prop="taskDescription">
      <Editor v-model="issuesData.taskDescription" />
    </el-form-item>
    <el-form-item label="插入附件：" prop="fileList">
      <el-upload
        v-model:file-list="issuesData.fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <!--  :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="3"
              :on-exceed="handleExceed" -->
        <el-icon size="20" style="margin-top: 5px"
          ><Paperclip color="rgb(64,158,255)"
        /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="参与者：" prop="participant">
      <el-icon
        size="20"
        style="margin-top: 5px; cursor: pointer"
        @click="chooseParticipant"
        ><User color="rgb(64,158,255)"
      /></el-icon>
    </el-form-item>
    <!-- 人员tag -->
  </el-form>
</template>
<script lang="ts" setup>
import { Paperclip, User } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, defineProps, watch } from "vue";
import Editor from "./basicEditor.vue";

const emit = defineEmits(["update:modelValue"]);

const levelOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];
const issuesData = ref({
  name: "",
  level: "",
  startTime: "",
  endTime: "",
  taskDescription: "",
  fileList: [],
  participant: [],
});

const chooseParticipant = () => {};

watch(
  () => {
    return { ...issuesData.value };
  },
  (val) => {
    emit("update:modelValue", val);
    console.log(val);
  },
  { deep: true }
);
onMounted(() => {});
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
