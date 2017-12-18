import {
  // get,
  post,
} from './request';
import host from './host.js';

const liveHost = `${host}api/`;// 'https://live.fxtrade888.com/api/'; // 'https://shlive.niuguwang.com/api/';
/**
 * 用户登录接口
 */
export const login = (payload) => {
  const url = `${liveHost}LiveBaseDataApi.ashx?action=login`;
  return post(url, payload);
};

export const aa = '';
