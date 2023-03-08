<template>
  <div class="container">
    <div class="title"><van-icon name="chat-o" size="1.3rem" />工作台</div>

    <div class="panel">
      <div class="panel-title">
        <div class="blue-badge"></div>
        <div class="title-text">快捷入口</div>
      </div>
      <van-divider :style="{ margin: '.1rem' }" />
      <van-grid
        :column-num="4"
        :border="false"
        :center="false"
        :gutter="6"
        icon-size="32px"
      >
        <van-grid-item
          v-for="item in quickEntranceData"
          :key="item.path"
          :to="item.path"
          :text="item.title"
        >
          <!-- @click="jump(item)" -->
          <template v-slot:icon>
            <img :src="item.icon" class="bashboardIcon" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="panel">
      <div class="panel-title">
        <div class="blue-badge"></div>
        <div class="title-text">数据审核</div>
      </div>
      <van-divider :style="{ margin: '.1rem' }" />
      <div class="panel-content">
        <div v-for="item in dataProcessList" :key="item.id" class="list-item">
          <img class="list-item-icon" :src="item.icon" />
          <div class="list-item-content">
            <div class="list-item-title">{{ item.title }}</div>
            <div class="list-item-time">{{ item.time }}</div>
          </div>
          <div class="list-item-participant">
            <img class="participant-icon" :src="item.participantIcon" />
            <div class="participant-name">{{ item.participant }}</div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">
        <div class="blue-badge"></div>
        <div class="title-text">工作下发（未完成）</div>
      </div>
      <van-divider :style="{ margin: '.1rem' }" />
      <div class="panel-content">
        <div
          v-for="item in unfinishedWorkList"
          :key="item.id"
          class="list-item"
        >
          <img class="list-item-icon" :src="item.icon" />
          <div class="list-item-content">
            <div class="list-item-title">{{ item.title }}</div>
            <div class="list-item-time">{{ item.time }}</div>
          </div>
          <div class="list-item-participant">
            <img class="participant-icon" :src="item.participantIcon" />
            <div class="participant-name">{{ item.participant }}</div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">
        <div class="blue-badge"></div>
        <div class="title-text">工作下发（待审核）</div>
      </div>
      <van-divider :style="{ margin: '.1rem' }" />
      <div class="panel-content">
        <div
          v-for="item in penddingApprovalList"
          :key="item.id"
          class="list-item"
        >
          <img class="list-item-icon" :src="item.icon" />
          <div class="list-item-content">
            <div class="list-item-title">{{ item.title }}</div>
            <div class="list-item-time">{{ item.time }}</div>
          </div>
          <div class="list-item-participant">
            <img
              class="participant-icon"
              :src="item.participantIcon || defaultPersonIcon"
            />
            <div class="participant-name">{{ item.participant }}</div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dataFillingIcon from "../../../assets/icon/dashboard_dataFilling.png";
import issueWork from "../../../assets/icon/dashboard_issueWork.png";
import dataOverview from "../../../assets/icon/dashboard_dataOverview.png";
import workIssueOverview from "../../../assets/icon/dashboard_workIssueOverview.png";
import fillingProcess from "../../../assets/icon/dashboard_fillingProcess.png";
import dataUpload from "../../../assets/icon/dashboard_dataUpload.png";
import trackStatus from "../../../assets/icon/dashboard_trackStatus.png";
import dataProcessIcon from "../../../assets/icon/dataProcessIcon.png";
import unfinishedWorkIcon from "../../../assets/icon/unfinishedWorkIcon.png";
import defaultPersonIcon from "../../../assets/icon/defaultPersonIcon.png";

const quickEntranceData = [
  {
    title: "数据填报",
    icon: dataFillingIcon,
    path: "/dataFilling",
  },
  {
    title: "在轨信息填报",
    icon: trackStatus,
    path: "/trackStatus",
  },
  {
    title: "数据上传",
    icon: dataUpload,
    path: "/dataUpload",
  },
  {
    title: "工作下发",
    icon: issueWork,
    path: "/issueWork",
  },
  {
    title: "数据填报总览",
    icon: dataOverview,
    path: "/dataOverview",
  },
  {
    title: "工作下发总览",
    icon: workIssueOverview,
    path: "/workIssueOverview",
  },
  {
    title: "填报流程",
    icon: fillingProcess,
    path: "/fillingProcess",
  },
];

