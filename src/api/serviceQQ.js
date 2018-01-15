// 客服QQ管理
import {
    get,
    post,
  } from './request';
import host from './host.js';
  
const liveHost = `${host}api/`;
 /**
  * 修改客服排班 
  */
export const getQQSchedule = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=getQQSchedule`;
  return get(url, payload);   
};
export const getQQScheduleById = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=getQQScheduleById`;
  return get(url, payload);   
};
 /**
  * 修改客服排班 
  */
export const addQQSchedule = (payload) => {
  return post(`${liveHost}LiveNoticeApi.ashx?action=addQQSchedule`, payload);
};
 /**
  * 删除客服排班 
  */
export const deleteQQSchedule = (payload) => {
  return post(`${liveHost}LiveNoticeApi.ashx?action=deleteQQSchedule`, payload);
};
 /**
  * 修改客服排班 
  */
export const updateQQSchedule = (payload) => {
  return post(`${liveHost}LiveNoticeApi.ashx?action=updateQQSchedule`, payload);
};
 /**
  * 更新客服QQ群组 
  */
export const addQQGrpups = (payload) => {
  return post(`${liveHost}LiveNoticeApi.ashx?action=addQQGrpups`, payload);
};
 /**
  * 更新客服QQ群组 
  */
export const getQQGrpups = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=getQQGrpups`;
  return get(url, payload);   
};
export const getQQGrpupById = (payload) => {
  const url = `${liveHost}LiveNoticeApi.ashx?action=getQQGrpupById`;
  return get(url, payload);   
};
 /**
  * 删除客服QQ群组 
  */
export const deleteQQGrpups = (payload) => {
  return post(`${liveHost}LiveNoticeApi.ashx?action=deleteQQGrpups`, payload);
};
 /**
  * 更新客服QQ群组 
  */
export const updateQQGrpups = (payload) => {
  return post(`${liveHost}LiveNoticeApi.ashx?action=updateQQGrpups`, payload);
};
  