<template lang="html">
	<div class="chatmsg">
    <div class="msg-logo f-l">
      <template v-if="msgcont.isRobot===1">
        <img class="chatmsg_flag f-l" :src="`./static/img/flag${msgcont.roleId}.png`" alt="">
      </template>
      <template v-else>
        <img class="chatmsg_flag f-l" :src="`./static/img/flag${msgcont.roleId}.png`" alt="">
      </template>
    </div>
    <div class="msg-content">
      <div class="chatmsg_infos clearfix"  v-show="msgcont.ext.mstype!=8" >
        <template v-if="msgcont.isRobot===1">
          <div class="chatmsg_name f-l">
            {{msgcont.Robotname}}
          </div>
          <template v-if="ifshowsh">
            <div class="mj">水军</div>
          </template>
        </template>
        <template v-else>
          <div class="chatmsg_name f-l">
            {{msgcont.name}}
          </div>
        </template>
        <div class="chatmsg_time f-l">
          {{timeFormat(msgcont.addtime*1000, 'MM-dd hh:mm')}}
        </div>
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
        <div class="f-1 shenhe" v-show="ifshowsh">
          <span @click.stop="tg">{{tgtxt}}</span>
        </div>
		  </div>
      <div class="chatmsg_cont clearfix">
        <template v-if="msgcont.ext.mstype===1">
          <div v-html="txt" class="chatmsg_msg f-l" :class="msgcont.roleId===5 && msgcont.isRobot !==1?'zcr':''">
            {{txt}}
          </div>
        </template>
        <template v-else-if="msgcont.ext.mstype===8">
          <div class="chatmsg_cont jiancang" >
            <span class="dot"></span>
            <span class="text">{{msgcont.attach}}</span>
            <a href="#" class="todetail" @click="showStrategy($event, msgcont.name)">点击查询<span class="arrow">>></span></a>
          </div>
        </template>
         <template v-else-if="msgcont.ext.mstype===3||msgcont.ext.mstype===7||msgcont.ext.mstype===5||msgcont.ext.mstype===6">
          <div class="chatmsg_msg f-l">
              <img :style="{width:'350px',height:(msgcont.ext.height/msgcont.ext.width)*100 +'px'}" :src="msgcont.attach">
          </div>
        </template>
        <template v-else>
          <div class="chatmsg_msg f-l">
            <lightbox album="" :src="msgcont.ext.url" style="width:300px">
              <img :style="{width:'100px',height:(msgcont.ext.height/msgcont.ext.width)*100 +'px'}" :src="msgcont.attach">
            </lightbox>
          </div>
        </template>
      </div>
      
    </div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import API from '../../api/API';
import { faceToImg, } from '../../api/interaction.js';
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
  },
}
</script>

<style lang="scss" scoped>
.chatmsg {
  margin: 18px 0;
  min-height: 62px;
  display: flex;
  padding-right: 20px;
  .msg-logo {
    height: 100%;
    padding: 0 10px;
    min-height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
    }
  }
  .msg-content {
    background: rgb(54, 63, 80);
    padding: 10px;
    width: 469px;
    border-radius: 4px;
    flex: 1;
    .jiancang {
      position: relative;
      height: 60px;
      line-height: 60px;
      background-color: #FDC62E;
      border-radius: 2px;
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
        font-size: 18px;
        margin-left: 12px;
        color: rgb(154, 97, 15);
      }
      .todetail {
        position: absolute;
        right: 36px;
        top: 0;
        font-size: 12px;
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
    margin-bottom: 7px;
    & .menu {
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      margin-left: 8px;
      position: relative;
      width: 60px;
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
      font-size: 14px;
      line-height: 20px;
      color: #64b3f0;
      margin-left: 8px;
      display: inline-block;
    }
  }
  & .chatmsg_cont {
    width: 100%;
    & .chatmsg_msg {
      width: 100%;
      font-size: 14px;
      line-height: 20px;
      color: rgb(212, 212, 212);
      word-wrap: break-word;
      word-break: normal;
      &.zcr {
        font-size: 24px;
        line-height: 26px;
        color: #ff5257;
        font-weight: bold;
      }
    }
  }
  .mj {
    display: inline-block;
    height: 20px;
    padding: 0 5px;
    border: 1px solid #FB3838;
    color: #FB3838;
  }
}
</style>
