import request from "../util/request";
import config from "../config/index";

export async function getUserList<T>() {
  return request({
    url: "/user/list",
    method: "get",
  });
}

export async function getUserInfoFromICE<T>(apptoken: string) {
  return fetch(config.ICEURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apptoken,
      appid: config.ICEAPPID,
      oauth: 0,
    }),
  }).then((res: Response) => {
    return res.json();
  });
}

export const getUserInfoFromICEMock = () => {
  return request({
    url: "http://172.19.139.247:9999/bqt/getUserData",
    method: "get",
    params: {
      appToken: 1,
      appId: 2,
      oauth: 0,
    },
  });
};
