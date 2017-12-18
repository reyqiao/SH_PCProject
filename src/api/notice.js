// 预告管理
import {
  get,
  post,
} from './request';
import host from './host.js';

const liveHost = `${host}api/`;
// const liveHost = 'https://live.fxtrade888.com/api/'; // 'https://shlive.niuguwang.com/api/';
/**
 * 获取直播预告列表
 */
export const getLiveNotice = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=GetLiveNotice`;
  return get(url, payload);
};
/**
 * 添加直播预告
 */
export const addLiveNotice = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=AddLiveNotice`;
  return get(url, payload);
};
/**
 * 删除直播预告
 */
export const deleteLiveNotice = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=DeleteLiveNotice`;
  return get(url, payload);
};

// 直播预告图片

export function addLiveNoticePic(payload) {
  return post(`${liveHost}LiveNoticeApi.ashx?action=AddLiveNoticePic`, payload);
}

export function getLiveNoticePic(payload) {
  return post(`${liveHost}LiveNoticeApi.ashx?action=GetLiveNoticePic`, payload);
}