const dataProcessList = ref([
  {
    id: 1,
    icon: dataProcessIcon,
    title: "监装站计划提报单",
    time: "2020/01/01",
    participantIcon: defaultPersonIcon,
    participant: "李四",
  },
  {
    id: 2,
    icon: dataProcessIcon,
    title: "监装站计划提报单",
    time: "2023/03/08",
    participantIcon: defaultPersonIcon,
    participant: "张三",
  },
  {
    id: 3,
    icon: dataProcessIcon,
    title: "监装站计划提报单",
    time: "2022/01/01",
    participantIcon: defaultPersonIcon,
    participant: "王五",
  },
]);

const unfinishedWorkList = ref([
  {
    id: 1,
    icon: unfinishedWorkIcon,
    title: "监装站计划提报单",
    time: "2020/01/01",
    participantIcon: defaultPersonIcon,
    participant: "李四",
  },
  {
    id: 2,
    icon: unfinishedWorkIcon,
    title: "监装站计划提报单",
    time: "2023/03/08",
    participantIcon: defaultPersonIcon,
    participant: "张三",
  },
  {
    id: 3,
    icon: unfinishedWorkIcon,
    title: "监装站计划提报单",
    time: "2022/01/01",
    participantIcon: defaultPersonIcon,
    participant: "王五",
  },
]);

const penddingApprovalList = ref([
  {
    id: 1,
    icon: unfinishedWorkIcon,
    title: "监装站计划提报单",
    time: "2020/01/01",
    participantIcon: defaultPersonIcon,
    participant: "李四",
  },
  {
    id: 2,
    icon: unfinishedWorkIcon,
    title: "监装站计划提报单",
    time: "2023/03/08",
    participantIcon: defaultPersonIcon,
    participant: "张三",
  },
  {
    id: 3,
    icon: unfinishedWorkIcon,
    title: "监装站计划提报单",
    time: "2022/01/01",
    participantIcon: defaultPersonIcon,
    participant: "王五",
  },
]);
const jump = (item: any) => {};
const active = ref(0);
const dataInput = () => {};
</script>

<style scoped lang="less">
.container {
  background-color: rgb(235, 235, 235);
  padding: 2% 4%;
  flex: 1;
  .title {
    font-weight: bolder;
    // font-family: "黑体";
    font-size: 1.3rem;
    margin: 0.5rem 0;
  }
  .panel + .panel {
    margin-top: 2%;
  }
  .panel {
    background-color: white;
    padding: 2%;
    border-radius: 2%;
    .panel-title {
      display: flex;
      align-items: center;
      padding-left: 0.3rem;
      margin: 0.2rem 0;
      .blue-badge {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.3rem;
        background-color: rgb(34, 122, 220);
        border-radius: 50%;
      }
      .title-text {
        font-weight: bolder;
        font-size: 1rem;
      }
    }
    :deep(.van-divider--hairline:before) {
      transform: scaleY(1.5);
    }
    .bashboardIcon {
      width: 100%;
    }
    .van-grid {
      padding: 0.5rem 0;
      :deep(.van-grid-item__content) {
        padding: 0.2rem 0.6rem;
        .van-grid-item__text {
          text-align: center;
          font-size: 0.8rem;
        }
        .van-badge__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .panel-content {
    padding: 0.5rem 0.5rem 0;
    .list-item + .list-item {
      border-top: 1px solid #909090;
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      &-icon {
        width: 2.5rem;
        margin-right: 0.5rem;
      }
      &-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .list-item-title {
          font-size: 1rem;
          color: #1f2f4d;
        }
        .list-item-time {
          font-size: 0.6rem;
          color: #808080;
        }
      }
      &-participant {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .participant-icon {
          width: 2rem;
        }
        .participant-name {
          font-size: 0.8rem;
          color: #1f2f4d;
        }
      }
    }
  }
}
</style>
