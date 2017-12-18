<template lang="html">
	<div class="chatedittab">
		<Chatemoji/>
		<img class="emoji_img" src="../../images/emoji_img.png" @click="emojibtn()" alt="" id="emoji_btn">
		<img class="pic_img" src="../../images/pic_img.png" alt="">
		<img class="pic_img" src="../../images/pic_img.png" alt="" @click="upimgclick">

		<form enctype="multipart/form-data" method="post" id="form1">
			<input type="file" class='hidden' ref="uploadimgref"  name="Content" id="file">
		</form>
    <div class="caitiao" onselectstart="return false;">
			彩条
      <ul class="menu">
        <li class="ding" @click.stop="caitiaoClick(1)">顶一个</li>
        <li class="zan"  @click.stop="caitiaoClick(2)">赞一个</li>
        <li class="zs"  @click.stop="caitiaoClick(3)">掌声</li>
        <li class="xh"  @click.stop="caitiaoClick(4)">鲜花</li>
      </ul>
		</div>
		<div class="qp" @click="clearScreen" onselectstart="return false;">
			清屏
		</div>
		<div class="zdgp" @click="scrollScreen" onselectstart="return false;" :style="zdgpWidth">
			{{gptxt}}
      <span class="circle" v-show="gptxt==='自动滚屏'"></span>
		</div>
		<ul class="ckqb hidden">
			<li>{{looktxt}}
				<ul class="looklist">
					<li @click.stop="lookclick('查看全部')">查看全部</li>
					<li @click.stop="lookclick('只看老师')">只看老师</li>
					<li @click.stop="lookclick('与我相关')">与我相关</li>
					<li @click.stop="lookclick('过滤自己人')">过滤自己人</li>
				</ul>
			</li>
		</ul>
     <div class="sendfly" v-show="ifsendfly" @click.stop="sendfly">
        发送飞屏
      </div>
		<Dropdown class="sjsel" v-show="ifshuijun && getSjdata && getSjdata.length > 0">
			<a href="javascript:void(0)">
				{{getMjStruct.name || '选择水军'}}
				<Icon type="arrow-down-b"></Icon>
			</a>
			<Dropdown-menu slot="list" class="sjselmenu">
				<template v-for="sjitem in getSjdata">
				  <span @click="sjsend(sjitem.RobotName || '',sjitem.roleId)">{{sjitem.RobotName || ''}}</span>
				</template>
			</Dropdown-menu>
		</Dropdown>
	</div>
</template>

<script>
import { mapMutations, mapGetters, } from 'vuex';
import $ from 'jquery';
import API from '../../api/API.js';
import Chatemoji from './Chatemoji.vue';
import '../../../static/jquery.from.js';
import { contentToSend, faceToImg } from '../../api/interaction.js';


export default {
  mounted() {
    this.msgDom = document.querySelector('#txtMsg');
    this.form = $('#form1');
    this.file = $('#file');
    this.file.bind('change', () => {
      const data = {
        usertoken: this.getUserInfos.niugutoken,
        roomId: this.getUserInfos.roomid,
      };
      // 判断是否水军发送
      if (this.getMjStruct.type) {
        data.isRobot = 1;
        data.Robotname = this.getMjStruct.name;
        data.roleId = this.getMjStruct.roleId;
      }
      this.form.ajaxSubmit({
        url: "https://live.fxtrade888.com/chatroom/chartroom/sendmsg",
        data,
        dataType: 'json',
        success: () => {
        },
        error: (err) => {
        },
      });
    });
  },
  data() {
    return {
      imgData: '',
      gptxt: '关闭滚屏',
      looktxt: '查看全部',
      showemoji: false,
      ifsendfly: false,
      ifshuijun: false,
      zdgpWidth: {
        width: '80px'
      }
    }
  },
  methods: {
    caitiaoClick(value) {
      if (value === 1) {
        this.sendCaiTiao(3);
      } else if (value === 2) {
        this.sendCaiTiao(7);
      } else if (value === 3) {
        this.sendCaiTiao(5);
      } else if (value === 4) {
        this.sendCaiTiao(6);
      }
    },
    sendCaiTiao(msgType) {
      const msgsCont = {
        usertoken: '',
        roomId: '',
        sourceMsgId: '',
        content: 'caitiao',
      };
      msgsCont.usertoken = this.getUserInfos.niugutoken;
      msgsCont.roomId = this.getUserInfos.roomid;
      msgsCont.msgtype = msgType;

      // 判断是否水军发送
      if (this.getMjStruct.type) {
        msgsCont.isRobot = 1;
        msgsCont.Robotname = this.getMjStruct.name;
        msgsCont.roleId = this.getMjStruct.roleId;
      }

      API.sendMsg(msgsCont).then((res) => {
        if (res.code === 0) {
          console.log(res, '彩条发送成功');
        } else {
          this.$Message.error(res.message);
        }
      }).catch(() => { });
    },
    sendfly() {
      const msg = contentToSend(this.msgDom.innerHTML);
      const msgsCont = {
        usertoken: '',
        roomId: '',
        content: '',
        sourceMsgId: '',
      };
      if (msg === '') {
        this.msgDom.focus();
        return false;
      }
      this.msgDom.innerHTML = '';
      msgsCont.usertoken = this.getUserInfos.niugutoken;
      msgsCont.roomId = this.getUserInfos.roomid;
      msgsCont.content = msg;
      msgsCont.msgtype = '4';
      API.sendMsg(msgsCont).then((res) => {
        if (res.code === 0) {
          console.log(res, '发送飞屏');
        } else {
          this.$Message.error(res.message);
        }
      }).catch(() => { });
    },
    sjsend(n, m) {
      this.$store.commit('setMjStruct', {
        type: true,
        name: n,
        roleId: m,
      });
      this.sjname = n;
    },
    emojibtn() {
      this.showemoji = !this.showemoji;
      this.$store.commit('setEmojiShow', this.showemoji);
    },
    clearScreen() {
      this.$store.commit('clearScreen');
    },
    upimgclick() {
      this.$refs.uploadimgref.click();
    },
    scrollScreen() {
      if (this.getIfScrollScreen) {
        this.gptxt = '自动滚屏';
        this.zdgpWidth = {
          width: '80px',
          paddingLeft: '10px'
        }
        this.$store.commit('setIfScrollScreen', false);
      } else {
        this.gptxt = '关闭滚屏';
        this.zdgpWidth = {
          width: '80px'
        }
        this.$store.commit('setIfScrollScreen', true);
      }
    },
    lookclick(txt) {
      this.looktxt = txt;
      if (txt === '查看全部') {

      } else if (txt === '只看老师') {

      } else if (txt === '与我相关') {

      } else if (txt === '过滤自己人') {

      }
    },
  },
  watch: {
    getUserInfos(newUserInfos) {
      if (newUserInfos.roleid === 5 || newUserInfos.roleid === 7 || newUserInfos.roleid === 14) {
        this.ifsendfly = true;
      } else {
        this.ifsendfly = false;
      }
      if (newUserInfos.roleid === 5 || newUserInfos.roleid === 13 || newUserInfos.roleid === 7 || newUserInfos.roleid === 14) {
        this.ifshuijun = true;
      } else {
        this.ifshuijun = false;
      }
    },
  },
  components: {
    Chatemoji,
  },
  computed: {
    /**
     * getIfScrollScreen 获取是否滚屏
     * getSjdata 获取马甲列表
     */
    ...mapGetters(['getUserInfos', 'getIfScrollScreen', 'getSjdata', 'getMjStruct']),
    /*
     * setEmojiShow设置显示表情框
     * setIfScrollScreen设置是否滚屏
     * setMjStruct 设置马甲发言消息体
     */
    ...mapMutations(['setEmojiShow', 'setIfScrollScreen', 'setMjStruct']),
  },
}
</script>

