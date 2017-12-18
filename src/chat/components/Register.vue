<template lang="html">
	<div v-show="getRegisterShow" class="reg">
		<div class="reg_msg">
			<div class="closebtn" @click="closebtn()" v-show="getLoginCLose">

			</div>
			<div class="reg_cont">
				<div class="reg_tips">
					账号注册
				</div>
				<div class="reg_input">
					<span class="reg_img"></span> <input class="input-item" type="text" name="" value="" v-model.trim="userphone" placeholder="手机号">
				</div>
				<div class="reg_input" v-if="false">
					<span class="reg_img duanxin"></span> <input class="input-item" type="text" name="" v-model.trim="vcode" value="" placeholder="短信验证">
					<span class="reg_vcode" @click="getvcode">{{vcodetxt}}</span>
				</div>
				<div class="reg_input">
					<span class="reg_img pwd"></span> <input class="input-item" type="password" v-model="pwd" name="" value="" placeholder="密码">
				</div>
				<div class="reg_input">
					<span class="reg_img nicheng"></span>
          <input class="input-item" type="text" name="" v-model="nicheng" value="" placeholder="昵称">
				</div>
        <div class="reg_input">
					<span class="reg_img nicheng"></span>
          <span class="reg_txt">归属</span>
          <label class="belong-item" v-for="channel in channelList">
            <input type="radio" name="belong" v-model="channelId" :value="channel.channelId" />{{channel.channelName}}
          </label>
				</div>
				<a  href="javascript:void(0)" class="gotologin" @click="loginbtn">账号登录</a>
				<div class="reg_btn" @click="gotoreg">
					注册
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'md5';
// import Cookies from 'js-cookie';
import API from '../api/API';
import { mapGetters, mapMutations, mapActions, } from 'vuex';
import crypto from '../api/cryptoHelper.js';

export default {
  data() {
    return {
      vcodetxt: '获取验证码',
      userphone: '',
      vcode: '',
      pwd: '',
      nicheng: '',
      channelId: undefined,
      channelList: [],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await API.getChannelList();
      console.log(res);
      if (res.result === '1') {
        this.channelList = res.channelList;
      }
    },
    closebtn() {
      this.$store.commit('setRegisterShow', false);
    },
    loginbtn() {
      this.$store.commit('setRegisterShow', false);
      this.$store.commit('setLoginShow', true);
    },
    /**
     * 注册用户
     */
    gotoreg() {
      /**
       * 注册用户
       */
      // this.$store.dispatch('Reg', {
      //   mobile: this.userphone,
      //   code: this.vcode || 8827,
      //   nickName: this.nicheng,
      //   password: this.pwd,
      // }).then((res) => {
      //   Cookies.set('token', res.userToken, { expires: 7 });
      //   this.$store.commit('setIsLogin', true);
      //   this.$store.commit('setRegisterShow', false);
      //   this.$store.commit('setIsLoading', false);
      // }).catch((err) => {
      //   alert(err);
      //   this.$store.commit('setIsLoading', false);
      // });
      this.$store.commit('setIsLoading', true);
      API.addUser({
        mobile: this.userphone,
        nickName: this.nicheng,
        password: this.pwd,
        channelId: this.channelId,
      }).then(res => {
        if (res.code === 0) {
          this.$Message.success(res.message || '添加成功');
          this.$store.commit('setRegisterShow', false);
        } else {
          this.$Message.error(res.message);
        }
      });
      this.$store.commit('setIsLoading', false);
    },
    getvcode() {
      let time = 59;
      if (this.vcodetxt !== '获取验证码') {
        return false;
      }
      if (!this.userphone) {
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
      regmsg.smsType = 21;

      API.getVCode({
        mobileParam: crypto.encode(JSON.stringify(regmsg)),
        sign: md5(JSON.stringify(regmsg)).toUpperCase(),
      }).then((res) => {
        console.log('验证码已发送');
      }).catch((err) => {
        console.log(err, '验证码发送错误');
      });

    },
  },
  computed: {
    /*
     * getRegisterShow获取是否显示注册框
     */
    ...mapGetters(['getRegisterShow', 'getLoginCLose']),
    /*
     * setRegisterShow设置是否显示注册框
     * setLoginShow设置是否显示登录框
     * setIsLoading设置是否显示loading
     * setUserInfos设置登录用户信息
     */
    ...mapMutations(['setRegisterShow', 'setLoginShow', 'setIsLoading', 'setIsLogin', 'setUserInfos']),
    /**
     * Reg用户注册
     */
    ...mapActions(['Reg']),
  },
}
</script>

<style lang="scss" scoped>
.reg {
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
  & .reg_msg {
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
    & .reg_cont {
      width: 360px;
      background: #fff;
      margin: 0 auto;
      & .reg_tips {
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 24px;
        color: #000;
      }
      & .reg_input {
        position: relative;
        margin: 0 auto;
        width: 360px;
        height: 53px;
        border-bottom: 1px solid rgb(232, 232, 232);
        text-align: left;
        & .reg_vcode {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 16px;
          color: rgb(69, 140, 245);
          height: 53px;
          line-height: 53px;
          cursor: pointer;
        }
        & .reg_img {
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
        & .nicheng {
          background-image: url(../images/nichengimg.png);
        }
        .input-item {
          position: absolute;
          left: 50px;
          top: 20px;
          font-size: 16px;
          width: 250px;
          border-style: none;
          outline: none;
        }
        .reg_txt {
          display: inline-block;
          font-size: 16px;
          color: #333;
          margin-left: 50px;
          margin-top: 20px;
        }
        .belong-item {
          position: relative;
          left: 20px;
          color: #888;
          width: 80px;
          display: inline-block;
          font-size: 14px;
        }
      }
      & .gotologin {
        display: block;
        font-size: 16px;
        text-align: left;
        line-height: 16px;
        padding: 20px;
        color: rgb(69, 140, 245);
      }
      & .reg_btn {
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
