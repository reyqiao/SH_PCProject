<template lang="html">
	<div v-show="getGetpwdShow" class="getpwd">
		<div class="getpwd_msg">
			<div class="closebtn" @click="closebtn()" v-show="getLoginCLose">

			</div>
			<div class="getpwd_cont">
				<div class="getpwd_tips">
					找回密码
				</div>
				<div class="getpwd_input">
					<span class="getpwd_img"></span> <input type="text" name="" v-model="userphone" value="" placeholder="手机号">
				</div>
				<div class="getpwd_input clearfix">
					<span class="getpwd_img duanxin"></span> <input type="text" v-model="vcode"  name="" value="" placeholder="短信验证"><span class="getpwdtxt f-r" @click="getvcode">{{vcodetxt}}</span>
				</div>
				<div class="getpwd_input">
					<span class="getpwd_img pwd"></span> <input type="password" v-model="pwd" name="" value="" placeholder="密码">
				</div>
        <div class="login_goto clearfix">
					<!-- <a class="f-l" href="javascript:void(0)"  @click="regbtn">注册</a> -->
					<a  class="f-l" href="javascript:void(0)" @click="loginbtn">登录</a>
				</div>
				<div class="getpwd_btn" @click="clickgetpwd">
					确认找回
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import md5 from 'md5';
  import API from '../api/API';
  import { mapGetters, mapMutations, } from 'vuex';
  import crypto from '../api/cryptoHelper.js';

  export default {
    data () {
      return {
        userphone: '',
        pwd: '',
        vcode: '',
        vcodetxt: '获取验证码',
      }
    },
    mounted () {
    },
    methods: {
      loginbtn () {
        this.$store.commit('setGetpwdShow', false);
        this.$store.commit('setLoginShow', true);
      },
      regbtn () {
        this.$store.commit('setGetpwdShow', false);
        this.$store.commit('setRegisterShow', true);
      },
      closebtn () {
        this.$store.commit('setGetpwdShow', false);
      },
      clickgetpwd () {
        this.$store.commit('setIsLoading', true);
        API.restpwd({
          channelId: '1',
          mobile: this.userphone,
          password: this.pwd,
          code: this.vcode,
        }).then((res) => {
          this.$store.commit('setIsLoading', false);
          if (res.code === 0) {
            this.$store.commit('setGetpwdShow', false);
            this.$store.commit('setLoginShow', true);
          } else {
            alert(res.message)
          }
        }).catch(() => {
          console.log('系统错误');
          this.$store.commit('setIsLoading', false);
        });
      },
      getvcode () {
        let time = 59;
        if (this.vcodetxt !== '获取验证码') {
          return false;
        }
        this.vcodetxt = `60s`;
        const djs = setInterval(() => {
          if (time === 0) {
            this.vcodetxt = '获取验证码';
            clearInterval(djs);
          } else {
            this.vcodetxt = `${time}s`;
            time--;
          }
        }, 1000);
        let regmsg = {};
        regmsg.mobile = this.userphone;
        regmsg.smsType = 22;

        API.getVCode({
          mobileParam: crypto.encode(JSON.stringify(regmsg)),
          sign: md5(JSON.stringify(regmsg)).toUpperCase(),
        }).then((res) => {
          if (res.code !== 0) {
            alert(res.message);
          }
        }).catch((err) => {
          console.log(err, '验证码发送错误');
        });
      },
    },
    computed: {
      /*
       * getGetpwdShow获取是否显示找回密码框
       */
      ...mapGetters(['getGetpwdShow', 'getLoginCLose']),
      /*
       * setGetpwdShow设置是否显示找回密码框
       * setIsLoading 设置是否显示loading
       * setIsLogin 设置是否用户登录
       * setUserInfos 设置登录的用户信息
       * setLoginShow 设置显示登录框
       */
      ...mapMutations(['setGetpwdShow', 'setIsLoading', 'setIsLogin', 'setUserInfos', 'setLoginShow']),
    },
  }
</script>

<style lang="scss" scoped>
  .getpwd {
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
    margin: auto;
    & .getpwd_msg {
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
      & .getpwd_cont {
        width: 368px;
        height: 396px;
        background: #fff;
        margin: 0 auto;
        & .getpwd_tips {
          width: 100%;
          height: 90px;
          line-height: 90px;
          font-size: 24px;
          color: #000;
        }
        & .getpwd_input {
          position: relative;
          margin: 0 auto;
          width: 360px;
          height: 53px;
          border-bottom: 1px solid rgb(232, 232, 232);
          & .getpwd_img {
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
          & .duanxin {
            background-image: url(../images/duanxinimg.png);
          }
          & .pwd {
            background-image: url(../images/pwdimg.png);
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
          & .getpwdtxt {
            font-size: 16px;
            color: rgb(69, 140, 245);
            position: relative;
            top: 20px;
            cursor: pointer;
          }
        }
        & .getpwd_btn {
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
        .login_goto {
          margin: 28px auto;
          width: 360px;
          & a {
            font-size: 16px;
            color: rgb(69, 140, 245);
            text-decoration: none;
          }
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
