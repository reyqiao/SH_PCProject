<template lang="html">
	<div class="chatedit">
		<ChatEditTab/>
		<div class="chateditmsg" contenteditable="true" @click="editMstFocus" id="txtMsg" placeholder="观望一天不如咨询一遍，请输入您的问题">
    </div>
    <div class="msgsend">
      <div class="send" @click.stop="send">发送</div>
    </div>
	</div>
</template>

<script>
import ChatEditTab from './ChatEditTab.vue';
import { mapGetters, mapMutations, } from 'vuex';
import API from '../../api/API.js';
import { contentToSend, faceToImg } from '../../api/interaction.js';

export default {
  data() {
    return {
      inputText: '',
    }
  },
  components: {
    ChatEditTab,
  },
  mounted() {
    this.msgDom = document.querySelector('#txtMsg');
  },
  computed: {
    /**
     * getCurrEmojiCode获取当前编辑的表情code
     * getisLogin 获取是否已经登录
     * getUserInfos 获取用户相关信息
     * getMjStruct 获取马甲发言消息体
     */
    ...mapGetters(['getCurrEmojiCode', 'getisLogin', 'getUserInfos', 'getMjStruct']),
    /**
     * addMsgs发送消息
     * addEmoji 添加当前编辑的表情
     * setMjStruct 设置马甲发言消息体
     */
    ...mapMutations(['addMsgs', 'addEmoji', 'setMjStruct']),
  },
  methods: {
    editMstFocus() {
      this.hint = false;
      this.msgDom.focus();
    },
    send() {
      
      const msgsCont = this.getMsgCont();

      API.sendMsg(msgsCont).then((res) => {
        if (res.code === 0) {
        } else {
          this.$Message.error(res.message);
        }
      }).catch(() => { });
    },
    getMsgCont() {
      const msg = contentToSend(this.msgDom.innerHTML);
      if (msg === '') {
        this.msgDom.focus();
        return false;
      }
      this.msgDom.innerHTML = '';
      const msgsCont = {
        usertoken: this.getUserInfos.niugutoken,
        roomId: this.getUserInfos.roomid,
        content: msg,
        sourceMsgId: '',
      };

      if (this.getMjStruct.type) {
        msgsCont.isRobot = 1;
        msgsCont.Robotname = this.getMjStruct.name;
        msgsCont.roleId = this.getMjStruct.roleId;
      }

      return msgsCont;
    }
  },
  watch: {
    getCurrEmojiCode(newcode) {
      if (newcode.ifadd) {
        this.msgDom.innerHTML += faceToImg(newcode.cont);
        this.$store.commit('addEmoji', { ifadd: false, cont: '', });
      }
    },
    getUserInfos(newUserInfos) {
      if (newUserInfos.roleid === 5 || newUserInfos.roleid === 13 || newUserInfos.roleid === 7 || newUserInfos.roleid === 14) {
        this.ifsendfly = true;
      } else {
        this.ifsendfly = false;
      }
    },
    getMjStruct(newmj) {
      // if (newmj.type) {
      //   const msg = contentToSend(this.msgDom.innerHTML);
      //   const msgsCont = {
      //     usertoken: '',
      //     roomId: '',
      //     content: '',
      //     sourceMsgId: '',
      //   };
      //   if (msg === '') {
      //     this.msgDom.focus();
      //     return false;
      //   }
      //   this.msgDom.innerHTML = '';
      //   msgsCont.usertoken = this.getUserInfos.niugutoken;
      //   msgsCont.roomId = this.getUserInfos.roomid;
      //   msgsCont.content = msg;
      //   msgsCont.isRobot = 1;
      //   msgsCont.Robotname = newmj.name;
      //   msgsCont.roleId = newmj.roleId;
      //   API.sendMsg(msgsCont).then((res) => {
      //     this.$store.commit('setMjStruct', {
      //       type: false,
      //       name: '',
      //     });
      //   }).catch(() => { });
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
.chatedit {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
  background: rgb(44, 47, 53);
  flex: 1;
  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #999;
  }
  & .chateditmsg {
    margin: 6px;
    padding: 10px 10px 10px 16px;
    width: 100%;
    font-size: 18px;
    line-height: 30px;
    overflow: hidden;
    overflow-y: auto;
    outline: none;
    height: 120px;
    background: rgb(59, 64, 74);
    border: 1px solid rgb(32, 35, 40);
    color: #fff;
  }
  & .sendfly {
    position: absolute;
    right: 150px;
    bottom: 9px;
    width: 98px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #64b3f0;
    cursor: pointer;
    border-radius: 2px;
    color: #64b3f0;
  }
  & .send {
    position: absolute;
    right: 25px;
    bottom: 20px;
    width: 54px;
    height: 27px;
    line-height: 27px;
    font-size: 16px;
    color: rgb(154, 97, 15);
    text-align: center;
    background-color: rgb(254, 214, 65);
    cursor: pointer;
  }
}
</style>
