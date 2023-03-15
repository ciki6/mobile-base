import request from "../util/request";
import { userStore } from "../store/user";
const userStoreState = userStore();

// 获取工作台快捷入口菜单
export const getAllMenuByUserId = () => {
  return request({
    url: "/getAllMenuByUserId",
    method: "get",
    params: { userId: userStoreState.userId },
  });
};

// 保存填报任务
export const saveFillData = (data: any, params: any) => {
  return request({
    url: `/fill/saveFillData`,
    method: "post",
    params: { ...params, userId: userStoreState.userId },
    data,
  });
};

// 提交填报任务
export const dispatchFillData = (data: any, params: any) => {
  return request({
    url: `/fill/dispatchFillData`,
    method: "post",
    params: { ...params, userId: userStoreState.userId },
    data,
  });
};

// 驳回填报任务
export const rejectFillData = (params: any) => {
  return request({
    url: `/fill/rejectFillData`,
    method: "post",
    params: { ...params, userId: userStoreState.userId },
  });
};

// 获取指定填报数据
export const getFillDetailByFillCode = (fillCode: string) => {
  return request({
    url: "/fill/getFillDetailByFillCode",
    method: "get",
    params: { fillCode, userId: userStoreState.userId },
  });
};

// 获取指定操作日志
export const getFillFlowByFillCode = (fillCode: string) => {
  return request({
    url: "/fill/getFillFlowByFillCode",
    method: "get",
    params: { fillCode },
  });
};
// 获取与当前用户相关的填报
export const getAllJoinFillDataByUserId = (params?: any) => {
  return request({
    url: "/fill/getAllJoinFillDataByUserId",
    method: "get",
    params: { userId: userStoreState.userId, ...(params || {}) },
  });
};

// 获取指定节点下的人员
interface getAllFillUsersByDepartMentModel {
  deptName: String;
  nodeId: String | Number;
  // userId: String | Number;
}
export const getAllFillUsersByDepartMent = (
  params: getAllFillUsersByDepartMentModel
) => {
  return request({
    url: "/getAllFillUsersByDepartMent",
    method: "get",
    params: { ...params, userId: userStoreState.userId },
  });
};

// 获取当前用户所需审批的数据填报
export const getAllFillDataByUserId = () => {
  return request({
    url: "/fill/getAllFillDataByUserId",
    method: "get",
    params: { userId: userStoreState.userId },
  });
};

// 保存在轨信息
export const onTrackInformationUpload = (data: any) => {
  return request({
    url: "/fill/onTrackInformationUpload",
    method: "post",
    data,
  });
};

// 保存节点用户
export const saveDataFillUserNode = (data: any) => {
  return request({
    url: "/fill/saveDataFillUserNode",
    method: "post",
    data: { userNodes: data, userId: userStoreState.userId },
  });
};

// 获取当前用户待完成和待审核的工作下发任务
export const findWorkDistributeFlowByUserId = () => {
  return request({
    url: "/work/findWorkDistributeFlowByUserId",
    method: "get",
    params: { userId: userStoreState.userId },
  });
};

// 获取数据上传的模板类型下拉框字典
export const getAlITemplateData = () => {
  return request({
    url: "/upLoad/getAllTemplateData",
    method: "get",
  });
};
// 上传excel数据填报文件
export const uploadAndParseExcelFile = (data: any) => {
  return request({
    headers: {
      "Content-Type": "multipart/form-data", // 传递图片 headers 里得这样写
    },
    url: `/upLoad/uploadAndParseExcelFile`,
    method: "post",
    data,
  });
};
