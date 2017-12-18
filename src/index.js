import Vue from 'vue';
import VueResource from 'vue-resource';
import 'babel-polyfill';
import iView from 'iview';
import VueLightbox from 'vue-lightbox';
import 'iview/dist/styles/iview.css';
import store from './chat/store';
import App from './chat/components/App.vue';

import './index.scss';

if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
  window.location.href = '/live/mobile/index.html';
}

Vue.use(VueResource);
Vue.use(iView);
Vue.component('Lightbox', VueLightbox);
new Vue({
  el: '#container',
  store,
  data() {
    return {
      token: undefined,
      roleId: undefined,
    };
  },
  components: {
    App,
  },
  methods: {
    setToken(token) {
      console.log(1111, token);
      this.token = token;
    },
    setRoleId(roleId) {
      console.log(2222, roleId);
      this.roleId = roleId;
    },
    logout() {
      this.token = undefined;
      this.roleId = undefined;
    }
  }
});
