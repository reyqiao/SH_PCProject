<template lang="html">
	<div class="right-b">
		<div class="chatmainhead clearfix">
			<!-- 互动交流<span class="number" id="onlineNum">（{{num}}人在线）</span>人在线 -->
			互动交流<span class="number" id="onlineNum"></span>人在线      
		</div>
		<ChatMain/>
		<ChatEdit/>
	</div>
</template>

<script>
import ChatMain from './chat/ChatMain.vue';
import ChatEdit from './chat/ChatEdit.vue';
import Cookie from 'js-cookie';
import API from '../api/API';
export default {
  data() {
    return {
      meg: 'right',
      num: 800,
      baseNum: 200,
      floorNum: 100,
      randomNum: 800,
    }
  },
  mounted() {
    // this.getFloorNumber();
    // this.getInlinePerson().then(() => {
    //   this.getInlineNumber();
    //   setInterval(() => {
    //     this.getInlineNumber();
    //   }, 5000)
    // });
  },
  methods: {
    // getInlinePerson() {
    //   return API.getInlinePersons({
    //      //usertoken: Cookie.get('token'),180111
    //     usertoken: this.$root.token,
    //     action: 'getacount',
    //   }).then(res => {
    //     if (res.code === 0) {
    //       this.baseNum = res.data;
    //       if (this.baseNum === 0) {
    //         this.num = 0;
    //       } else {
    //         this.num = Math.floor(Math.random() * 5) + this.baseNum;
    //       }
    //     }
    //   });
    // },
    // getInlineNumber(){      
    //   const temCount = Math.floor(Math.random() * 5) - 50 + this.num;
    //   if (this.baseNum === 0 && this.floorNum === 0) {
    //     this.num = 0;
    //   } else if (temCount >= this.baseNum + this.floorNum) {
    //     this.num = temCount - 100;
    //   } else if (temCount <= this.baseNum - this.floorNum || temCount <= 5) {
    //     this.num = temCount + 100;
    //   } else {
    //     this.num = temCount;
    //   }
    //   this.randomNum= temCount;      
    // },
    // getFloorNumber() {
    //   const time = new Date().getHours();
    //   if (time > 10 && time < 12) {
    //     this.floorNum = 100;
    //   } else if (time >= 12 && time <= 18) {
    //     this.floorNum = 300;
    //   } else if (time >= 18 && time <= 22) {
    //     this.floorNum = 200;
    //   } else {
    //     this.floorNum = 0;
    //   }
    // },
  },
  components: {
    ChatMain,
    ChatEdit,
  },
}
</script>

<style lang="scss">
.right-b {
  position: relative;
  height: 100%;
  width: 37.5%;
  display: flex;
  flex-direction: column;
  background-image: url('../images/bg.jpg');
  & .chatmainhead {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    .number {
      color: rgb( 184, 182, 182)
    }
    & .chatroom_btn {
      width: 98px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 18px;
      border: 1px solid rgb(255, 76, 81);
      color: rgb(255, 76, 81);
      cursor: pointer;
    }
  }
}
</style>
