export default {
  login() {
    console.log('登录');
    if (typeof window.localStorage === 'undefined') {
      console.log('浏览器不支持localStorage,请使用cookie');
    } else {
      console.log('浏览器支持localStorage');
    }
  },
  logout() {
    console.log('登出');
  },
  getInfos() {
    console.log('getInfos');
  },
  setInfos() {
    console.log('setInfos');
  },
};
