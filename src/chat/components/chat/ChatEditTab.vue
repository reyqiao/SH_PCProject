<template lang="html">
	<div class="chatedittab">
		<Chatemoji/>
		<img class="emoji_img" src="../../images/face.png" @click="emojibtn()" alt="" id="emoji_btn">
		<img class="pic_img"   src="../../images/pic.png" alt="">
		<img class="pic_img"   src="../../images/pic.png" alt="" @click="upimgclick">

		<form enctype="multipart/form-data" method="post" id="form1">
			<input type="file" class='hidden' ref="uploadimgref"  name="Content" id="file">
		</form>
    <div class="caitiao" onselectstart="return false;">
			<!-- 彩条 -->
      <ul class="menu">
        <li class="ding" @click.stop="caitiaoClick(13)">顶一个</li>
        <li class="zan"  @click.stop="caitiaoClick(2)">赞一个</li>
        <li class="zs"  @click.stop="caitiaoClick(3)">掌声</li>
        <li class="xh"  @click.stop="caitiaoClick(14)">鲜花</li>
        <li class="kz"  @click.stop="caitiaoClick(5)">看涨</li>
        <li class="kd"  @click.stop="caitiaoClick(6)">看跌</li>
        <li class="zd"  @click.stop="caitiaoClick(7)">震荡</li>
          
      </ul>
		</div>
		<div class="qp" @click="clearScreen" v-show="ifsendfly" onselectstart="return false;">
			清屏
		</div>
		<div class="zdgp" @click="scrollScreen" v-show="ifsendfly" onselectstart="return false;" :style="zdgpWidth">
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
     <div class="sendfly" v-show="ifsendfly" @click.stop="showSendfly">
        发送飞屏
      </div>
      <!-- <div v-show="!ifsendfly"> 暂时不用-->
      <div v-show="false">        
      	<img class="pic_service01"  @click="openQQ(1334076804)" src="../../images/server01.png" alt="">
        <img class="pic_service02"  @click="openQQ(1334076804)" src="../../images/server02.png" alt="">
        <img class="pic_service03"  @click="openQQ(1334076804)" src="../../images/server03.png" alt="">
        <img class="pic_service04"  @click="openQQ(1334076804)" src="../../images/server04.png" alt="">
      </div>
         <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
      <div class="sendfly" v-show="ifsendfly" @click.stop="showSendfly">
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
    <Modal title="发送飞屏" v-model="modal1">
        <div>
          <Upload 
          ref="upload"
          multiple 
          :format="['jpg','jpeg','png','gif']"
          :on-success="handleSuccess"
           name="fileBefore"
          type="drag" action="//live.fxtrade888.com//chatroom/chartroom/UploadPic/">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>请选择飞屏的图片</p>
          </div>
          </Upload>
          <!-- <Upload action="//www.naniu88.com//chatroom/chartroom/UploadPic/">
            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload> -->
				</div>
        <div >
					<span > <Input v-model="imgMsgTxt" type="textarea" :rows="4" placeholder="请输入飞屏的文字 something..."></Input></span> 
				</div>
        <div style="padding-top:10px;padding-left:425px">
            <Button type="warning" size="large"  @click="sendfly(this)">发 送</Button>
        </div>
    </Modal>
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
      modal1: false,
      imgMsgUrl:'',
      imgMsgTxt:'',
      zdgpWidth: {
        width: '80px'
      }
    }
  },
  methods: {
     handleSuccess (res, file) {
                this.imgMsgUrl=res.msg;
                file.url = res.msg;
                file.name = file.name;
                
            },
    showSendfly(){
                this.modal1=true;
            },
     sendfly (e) {
        this.modal1=false;
        this.$refs.upload.clearFiles();
      const msg=contentToSend(this.imgMsgTxt);
      // alert(msg);
      const msgsCont = {
        usertoken: '',
        roomId: '',
        content: '',
        sourceMsgId: ''
      };
      console.log(this.imgMsgTxt);
      msgsCont.usertoken = this.getUserInfos.niugutoken;
      msgsCont.roomId = this.getUserInfos.roomid;
      msgsCont.content = msg+'|'+this.imgMsgUrl;
      msgsCont.msgtype = '4';
      API.sendMsg(msgsCont).then((res) => {
        if (res.code === 0) {
          console.log(res, '发送飞屏');
        } else {
          this.$Message.error(res.message);
        }
       this.imgMsgTxt = '';
       this.imgMsgUrl='';
      }).catch(() => { });
    },
    caitiaoClick(value) {
      this.sendCaiTiao(value);
      // if (value === 1) {
      //   this.sendCaiTiao(3);
      // } 
      // else if (value === 2) {
      //   this.sendCaiTiao(7);
      // } 
      // else if (value === 3) {
      //   this.sendCaiTiao(5);
      // } 
      // else if (value === 4) {
      //   this.sendCaiTiao(6);
      // }
      // else if (value === 5) {
      //   this.sendCaiTiao(7);
      // }
      // else if (value === 6) {
      //   this.sendCaiTiao(8);
      // }
      // else if (value === 7) {
      //   this.sendCaiTiao(9);
      // }
    },
    openQQ(str) {
      let qq = '';
      const res =  API.getLiveServiceQQ().then((res) => {
        if (res.result === '1') {
            qq = res.QQNums;
           window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
          }
        }).catch((err) => {
          console.log(err);
        });
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
  background: rgba(0, 0, 0, 0.4);
  // &::after,
  // &::before {
  //   content: "  ";
  //   position: absolute;
  //   left: 0;
  //   width: 100%;
  //   height: 1px;
  //   background-color: rgb(60, 64, 73);
  //   /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  //   -webkit-transform: scaleY(.5);
  //   transform: scaleY(.5);
  // }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
  & .emoji_img {
    position: absolute;
    left: 10px;
    top: 14px;
    display: block;
    width: 65px;
    height: 27px;
    background-image: url(../../images/face.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  & .pic_img {
    position: absolute;
    left: 85px;
    top: 14px;
    width: 65px;
    height: 27px;
    background-image: url(../../images/pic.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  & .pic_service01 {
    position: absolute;
    left: 235px;
    top: 14px;
    width: 89px;
    height: 28px;
    background-image: url(../../images/server01.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
    & .pic_service02 {
    position: absolute;
    left: 335px;
    top: 14px;
    width: 89px;
    height: 28px;
    background-image: url(../../images/server02.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
    & .pic_service03 {
    position: absolute;
    left: 435px;
    top: 14px;
    width: 89px;
    height: 28px;
    background-image: url(../../images/server03.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  & .pic_service04 {
    position: absolute;
    left: 535px;
    top: 14px;
    width: 89px;
    height: 28px;
    background-image: url(../../images/server04.png);
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  & .qp {
    position: absolute;
    left: 234px;
    top: 14px;
    width: 41px;
    height: 27px;
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
    left: 160px;
    top: 14px;
    width: 65px;
    height: 27px;
    border-radius: 2px;
    line-height: 23px;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 198, 0);
    background-image: url('../../images/line.png');
    // border: 1px solid rgb(255, 198, 0);
    cursor: pointer;
    .menu {
      display: none;
      position: absolute;
      // left: -5px;
      bottom: 21px;
      li {
        width: 56px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        text-align: center;
        border-radius: 10px;
        background-color: #464c5b;
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
    left: 285px;
    top: 14px;
    width: 65px;
    height: 27px;
    border-radius: 2px;
    line-height: 27px;
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
    line-height: 27px;
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
    left: 373px;
    top: 14px;
    padding: 0 10px;
    height: 27px;
    line-height: 27px;
    background-color: #ffc600;
    text-align: center;
    color: #9a610f;
    cursor: pointer;
  }
  & .sjsel {
    position: absolute;
    left: 450px;
    top: 14px;
    padding: 0 10px;
    width: 80px;
    height: 27px;
    line-height: 27px;
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
