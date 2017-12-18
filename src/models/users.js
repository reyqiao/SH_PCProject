import {
  SET_SILENCE_LIST,
  SET_BLACK_LIST,
  SET_VIP_LIST,
  USER_LEVEL_LIST,
  ROLE_LIST,
  SET_CHANNEL_LIST,
} from 'store/mutationType';
import {
  getLiveUser,
  deleteLiveUser,
  getUserLevel,
  getRole,
  disableLevelUser,
  deleteLevelUser,
  resetLevelUser,
  resetLevelRole,
  loadBlackList,
  delBlack,
  getRoomBlockUser,
  delSilence,
  modifyNickname,
} from 'api/users';

export default {
  state: {
    silenceList: {
      list: [],
      totalcount: 0,
    },
    blackList: {
      list: [],
      totalcount: 0,
    },
    vipList: {
      list: [],
      totalcount: 0,
    },
    userLevelList: {
      list: [],
      totalcount: 0,
    },
    roleList: [],
    channelList: [],
  },
  mutations: {
    [SET_SILENCE_LIST](state, payload) {
      state.silenceList = payload;
    },
    /**
     * 设置黑名单
     */
    [SET_BLACK_LIST](state, payload) {
      state.blackList = payload;
    },
    /**
     * 设置会员列表
     */
    [SET_VIP_LIST](state, payload) {
      state.vipList = payload;
    },

    [USER_LEVEL_LIST](state, payload) {
      state.userLevelList = payload;
    },

    [ROLE_LIST](state, payload) {
      state.roleList = payload;
    },
    [SET_CHANNEL_LIST](state, payload) {
      state.channelList = payload;
    }
  },
  actions: {
    /**
     * 获取禁言列表
     * type 1禁言，2黑名单，3会员
     */
    getSilenceList({
      commit,
    }) {
      // const userToken = rootState.app.userInfo.userToken;
      return getRoomBlockUser({
        Id: 9072833,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          commit(SET_SILENCE_LIST, {
            list: res.data,
            // totalcount: res.totalcount,
          });
        } else {
          console.log('[error]', res);
        }
      }, (err) => {
        console.log('[error]', err);
      });
    },
    getBlackList({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return loadBlackList({
        page: payload.pageindex,
        size: payload.pagesize,
        usertoken: userToken,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          commit(SET_BLACK_LIST, {
            list: res.data,
            totalcount: window.parseInt(res.totalcount, 10),
          });
        }
        return res;
      });
      // return getLiveUser({
      //   ...payload,
      //   type: 2,
      //   userToken,
      // }).then((res) => {
      //   if (res.result === 1 || res.result === '1') {
      //     commit(SET_BLACK_LIST, {
      //       list: res.list,
      //       totalcount: res.totalcount,
      //     });
      //   } else {
      //     console.log('[error]', res);
      //   }
      // }, (err) => {
      //   console.log('[error]', err);
      // });
    },
    getVipList({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return getLiveUser({
        ...payload,
        type: 3,
        userToken,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          commit(SET_VIP_LIST, {
            list: res.list,
            totalcount: res.totalcount,
          });
        } else {
          console.log('[error]', res);
        }
      }, (err) => {
        console.log('[error]', err);
      });
    },
    deleteLiveUser({
      commit,
      rootState,
    }, payload) {
      const usertoken = rootState.app.userInfo.userToken;
      return deleteLiveUser({
        ...payload,
        usertoken,
      });
    },
    deleteBackUser({
      commit,
      rootState,
    }, payload) {
      const usertoken = rootState.app.userInfo.userToken;
      return delBlack({
        ...payload,
        usertoken
      });
    },
    deleteSilenceUser({
      commit,
      rootState,
    }, payload) {
      const usertoken = rootState.app.userInfo.userToken;
      return delSilence({
        ...payload,
        roomId: 9072833,
        usertoken,
      });
    },
    getUserLevelList({ commit, rootState }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return getUserLevel({ ...payload, userToken }).then((res) => {
        if (res.code === '0') {
          commit(USER_LEVEL_LIST, {
            list: res.list,
            totalcount: window.parseInt(res.totalcount, 10),
          });
          commit(SET_CHANNEL_LIST, res.channelList);
        }
      });
    },
    getRoleList({ commit, rootState }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return getRole({ ...payload, userToken }).then((res) => {
        if (res.code === '0') {
          commit(ROLE_LIST, res.list);
        }
      });
    },
    deleteLevel({ commit, rootState }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteLevelUser({ ...payload, userToken });
    },
    disableLevel({ commit, rootState }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return disableLevelUser({ ...payload, userToken });
    },
    resetLevel({ commit, rootState }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return resetLevelUser({ ...payload, userToken });
    },
    resetRole({ commit, rootState }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return resetLevelRole({ ...payload, userToken });
    },
    modifyNickname({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return modifyNickname({
        ...payload,
        userToken,
      });
    }
  },
  getters: {
    silenceList({
      silenceList,
    }) {
      return silenceList;
    },
    blackList({
      blackList,
    }) {
      return blackList;
    },
    vipList({
      vipList,
    }) {
      return vipList;
    },
    levelList({ userLevelList }) {
      return userLevelList;
    },
    roleList({ roleList }) {
      return roleList;
    },
    levelChannelList({
      channelList,
    }) {
      return channelList;
    }
  },
};
