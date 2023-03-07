import { ref, watch, computed, onActivated, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { CircleCheck, Document, CircleClose } from "@element-plus/icons-vue";
export default () => {
  const route = useRoute();

  const pageStatus = computed(() => {
    console.log(route.query.pageStatus, "====route.query.pageStatus");
    return Number(route.query.pageStatus);
  });

  const title = computed(() =>
    pageStatus.value === 0
      ? "工作下发"
      : pageStatus.value === 1
      ? "xxx任务"
      : "xxx任务审核"
  );

  const issue = (issuesData: any) => {
    console.log(issuesData, "=====");
  };
  const btnList = ref<any>([]);

  onActivated(() => {
    if (pageStatus.value === 0) {
      btnList.value = [
        {
          btnText: "保存",
          type: "info",
          icon: shallowRef(Document),
          clickFunc: issue,
        },
        {
          btnText: "下发",
          type: "primary",
          icon: shallowRef(CircleCheck),
          clickFunc: issue,
        },
      ];
    } else if (pageStatus.value === 1) {
      btnList.value = [
        {
          btnText: "提交",
          type: "primary",
          icon: shallowRef(CircleCheck),
          clickFunc: issue,
        },
      ];
    } else if (pageStatus.value === 2) {
      btnList.value = [
        {
          btnText: "驳回",
          type: "info",
          icon: shallowRef(CircleClose),
          clickFunc: issue,
        },
        {
          btnText: "同意",
          type: "primary",
          icon: shallowRef(CircleCheck),
          clickFunc: issue,
        },
      ];
    }
  });
  return {
    title,
    pageStatus,
    btnList,
  };
};
