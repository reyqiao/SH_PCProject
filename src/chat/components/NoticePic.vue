<template lang="html">
	<div v-show="activityShow" class="activity">
		<div class="msg">
			<div class="close-btn" @click="closebtn()"></div>
      <div class="noticePic">
        <a :href="getTopBanner.bannerLink">
          <img :src="getTopBanner.topBanner"></img>
        </a>
      </div>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    methods: {
      closebtn () {
        this.$store.commit('setActivityShow', false);
      }
    },
    computed: {
      ...mapGetters(['getTopBanner', 'activityShow'])
    },
  }
</script>

<style lang="scss" scoped>
  .activity {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    & .msg {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 101;
      transform: translate(-50%, -50%);
      margin: auto;
      background: transparent;
      & .closebtn {
        position: absolute;
        top: -24px;
        right: -24px;
        width: 46px;
        height: 46px;
        background-image: url(../images/yugaocolse.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
      .close-btn {
        position: absolute;
        width: 34px;
        height: 34px;
        top: -70px;
        right: 0;
        cursor: pointer;
        background: url('../img/close.png');
        &::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 36px;
          background: #fff;
          left: 50%;
          top: 34px;
        }
      }
      .noticePic {
        text-align: center;
        margin: 0 auto;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
