import {
  SET_LIVE_BASE_DATA,
} from 'store/mutationType';
import {
  getLiveBaseData,
  updateVisitor,
  addLiveMarquee,
  updateLiveMarquee,
  updateLiveBaseNotice,
  updateLiveBaseTopBanner,
} from 'api/base';

export default {
  state: {
    liveBaseData: {},
  },
  mutations: {
    [SET_LIVE_BASE_DATA](state, payload) {
      state.liveBaseData = payload;
    },
  },
  actions: {
    getLiveBaseData({
      commit,
      rootState,
    }) {
      const userToken = rootState.app.userInfo.userToken;
      return getLiveBaseData({
        userToken,
      }).then((res) => {
        if (res.result === '1' || res.result === 1) {
          commit(SET_LIVE_BASE_DATA, res);
        } else {
          console.log('[err]', res);
        }
      }, (err) => {
        console.log('[err]', err);
      });
    },
    updateVisitor({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateVisitor({
        ...payload,
        userToken,
      });
    },
    addLiveMarquee({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addLiveMarquee({
        ...payload,
        userToken,
      });
    },
    updateLiveMarquee({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateLiveMarquee({
        ...payload,
        userToken,
      });
    },
    updateLiveBaseNotice({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateLiveBaseNotice({
        ...payload,
        userToken,
      });
    },
    updateLiveBaseTopBanner({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateLiveBaseTopBanner({
        ...payload,
        userToken,
      });
    },
  },
  getters: {
    liveBaseData({
      liveBaseData,
    }) {
      return liveBaseData;
    },
  },
};
