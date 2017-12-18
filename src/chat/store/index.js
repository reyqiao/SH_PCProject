import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * 全局游客登录定时器
     */
    timer: null,
    /**
     * 黑名单用户列表
     */
    hmd: [],
    /**
     * 登录状态数据结构体
     */
    loginStruct: {
      /**
       * 是否登录
       */
      isLogin: false,
      /*
       * 是否开启游客模式
       */
      isVisitor: '1'
    },
    /**
     * 显示注册按钮
     */
    showRegisterBtn: false,
    /**
     * 显示状态数据结构体
     */
    showStruct: {
      /**
       * 是否显示加载框
       */
      isLoading: false,
      /**
       * 是否显示登录框
       */
      loginShow: false,
      /**
       * 是否显示注册框
       */
      registerShow: false,
      /**
       * 是否显示找回密码框
       */
      getpwdShow: false,
      /**
       * 是否表情框
       */
      emojiShow: false,
      // 关闭登录
      loginCLose: false
    },
    /**
     * 用户数据结构体
     */
    userinfoStruct: {
      /**
       * 牛股王
       */
      niugutoken: '',
      niuguname: '未登录',
      niuguid: '',
      niugulogourl: '',
      /**
       * 0游客 1会员  2黄金  3钻石  4至尊 5巡管  6频道管理  7超管  8白银  13客服  14超级讲师
       */
      roleid: '',
      rolename: '',
      /**
       * YX
       */
      yxtoken: '',
      yxid: '',
      roomaddr: [],
      roomid: '',
      /**
       * 马甲设置
       */
      sjdata: []
    },
    /**
     * 聊天室数据结构体
     */
    chatStruct: {
      /**
       * 聊天室消息列表
       */
      chatMsgList: [],
      /**
       * 是否自动滚屏
       */
      ifScrollScreen: true
    },
    /**
     * 马甲发言消息体
     */
    mjStruct: {
      type: false,
      name: ''
    },
    /**
     * 当前直播视频消息体
     */
    viedoStruct: {
      type: '',
      videoUrl: '',
      videolist: []
    },
    /*
     * 直播间公告
     */
    notice: '',
    /*
     * banner图片地址
     */
    topBanner: '',
    bannerLink: '',
    /*
     * 跑马灯是否显示
     */
    marqueeifshow: true,
    /*
     * 跑马灯数据列表
     */
    marquee: [],

    /*
     * vip老师推荐列表
     */
    teacherList: [],
    /*
     * 直播、精品课程、直播预告当前选中项 默认直播选中
     */
    videoInfosType: 'VideoLive',

    /*
     * 精品课程类型列表
     */
    liveVideoType: [],
    /*
     * 当前选中的精品课程类型的id 默认为0
     */
    currLiveVideoType: 0,
    /*
     * 精品视频下某一类型的 视频总条数
     */
    totalcount: 0,

    /*
     * 直播日数据列表
     */
    liveNoticeDay: [],

    /**
     * 当前添加的表情图片
     */
    currEmoji: {
      ifadd: false,
      cont: ''
    },
    noticePic: '',
    videoTitle: '',
    teacherModal: true,
    activityShow: false,
    strategyShow: false,
    strategyTeacher: undefined,
    // 禁言列表
    laheilist: [],
    noticeStrategy: '',
    noticeBlackList: false
  },
  actions,
  getters,
  mutations
});
