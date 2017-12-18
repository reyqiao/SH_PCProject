<template lang="html">
	<div v-show="ifshow" class="videotipsbottom clearfix">
		<div class="noticeimg">
		</div>
		{{getNotice}}
		<div class="returnvideo f-r" v-show="getVideoUrl.type === 'zhibo' && this.getBackLive" @click.stop="goLive">
			<返回直播
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      ifshow: true,
    }
  },
  computed: {
    ...mapGetters(['getNotice', 'getVideoUrl', 'getBackLive']),
  },
  methods: {
    goLive() {
      const player = videojs('liveVideo', { "controls": true, techOrder: ['flash', 'html5'] });
      player.src({
        src: this.getVideoUrl.videoUrl,
        type: 'application/x-mpegURL',
      });
      player.play();
    }
  }
}
</script>

<style lang="scss" scoped>
.videotipsbottom {
  position: relative;
  width: 100%;
  height: 37px;
  background: #5A5A5A;
  position: absolute;
  left: 0;
  bottom: -37px;
  line-height: 37px;
  font-size: 18px;
  color: #fff;
  padding-left: 58.5px;
  & .noticeimg {
    position: absolute;
    left: 19.5px;
    top: 4px;
    width: 26px;
    height: 26px;
    background-image: url(../../images/noticeimg.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
  & .returnvideo {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
