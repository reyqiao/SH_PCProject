// 视频管理
import {
  get,
  post,
} from './request';
import host from './host.js';

const liveHost = `${host}api/`;

/**
 * 获取视频列表
 */
export const getLiveVideoList = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=GetLiveVideoList`;
  return get(url, payload);
};
/**
 * 添加视频栏目
 */
export const addLiveVideoType = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=AddiveVideoType`;
  return get(url, payload);
};
/**
 * 修改视频栏目
 */
export const updateLiveVideoType = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=UpdateLiveVideoType`;
  return get(url, payload);
};
/**
 * 删除视频栏目
 */
export const deleteLiveVideoType = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=DeleteLiveVideoType`;
  return get(url, payload);
};
/**
 * 添加视频
 */
export const addLiveVideo = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=AddiveVideo`;
  return post(url, payload);
};
/**
 * 删除视频
 */
export const deleteLiveVideo = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=DeleteLiveVideo`;
  return get(url, payload);
};
/**
 * 删除视频
 */
export const getLiveVideo = (payload) => {
  const url = `${liveHost}LiveVideoApi.ashx?action=GetLiveVideo`;
  return get(url, payload);
};
