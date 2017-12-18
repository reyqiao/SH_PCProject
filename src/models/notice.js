import {
  SET_LIVE_NOTICE_LIST, SET_LIVE_NOTICE_PIC,
} from 'store/mutationType';
import {
  getLiveNotice,
  addLiveNotice,
  deleteLiveNotice,
  addLiveNoticePic,
  getLiveNoticePic,
} from 'api/notice';

export default {
  state: {
    liveNoticeList: [],
    liveNoticePic: '',
  },
  mutations: {
    [SET_LIVE_NOTICE_LIST](state, payload) {
      state.liveNoticeList = payload;
    },
    [SET_LIVE_NOTICE_PIC](state, payload) {
      state.liveNoticePic = payload;
    },
  },
  actions: {
    getLiveNoticeList({
      commit,
      rootState,
    }) {
      const userToken = rootState.app.userInfo.userToken;
      getLiveNotice({
        userToken,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          commit(SET_LIVE_NOTICE_LIST, res.list);
        } else {
          console.log('[error]', res);
        }
      }, (err) => {
        console.log('[error]', err);
      });
    },
    addLiveNotice({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addLiveNotice({
        ...payload,
        userToken,
      });
    },
    deleteLiveNotice({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteLiveNotice({
        ...payload,
        userToken,
      });
    },
    addLiveNoticePic({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addLiveNoticePic({
        ...payload,
        userToken,
      });
    },
    getNoticePic({
      commit, rootState,
    }) {
      const userToken = rootState.app.userInfo.userToken;
      getLiveNoticePic({
        userToken,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          commit(SET_LIVE_NOTICE_PIC, res.NoticePic || '');
        } else {
          console.log('[error]', res);
        }
      }, (err) => {
        console.log('[error]', err);
      });
    },
  },
  getters: {
    liveNoticeList({
      liveNoticeList,
    }) {
      return liveNoticeList;
    },
    noticePic({
      liveNoticePic,
    }) {
      return liveNoticePic;
    },
  },
};
