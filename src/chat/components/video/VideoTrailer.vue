<template lang="html">
	<div v-show="getVideoInfosType=='VideoTrailer'" class="videotrailer">
		<div class="msg">
			<div class="closebtn" @click="closebtn()"></div>
      <div class="noticePic">
        <img :src="getNoticePic"></img>
      </div>
		</div>
	</div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    methods: {
      closebtn () {
        this.$store.commit('setVideoInfosType', 'VideoLive');
      }
    },
    created () {
      this.$store.dispatch('getLiveNoticePic');
    },
    computed: {
      ...mapGetters(['getVideoInfosType', 'getNoticePic']),
      ...mapMutations(['setVideoInfosType']),
      ...mapActions(['getLiveNoticePic'])
    },
  }
</script>

<style lang="scss" scoped>
  .videotrailer {
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
        background-image: url(../../images/yugaocolse.png);
        background-repeat: no-repeat;
        background-size: contain;
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
