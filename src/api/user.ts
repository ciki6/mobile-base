import request from '../util/request';
import config from '../config/index';

export async function getUserList<T>() {
  return request({
    url: '/user/list',
    method: 'get',
  });
}

export async function getUserInfoFromICE<T>() {
  return fetch(config.ICEURL).then((res: Response) => {
    return res.json();
  });
}
