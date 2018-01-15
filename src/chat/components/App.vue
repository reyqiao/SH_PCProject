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
    <BannerPic v-show="bannerModal"/>
    <VideoTrailer/>
    <NoticePic/>
    <!--暂时不需要-->
   <div id="myRewards" class="myRewards" v-show="false" >
    <div class="myRewards-main">
       <img style="height:120px;width:120px;padding:5px;" src="https://live.fxtrade888.com/live/static/img/qrcode.png">
      <h1 class="myR-h"><span style="color:gray">扫一扫,</span>领策略</h1>       
    </div>
    </div>
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
import BannerPic from './BannerPic.vue';
import Strategy from './Strategy.vue';
import VideoTrailer from './video/VideoTrailer.vue';
import NoticePic from './NoticePic.vue';
import auth from '../api/auth.js';
import * as IMHelper from '../api/IMHelper';
import { mapGetters, mapMutations, mapActions, } from 'vuex';
import { faceToImg, } from '../api/interaction.js';
import countUp from '../../static/countUp.min.js' //注意路径

export default {
  data() {
    return {
      feiping: {},
      showLoginTime: 0,
      num: 1000,
      baseNum: 200,
      floorNum: 100,
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
    NoticePic,
    BannerPic,
  },
  computed: {
    ...mapGetters(['getisLogin', 'getIsVisitor', 'getUserInfos', 'getEmojiShow', 'getVideoUrl', 'teacherModal', 'strategyShow','bannerModal']),
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
      let { type, custom,content, } = msgItem;
      console.log(123, custom);
      if (!custom) {
        return false;
      }
      let customjson = JSON.parse(custom);
      // 飞屏回调
      if (customjson.ext.mstype === 4) {
        const value = content;
        let i= value.split('|').length;
        // console.log('飞屏文本'+value.split('|')[0]);        
        // console.log('飞屏图片'+value.split('|')[1]);
        let isShowImg=false;
        let isShowTxt=false;
        if(i>=2&value.split('|')[1]!='')isShowImg=true;
        if(i>=2&value.split('|')[0]!='')isShowTxt=true;        
        const id = customjson.msgId;
        const fptmptxt = `<div class="feiping" id="${id}"><span style="font-size: 50px;font-weight: bold;line-height: 25px;margin: 5px 0 0 5px;color: #eabb15;">${value.split('|')[0]}</span></div>`;
        const fptmpImg = `<div class="feiping" id="${id}"><img src="${value.split('|')[1]}"  style="max-height:500px;max-width:600px"/></div>`;
        const fptmp = `<div class="feiping" id="${id}"><img src="${value.split('|')[1]}"  style="max-height:500px;max-width:600px;"/><span style="font-size: 50px;font-weight: bold;line-height: 25px;margin: 5px 0 0 5px;color: #eabb15;">${value.split('|')[0]}</span></div>`;
        
      //  const imgDiv=`<img src="${value.split('|')[1]}" v-show="isShow" width="400" height="300"/>`;
        if (value) {
          //$('.feiping-container').append(faceToImg(fptmp));
        if(isShowImg&&isShowTxt)
          {
            $('.feiping-container').append(faceToImg(fptmp));          
          }
        if(isShowImg)
            $('.feiping-container').append(faceToImg(fptmpImg));
        if(isShowTxt)
            $('.feiping-container').append(faceToImg(fptmptxt));
            
          const domWidth = $(`#${id}`).width();
          $(`#${id}`).animate({
            right: window.innerWidth + domWidth,
          }, 30000, () => {
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
      if (customjson.ext.mstype === 3 || customjson.ext.mstype === 7 || customjson.ext.mstype === 5 || customjson.ext.mstype === 6 ||customjson.ext.mstype === 14 ||customjson.ext.mstype === 13) {
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
      if (this.getIsVisitor === '0' &&!this.showRegisterBtn)
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
    getInlinePerson() {
      return API.getInlinePersons({
         //usertoken: Cookie.get('token'),180111
        usertoken: this.$root.token,
        action: 'getacount',
      }).then(res => {
        if (res.code === 0) {
          this.baseNum = res.data;
          if (this.baseNum === 0) {
            this.num = 0;
          } else {
            this.num = Math.floor(Math.random() * 2) + this.baseNum;
          }
        }
      });
    },
    getInlineNumber(){      
      const temCount = Math.floor(Math.random() * 2) - 30 + this.num;
      if (this.baseNum === 0 && this.floorNum === 0) {
        this.num = 0;
      } else if (temCount >= this.baseNum + this.floorNum) {
        this.num = temCount - 20;
      } else if (temCount <= this.baseNum - this.floorNum || temCount <= 5) {
        this.num = temCount + 30;
      } else {
        this.num = temCount;
      }
    },
    getFloorNumber() {
      const time = new Date().getHours();
      if (time > 10 && time < 12) {
        this.floorNum = 100;
      } else if (time >= 12 && time <= 18) {
        this.floorNum = 150;
      } else if (time >= 18 && time <= 22) {
        this.floorNum = 200;
      } else {
        this.floorNum = 0;
      }
    },
  },
  mounted() {
    let demo = new countUp('onlineNum', this.num,1000 , 0, 10, {useGrouping: true, separator: '',});
    if (!demo.error) {
      // console.log('随机人数计算', demo);
      demo.start();
    } else {
      console.error(demo.error);
    }
    this.getFloorNumber();
    this.getInlinePerson().then(() => {
      setInterval(() => {
        this.getInlineNumber();
        demo.update(this.num);
      }, 10000)
    });

    window.addEventListener('click', (e) => {
      console.log('全局点击操作-做一些点击取消操作'+e.target.id );
      if (e.target.id !== 'emoji_btn') {
        this.$store.commit('setEmojiShow', false);
      };
    }, false);
    this.$store.commit('setIsLoading', true);///////Cookies.get('token') 修改
    this.$store.commit('setTeacherModal', false);
    this.$store.commit('setBannerModal', false);
    
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
          //usertoken: Cookies.get('token'),
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
    background-image:url('../images/bg.jpg');
    // flex-direction: row;
    // flex: 1;
  }
  .feiping {
    position: absolute;
    top: 10%;
    right: 0;
    transform: translateX(100%);
    text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
    white-space: pre;
    pointer-events: none;
    color: #fff;
    z-index:999999;
    font-size: 50px;
    font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
    font-weight: bold;
    opacity: 0.94;
    -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.9);
  }
  .myRewards {
    position: fixed;
    _position: absolute;
    right: -80px;
    top: 11%;
    z-index: 10000;
    padding-left: 34px;
    width: 200px;
    overflow: hidden;
    box-sizing: content-box;
}
.myRewards-main {
    width: 120px;
    height:145px;
    font: 12px/1.5 "microsoft yahei",tahoma,arial,sans-serif;
    ; color: #000;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    // border-right: none;
    border-radius: 5px;
}
.myRewards-detail {
    display: inline-block;
    *display: inline;
    *zoom:1; vertical-align: middle;
    width: 150px;
    height: 280px;
    font-size: 12px;
    background-color: #fff;
}
.myRewards-ubox {
    padding: 14px 0 0 10px;
}
.myRewards-code-tit {
    margin: 0 0 20px;
    width: 132px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    // background: url(../img/tab_pay.jpg) no-repeat;
}
.myR-h {
    padding: 0 0 0 6px;
    font-size: 14px;
    font-weight: normal;
    background-image: none;
    text-align: center;
    color: #f30;
}
.myR-l {
    padding: 0 0 0 6px;
    font-size: 14px;
    font-weight: normal;
    background-image: none;
    text-align: center;
    color: rgb(163, 159, 158);
}
}
</style>
