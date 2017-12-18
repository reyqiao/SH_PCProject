import {
  get,
  post,
} from './request';
import host from './host.js';

const liveHost = `${host}api/`;

// const liveHost = 'https://live.fxtrade888.com/api/'; // 'https://shlive.niuguwang.com/api/';
// 用户管理
/**
 * 获取用户列表
 */
export const getLiveUser = (payload) => {
  const url = `${liveHost}LiveUserApi.ashx?action=GetLiveUser`;
  return get(url, payload);
};
/**
 * 用户解禁、解除、转永久会员
 */
export const deleteLiveUser = (payload) => {
  const url = `${liveHost}LiveUserApi.ashx?action=DeleteLiveUser`;
  return get(url, payload);
};

// 用户级别列表
export const getUserLevel = payload => get(`${liveHost}LiveUserLevelApi.ashx?action=getlist`, payload);

// 权限列表
export const getRole = payload => get(`${liveHost}LiveUserLevelApi.ashx?action=getrolelist`, payload);

// 禁言用户
export const disableLevelUser = payload => get(`${liveHost}LiveUserLevelApi.ashx?action=setdisable`, payload);

// 删除用户
export const deleteLevelUser = payload => get(`${liveHost}LiveUserLevelApi.ashx?action=delete`, payload);

// 重置密码
export const resetLevelUser = payload => get(`${liveHost}LiveUserLevelApi.ashx?action=resetpassword`, payload);

// 设置级别
export const resetLevelRole = payload => get(`${liveHost}LiveUserLevelApi.ashx?action=resetrole`, payload);

/**
 * 黑名单列表
 * @param
 * usertoken:操作人usertoken
 * page: 页码
 * size:每页数量
 * action: getblackpagelist
 * @returns 
 * {
   "action": "getblackpagelist",
    "code": 0,
    "message": "",
    "result": 1,
    "totalcount": "4", //总数
    "data": [
    {
    "userid": "11",   //用户ID
    "nickName": "kefu"   //用户昵称
    },
  ]
  } 
  */
export function loadBlackList(arg) {
  return get(`${liveHost}LiveMesMag.ashx?action=getblackpagelist`, arg);
}
/**
 * 删除禁言
 * @param
 * usertoken:操作人usertoken
 * uid:被删除人
 * action:deleteblacklist
 * @return 
 * {"result":"1","code":"0||-1","action":"deleteblacklist","message":"删除成功"}
 */
export function delBlack(arg) {
  return get(`${liveHost}LiveMesMag.ashx?action=deleteblacklist`, arg);
}
/**
* 取当前房间所有黑名单用户
*/
export function getRoomBlockUser(arg) {
  return post(`${host}/chatroom/chartroom/GetRoomBlockUser`, arg);
}

/**
   * 移除黑名单
   */
export function delSilence(arg) {
  return post(`${host}/chatroom/chartroom/RemoveBlockUser`, arg);
}
/**
 * 修改昵称
 * @param {*
 * userid: 用户id
 * nickname: 昵称
 * } arg
 */
export function modifyNickname(arg) {
  return post(`${host}/api/LiveUserLevelApi.ashx?action=modifynickname`, arg);
}
