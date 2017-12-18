import {
  SET_LIVE_TEACHER_LIST,
  SET_LIVE_TEACHER,
  CHANGE_LIVE_TEACHER_TAGS,
  CHANGE_TEACHER_PHONE,
  CLEAR_LIVE_TEACHER,
} from 'store/mutationType';
import {
  getLiveTeacherList,
  getLiveTeacher,
  addLiveTeacher,
  updateLiveTeacher,
  deleteLiveTeacher,
} from 'api/description';

export default {
  state: {
    liveTeacherList: [],
    liveTeacher: {
      teachername: '',
      TeacherFace: '',
      TeacherTag: '',
      WinRate: '',
      Income: '',
      teacherinfo: '',
      Introduce: '',
    },
  },
  mutations: {
    [SET_LIVE_TEACHER_LIST](state, payload) {
      state.liveTeacherList = payload;
    },
    [SET_LIVE_TEACHER](state, payload) {
      state.liveTeacher = payload;
    },
    [CHANGE_LIVE_TEACHER_TAGS](state, payload) {
      // if (state.liveTeacher.TeacherTag.length > 0) {
      //   state.liveTeacher.TeacherTag += `,${payload}`;
      // } else {
      //   state.liveTeacher.TeacherTag = payload;
      // }
      state.liveTeacher.TeacherTag = payload;
    },
    [CHANGE_TEACHER_PHONE](state, payload) {
      if (typeof payload === 'undefined') {
        state.liveTeacher.TeacherFace = '';
      } else {
        state.liveTeacher.TeacherFace = payload;
      }
    },
    [CLEAR_LIVE_TEACHER](state) {
      state.liveTeacher = {
        teachername: '',
        TeacherFace: '',
        TeacherTag: '',
        WinRate: '',
        Income: '',
        teacherinfo: '',
        Introduce: '',
      };
    },
  },
  actions: {
    getLiveTeacherList({
      commit,
      rootState,
    }) {
      const userToken = rootState.app.userInfo.userToken;
      return getLiveTeacherList({
        userToken,
      }).then((res) => {
        if (res.result === '1' || res.result === 1) {
          commit(SET_LIVE_TEACHER_LIST, res.list);
        } else {
          console.log('[error]', res);
        }
      }, (err) => {
        console.log('[error]', err);
      });
    },
    getLiveTeacher({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return getLiveTeacher({
        ...payload,
        userToken,
      }).then((res) => {
        if (res.result === '1' || res.result === 1) {
          const temTeacher = {
            ...res,
          };
          delete temTeacher.result;
          delete temTeacher.code;
          delete temTeacher.action;
          delete temTeacher.message;
          commit(SET_LIVE_TEACHER, temTeacher);
        } else {
          console.log('[error]', res);
        }
        return res;
      }, (err) => {
        console.log('[error]', err);
      });
    },
    changeTeacherTags({
      commit,
    }, payload) {
      return new Promise((resolve) => {
        commit(CHANGE_LIVE_TEACHER_TAGS, payload);
        resolve();
      });
    },
    changeTeacherPhone({
      commit,
    }, payload) {
      return new Promise((resolve) => {
        commit(CHANGE_TEACHER_PHONE, payload);
        resolve();
      });
    },
    addLiveTeacher({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return addLiveTeacher({
        ...payload,
        userToken,
      });
    },
    updateLiveTeacher({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return updateLiveTeacher({
        ...payload,
        userToken,
      });
    },
    clearLiveTeacher({
      commit,
    }) {
      return new Promise((resolve) => {
        commit(CLEAR_LIVE_TEACHER);
        resolve();
      });
    },
    deleteLiveTeacher({
      commit,
      rootState,
    }, payload) {
      const userToken = rootState.app.userInfo.userToken;
      return deleteLiveTeacher({
        ...payload,
        userToken,
      });
    },
  },
  getters: {
    liveTeacherList({
      liveTeacherList,
    }) {
      return liveTeacherList;
    },
    liveTeacher({
      liveTeacher,
    }) {
      return liveTeacher;
    },
  },
};
