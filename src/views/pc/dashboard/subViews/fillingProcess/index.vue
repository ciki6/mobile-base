<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">填报流程</div>
      </div>
    </div>
    <el-card class="panel">
      <svg width="100%" height="100%"></svg>
    </el-card>
    <el-dialog
      v-model="choosePeopleVisb"
      :title="choosePeopleTitle"
      :close-on-click-modal="false"
      width="20vw"
      @close="handleDialogClose"
    >
      <el-scrollbar height="400px">
        <div class="checkbox-group">
          <el-checkbox
            v-for="item in (personList as any[])"
            v-model="item.pick"
            :label="item.userName"
            size="large"
          />
        </div>
      </el-scrollbar>
      <template #footer>
        <el-button
          v-if="personList.length > 0"
          type="primary"
          @click="confirmChoose"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDrawProcess } from "./useDrawProcess";
import { saveDataFillUserNode } from "@/api/dashboard";
const router = useRouter();

const { choosePeopleVisb, choosePeopleTitle, personList, currentNodeId } =
  useDrawProcess();
const confirmChoose = () => {
  console.log(personList.value, "===confirmChoose");
  const data = {
    nodeId: currentNodeId.value,
    userId: personList.value
      .filter((item: any) => item.pick)
      .map((item: any) => item.userId)
      .join(","),
  };
  saveDataFillUserNode(data).then((res: any) => {
    console.log(res);
  });
};
const handleDialogClose = () => {
  // 清空树选择
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  padding: 0 8%;
  background-color: #e6e5e9;
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
    height: 70vh;
    :deep(.el-card__body) {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0;
    }
  }
}
.checkbox-group {
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
