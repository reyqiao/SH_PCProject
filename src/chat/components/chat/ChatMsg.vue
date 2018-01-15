<template lang="html">
	<div class="chatmsg">
    <div class="msg-time">
      <!--消息时间-->
        {{timeFormat(msgcont.addtime*1000, 'hh:mm:ss')}}
    </div>
    <!--会员头像-->
    <div class="msg-logo f-l">
      <template v-if="msgcont.isRobot===1">
        <a href="#" :aria-label="getRoleName(msgcont.roleId)" class="hint--top-left">
        <img class="chatmsg_flag f-l" :src="`./static/img/flag${msgcont.roleId}.png`" alt="">
        </a>
      </template>
      <template v-else>
        <a href="#" :aria-label="getRoleName(msgcont.roleId)" class="hint--top-left">        
        <img class="chatmsg_flag f-l" :src="`./static/img/flag${msgcont.roleId}.png`" alt="">
        </a>        
      </template>
    </div>

    <!--会员昵称-->
    <div class="msg-name" :class="msgcont.isRobot===1 && ifshowsh?`name_bg_${msgcont.roleId}_robot`:`name_bg_${msgcont.roleId}`">
       <template v-if="msgcont.isRobot===1">
          <div class="chatmsg_name f-l" @click="setAtName(msgcont.Robotname)">
            {{msgcont.Robotname}}
          </div>
          <!-- <template v-if="ifshowsh">
            <div class="mj">水军</div>
          </template> -->
        </template>
        <template v-else>
          <!-- <div :class="msgcont.roleId===14 ||msgcont.roleId===13 ||msgcont.roleId===7 && msgcont.isRobot !==1?'t-1':'' " @click="setAtName(msgcont.name)"> -->
          <div class="chatmsg_name f-l" @click="setAtName(msgcont.name)">
            {{msgcont.name}}
          </div>
        </template>
    </div>
    <div class="msg-content">
      <div class="chatmsg_infos clearfix"   >
        <!-- <div  class="menu f-l" v-on:mouseenter="showmenu"  v-on:mouseleave="hiddenmenu" v-show="ifshowsh" >
          操作
          <ul class="menulist" v-show="ifshoumenu">
            <li @click.stop="sc">{{sctxt}}</li>
            <li @click.stop="jy">{{jytxt}}</li> 
            <li @click.stop="lh">{{lhtxt}}</li> 
          </ul>
        </div>
        <div class="shenhe f-1" v-show="ifshowsh">
          <span @click.stop="tg">{{tgtxt}}</span>
        </div>
		  </div> -->
      <div class="chatmsg_cont clearfix">
        <template v-if="msgcont.ext.mstype===1">
          <div v-html="txt" class="chatmsg_msg f-l" :class="msgcont.roleId===5 && msgcont.isRobot !==1?'zcr':''">
            {{txt}}
          </div> 
        </template>
       <template v-else-if="msgcont.ext.mstype===8">
          <div class="chatmsg_cont jiancang" @click="showStrategy($event, msgcont.name)">
            <span class="dot"></span>
            <span class="text">{{msgcont.attach}}</span>
            <a href="#" class="todetail" @click="showStrategy($event, msgcont.name)">点击查询<span class="arrow">>></span></a>
          </div>
        </template>
         <template v-else-if="msgcont.ext.mstype===3||msgcont.ext.mstype===7||msgcont.ext.mstype===5||msgcont.ext.mstype===6">
          <div class="chatmsg_msg f-l">
              <img :style="{height:(msgcont.ext.height/msgcont.ext.width)*100 +'px'}" :src="msgcont.attach">
          </div>
        </template>
        <template v-else>
          <div class="chatmsg_msg f-l">
            <lightbox album="" :src="msgcont.ext.url" style="width:300px">
              <img :style="{height:(msgcont.ext.height/msgcont.ext.width)*100 +'px'}" :src="msgcont.attach">
            </lightbox>
          </div>
        </template>
         <template v-if="msgcont.ext.mstype!==8">
         <div  class="menu f-l" v-on:mouseenter="showmenu"  v-on:mouseleave="hiddenmenu" v-show="ifshowsh" >
          操作
          <ul class="menulist" v-show="ifshoumenu">
            <li @click.stop="sc">{{sctxt}}</li>
            <li @click.stop="jy">{{jytxt}}</li> 
            <li @click.stop="lh">{{lhtxt}}</li> 
            <!--<li @click.stop="lh">{{lhtxt}}</li>-->
            <!--<li @click.stop="hf">回复</li>-->
          </ul>
        </div>
        <div class="shenhe f-1" v-show="ifshowsh">
          <span @click.stop="tg">{{tgtxt}}</span>
        </div>
         </template>
		  </div>
      </div>
      
    </div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import API from '../../api/API';
