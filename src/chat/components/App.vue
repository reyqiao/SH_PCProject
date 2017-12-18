<template lang="html">
	<div class="app">
		<Loading/>
		<Top @token="token => $emit('token', token)" @roleid="roleId => $emit('roleid', roleId)" @logout="() => $emit('logout')"></Top>
    <div class="main">
      <div class="feiping-container"></div>      
      <LeftBlock/>
      <MainBlock/>
		  <RightBlock/>
    </div>
    <VipTeacher v-show="teacherModal"/>
    <Strategy v-show="strategyShow"/>
    <VideoTrailer/>
    <NoticePic/>
	</div>
</template>

<script>
import $ from 'jquery';
import Cookies from 'js-cookie';
import API from '../api/API';
import * as types from '../store/mutation-types';
import Loading from './Loading.vue';
import Top from './Top.vue';
import MainBlock from './MainBlock.vue';
import LeftBlock from './LeftBlock.vue';
import RightBlock from './RightBlock.vue';
import VipTeacher from './VipTeacher.vue';
import Strategy from './Strategy.vue';
import VideoTrailer from './video/VideoTrailer.vue';
import NoticePic from './NoticePic.vue';
import auth from '../api/auth.js';
import * as IMHelper from '../api/IMHelper';
import { mapGetters, mapMutations, mapActions, } from 'vuex';
import { faceToImg, } from '../api/interaction.js';

