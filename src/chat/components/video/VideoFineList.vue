<template lang="html">
	<div class="videofinelist">
    <Carousel dots="none" autoplay :autoplay-speed="cspeed" easing="ease" arrow="always">
       <Carousel-item v-for="(videoFineInfo,index) in currList" :key="index">
        <div class="videofine_list clearfix" @click="playVedio(videoFineInfo)">
          <img class="list_img f-l" :src="videoFineInfo.Cover">
          <div class="list_cont f-l">
            <div class="list_cont_tips">
              {{videoFineInfo.VideoTheme}}
            </div>
            <div class="list_cont_msg">
              {{videoFineInfo.Introduce}}
            </div>
          </div>
        </div>
       </Carousel-item>
    </Carousel>
	</div>
</template>

<script>
import * as types from '../../store/mutation-types';
import API from '../../api/API';
import { mapGetters, mapMutations, } from 'vuex';

export default {
  props: ['type', 'totle'],
  data() {
    return {
      currList: [],
      cspeed: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this.getCurrList('1');
    }, 50);
  },
  methods: {
    pageclick(pageindex) {
      this.getCurrList(pageindex);
    },
    getCurrList(pageindex) {
      API.GetLiveVideo({
        action: 'GetLiveVideo',
        type: this.type,
        pagesize: '100',
        pageindex: pageindex,
      }).then((res) => {
        if (res && res.code === '0') {
          this.currList = res.list;
        }
      });
    },
    playVedio(url) {
      this.$store.commit('setVideoTitle', `精彩视频：${url.VideoTheme}`);
      const player = videojs('live-video', { "controls": true, techOrder: ['flash', 'html5'] })
      player.src({
        src: url.VideoPath,
        type: `video/${url.VideoPath.split('.').pop()}`,
      });
      player.play();
    }
  }
}
</script>

<style lang="scss">
.videofinelist {
  margin: 0 20px;
  .ivu-carousel {
    .ivu-carousel-arrow {
      width: 14px;
      height: 38px;
      transform: translateY(-50%);
      background-color: rgb(33, 34, 36);
    }
    .left {
      left: -21px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      z-index: 1;
    }
    .right {
      right: -21px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      z-index: 10;
    }
  }
  & .videofine_list {
    padding: 16px 20px 25px 16px;
    max-height: 145px;
    & .list_img {
      display: block;
      width: 190px;
      height: 106px;
    }
    & .list_cont {
      width: calc(100% - 210px);
      height: 106px;
      margin-left: 20px;
      & .list_cont_tips {
        font-size: 16px;
        width: 100%;
        color: #fff;
      }
      & .list_cont_msg {
        width: 100%;
        padding-top: 8px;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }
    }
  }
  & .videofine_page {
    width: 100%;
    height: 100%;
    line-height: 62px;
    text-align: center;
    .ivu-page-item-active {
      background: #000;
    }
  }
}
</style>
