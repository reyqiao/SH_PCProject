import Vue from 'vue';
import VueRouter from 'vue-router';
import cookie from 'js-cookie';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import routes from './routes';
import store from './store/';
import './manage.scss';

Vue.use(VueRouter);
Vue.use(iView);

// 开启debug模式
// Vue.config.debug = true;

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && (!store.state.app.userInfo || !store.state.app.userInfo.userToken)) {
    const cookieData = cookie.get('USER_INFO');
    if (typeof cookieData !== 'undefined') {
      const userInfo = JSON.parse(cookieData);
      if (userInfo && userInfo.userToken) {
        store.commit('SET_USER_INFO', userInfo);
        next();
      } else {
        next('login');
      }
    } else {
      next('login');
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render(h) {
    return h('router-view');
  },
}).$mount('#app');
