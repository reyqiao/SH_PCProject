import Vue from 'vue';
import Vuex from 'vuex';
// import state from './state';
// import mutations from './mutations';
// import actions from './action';
// import getters from './getters';
import index from 'models/base';
import description from 'models/description';
import users from 'models/users';
import vedio from 'models/vedio';
import notice from 'models/notice';
import serviceQQ from 'models/serviceQQ';
import app from 'models/app';
import loglist from 'models/loglist';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    index,
    description,
    users,
    vedio,
    notice,
    serviceQQ,
    loglist,
  },
});
