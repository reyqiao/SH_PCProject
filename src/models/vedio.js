import {
  SET_LIVE_VIDEO_TYPE_LIST,
  SET_TOTAL_LIVE_VIDEO_LIST,
  SET_LIVE_VIDEO_LIST,
} from 'store/mutationType';
import {
  getLiveVideoList,
  addLiveVideoType,
  updateLiveVideoType,
  deleteLiveVideoType,
  addLiveVideo,
  deleteLiveVideo,
  getLiveVideo,
} from 'api/video';

export default {
  state: {
    liveVideoTypeList: [],
    liveVideoList: [],
    totalLiveVideoList: [],
  },
  mutations: {
    [SET_LIVE_VIDEO_TYPE_LIST](state, payload) {
      state.liveVideoTypeList = payload;
    },
    [SET_TOTAL_LIVE_VIDEO_LIST](state, payload) {
      state.totalLiveVideoList = payload;
    },
    [SET_LIVE_VIDEO_LIST](state, payload) {
      state.liveVideoList = payload;
    },
  },
  actions: {
    getLiveVideoList({
      commit,
      rootState,
    }) {
      const userToken = rootState.app.userInfo.userToken;
      return getLiveVideoList({
        userToken,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          commit(SET_LIVE_VIDEO_TYPE_LIST, res.VideoType);
          commit(SET_TOTAL_LIVE_VIDEO_LIST, res.file);
          commit(SET_LIVE_VIDEO_LIST, res.Video);
        } else {
          console.log('[error]', res);
        }
      }, (err) => {
        console.log('[error]', err);
      });
    },
    addLiveVideoType({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addLiveVideoType({
        ...payload,
        userToken,
      });
    },
    updateLiveVideoType({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateLiveVideoType({
        ...payload,
        userToken,
      });
    },
    deleteLiveVideoType({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteLiveVideoType({
        ...payload,
        userToken,
      });
    },
    addLiveVideo({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addLiveVideo({
        ...payload,
        userToken,
      });
    },
    deleteLiveVideo({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteLiveVideo({
        ...payload,
        userToken,
      });
    },
    getLiveVideo({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return getLiveVideo({
        ...payload,
        userToken,
      });
    },
  },
  getters: {
    liveVideoList({
      liveVideoList,
    }) {
      return liveVideoList;
    },
    liveVideoTypeList({
      liveVideoTypeList,
    }) {
      return liveVideoTypeList;
    },
    totalLiveVideoList({
      totalLiveVideoList,
    }) {
      return totalLiveVideoList;
    },
  },
};
