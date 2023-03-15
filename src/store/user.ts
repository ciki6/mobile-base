import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { getUserInfoFromICE, getUserInfoFromICEMock } from "../api/user";

export const userStore = defineStore("user", {
  state: () => {
    return {
      userId: "",
      username: "",
    };
  },
  actions: {
    async login(apptoken: string) {
      // const { data, ret } = await getUserInfoFromICE(apptoken);
      const { data, ret } = await getUserInfoFromICEMock(apptoken);
      console.log(data, ret);
      if (ret === 0 || ret === "0") {
        const username = data?.username;
        this.username = username;
        this.userId = data?.employee_num ?? "";
      } else {
        ElMessage.error(`调用ICE登录接口失败`);
        return Promise.reject("error");
      }
    },
  },
});
