<template>
  <el-dialog
    v-model="dialogVisb"
    title="上传文件"
    :close-on-click-modal="false"
    @close="dialogVisb = false"
    width="30vw"
  >
    <div class="select">
      <div class="select-label">模板类型:</div>
      <el-select
        v-model="templateType"
        class="select-value"
        placeholder="请选择"
      >
        <el-option
          v-for="item in templateTypeOptions"
          :key="item.id"
          :label="item.tempName"
          :value="item.tempConfig"
        ></el-option>
      </el-select>
    </div>

    <el-upload
      v-model:file-list="fileList"
      ref="uploadRef"
      action="aa"
      multiple
      accept=".xls,.xlsx"
      :auto-upload="false"
      :on-change="handleUploadChange"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>

      <!-- <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template> -->
    </el-upload>

    <template #footer>
      <el-button type="primary" @click="uploadFiles"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits, watch } from "vue";
import { ElMessage, UploadInstance } from "element-plus";
import { uploadAndParseExcelFile, getAlITemplateData } from "@/api/dashboard";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);
const dialogVisb = computed({
  get() {
    return props.visible;
  },
  set(v) {
    emit("update:visible", v);
  },
});

// 下拉框字典
const templateTypeOptions = ref<any[]>([]);
watch(dialogVisb, (value) => {
  if (value) {
    getAlITemplateData().then((res: any) => {
      templateTypeOptions.value = res.data;
    });
  } else {
    fileList.value = [];
    templateType.value = "";
  }
});
const templateType = ref("");
const fileList = ref([]);

const uploadRef = ref<UploadInstance>();
const handleUploadChange = (param: any) => {
  console.log(param, "=====param");
  if (param.status === "ready" && param.percentage === 0) {
    if (!["xls", "xlsx"].includes(param.raw.name.split(".").slice(-1)[0])) {
      ElMessage.error("请上传正确的格式");
      fileList.value.pop();
    }
  }
};
const uploadFiles = () => {
  if (!templateType.value) {
    ElMessage.error("请选择模板类型");
    return;
  }
  Promise.all(
    fileList.value.map((item: any) => {
      const _file = item.raw;
      let formData = new FormData();
      formData.append("file", _file);
      formData.append("type", templateType.value);
      return uploadAndParseExcelFile(formData);
    })
  )
    .then((resArr: any[]) => {
      console.log(resArr, "=======");
      const indexArr: number[] = [];
      resArr.forEach((item: any, index: number) => {
        if (item.code != 200) {
          indexArr.push(index + 1);
        }
      });
      if (indexArr.length) {
        if (indexArr.length > 1) {
          ElMessage.error(
            `第${indexArr.join(",")}个文件上传失败，其余文件已上传成功`
          );
        } else {
          ElMessage.error("上传失败");
        }
      } else {
        ElMessage.success("上传成功！");
        fileList.value = [];
        templateType.value = "";
        dialogVisb.value = false;
      }
    })
    .catch((err: any) => {
      console.error(err);
    });
};
</script>

<style lang="less" scoped>
.select {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  &-label {
    margin-right: 10px;
  }
}
</style>
