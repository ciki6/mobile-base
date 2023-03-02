<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">工作下发</div>
      </div>
      <div class="action-btns">
        <el-button type="info" :icon="Document" round @click="save"
          >保存</el-button
        >
        <el-button type="primary" :icon="CircleCheck" round @click="submit"
          >提交</el-button
        >
        <!--     
          :disabled="newRows.some((item) => item.new)" -->
      </div>
    </div>
    <el-card class="panel">
      <el-form :model="issuesData" label-width="80px" label-position="left">
        <el-form-item label="任务名称:">
          <el-input v-model="issuesData.name" />
        </el-form-item>
        <el-form-item label="任务等级:">
          <el-select v-model="issuesData.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          /></el-select>
        </el-form-item>
        <el-form-item label="开始时间:">
          <el-date-picker v-model="issuesData.start" type="datetime" />
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker v-model="issuesData.end" type="datetime" />
        </el-form-item>
        <el-form-item label="任务描述:">
          <el-input
            v-model="issuesData.description"
            type="textarea"
            :rows="5"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="插入附件:">
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
            <!-- <el-button type="primary">Click to upload</el-button> -->
            <el-icon size="20" style="margin-top: 5px"
              ><Paperclip color="rgb(64,158,255)"
            /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="参与者:">
          <!-- <el-input v-model="issuesData.description" /> -->
          <el-icon
            size="20"
            style="margin-top: 5px; cursor: pointer"
            @click="choosePeople"
            ><User color="rgb(64,158,255)"
          /></el-icon>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  CircleCheck,
  Document,
  ArrowLeftBold,
  Paperclip,
  User,
} from "@element-plus/icons-vue";

const router = useRouter();
const levelOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];
const issuesData = ref<any>({
  name: "",
  level: "",
  start: "",
  end: "",
  description: "",
  fileList: [],
  people: [],
});
const choosePeople = () => {};
const save = () => {};
const submit = () => {};
onMounted(() => {});
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
    height: 75vh;
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
  }
}
</style>
