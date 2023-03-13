import request from '../util/request';
import config from '../config/index';

export async function getUserList<T>() {
  return request({
    url: '/user/list',
    method: 'get',
  });
}

export async function getUserInfoFromICE<T>(apptoken: string) {
  return fetch(config.ICEURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
