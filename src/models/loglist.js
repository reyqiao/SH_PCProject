import {
  getOperationLog,
  exportOperationLog,
} from 'api/loglist';

const SET_CHANNEL_LIST = 'SET_CHANNEL_LIST';
const SET_LOG_LIST = 'SET_LOG_LIST';
const SET_LOG_TOTAL = 'SET_LOG_TOTAL';

export default {
  state: {
    logList: [],
    channelList: [],
    logTotal: 0,
  },
  mutations: {
    [SET_LOG_LIST](state, payload) {
      state.logList = payload;
    },
    [SET_LOG_TOTAL](state, payload) {
      state.logTotal = payload;
    },
    [SET_CHANNEL_LIST](state, payload) {
      state.channelList = payload;
    },
  },
  actions: {
    /**
     * 获取渠道列表
     */
    // getChannelList({
    //   commit,
    // }) {
    //   return getChannelList().then((res) => {
    //     if (res.result === '1' || res.result === 1) {
    //       commit(SET_CHANNEL_LIST, res.channelList);
    //     }
    //     return res;
    //   });
    // },
    getLogList({
      commit,
    }, payload) {
      return getOperationLog(payload).then((res) => {
        if (res.result === '1' || res.result === 1) {
          commit(SET_LOG_LIST, res.data);
          commit(SET_LOG_TOTAL, res.totalcount);
          commit(SET_CHANNEL_LIST, res.channelList);
        }
        return res;
      });
    },
    exportLogList({
      commit,
    }, payload) {
      return exportOperationLog(payload);
    }
  },
  getters: {
    logList({
      logList,
    }) {
      return logList;
    },
    logTotal({
      logTotal,
    }) {
      return logTotal;
    },
    channelList({
      channelList,
    }) {
      return channelList;
    },
  },
};
