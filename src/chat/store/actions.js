import * as types from './mutation-types';
import API from '../api/API';
// import Cookies from 'js-cookie';
export default {
  [types.GET_LIVE_MAIN_DATA]({ commit }) {
    return new Promise((resolve, reject) => {
      API.GetLiveMainData({
        action: 'GetLiveMainData'
      })
        .then(res => {
          if (res && res.code === '0') {
            commit(types.GET_LIVE_MAIN_DATA, res);
            resolve();
          } else {
            reject(res.message);
          }
        })
        .catch(() => {
          reject('服务器请求失败');
        });
    });
  },
  [types.GET_LIVE_VIDEO_TYPE]({ commit }) {
    return new Promise((resolve, reject) => {
      API.GetLiveVideoType({
        action: 'GetLiveVideoType'
      })
        .then(res => {
          if (res && res.code === '0') {
            commit(types.GET_LIVE_VIDEO_TYPE, res);
            resolve();
          } else {
            reject(res.message);
          }
        })
        .catch(() => {
          reject('服务器请求失败');
        });
    });
  },
  [types.GET_LIVE_TEACHER_LIST]({ commit }) {
    API.GetLiveVideoType({
      action: 'GetLiveTeacherList'
    }).then(res => {
      commit(types.GET_LIVE_TEACHER_LIST, res);
    });
  },

  /**
   * 匿名用户注册登录
   */
  noUserRegister({ commit }) {
    return new Promise((resolve, reject) => {
      API.register({
        channelId: '1',
        packType: '0'
      })
        .then(res => {
          if (res && res.code === 0) {
            commit('setUserInfos', {
              niuguname: res.userInfo.nickName,
              niuguid: res.userInfo.userId,
              niugulogourl: res.userInfo.userLogoUrl,
              niugutoken: res.userInfo.userToken,
              roleid: res.userInfo.roleId,
              rolename: res.userInfo.roleName
            });
            API.RequestAddr({
              usertoken: res.userInfo.userToken
            })
              .then(_res => {
                /**
             * 设置聊天室地址
             */
                commit('setUserInfos', {
                  yxtoken: _res.accToken,
                  yxid: _res.accId,
                  roomaddr: _res.im_addr,
                  roomid: _res.roomId
                });
                resolve();
              })
              .catch(() => {
                reject('服务器错误');
              });
          } else {
            reject(res.message);
          }
        })
        .catch(err => {
          reject(`服务器错误${err}`);
        });
    });
  },

  /**
   * 用户注册
   */
  Reg({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.userregister({
        mobile: payload.mobile,
        code: payload.code,
        nickName: payload.nickName,
        password: payload.password
      })
        .then(res => {
          if (res && res.code === 0) {
            commit('setUserInfos', {
              niuguname: res.userInfo.nickName,
              niuguid: res.userInfo.userId,
              niugulogourl: res.userInfo.userLogoUrl,
              niugutoken: res.userInfo.userToken,
              roleid: res.userInfo.roleId,
              rolename: res.userInfo.roleName
            });
            API.RequestAddr({
              usertoken: res.userInfo.userToken
            })
              .then(_res => {
                /**
             * 设置聊天室地址
             */
                commit('setUserInfos', {
                  yxtoken: _res.accToken,
                  yxid: _res.accId,
                  roomaddr: _res.im_addr,
                  roomid: _res.roomId
                });
                resolve(res.userInfo);
              })
              .catch(() => {
                reject('服务器错误');
              });
          } else {
            reject(res.message);
          }
        })
        .catch(() => {
          reject('服务器错误');
        });
    });
  },

  /**
   * 获取直播日列表信息
   */
  GetLiveNoticeDay({ commit }) {
    API.GetLiveNoticeDay({
      action: 'GetLiveNoticeDay'
    }).then(res => {
      commit('setLiveNoticeDay', res);
    });
  },

  getLiveNoticePic({ commit }) {
    API.GetLiveNoticePic({
      action: 'GetLiveNoticePic'
    }).then(res => {
      commit('setNoticePic', res.NoticePic || '');
    });
  },
  /*
   * 获取历史消息
   * up加载历史数据
   * down加载最新数据
   */
  getChatHistoryMsg({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.getChatHistoryMsg({
        direction: payload.direction,
        order: payload.order,
        id: payload.id,
        usertoken: payload.usertoken,
        roomid: payload.roomid
      })
        .then(res => {
          if (res && res.code === 0 && payload.type === 'up') {
            console.log('up');
            commit('addUpMsgHistory', res.im_data);
            resolve();
          } else if (res && res.code === 0 && payload.type === 'down') {
            console.log('down');
            commit('addMsgHistory', res.im_data);
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  },

  /**
   * 获取聊天室地址
   */
  RequestAddr({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.RequestAddr({
        usertoken: payload
      })
        .then(res => {
          commit(types.GET_CHATROOM_ADDR, res);
        })
        .catch(() => {
          reject('服务器错误');
        });
    });
  },

  /**
   * 用户登录
   */
  Login({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      API.login({
        mobile: payload.mobile,
        password: payload.password
      })
        .then(res => {
          if (res && res.code === 0) {
            // 登录成功之后清楚游客定时器
            if (state.timer) {
              clearTimeout(state.timer);
            }
            commit('setUserInfos', {
              niuguname: res.userInfo.userName,
              niuguid: res.userInfo.userId,
              niugulogourl: res.userInfo.userLogoUrl,
              niugutoken: res.userInfo.userToken,
              roleid: res.userInfo.roleId,
              rolename: res.userInfo.roleName
            });
            API.RequestAddr({
              usertoken: res.userInfo.userToken
            })
              .then(_res => {
                /**
             * 设置聊天室地址
             */
                commit('setUserInfos', {
                  yxtoken: _res.accToken,
                  yxid: _res.accId,
                  roomaddr: _res.im_addr,
                  roomid: _res.roomId
                });
                resolve(res.userInfo);
              })
              .catch(() => {
                reject('服务器错误');
              });
          } else {
            reject(res.message);
          }
        })
        .catch(() => {
          reject('服务器错误');
        });
    });
  },

  // 根据游客token获取信息
  getYkInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.getYkInfo({
        usertoken: payload.usertoken,
        userid: 0
      })
        .then(res => {
          if (res && res.code === 0) {
            commit('setUserInfos', {
              niuguname: res.userInfo.nickName,
              niuguid: res.userInfo.userId,
              niugulogourl: res.userInfo.userLogoUrl,
              niugutoken: payload.usertoken,
              roleid: res.userInfo.roleId,
              rolename: res.userInfo.roleName
            });
            API.RequestAddr({
              usertoken: payload.usertoken
            })
              .then(_res => {
                /**
             * 设置聊天室地址
             */
                commit('setUserInfos', {
                  yxtoken: _res.accToken,
                  yxid: _res.accId,
                  roomaddr: _res.im_addr,
                  roomid: _res.roomId
                });
                resolve();
              })
              .catch(() => {
                reject('服务器错误');
              });
          } else {
            reject(res.message);
          }
        })
        .catch(() => {
          reject('服务器错误');
        });
    });
  },
  /**
   * 根据token获取用户信息
   */
  getUserInfoByToken({ commit }, payload) {
    return Promise.all([
      API.getUserInfo({
        usertoken: payload.usertoken,
        userid: 0
      }).then(res => {
        if (res && res.code === 0) {
          commit('setUserInfos', {
            niuguname: res.userInfo.nickName,
            niuguid: res.userInfo.userId,
            niugulogourl: res.userInfo.userLogoUrl,
            niugutoken: payload.usertoken,
            roleid: res.userInfo.roleId,
            rolename: res.userInfo.roleName
          });
          // Cookies.set('roleId', res.userInfo.roleId);
        }
      }),
      API.RequestAddr({
        usertoken: payload.usertoken
      }).then(_res => {
        /**
         * 设置聊天室地址
         */
        commit('setUserInfos', {
          yxtoken: _res.accToken,
          yxid: _res.accId,
          roomaddr: _res.im_addr,
          roomid: _res.roomId
        });
      })
    ]);
  },
  /**
   * 获取直播视频地址
   */
  getPlayLive({ commit }) {
    return new Promise((resolve, reject) => {
      API.getPlayLive({})
        .then(res => {
          console.log(res, 1010);
          if (res && res.code === 0 && res.data.length === 1) {
            commit('setVideoUrl', {
              type: 'zhibo',
              videoUrl: res.data[0].rtmpUrl,
              videolist: [],
              description: res.data[0].Description,
              title: res.data[0].Title
            });
            resolve();
          } else if (res && res.code === 0) {
            commit('setVideoUrl', {
              type: 'lubo',
              videoUrl: '',
              videolist: res.data
            });
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  },

  /**
   * 请求获取黑名单列表
   */
  getRoomBlockUser({ commit }) {
    return new Promise((resolve, reject) => {
      API.getRoomBlockUser({
        Id: '9072833'
      })
        .then(res => {
          if (res && res.code === 0) {
            commit('setHmd', res.data);
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  },
  // 禁言列表
  getLaHeiList({ commit }, usertoken) {
    return new Promise((resolve, reject) => {
      API.blackList({
        usertoken,
        page: 1,
        size: 10000,
        action: 'getblackpagelist'
      })
        .then(res => {
          if (res && res.code === 0) {
            commit('setLaHeiList', res.data);
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  },

  // 获取水军列表
  getRobot({ commit }, usertoken) {
    return new Promise((resolve, reject) => {
      API.getRobot({
        usertoken
      }).then(res => {
        if (res && res.result === 1) {
          res.data.map(item => {
            if (item.roleId === 0) {
              item.roleName = '游客';
            } else if (item.roleId === 1) {
              item.roleName = '学前班';
            } else if (item.roleId === -1) {
              item.roleName = '小学生';
            } else if (item.roleId === 2) {
              item.roleName = '中学生';
            } else if (item.roleId === 4) {
              item.roleName = '大学生';
            }
            return item;
          });
          commit('setSjdata', res.data);
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  // 添加水军
  addRobot({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      API.addRobot({
        ...payload
      }).then(res => {
        if (res && res.code === 0) {
          dispatch('getRobot', payload.usertoken);
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  // 删除水军
  delRobot({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.delRobot({
        ...payload
      }).then(res => {
        if (res && res.code === 0) {
          commit('delSjdata', payload.Id);
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  playMusic() {
    document.querySelector('#bgMusic').play();
  }
};
