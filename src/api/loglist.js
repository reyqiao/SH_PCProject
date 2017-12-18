import qs from 'qs';
import {
  get,
  // post,
} from './request';
import host from './host.js';
/**
 * 获取登录登出列表
 * @param {*
 * source: 平台： 1 web 2 h5
 * nickName: 用户昵称
 * channelId: 渠道ID
 * addTime: 日期
 * } payload
 */
export function getOperationLog(payload) {
  return get(`${host}/api/getOperationLog.ashx`, payload);
}
/**
 * 导出登录登出日志
 * addTime: 日期
 * channelId: 渠道ID
 * nickName: 用户昵称
 * source: 平台:1 web 2 h5
 */
export function exportOperationLog(payload) {
  // return get(`${host}/api/operationLogDownload.ashx`, payload);
  window.open(`${host}/api/operationLogDownload.ashx?${qs.stringify(payload)}`);
}
