<template lang="html">
	<div class="videotipsf">
    <div class="videoinfos f-l">
      <img src="../../img/live.png">
      <span>{{getVideoTitle}}</span>
      <span v-show="getVideoUrl.type === 'zhibo'"><a href="#" @click="gobackLive()"><img src="../../img/right-arrow.png" style="height:14px;width:14px" alt="返回直播" title="返回直播"/></a></span>
    </div>
		<div v-show="getMarqueeifshow" class="videotips f-r">
			<div class="marqueelist">
				<marquee scrollamount='4'>
					<template v-for="item in getMarquee">
						<i class="marqueeitemimg"></i><a target="_blank" :href="item.MarqueeLink" class="marqueeitem">{{item.MarqueeText}}</a>
				 	</template>
				</marquee>
			</div>
			<div class="close_btn hidden" @click="marqueeclose()" ></div>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  const videojs = window.videojs;
  videojs.options.flash.swf = './static/video-js.swf';

  export default {
    methods: {
      marqueeclose () {
        this.$store.commit('setMarqueeifshow', false);
      },
      gobackLive () {
        this.$store.commit('setVideoTitle', `正在直播：${this.getVideoUrl.title}`);
        const player = videojs('live-video', { "controls": true, techOrder: ['flash', 'html5'] });
        player.src({
          src: this.getVideoUrl.videoUrl,
          type: 'rtmp/mp4',
        });
        player.play();
      },
    },
    computed: {
      ...mapGetters(['getMarquee', 'getMarqueeifshow', 'getVideoTitle']),
      ...mapMutations(['setMarqueeifshow']),
      ...mapGetters(['getNotice', 'getVideoUrl', 'getBackLive']),
    }
  }
</script>

<style lang="scss" scoped>
  .videotipsf {
    width: 100%;
    height: 30px;
    background: #212224;
    .videoinfos{
      width: 25%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      span{
        vertical-align: middle;
        font-size: 14px;
        padding-left: 5px;
      }
    }
    & .videotips {
      width: 75%;
      height: 30px;
      background: #212224;
      position: relative;
      line-height: 30px;
      color: #fff;
      a {
        color: #fff;
      }
      & .marqueelist {
        width: 100%;
        height: 30px;
        background: #212224;
        marquee{
          background: #212224;
        }
        & .marqueeitem {
          padding-left: 6.5px;
          padding-right: 34px;
          position: relative;
          cursor: pointer;
        }
        & .marqueeitemimg {
          position: relative;
          top: 4px;
          display: inline-block;
          width: 18px;
          height: 16px;
          background-image: url(../../img/message.png);
          background-color: #212224;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      & .close_btn {
        position: absolute;
        right: 5px;
        top: 10px;
        width: 10px;
        height: 10px;
        background-image: url(../../images/viedotipsclose.png);
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;
      }
    }
  }
</style>
