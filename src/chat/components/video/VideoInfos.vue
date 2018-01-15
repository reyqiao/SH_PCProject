<template lang="html">
	<div class="viedoinfos">
		<div class="notice">
      <div style="background: rgba(0, 0, 0, 0.5);border-radius: 4px;">
      <div class="notice-top">
        <img src="../../img/gg.png"/>
        <span> 公告</span>
      </div>
      <div class="notice-content">{{getNotice}}</div>
      </div>
    </div>
    <div class="advance">
      <div style="background: rgba(0, 0, 0, 0.5);border-radius: 4px;">
      <div class="advance-top">
        <!-- <div class="top-btn up" @click="()=>{perfectActive=true;activeShow =false;tabShow =! tabShow}" style="color: rgb(255,198,0)">
          <span>精彩视频</span>
          <img src="../../img/13.png" v-show="tabShow">
          <img src="../../images/arrow_right.png" v-show="!tabShow">
        </div>
        <div class="perfict-content" v-show="tabShow">
          <template v-for="(item,index) in getLiveVideoType" >
            <template v-if="index===0">
              <div class="top-btn" @click="seltabs(index,item.Id)" :class="[seltabstypeindex==index ? 'active' : '']">{{item.VideoName}}</div>
            </template>
            <template v-else-if="index=== getLiveVideoType.length-1">
              <div class="top-btn" :class="[seltabstypeindex==index ? 'active' : '']" @click="seltabs(index,item.Id)">{{item.VideoName}}</div>
            </template>
            <template v-else>
              <div class="top-btn" :class="[seltabstypeindex==index ? 'active' : '']" @click="seltabs(index,item.Id)">{{item.VideoName}}</div>
            </template>
          </template>
        </div> -->
        <!--精彩视频下拉-->
        <Dropdown  @click="()=>{perfectActive=true;activeShow =false;tabShow =! tabShow}" style="color: rgb(255,198,0);">
          <div class="top-btn up" @click="()=>{perfectActive=true;activeShow =false;tabShow =! tabShow}" style="color: rgb(255,198,0)">
          <a href="javascript:void(0)">
             精彩视频
            <Icon type="arrow-down-b"></Icon>
          </a>
          </div>
          <Dropdown-menu slot="list" class="perfict-content" style="background: rgb(17, 68, 103);">
            <template v-for="(item,index) in getLiveVideoType">
              <template v-if="index===0">
              <div class="top-btn" @click="seltabs(index,item.Id)" :class="[seltabstypeindex==index ? 'active' : '']">{{item.VideoName}}</div>
              </template>
              <template v-else-if="index=== getLiveVideoType.length-1">
                <div class="top-btn" :class="[seltabstypeindex==index ? 'active' : '']" @click="seltabs(index,item.Id)">{{item.VideoName}}</div>
              </template>
              <template v-else>
                <div class="top-btn" :class="[seltabstypeindex==index ? 'active' : '']" @click="seltabs(index,item.Id)">{{item.VideoName}}</div>
              </template>
            </template>
          </Dropdown-menu>
        </Dropdown> 
        <!--精彩视频下拉-->
        <div class="top-btn up" :class="[activeShow==true ? 'active' : '']" @click="()=>{activeShow = true;perfectActive =false}">最新活动</div>
        <div class="active-content" v-show="activeShow&&!perfectActive">
           <a :href="getTopBanner.bannerLink" class="banner">
          <img :src="getTopBanner.topBanner" style="padding:6px;max-width: 750px;max-height: 150px;"></img>
        </a>
        </div>
      </div>
      <div class="advance-content" v-show="perfectActive&&!activeShow">
        <template v-for="(item,index) in getLiveVideoType">
          <div class="content">
          <VideoFineList :totle="item.Totalcount" :type="item.Id" v-if="seltabstypeindex == index"></VideoFineList>
          </div>
        </template>
      </div>
    
    </div>
    </div>
	</div>
</template>

