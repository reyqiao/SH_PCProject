<template lang="html">
  <div class="mask">
    <div class="banner-modal" id="bannerModal">
      <div class="close-btn" v-show="isShowClose" @click="close"></div>
      <div class="banner-names">
        <!-- <img src="http://images.shejidaren.com/wp-content/uploads/2017/09/084215WOE.jpg"/> -->
        <!-- <img src="../img/welcome.png"/> -->

          <a :href="getTopBanner.poppicLink">
          <!-- <img class="welcomepic" src="../images/welcome.png" alt="" @click="openQQ(1334076804)"> -->
          <img  :src="getTopBanner.poppicData" alt="" @click="openQQ(1334076804)">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types';
import { mapGetters, mapMutations, mapActions, } from 'vuex';
import API from '../api/API.js';

export default {
  data() {
    return {
      banner: 0,
      isShowClose: true,
    }
  },
    computed: {

    /**
     * getTopBanner获取首页banner图
     * getisLogin获取是否已登录
     * getUserInfos 获取正式登录用的信息
     * getIsVisitor 是否开启了游客登录
     * getHmd 获取黑名单列表
     */
    ...mapGetters(['getTopBanner', 'getisLogin', 'getUserInfos', 'getIsVisitor', 'getHmd', 'getSjdata', 'showRegisterBtn', 'laheilist', 'noticeBlackList','getIfScrollScreen', 'getMjStruct']),
    },
  methods: {
    close() {
      this.isShowClose=false;
      this.$store.commit('setBannerModal', false);
    },
    openQQ(str) {
      let qq = '';
      const res =  API.getLiveServiceQQ().then((res) => {
        if (res.result === '1') {
            qq = res.QQNums;
           window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
          }
        }).catch((err) => {
          console.log(err);
      });
    },
  }
}
</script>

<style lang="scss">
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 222;
}

#bannerModal {
  .ivu-carousel {
    .ivu-carousel-arrow {
      width: 20px;
      height: 54px;
      transform: translateY(-100%);
      background-color: rgb(54, 63, 80)
    }
    .left {
      left: 1px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .right {
      right: 1px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
}

.banner-modal {
  position: absolute;
  width: 600px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
//   background: url('../img/tbg.png') no-repeat;
//   border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-size: cover;
  .close-btn {
    position: absolute;
    width: 34px;
    height: 34px;
    top: -20px;
    right: 0px;
    cursor:pointer;
    background: url('../img/close.png');
    // &::after {
    //   content: '';
    //   position: absolute;
    //   width: 1px;
    //   height: 36px;
    //   background: #fff;
    //   left: 50%;
    //   top: 34px;
    // }
  }
  .banner-names {
    width: auto;
    height: auto;
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .banner-item {
      width: auto;
      min-width: 90px;
      height: 48px;
      line-height: 48px;
      padding: 0 10px;
      margin: 0 1px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      background-color: rgba(255, 255, 255, .3)
    }
    .banner-item.active {
      background-color: rgb(255, 198, 0);
      color: rgb(167, 110, 13)
    }
  }
}

.vipbanner {
  width: 100%;
  margin: 10px auto;
  .banner-info {
    width: 484px;
    color: #fff;
    padding-left: 40px;
  }
  & .vipbanner_img {
    width: 200px;
    text-align: center;
    img {
      width: 144px;
    }
  }
  & .vipbanner_name {
    height: 23px;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 15px;
    span {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  & .vipbanner_record {
    font-size: 14px;
    line-height: 14px;
    height: 14px;
  }
  & .vipbanner_flag {
    width: 587px;
    margin: 10px 0px;
    & span {
      height: 23px;
      font-size: 12px;
      line-height: 23px;
      color: #fff;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, .4);
      padding: 2px 5px;
      margin-right: 5px;
      background: rgba(0, 0, 0, .4);
    }
  }
  & .vipbanner_tips {
    width: 100%;
    font-size: 12px;
    line-height: 22px;
    color: rgb(255, 255, 255);
  }
}
</style>
