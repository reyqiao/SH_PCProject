<template lang="html">
	<div class="main-video">
    <VideoTips/>
		<VideoMain/>
		<VideoInfos/>
	</div>
</template>

<script>
import VideoMain from './video/VideoMain.vue';
import VideoInfos from './video/VideoInfos.vue';
import VideoTips from './video/VideoTips.vue';
export default {
  data() {
    return {
      meg: 'left',
    }
  },
  components: {
    VideoMain,
    VideoInfos,
    VideoTips
  },
}
</script>

<style lang="scss">
.main-video {
  height: 100%;
  flex: 1;
  // display: flex;
  // flex-direction: column;
  margin: 0 6px;
  position: relative;
  .video-js .vjs-big-play-button:before,
  .video-js .vjs-control:before,
  .video-js .vjs-modal-dialog,
  .vjs-modal-dialog .vjs-modal-dialog-content {
    top: 3px;
  }
}
</style>
