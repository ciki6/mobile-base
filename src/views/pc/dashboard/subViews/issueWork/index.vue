<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">{{ title }}</div>
      </div>
      <div class="action-btns">
        <el-button
          v-for="item in btnList"
          :type="item.type"
          :icon="item.icon"
          round
          @click="item.clickFunc(issuesData)"
          >{{ item.btnText }}</el-button
        >
        <!-- <el-button type="primary" :icon="CircleCheck" round @click="submit"
          >下发</el-button
        > -->
        <!--     
          :disabled="newRows.some((item) => item.new)" -->
      </div>
    </div>
    <el-card class="panel">
      <AddWork v-if="pageStatus === 'add'" v-model="issuesData" />
      <FillWork v-if="pageStatus === 'fill'" v-model="issuesData" />
      <ProcessWork v-if="pageStatus === 'process'" :modelValue="issuesData" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import useIssueWorkHead from "./hooks/useIssueWorkHead";
import AddWork from "./components/addWork.vue";
import FillWork from "./components/fillWork.vue";
import ProcessWork from "./components/processWork.vue";
const router = useRouter();
const { title, pageStatus, btnList, id } = useIssueWorkHead();
const issuesData = ref({
  name: "",
  level: "",
  startTime: "",
  endTime: "",
  taskDescription: "",
  fileList: [],
  participant: [],
});

onMounted(() => {
  if (id) {
    // 查询数据
  }
});
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
  }
}
</style>
