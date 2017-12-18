<template lang="html">
	<video autoplay class="live-video video-js" id="live-video" preload loop @contextmenu.prevent="" controls></video>
</template>

<script>
import VideoTipsBottom from './VideoTipsBottom.vue';
import { mapGetters, mapMutations, mapActions, } from 'vuex';

const videojs = window.videojs;
videojs.options.flash.swf = './static/video-js.swf';

export default {
  components: {
    VideoTipsBottom,
  },
  data() {
    return {
      backList: [],
    }
  },
  mounted() {
    this.$store.dispatch('getPlayLive');
  },
  watch: {
    getVideoUrl(newurl) {
      console.log('newurl', newurl);

      if (newurl.type === 'zhibo') {
        this.initLiveVideo();
        this.$store.commit('setVideoTitle', `正在直播：${newurl.title}`);
      } else if (newurl.type === 'lubo') {
        this.$store.commit('setVideoTitle', '暂无直播');
        // let arr = newurl.videolist;
        // arr = arr.map(item => {
        //   return {
        //     type: `video/${item.HLSUrl.split('.').pop()}`,
        //     src: item.HLSUrl
        //   }
        // });
        // if (newurl.videolist[0].HLSUrl) this.initVideo(arr);
        this.showPoster();
      }
    },
  },
  computed: {
    /**
     * getVideoUrl 获取当前视频地址
     */
    ...mapGetters(['getVideoUrl']),
    /**
     * getPlayLive获取直播流地址
     */
    ...mapActions(['getPlayLive']),
    ...mapMutations(['setVideoTitle'])
  },
  methods: {
    initLiveVideo() {
      const player = videojs('live-video', { "controls": true, techOrder: ['html5', 'flash'] });
      player.src({
        src: this.getVideoUrl.videoUrl,
        type: 'rtmp/mp4',
      });
      player.play();
    },
    initVideo(arr) {
      const player = videojs('live-video', { "controls": true, techOrder: ['flash', 'html5'] })
      player.src(arr);
      player.play();
    },
    showPoster() {
      const player = videojs('live-video',{ "controls": true, techOrder: ['flash', 'html5'], poster: 'http://live.fxtrade888.com/live/source/poster.png' }
      );
      document.querySelector('#live-video .vjs-big-play-button').style['display'] = 'none';
      document.querySelector('#live-video .vjs-poster').style['backgroundSize'] = 'contain';
    }
  },
}
</script>

<style lang="scss">
.live-video#live-video {
  width: 100%;
  // height: 606px;
  height: auto;
  // flex-grow: 2.4;
  position: absolute;
  top: 30px;
  bottom: 190px;
}

.video-js .vjs-tech {
  object-fit: fill;
  height: 100%;
  width: 100%;
}
</style>
