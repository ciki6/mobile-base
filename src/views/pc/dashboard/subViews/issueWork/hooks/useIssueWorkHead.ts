import { ref, watch, computed, onMounted, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { CircleCheck, Document, CircleClose } from "@element-plus/icons-vue";
export default () => {
  const route = useRoute();

  const pageStatus = computed(() => {
    console.log(route.query.pageStatus, "====route.query.pageStatus");
    return route.query.pageStatus;
  });

  const id = computed(() => {
    console.log(route.query.id, "====route.query.pageStatus");
    return route.query.id || "";
  });

  const title = computed(() =>
    pageStatus.value === "add"
      ? "工作下发"
      : pageStatus.value === "fill"
      ? "xxx任务"
      : "xxx任务审核"
  );

  const issue = (feature: string, issuesData: any) => {
    console.log(feature, "=====", issuesData);
    if (pageStatus.value === "add") {
      if (feature === "save") {
      } else if (feature === "issue") {
      }
    } else if (pageStatus.value === "fill") {
      if (feature === "save") {
      } else if (feature === "submit") {
      }
    } else if (pageStatus.value === "process") {
      if (feature === "reject") {
      } else if (feature === "pass") {
      }
    }
  };
  const btnList = ref<any>([]);

  onMounted(() => {
    if (pageStatus.value === "add") {
      btnList.value = [
        {
          btnText: "保存",
          type: "info",
          icon: shallowRef(Document),
          clickFunc: (issuesData: any) => issue("save", issuesData),
        },
        {
          btnText: "下发",
          type: "primary",
          icon: shallowRef(CircleCheck),
          clickFunc: (issuesData: any) => issue("issue", issuesData),
        },
      ];
    } else if (pageStatus.value === "fill") {
      btnList.value = [
        {
          btnText: "保存",
          type: "info",
          icon: shallowRef(Document),
          clickFunc: (issuesData: any) => issue("save", issuesData),
        },
        {
          btnText: "提交",
          type: "primary",
          icon: shallowRef(CircleCheck),
          clickFunc: (issuesData: any) => issue("submit", issuesData),
        },
      ];
    } else if (pageStatus.value === "process") {
      btnList.value = [
        {
          btnText: "驳回",
          type: "info",
          icon: shallowRef(CircleClose),
          clickFunc: (issuesData: any) => issue("reject", issuesData),
        },
        {
          btnText: "同意",
          type: "primary",
          icon: shallowRef(CircleCheck),
          clickFunc: (issuesData: any) => issue("pass", issuesData),
        },
      ];
    }
  });
  return {
    title,
    pageStatus,
    btnList,
    id,
  };
};
