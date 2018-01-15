import {
    getQQSchedule,
    getQQScheduleById,    
    addQQSchedule,
    updateQQSchedule,
    deleteQQSchedule,
    getQQGrpups,
    getQQGrpupById,    
    addQQGrpups,
    updateQQGrpups,
    deleteQQGrpups,
  } from 'api/serviceQQ';
  
const SET_SCHEDULE_LIST = 'SET_SCHEDULE_LIST';
const SET_GROUPS_LIST = 'SET_GROUPS_LIST';
  
export default {
  state: {
    qqScheduleList: [],
    qqGroupsList: [],
  },
  mutations: {
    [SET_SCHEDULE_LIST](state, payload) {
      state.qqScheduleList = payload;
    },
    [SET_GROUPS_LIST](state, payload) {
      state.qqGroupsList = payload;
    },
  },
  actions: {
    getQQScheduleList({
      commit,
      rootState,
    }) {
      const userToken = rootState.app.userInfo.userToken;      
      getQQSchedule({
        userToken,
      }).then((res) => {
        if (res.result === '1' || res.result === 1) {
          commit(SET_SCHEDULE_LIST, res.Schedulelist);
        }
        // return res;
      });
    },
    getQQSchedule({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;      
      return getQQScheduleById({
        ...payload,
        userToken,
      });
    },
    getQQGrpupsList({
        commit,
        rootState,
      }) {
      const userToken = rootState.app.userInfo.userToken;        
      getQQGrpups({
        userToken,
      }).then((res) => {
        if (res.result === '1' || res.result === 1) {
          commit(SET_GROUPS_LIST, res.Grouplist);
        }
        // return res;
      });
    },
    getQQGrpup({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;        
      return getQQGrpupById({
        ...payload,
        userToken,
      });
    },
    addQQSchedule({
        commit,
        rootState,
      }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addQQSchedule({
        ...payload,
        userToken,
      });
    },
    updateQQSchedule({
        commit,
        rootState,
      }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateQQSchedule({
        ...payload,
        userToken,
      });
    },
    deleteQQSchedule({
      commit,
      rootState,
      }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteQQSchedule({
        ...payload,
        userToken,
      });
    },
    addQQGrpups({
        commit,
        rootState,
      }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addQQGrpups({
        ...payload,
        userToken,
      });
    },
    updateQQGrpups({
        commit,
        rootState,
      }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateQQGrpups({
        ...payload,
        userToken,
      });
    },
    deleteQQGrpups({
        commit,
        rootState,
      }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteQQGrpups({
        ...payload,
        userToken,
      });
    },
  },
  getters: {
    qqScheduleList({
      qqScheduleList,
      }) {
      return qqScheduleList;
    },
    qqGroupsList({
        qqGroupsList,
      }) {
      return qqGroupsList;
    },
  },
};
  