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
          >下发</el-button
        >
        <!--     
          :disabled="newRows.some((item) => item.new)" -->
      </div>
    </div>
    <el-card class="panel">
      <el-form :model="issuesData" label-width="80px" label-position="left">
        <el-form-item
          v-for="item in issuesDataProps"
          :key="item.prop"
          :label="item.label + ':'"
        >
          <template v-if="!pageStatus">
            <el-input
              v-if="item.type === 'input'"
              v-model="issuesData[item.prop]"
            />
            <el-input
              v-if="item.type === 'textarea'"
              v-model="issuesData[item.prop]"
              :rows="item.row || 5"
              :resize="item.resize || 'none'"
            />
            <el-select
              v-if="item.type === 'select'"
              v-model="issuesData[item.prop]"
              placeholder="请选择"
            >
              <el-option
                v-for="optionItem in item.options"
                :key="optionItem.value"
                :label="optionItem.label"
                :value="optionItem.value"
              />
            </el-select>
            <el-date-picker
              v-if="item.type === 'datetime'"
              v-model="issuesData[item.prop]"
              type="datetime"
            />
            <el-upload
              v-if="item.type === 'upload'"
              v-model:file-list="issuesData[item.prop]"
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
            <template v-if="item.type === 'icon'">
              <el-icon
                :size="item.size || 20"
                style="margin-top: 5px; cursor: pointer"
                @click="item.btnFun"
                ><User color="rgb(64,158,255)"
              /></el-icon>
              <!-- 人员tag -->
            </template>
          </template>
          <template v-else>
            <div>{{ issuesData[item.prop] }}</div>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<!-- 

注意后续迭代把form内的template做成组件+v-model 方便维护

 -->
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

const pageStatus = ref(1); // 0 填写 1 查看 2 审核

const levelOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
];
const choosePeople = () => {};
const issuesDataProps: any[] = [
  {
    label: "任务名称",
    prop: "name",
    type: "input",
  },
  {
    label: "任务等级",
    prop: "level",
    type: "input",
    options: levelOptions,
  },
  {
    label: "开始时间",
    prop: "start",
    type: "datetime",
  },
  {
    label: "结束时间",
    prop: "end",
    type: "datetime",
  },
  {
    label: "任务描述",
    prop: "description",
    type: "textarea",
  },
  {
    label: "附件",
    prop: "fileList",
    type: "upload",
  },
  {
    label: "参与者",
    prop: "people",
    type: "icon",
    btnFun: choosePeople,
  },
];
const issuesData = ref<any>({
  name: "123",
  level: 1,
  start: "2022/12/31 12:00:00",
  end: "2022/12/31 12:00:00",
  description: "123",
  fileList: [],
  people: [],
});
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
