import request from '../util/request';

export async function getUserList<T>() {
  return request({
    url: '/user/list',
    method: 'get',
  });
}
