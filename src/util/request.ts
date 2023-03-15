import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import router from "../router";
import config from "../config";
import { ElMessage } from "element-plus";
const { contentType, timeout, successCode } = config;
const handleCode = (code: number, msg: string) => {
  switch (code) {
    case 404:
      router.push("/404");
      break;
    case 403:
      router.push("/403");
      break;
    default:
      ElMessage.error(msg || `后端接口${code}异常`);
  }
};
const service: any = axios.create({
  timeout,
  baseURL: import.meta.env.VITE_HOST,
  headers: {
    "Content-Type": contentType,
  },
});
console.log(import.meta.env, "====import.meta.env");
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const user_store = userStore();
    // if (user_store.token && config.headers) {
    //   config.headers[tokenName] = `Bearer ${user_store.token}`;
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response;
    const { code, message } = data;
    return data;
    // const codeArray = Array.isArray(successCode)
    //   ? [...successCode]
    //   : [...[successCode]];
    // if (codeArray.includes(code)) {
    //   return data;
    // } else {
    //   handleCode(code, message);
    //   return Promise.reject(
    //     "请求返回结果异常拦截:" +
    //       JSON.stringify({ url: config.url, code, message }) || "Error"
    //   );
    // }
  },
  (error: any) => {
    const { response, message } = error;
    if (error?.response?.data) {
      const { status, data } = response;
      handleCode(status, data.message || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === "Network Error") {
        message = "后端接口异常";
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时";
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3);
        message = `后端接口${code}异常`;
      }
      ElMessage.error(message || "后端接口未知异常");
      return Promise.reject(error);
    }
  }
);
export default service;
