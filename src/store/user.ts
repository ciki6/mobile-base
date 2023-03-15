import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { getUserInfoFromICE, getUserInfoFromICEMock } from "../api/user";

export const userStore = defineStore("user", {
  state: () => {
    return {
      userId: "",
      userName: "",
    };
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userId = userInfo.userId;
      this.userName = userInfo.userName;
    },
    async login(apptoken: string) {
      let res: any = {};
      if (import.meta.env.MODE === "development") {
        res = await getUserInfoFromICEMock();
      } else {
        res = await getUserInfoFromICE(apptoken);
      }
      const { data, ret } = res;
      console.log(data, ret);
      if (ret === 0 || ret === "0") {
        const userName = data?.userName;
        this.userName = userName;
        this.userId = data?.employee_num ?? "";
        sessionStorage.setItem("userId", this.userId);
        sessionStorage.setItem("userName", this.userName);
      } else {
        ElMessage.error(`调用ICE登录接口失败`);
        return Promise.reject("error");
      }
    },
  },
});
