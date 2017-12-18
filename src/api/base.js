import {
  get,
  post,
} from './request';
import host from './host.js';

const liveHost = `${host}api/`;

// const liveHost = 'https://live.fxtrade888.com/api/'; // 'https://shlive.niuguwang.com/api/';
// 直播间基本管理
/**
 * 获取直播基础数据
 */
export const getLiveBaseData = (payload) => {
  const url = `${liveHost}LiveBaseDataApi.ashx?action=GetLiveBaseData`;
  // return fetch(url).then(response => response.json());
  return get(url, payload);
};
/**
 * 游客模式开启与关闭
 */
export const updateVisitor = (payload) => {
  // const url = `${liveHost}LiveBaseDataApi.ashx?action=UpdateVisitor&${qs.stringify(payload)}`;
  // return fetch(url).then(response => response.json());
  const url = `${liveHost}LiveBaseDataApi.ashx?action=UpdateVisitor`;
  return get(url, payload);
};
/**
 * 添加跑马灯
 */
export const addLiveMarquee = (payload) => {
  const url = `${liveHost}LiveBaseDataApi.ashx?action=AddLiveMarquee`;
  return get(url, payload);
};
/**
 * 删除跑马灯
 */
export const updateLiveMarquee = (payload) => {
  const url = `${liveHost}LiveBaseDataApi.ashx?action=UpdateLiveMarquee`;
  return get(url, payload);
};
/**
 * 更新直播间公告
 */
export const updateLiveBaseNotice = (payload) => {
  const url = `${liveHost}LiveBaseDataApi.ashx?action=UpdateLiveBaseNotice`;
  return get(url, payload);
};
/**
 * 更新直播间顶部banner
 */
export const updateLiveBaseTopBanner = (payload) => {
  const url = `${liveHost}LiveBaseDataApi.ashx?action=UpdateLiveBaseTopBanner`;
  return post(url, payload);
};