<script>
import * as types from '../../store/mutation-types';
import { mapGetters, mapMutations, } from 'vuex';
import VideoLive from './VideoLive.vue';
import VideoTrailer from './VideoTrailer.vue';
import VideoFineList from './VideoFineList';

export default {
  data() {
    return {
      msg: 'viedoinfos',
      seltabstypeindex: '0',
      perfectActive: true,
      activeShow: false,
      tabShow: false
    }
  },
  components: {
    VideoTrailer,
    VideoLive,
    VideoFineList
  },
  methods: {
    seltabs(index, id) {
      this.seltabstypeindex = index;
      this.$store.commit('setCurrVideoInfosType', id);
      this.activeShow = false;
      this.perfectActive = true;
    },
    showActivity() {
      // this.$store.commit('setActivityShow', true);
    }
  },
  computed: {
    ...mapGetters(['getVideoInfosType', 'getLiveVideoType', 'getCurrLiveVideoType', 'getNotice', 'getTopBanner']),
    ...mapMutations(['setVideoInfosType', 'setCurrVideoInfosType']),
  },
  mounted() {
    this.$store.dispatch(`${types.GET_LIVE_VIDEO_TYPE}`).then(() => {
      console.log('获取视频类型成功');
    }).catch((err) => {
      this.$Message.warning('获取视频类型失败,请联系网站管理员.');
    });
  },
  watch: {
    getLiveVideoType(val) {
      if (typeof val !== 'undefined'&&val.length > 0) {
        this.$store.commit('setCurrVideoInfosType', val[0]['Id']);undefined
        this.seltabs(0, val[0]['Id']);
      }
    },
    perfectActive(val) {
      console.log('val', val);
    }
  }
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
.viedoinfos {
  width: 100%;
  // flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 190px;
  position: absolute;
  bottom: 0;
  .notice {
    width: 30%;
    height: 100%;
    background-image:url('../../images/bg.jpg');
    margin-top: 6px;
    border-radius: 4px;
    margin-left: 4px;
    color: #fff;
    font-size: 14px;
    .notice-top {
      width: 100%;
      height: 36px;
      line-height: 36px;
      margin-left: 5px;
      border-bottom: 1px solid #F3F3F3;
    }
    .notice-content {
      height: 145px;
      overflow-y: auto;
      padding: 14px 7px;
       /*滚动条整体颜色*/
      scrollbar-highlight-color: #555;
      /*滚动条阴影*/
      scrollbar-shadow-color: rgba(0, 0, 0, .3);
      /*滚动条轨道颜色*/
      scrollbar-track-color: rgb(44, 47, 53);
    }
  }
  .advance {
    width: 200px;
    height: 100%;
    background-image: url('../../images/bg.jpg');
    margin-top: 6px;
    margin-left: 2px;
    border-radius: 4px;
    overflow-y: auto;
    flex: 1;
    font-size: 14px;
    .active-content {
      background: rgba(0,0,0,.5);
      height: 145px;
      border-radius: 4px;
      a {
        display: block;
        // padding-top: 53px;
        text-align: center;
      }
    }
    .advance-top {
      width: 100%;
      height: 36px;

      .top-btn {
        height: 36px;
        line-height: 36px;
        // float: left;
        padding: 0 15px;
        text-align: center;
        color: #fff;
        border-right: 1px solid #3c4049;
        border-radius:4px;
        background-color: #343840;
        cursor: pointer;
        span {
          vertical-align: middle;
        }
        img {
          padding: 0 5px;
        }
      }
      .perfict-content {
        .top-btn {
          border-bottom: 1px solid rgb(135, 135, 135);
        }
      }
      .top-btn.up {
        background:linear-gradient(180deg,#474c57,#23272d)114467;
        display: inline-block;
        // color: #39f;
        // linear-gradient(to bottom, rgb(71, 76, 87), rgb(35, 39, 45));
      }
      .top-btn.active {
        border-bottom: 1px solid #3c4049;
        color: #39f;
      }
    }
  }
}
</style>
