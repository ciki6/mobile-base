<template>
  <SubViewsHead :head-title-icon="titleIcon" />
  <div class="dashboard-container">
    <div class="filling-part">
      <van-form :model="fillingData" class="form-card">
        <van-cell-group inset>
          <template v-for="colItem in formProps" :key="colItem.prop">
            <van-field
              v-if="colItem.type === 'input'"
              v-model="fillingData[colItem.prop]"
              :label="colItem.label"
              :rules="colItem.rules"
              label-align="top"
              input-align="center"
            />
            <VanSelect
              v-else-if="colItem.type === 'picker'"
              v-model="fillingData[colItem.prop]"
              :columns="colItem.options"
              :label="colItem.label"
              :name="colItem.prop"
              label-align="top"
              input-align="center"
            />
            <DatePicker
              v-else-if="colItem.type === 'date'"
              v-model="fillingData[colItem.prop]"
              :label="colItem.label"
              :name="colItem.prop"
              label-align="top"
              input-align="center"
            />
            <van-field
              v-else-if="colItem.type === 'textarea'"
              v-model="fillingData[colItem.prop]"
              type="textarea"
              rows="4"
              :label="colItem.label"
              :rules="colItem.rules"
              label-align="top"
            />
            <van-field
              v-else-if="colItem.type === 'upload'"
              class="upload-field"
            >
              <template #label>
                {{ colItem.label }}
                <van-uploader>
                  <img class="upload-icon" :src="uploadIcon" />
                </van-uploader>
              </template>
            </van-field>
            <van-field
              v-else-if="colItem.type === 'chooseParticipants'"
              class="upload-field"
            >
              <template #label>
                {{ colItem.label }}
                <img class="upload-icon" :src="chooseParticipants" />
              </template>
            </van-field>
          </template>
        </van-cell-group>
      </van-form>
    </div>
  </div>
  <SubViewsFooter :btns-options="footerOptions" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import moment from "moment";

import SubViewsHead from "../../components/subViewsHead.vue";
import SubViewsFooter from "../../components/subViewsFooter.vue";
import VanSelect from "../../../../../components/vanSelect.vue";
import DatePicker from "../../../../../components/datePicker.vue";

import titleIcon from "@/assets/icon/icon_????????????.png";
import uploadIcon from "@/assets/icon/upload-icon.png";
import chooseParticipants from "@/assets/icon/choose-participants.png";
const date = moment().format("YYYY/MM/DD");
const fillingData = ref<any>({
  id: 1,
  taskName: "xxxx",
  taskLevel: "1",
  startTime: ["2022", "03", "01"],
  endTime: ["2022", "03", "02"],
});
const formProps = [
  {
    prop: "taskName",
    label: "????????????",
    type: "input",
  },
  {
    prop: "taskLevel",
    label: "????????????",
    type: "picker",
    options: [
      { value: "1", text: "??????" },
      { value: "2", text: "??????" },
    ],
  },
  { prop: "startTime", label: "????????????", type: "date" },
  { prop: "endTime", label: "????????????", type: "date" },
  { prop: "description", label: "??????????????????", type: "textarea" },
  { prop: "fileList", label: "????????????", type: "upload" },
  { prop: "participants", label: "?????????", type: "chooseParticipants" },
];

const footerOptions = [
  {
    text: "??????",
    type: "gray",
    icon: new URL("@/assets/icon/save.png", import.meta.url).href,
    handler: () => {
      console.log("save");
    },
  },
  {
    text: "??????",
    icon: new URL("@/assets/icon/circle_check.png", import.meta.url).href,
    handler: () => {
      console.log("submit");
    },
  },
];
onMounted(() => {});
</script>
<style lang="less" scoped>
.dashboard-container {
  padding: 2% 4%;

  .filling-part {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-card {
      width: 100%;
      .van-cell-group--inset {
        margin: 0;
        .van-field {
          position: relative;

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
            // transform: rotate(90deg);
          }
        }
        .upload-field {
          :deep(.van-field__value) {
            background-color: #fff;
          }
          :deep(.van-field__label) {
            display: flex;
            align-items: center;
            white-space: nowrap;
            .van-uploader__input-wrapper {
              display: flex;
              align-items: center;
            }
          }
          .upload-icon {
            width: 1rem;
            margin-left: 0.5rem;
          }
        }
      }
    }
    .form-card + .form-card {
      margin-top: 1rem;
    }
  }
}
</style>
