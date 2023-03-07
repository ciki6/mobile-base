import { onActivated, ref } from "vue";

export default (apiFunc?: Function) => {
  const choosePeople = () => {};
  const levelOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ];
  const issuesDataProps: any[] = [
    {
      label: "任务名称",
      prop: "name",
      type: "input",
      pageStatus: [0, 1, 2],
    },
    {
      label: "任务等级",
      prop: "level",
      type: "input",
      options: levelOptions,
      pageStatus: [0, 1, 2],
    },
    {
      label: "开始时间",
      prop: "start",
      type: "datetime",
      pageStatus: [0, 1, 2],
    },
    {
      label: "结束时间",
      prop: "end",
      type: "datetime",
      pageStatus: [0, 1, 2],
    },
    {
      label: "任务描述",
      prop: "description",
      type: "textarea",
      pageStatus: [0, 1, 2],
    },
    {
      label: "插入附件",
      prop: "fileList",
      type: "upload",
      pageStatus: [0],
    },
    {
      label: "附件列表",
      prop: "fileList",
      type: "upload",
      pageStatus: [1, 2],
    },
    {
      label: "参与者",
      prop: "people",
      type: "icon",
      btnFun: choosePeople,
      pageStatus: [0],
    },
  ];
  const issuesData = ref([]);
  onActivated(() => {
    console.log(111);
    if (apiFunc) {
      apiFunc().then((res: any) => {
        issuesData.value = res.data;
      });
    }
  });
  return {
    issuesDataProps,
    issuesData,
  };
};
