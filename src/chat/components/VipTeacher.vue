<template lang="html">
  <div class="mask">
    <div class="teacher-modal" id="teacherModal">
      <div class="close-btn" @click="close"></div>
      <div class="teacher-names">
        <div class="teacher-item" :class="index===teacher?'active':''" v-for="(item, index) in getLiveTeacherList" :key="index" @click="selTeacher(index)">{{item.teachername}}</div>
      </div>
      <Carousel :autoplay="autoplay" dots="none" v-model="teacher">
        <Carousel-item v-for="(teacherinfo, index) in getLiveTeacherList" :key="index" class="vipteacher clearfix">
          <div class="teacher-info f-l">
            <div class="vipteacher_name">
              {{teacherinfo.teachername}} <span>胜率：{{teacherinfo.WinRate}}</span> <span>月均收益：{{teacherinfo.Income}}%</span>
            </div>
            <div class="vipteacher_info">
              {{teacherinfo.teacherinfo}}
            </div>
            <div class="vipteacher_tips">
              {{teacherinfo.Introduce}}
            </div>
            <div class="vipteacher_flag" v-if="teacherinfo.TeacherTag">
              <span v-for="item in teacherinfo.TeacherTag.split(',')" >
                {{item}}
              </span>
            </div>
          </div>
          <div class="vipteacher_img f-l">
            <img :src="teacherinfo.TeacherFace">
          </div>
        </Carousel-item>
      </Carousel>
    </div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      teacher: 0,
      autoplay: true
    }
  },
  computed: {
    ...mapGetters(['getLiveTeacherList'])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch(types['GET_LIVE_TEACHER_LIST']);
    })
  },
  methods: {
    close() {
      this.$store.commit('setTeacherModal', false);
      this.autoplay = true;
    },
    selTeacher(index) {
      this.teacher = index;
      this.autoplay = false;
    }
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

#teacherModal {
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

.teacher-modal {
  position: absolute;
  width: 688px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('../img/tbg.png') no-repeat;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-size: cover;
  .close-btn {
    position: absolute;
    width: 34px;
    height: 34px;
    top: -70px;
    right: 0;
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
  .teacher-names {
    width: 100%;
    height: 48px;
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .teacher-item {
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
    .teacher-item.active {
      background-color: rgb(255, 198, 0);
      color: rgb(167, 110, 13)
    }
  }
}

.vipteacher {
  width: 100%;
  margin: 10px auto;
  .teacher-info {
    width: 484px;
    color: #fff;
    padding-left: 40px;
  }
  & .vipteacher_img {
    width: 200px;
    text-align: center;
    img {
      width: 144px;
    }
  }
  & .vipteacher_name {
    height: 23px;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 15px;
    span {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  & .vipteacher_record {
    font-size: 14px;
    line-height: 14px;
    height: 14px;
  }
  & .vipteacher_flag {
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
  & .vipteacher_tips {
    width: 100%;
    font-size: 12px;
    line-height: 22px;
    color: rgb(255, 255, 255);
  }
}
</style>