<style lang="scss">
.chatedittab {
  position: relative;
  width: 100%;
  height: 61px;
  clear: both;
  &::after,
  &::before {
    content: "  ";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(60, 64, 73);
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
  & .emoji_img {
    position: absolute;
    left: 16px;
    top: 14px;
    display: block;
    width: 34px;
    height: 34px;
    background-image: url(../../images/emoji_img.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  & .pic_img {
    position: absolute;
    left: 73px;
    top: 14px;
    width: 34px;
    height: 34px;
    background-image: url(../../images/pic_img.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  & .qp {
    position: absolute;
    left: 189px;
    top: 19px;
    width: 41px;
    height: 23px;
    border-radius: 2px;
    line-height: 23px;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 198, 0);
    border: 1px solid rgb(255, 198, 0);
    cursor: pointer;
  }
  & .caitiao:hover {
    .menu {
      display: block;
    }
  }
  & .caitiao {
    position: absolute;
    left: 128px;
    top: 19px;
    width: 41px;
    height: 23px;
    border-radius: 2px;
    line-height: 23px;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 198, 0);
    border: 1px solid rgb(255, 198, 0);
    cursor: pointer;
    .menu {
      display: none;
      position: absolute;
      left: -10px;
      bottom: 21px;
      li {
        width: 56px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        text-align: center;
        border-radius: 10px;
        background-color: #9A9A9A;
        color: #fff;
        margin-bottom: 8px;
      }
      li:hover {
        background-color: #F6892C;
      }
    }
  }
  & .zdgp {
    position: absolute;
    left: 250px;
    top: 19px;
    width: 65px;
    height: 23px;
    border-radius: 2px;
    line-height: 23px;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 198, 0);
    border: 1px solid rgb(255, 198, 0);
    cursor: pointer;
    .circle {
      display: block;
      position: absolute;
      left: 5px;
      top: 5px;
      width: 12px;
      height: 12px;
      background: url('../../images/circle.png') no-repeat;
    }
  }
  & .ckqb {
    position: absolute;
    top: 19px;
    width: 73px;
    height: 23px;
    border-radius: 2px;
    line-height: 23px;
    font-size: 12px;
    color: rgb(255, 198, 0);
    border: 1px solid rgb(255, 198, 0);
    cursor: pointer;
    text-align: center;
    & li:hover .looklist {
      display: block;
    }
    .looklist {
      display: none;
    }
  }
  .sendfly {
    position: absolute;
    left: 346px;
    top: 19px;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    background-color: #ffc600;
    text-align: center;
    color: #9a610f;
  }
  & .sjsel {
    position: absolute;
    left: 430px;
    top: 19px;
    padding: 0 10px;
    width: 80px;
    height: 24px;
    line-height: 24px;
    background-color: rgb(255, 198, 0);
    text-align: center;
    a {
      color: rgb(154, 97, 15);
    }
    .ivu-dropdown-rel {
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .ivu-icon-arrow-down-b {
      position: relative;
    }
    .ivu-icon-arrow-down-b::before {
      content: " ";
      display: block;
      position: absolute;
      right: -10px;
      top: -8px;
      width: 11px;
      height: 9px;
      background: url("../../img/arrowbottom.png") no-repeat;
    }
    .ivu-dropdown-menu {
      min-width: 0;
    }
    & .ivu-select-dropdown{
      width:150px;
    }
    & .sjselmenu {
      width:150px;
      height: 100px;
      overflow-y: auto;
      text-align: center;
      & span {
        display: block;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        border-bottom: 1px solid rgb(255, 198, 0);
      }
    }
  }
}
</style>