export default {
  data() {
    return {
      feiping: {},
      showLoginTime: 0,
    }
  },
  components: {
    Top,
    LeftBlock,
    MainBlock,
    RightBlock,
    Loading,
    VipTeacher,
    Strategy,
    VideoTrailer,
    NoticePic
  },
  computed: {
    ...mapGetters(['getisLogin', 'getIsVisitor', 'getUserInfos', 'getEmojiShow', 'getVideoUrl', 'teacherModal', 'strategyShow']),
    ...mapMutations(['setIsLoading', 'setLoginShow', 'setIsLogin', 'addMsgs', 'setUserInfos', 'setEmojiShow', 'setLoginCLose']),
    ...mapActions(['getUserInfoByToken', 'getChatHistoryMsg', 'getPlayLive', 'noticeStrategy']),
  },
  methods: {
    chatinit(payload) {
      //初始化聊天室
      IMHelper.getInstance({
        account: payload.yxid,
        token: payload.yxtoken,
        chatroomId: payload.roomid,
        chatroomAddresses: payload.roomaddr,
        onconnect: (chatroom) => {
          console.log('进入聊天室', chatroom);
        },
        onerror: (err, obj) => {
          console.log('发生错误', error, obj);
        },
        onwillreconnect: (obj) => {
          console.log('即将重连', obj);
        },
        ondisconnect: (err) => {
          console.log('连接断开', err);
        },
        onmsgs: (msg) => {
          this.handleOnmsgs(msg);
        },
      });
    },
    initVideo(url) {
      videojs('liveVideo', { "controls": true }).src({
        src: url,
        type: `video/${url.split('.').pop()}`,
      });
    },
    showPoster() {
      const player = videojs('live-video', {
        "controls": true,
        poster: 'http://live.fxtrade888.com/live/source/poster.png',
      });
      document.querySelector('#live-video .vjs-big-play-button').style['display'] = 'none';
      document.querySelector('#live-video .vjs-poster').style['backgroundSize'] = 'contain';
    },
    handleOnmsgs(msgs) {
      console.log('收到聊天室消息', msgs);
      let [msgItem] = msgs;
      let { type, custom, } = msgItem;
      console.log(123, custom);
      if (!custom) {
        return false;
      }
      let customjson = JSON.parse(custom);
      // 飞屏回调
      if (customjson.ext.mstype === 4) {
        const value = customjson.attach;
        const id = customjson.msgId;
        const fptmp = `<div class="feiping" id="${id}">${value}</div>`;
        if (value) {
          $('.feiping-container').append(faceToImg(fptmp));
          const domWidth = $(`#${id}`).width();
          $(`#${id}`).animate({
            right: window.innerWidth + domWidth,
          }, 20000, () => {
            $(`#${id}`).remove();
          });
        }
        return false;
      }
      if (customjson.ext.mstype === 10) {
        this.$store.dispatch('getPlayLive').then(() => {
          console.log('直播结束 播放录播！');
          this.showPoster();
        });
        return false;
      }
      if (customjson.ext.mstype === 9) {
        this.$store.dispatch('getPlayLive').then(() => {
          console.log('直播开始 开始直播！');
        })
      }
      if (customjson.ext.mstype === 8) {
        this.$store.dispatch('playMusic');
        // 通知更新及时策略
        this.$store.commit('noticeStrategy', new Date().toString());
      }
      //  显示自己的消息 只显示未审核
      if (this.getUserInfos.niuguname === msgItem.fromNick && customjson.isAudit === 0) {
        this.$store.commit('addMsgs', msgItem);
        return false;
      }
      //  如果是彩条直接发送
      // if (this.getUserInfos.niuguname === msgItem.fromNick && customjson.isAudit === 1) {
      if (customjson.ext.mstype === 3 || customjson.ext.mstype === 7 || customjson.ext.mstype === 5 || customjson.ext.mstype === 6) {
        this.$store.commit('addMsgs', msgItem);
        return false;
      }
      // }
      // 机器人
      if (customjson.isRobot) {
        this.$store.commit('addMsgs', msgItem);
        return false;
      }
      // 管理员显示全部消息 只显示未审核
      if (this.getUserInfos.roleid === 5 || this.getUserInfos.roleid === 13 || this.getUserInfos.roleid === 7 || this.getUserInfos.roleid === 14) {
        if (customjson.isAudit === 0 || this.getUserInfos.niuguname === msgItem.fromNick || customjson.roleId >= 5) {
          this.$store.commit('addMsgs', msgItem)
        };
        return false;
      } else {
        if (this.getUserInfos.niuguname !== msgItem.fromNick && customjson.isAudit === 1) this.$store.commit('addMsgs', msgItem);
        return false;
      }
    },
    initLoginShow() {
      if (this.getIsVisitor === '0' && !this.showRegisterBtn)
      {
        this.$store.commit('setLoginShow', true);
        this.$store.commit('setLoginCLose', false);
      }
      // let initTime = Cookies.get('time');
      // if (!initTime) {
      //   initTime = (new Date()).getTime();
      //   Cookies.set('time', initTime);
      // }
      // const duration = (new Date()).getTime() - initTime;
      // if (duration > this.showLoginTime) {
      //   if (this.getIsVisitor === '0' && !this.showRegisterBtn) {
      //       this.$store.commit('setLoginShow', true);
      //       this.$store.commit('setLoginCLose', false);
      //     }
      // } else {
      //   this.$store.state.timer = setTimeout(() => {
      //     if (this.getIsVisitor === '0' && !this.showRegisterBtn) {
      //       this.$store.commit('setLoginShow', true);
      //       this.$store.commit('setLoginCLose', false);
      //     }
      //   }, this.showLoginTime - duration);
      // }
    },
  },
  mounted() {
    window.addEventListener('click', (e) => {
      console.log('全局点击操作-做一些点击取消操作');
      if (e.target.id !== 'emoji_btn') {
        this.$store.commit('setEmojiShow', false);
      };
    }, false);
    this.$store.commit('setIsLoading', true);
    this.$store.commit('setTeacherModal', false);
    // if (Cookies.get('token')) {
    if (this.$root.token) {
      this.$store.commit('setIsLogin', true);
    }
    // if (Cookies.get('roleId') && Cookies.get('token')) {
    if (this.$root.roleId && this.$root.token) {
      this.$store.commit('showRegisterBtn', parseInt(this.$root.roleId));
    }

    this.$store.dispatch(`${types.GET_LIVE_MAIN_DATA}`).then(() => {
      if (this.getisLogin) {
        this.$store.dispatch('getUserInfoByToken', {
          // usertoken: Cookies.get('token'),
          usertoken: this.$root.token,
          userid: 0,
        }).then((res) => {
          if (res[0].code === 0) {
            this.$emit('roleId', res[0].userInfo.roleId);
          }

          this.$store.commit('setIsLoading', false);
          this.$store.dispatch('getChatHistoryMsg', {
            direction: '-1',
            order: '1',
            id: '0',
            usertoken: this.getUserInfos.niugutoken,
            roomid: this.getUserInfos.roomid,
            type: 'up',
          })
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.initLoginShow();
        // this.$store.state.timer = setTimeout(() => {
        //   if (this.getIsVisitor === '0' && !this.showRegisterBtn) {
        //     this.$store.commit('setLoginShow', true);
        //     this.$store.commit('setLoginCLose', false);
        //   }
        // }, 180000);
        if (Cookies.get('yk-token')) {
          this.$store.dispatch('getYkInfo', {
            usertoken: Cookies.get('yk-token'),
            userid: 0,
          }).then((res) => {
            this.$store.commit('setIsLoading', false);
            this.$store.dispatch('getChatHistoryMsg', {
              direction: '-1',
              order: '1',
              id: '0',
              usertoken: this.getUserInfos.niugutoken,
              roomid: this.getUserInfos.roomid,
              type: 'up',
            })
          }).catch((err) => {
            console.log(err);
          });
        } else {
          this.$store.dispatch('noUserRegister').then(() => {
            Cookies.set('yk-token', this.getUserInfos.niugutoken, { expires: 7 });
            this.$store.dispatch('getChatHistoryMsg', {
              direction: '-1',
              order: '1',
              id: '0',
              usertoken: this.getUserInfos.niugutoken,
              roomid: this.getUserInfos.roomid,
              type: 'up',
            })
            this.$store.commit('setIsLoading', false);
          }).catch((err) => {
            this.$Message.warning(err, 2);
          });
        }
      }
    }).catch(() => {
      this.$Message.error('获取登录模式失败,请联系网站管理员.', 2);
    });
  },
  directives: {
  },
  watch: {
    getUserInfos(newVal, oldVal) {
      if (newVal.yxtoken !== oldVal.yxtoken) {
        console.log('登录用户改变');
        this.chatinit(this.getUserInfos);
      }
    },
  },
}
</script>

<style lang="scss">
.app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // display: flex;
  // flex-direction: column;
  background-color: rgb(33, 34, 36);
  .main {
    position: absolute;
    top: 74px;
    bottom: 0;
    width: 100%;
    display: flex;
    // flex-direction: row;
    // flex: 1;
  }
  .feiping {
    position: absolute;
    top: 222px;
    right: 0;
    transform: translateX(100%);
    text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
    white-space: pre;
    pointer-events: none;
    color: #fff;
    z-index: 100;
    font-size: 50px;
    font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
    font-weight: bold;
    opacity: 0.94;
    -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.9);
  }
}
</style>