import { faceToImg, } from '../../api/interaction.js';
import '../../../static/hint.min.css';
// import Cookies from 'js-cookie';
export default {
  props: ['msgcont'],
  data() {
    return {
      ifshoumenu: false,
      tgtxt: '审核',
      sctxt: '删除',
      lhtxt: '拉黑',
      jytxt: '禁言',
    }
  },
  mounted() {
    if (this.msgcont.isAudit === 1) {
      this.tgtxt = '已通过';
    }
  },
  computed: {
    ...mapGetters(['getUserInfos', 'noticeBlackList']),
    ...mapActions(['getRoomBlockUser']),
    ...mapMutations(['deleteMsg', 'setStrategyShow']),
    txt() {
      let { attach, ext: { mstype, height, width }, } = this.msgcont;
      if (mstype === 1) {
        //文字
        return faceToImg(this.msgcont.attach);
      } else {
        //图片
      }
    },
    ifshowsh() {
      if (this.getUserInfos.roleid === 5 || this.getUserInfos.roleid === 7 || this.getUserInfos.roleid === 13 || this.getUserInfos.roleid === 14) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions({
      toNoticeBlackList: 'toNoticeBlackList',
      getLaHeiList: 'getLaHeiList'
    }),
    showStrategy(e, teacher) {
      console.log('e',e);
      
      e.stopPropagation();
      e.preventDefault();
      
      this.$store.commit('setStrategyShow', true);
      this.$store.commit('setStrategyTeacher', teacher);
    },
    showmenu() {
      this.ifshoumenu = true;
    },
    hiddenmenu() {
      this.ifshoumenu = false;
    },
    timeFormat(t, fmt) {
      const time = new Date(t * 1);
      const o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        S: time.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${time.getFullYear()}`).substr(4 - RegExp.$1.length));
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
        }
      }
      return fmt;
    },
    tg() {
      if (this.msgcont.isAudit !== 1) {
        API.audit({
          usertoken: this.getUserInfos.niugutoken,
          msgid: this.msgcont.msgId,
        }).then((res) => {
          if (res && res.code === 0) {
            this.tgtxt = '已通过';
            this.msgcont.isAudit = 1;
            this.$Message.success(res.message || '操作成功');
          } else {
            this.$Message.error(res.message || '出错了');
          }
        });
      // } else {
      //   this.$Message.error('已审核');
      }
    },
    sc() {
      API.del({
        usertoken: this.getUserInfos.niugutoken,
        msgid: this.msgcont.msgId,
      }).then((res) => {
        if (res && res.code === 0) {
          this.$store.commit('deleteMsg', this.msgcont.msgId);
        } else {
          this.$Message.error(res.msg || '出错了');
        }
      });
    },
    lh() {
      if (this.lhtxt == "已拉黑") {
        return false;
      }
      API.addBlack({
        usertoken: this.getUserInfos.niugutoken,
        uid: this.msgcont.userId,
        action: 'addblacklist',
      }).then((res) => {
        if (res && res.code === '0') {
          this.lhtxt = "已拉黑";
          this.$Message.success(res.message || '操作成功');
          // this.getLaHeiList();
          // this.$store.dispatch('getLaHeiList', Cookies.get('token'));
         this.$store.dispatch('getLaHeiList', this.$root.token);

        } else {
          this.$Message.error(res.message || '出错了');
        }
      });
    },
    jy() {
      API.blockUser({
        usertoken: this.getUserInfos.niugutoken,
        target: this.msgcont.userId,
        roomId: this.getUserInfos.roomid,
        TargetName: this.msgcont.name,
      }).then((res) => {
        if (res && res.code === 0) {
          this.jytxt = '已禁言';
          this.$store.dispatch('getRoomBlockUser');
        }
      });
    },
    hf() {
      console.log('回复');
    },
    getRoleName(id){
      let roleName = '游客';
        if (id === 1) {
          roleName = '学前班';
        } else if (id === -1) {
          roleName = '小学生';
        } else if (id === 2) {
          roleName = '中学生';
        } else if (id === 4) {
          roleName = '大学生';
        }else if (id === 5) {
          roleName = '巡管';
        }else if (id === 6) {
          roleName = '频道管理员';
        }else if (id === 7) {
          roleName = '超级管理员';
        }else if (id === 13) {
          roleName = '客服';
        }else if (id === 14) {
          roleName = '超级讲师';
        }
     return roleName;
    },
    setAtName(name)
    {
        document.querySelector('#txtMsg').innerHTML="@"+name+"&nbsp;&nbsp;";
    }
  },
}
</script>

<style lang="scss" scoped>
.chatmsg {
  margin: 4px 5px;
  min-height: 30px;
  display: flex;
  padding-right: 20px;
  .msg-logo {
    height: 100%;
    padding: 0 3px;
    //min-height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
      padding-top:5px;
    }
  }
  .msg-name{
    font-size: 14px;
    line-height: 30px;
    height: 30px;
    padding: 0 10px;
    margin-top: 6px;    
    color: #ffff;
    border-radius: 5px;
    background: rgba(0, 0, 0, .4);
    .robot
    {
      color:#fff;
    }
  }
  .name_bg_-1{
    color: #fff;
  }
  .name_bg_-1_robot{
    background: green;
  }
  .name_bg_0_robot{
    background: green;
  }
  .name_bg_1_robot{
    background: green;
  }
  .name_bg_2_robot{
    background: green;
  }
  .name_bg_3_robot{
    background: green;
  }
  .name_bg_4_robot{
    background: green;
  }
  .name_bg_5_robot{
    background: green;
  }
  .name_bg_0{
    color:#999;
  }
  .name_bg_1{
    color: #999;
  }
  .name_bg_2{
    color: yellow;
  }
  .name_bg_3{
    color: greenyellow;
  }
  .name_bg_4{
    color: red;
  }
  .name_bg_5{
    background: red;
  }
  .name_bg_6{
    background: red;
  }
  .name_bg_7{
    background: red;
  }
  // .name_bg_13{
  //   color: #002c80;
  // }
  //  .name_bg_14{
  //   color: #b233ff;
  // }
  .t-1{
      color: #fff
    }
  .msg-time{
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    margin-top: 6px;
    padding: 0 5px;
    color: #ccc;
    border-radius: 5px;
    background: rgba(0, 0, 0, .4)
  }
  .msg-content {
    // background: #fff;
    // padding: 10px;
    // width: 469px;
    // border-radius: 4px;
    // flex: 1;

    display: inline-block;
    width: auto;
    max-width: 100%;
    vertical-align: middle;
    .jiancang {
      position: relative;
      height: 36px;
      width: 400px;
      line-height: 36px;
      background-color: #FDC62E;
      border-radius: 2px;
      cursor: pointer;
      margin-left:5px;
      border-radius:5px;
      .dot {
        position: relative;
        top: -2px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-left: 12px;
        display: inline-block;
        background-color: rgb(255, 8, 8);
      }
      .text {
        font-size: 16px;
        margin: 12px;
        color: rgb(154, 97, 15);
      }
      .todetail {
        position: absolute;
        right: 36px;
        top: 0;
        font-size: 16px;
        color: rgb(154, 97, 15);
        .arrow {
          margin-left: 2px;
        }
      }
    }
  }
  & .chatmsg_infos {
    position: relative;
    height: 20px;
    // margin-top: -5px;
    & .menu {
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      // margin-left: 8px;
      position: relative;
      width: 35px;
      text-align: center;
      cursor: pointer;
      & .menulist {
        position: absolute;
        left: 0;
        top: 20px;
        background: rgb(54, 63, 80);
        z-index: 10;
        color: #64b3f0;
        width: 60px;
        text-align: center;
      }
    }
    & .chatmsg_name {
      font-size: 18px;
      line-height: 20px;
      color: #fff;
    }
    & .chatmsg_flag {
      display: inline-block;
      height: 20px;
      margin-left: 8px;
    }
    & .chatmsg_time {
      font-size: 14px;
      line-height: 20px;
      color: rgb(153, 153, 153);
      margin-left: 8px;
    }
    & .shenhe {
      font-size: 12px;
      line-height: 30px;
      color: #64b3f0;
      margin-left: 8px;
      display: inline-block;
      cursor: pointer;
    }
  }
  & .chatmsg_cont {
    //width: 100%;
    & .chatmsg_msg {
    font-size: 14px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 380px;
    line-height: 30px;
    // height: 30px;
    padding: 0px 5px;
    // margin-top: -10px;
    margin-left:5px;
    margin-top:5px;
    min-width: 40px;
    // min-height: 14px;
    // padding: 5px;
    vertical-align: middle;
    word-break: break-all;
    color: #010101;
    border-radius: 5px;
    background: #fff;
      &.zcr {
        font-size: 24px;
        line-height: 30px;
        color: #ff5257;
        font-weight: bold;
      }
    }
  }
  .mj {
    display: inline-block;
    height: 26px;
    padding: 0px 8px;
    border: 1px solid #464c5b;
    color: #39f;
    border-radius:5px;
  }
}
</style>
