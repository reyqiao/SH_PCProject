import {
  get,
  post,
} from './request';
import host from './host.js';

const liveHost = `${host}api/`;

// 老师介绍管理
/**
 * 根据Id获取老师编辑信息
 */
export const getLiveTeacher = (payload) => {
  const url = `${liveHost}LiveTeacherApi.ashx?action=GetLiveTeacher`;
  return get(url, payload);
};
/**
 * 获取老师列表
 */
export const getLiveTeacherList = (payload) => {
  const url = `${liveHost}LiveTeacherApi.ashx?action=GetLiveTeacherList`;
  return get(url, payload);
};
/**
 * 添加老师介绍
 */
export const addLiveTeacher = (payload) => {
  const url = `${liveHost}LiveTeacherApi.ashx?action=AddLiveTeacher`;
  return post(url, payload);
};
/**
 * 编辑老师介绍
 */
export const updateLiveTeacher = (payload) => {
  const url = `${liveHost}LiveTeacherApi.ashx?action=UpdateLiveTeacher`;
  return post(url, payload);
};
/**
 * 删除老师
 */
export const deleteLiveTeacher = (payload) => {
  const url = `${liveHost}LiveTeacherApi.ashx?action=DeleteLiveTeacher`;
  return get(url, payload);
};
