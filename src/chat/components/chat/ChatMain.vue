<template lang="html">
	<div class="chatmain" ref="msgscrollbar">
		<div class="msgmain" ref="scroll">
			<template v-for="item in getChatMsgAll">
				<ChatMsg :msgcont="item"/>
			</template>
		</div>
	</div>
</template>

<script>

  import $ from 'jquery';
  import * as types from '../../store/mutation-types';
  import { mapGetters, mapMutations, } from 'vuex';
  import ChatMsg from './ChatMsg.vue';

  export default {
    data () {
      return {
        meg: 'left',
        seltabstype: 'chat',
        ifloadmsg: true,
      }
    },
    components: {
      ChatMsg
    },
    updated () {
      this.$refs.msgscrollbar.scrollTop = this.$refs.scroll.scrollHeight;
    },
    methods: {
      seltabs (type) {
        this.seltabstype = type;
      },
    },
    computed: {
      ...mapGetters(['getChatHistoryMsg', 'getNoUserInfos', 'getIfScrollScreen', 'getMinHistoryMsgId', 'getIfChatLoading', 'getUserInfos', 'getisLogin', 'getChatMsgAll', 'getMinMsgId']),
      ...mapMutations(['setIsLoading', 'setIfScrollScreen']),
    },
    watch: {
      getChatMsgAll () {
        if (this.getIfScrollScreen) {
          this.$refs.msgscrollbar.scrollTop = this.$refs.scroll.scrollHeight;
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 5px;
    height: 0px;
    background-color: #F5F5F5;
  }
  
  
  
  /*定义滚动条轨道 内阴影+圆角*/
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F3F3F3;
  }
  
  
  
  /*定义滑块 内阴影+圆角*/
  
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }
  
  .chatmain {
    position: absolute;
    top: 32px;
    bottom: 180px;
    // position: relative;
    width: 100%;
    // margin-top: 44px;
    // background: rgb(44, 47, 53);
    background-image:url('../../images/bg.jpg');
    // height: calc(100% - 180px);
    max-height: 700px;
    overflow-y: auto;
    // /*三角箭头的颜色*/
    // scrollbar-arrow-color: #f00;
    // /*滚动条滑块按钮的颜色*/
    // scrollbar-face-color: #ff0;
    /*滚动条整体颜色*/
    scrollbar-highlight-color: #555;
    /*滚动条阴影*/
    scrollbar-shadow-color: rgba(0, 0, 0, .3);
    /*滚动条轨道颜色*/
    scrollbar-track-color: rgb(44, 47, 53);
    & .msgmain {
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      min-height: 760px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>
