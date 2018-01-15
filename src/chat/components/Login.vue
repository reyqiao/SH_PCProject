<template lang="html">
	<div v-show="getLoginShow" class="login">
		<div class="login_msg">
			<div class="closebtn" @click="closebtn" v-show="getLoginCLose"></div>
			<div class="login_cont">
				<div class="login_tips">账号登录</div>
				<div class="login_phone">
					<span class="phoneimg"></span> <input type="text" v-model="username"  value="" placeholder="手机号">
				</div>
				<div class="login_pwd">
					<span class="pwdimg"></span> <input type="password" v-model="userpwd" value="" placeholder="密码">
				</div>
				<div class="login_goto clearfix">
					<!-- <a class="f-l" href="javascript:void(0)"  @click="regbtn">注册新用户</a> -->
					<a  class="f-l" href="javascript:void(0)" @click="getpwdbtn">找回密码</a>
				</div>
				<div class="login_btn" @click="gotoLogin">登录</div>
			</div>
		</div>
	</div>
</template>

<script>
import API from '../api/API';
import Cookies from 'js-cookie';
import { mapGetters, mapMutations, mapActions, } from 'vuex';

export default {
  data() {
    return {
      username: '',
      userpwd: '',
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      setRegisterState: 'setRegisterShow',
      showRegisterBtnState: 'showRegisterBtn'
    }),
    closebtn() {
      this.$store.commit('setLoginShow', false);
    },
    getpwdbtn() {
      this.$store.commit('setLoginShow', false);
      this.$store.commit('setGetpwdShow', true);
    },
    regbtn() {
      this.$store.commit('setLoginShow', false);
      this.$store.commit('setRegisterShow', true);
    },
    gotoLogin() {
      this.$store.commit('setIsLoading', true);

      this.$store.dispatch('Login', {
        mobile: this.username,
        password: this.userpwd,
      }).then((res) => {
        /*cookie 保持到本地 */
        //  Cookies.set('token', res.userToken, { expires: 7 });
        //  Cookies.set('roleId', res.roleId, { expires: 7 });
        /*cookie 保持到本地 */
        this.$emit('token', res.userToken);
        this.$emit('roleid', res.roleId);
        this.$store.commit('setIsLogin', true);
        this.$store.dispatch('getRobot', res.userToken);
        this.$store.commit('setLoginShow', false);
        this.$store.commit('setIsLoading', false);
        // this.$store.commit('showRegisterBtn',false);
        this.$store.commit('noticeStrategy', new Date().toString());
        this.showRegisterBtnState(res.roleId);

        // 清空时间戳
        Cookies.remove('time');
        return res;
      }).then((res) => {
        API.userOperationLog({
          usertoken: res.userToken,
          operateType: 1, // 1:登录,2:登出
          source: 1, // 1：web,2:h5
        });
      }).catch((err) => {
        alert(err);
        this.$store.commit('setIsLoading', false);
      });
    },
  },
  computed: {
    ...mapGetters(['getLoginShow', 'getLoginCLose']),
    ...mapMutations(['setLoginShow', 'setGetpwdShow', 'setRegisterShow', 'setIsLoading', 'setUserInfos', 'setIsLogin', 'setIsLoading', 'showRegisterBtn']),
    ...mapActions(['login']),
  },
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  text-align: center;
  & .login_msg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 480px;
    z-index: 101;
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    padding: 40px 0;
    & .login_cont {
      width: 100%;
      height: auto;
      background: #fff;
      & .login_tips {
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 24px;
        color: #000;
      }
      & .login_phone {
        position: relative;
        margin: 0 auto;
        width: 360px;
        height: 53px;
        border-bottom: 1px solid rgb(232, 232, 232);
        & .phoneimg {
          position: absolute;
          left: 6px;
          top: 20px;
          display: block;
          width: 14px;
          height: 22px;
          background-image: url(../images/phoneimg.png);
          background-repeat: no-repeat;
          background-size: contain;
        }
        & input {
          position: absolute;
          left: 50px;
          top: 20px;
          font-size: 16px;
          width: 250px;
          border-style: none;
          outline: none;
        }
      }
      & .login_pwd {
        position: relative;
        margin: 0 auto;
        width: 360px;
        height: 53px;
        border-bottom: 1px solid rgb(232, 232, 232);
        & .pwdimg {
          position: absolute;
          left: 6px;
          top: 20px;
          display: block;
          width: 14px;
          height: 22px;
          background-image: url(../images/pwdimg.png);
          background-repeat: no-repeat;
          background-size: contain;
        }
        & input {
          position: absolute;
          left: 50px;
          top: 20px;
          font-size: 16px;
          width: 250px;
          border-style: none;
          outline: none;
        }
      }
      & .login_goto {
        margin: 28px auto;
        width: 360px;
        & a {
          font-size: 16px;
          color: rgb(69, 140, 245);
          text-decoration: none;
        }
      }
      & .login_btn {
        width: 360px;
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        text-align: center;
        background: rgb(0, 93, 207);
        color: #fff;
        margin: 0 auto;
        cursor: pointer;
        border-radius: 28px;
      }
    }
    & .closebtn {
      position: absolute;
      top: 24px;
      right: 24px;
      width: 16px;
      height: 16px;
      background-image: url(../img/close1.png);
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
    }
  }
}
</style>
