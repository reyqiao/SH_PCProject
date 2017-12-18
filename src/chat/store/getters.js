export default {
  /*
   * 获取直播间公告
   */
  getNotice(state) {
    return state.notice;
  },
  /*
   * 获取是否显示加载框
   */
  getIsLoading(state) {
    return state.showStruct.isLoading;
  },
  /*
   * 获取banner
   */
  getTopBanner(state) {
    return {
      topBanner: state.topBanner,
      bannerLink: state.bannerLink,
    };
  },
  /*
   * 游客模式
   */
  getIsVisitor(state) {
    return state.isVisitor;
  },

  /*
   * 获取跑马灯是否显示
   */
  getMarqueeifshow(state) {
    return state.marqueeifshow;
  },
  /*
   * 获取跑马灯数据
   */
  getMarquee(state) {
    return state.marquee;
  },

  /*
   * 直播老师列表
   */
  getLiveTeacherList(state) {
    return state.teacherList;
  },

  /*
   * 获取登录用户信息
   */
  getUserInfos(state) {
    return state.userinfoStruct;
  },

  /*
   * 精品课程栏目
   */
  getLiveVideoType(state) {
    return state.liveVideoType;
  },

  /*
   * 获取直播、精品课程、直播预告当前选中项 默认直播选中
   */
  getVideoInfosType(state) {
    return state.videoInfosType;
  },

  /*
   * 获取精品视频下当前选中的tabs ID
   */
  getCurrLiveVideoType(state) {
    return state.currLiveVideoType;
  },

  /*
   * 获取直播日列表信息
   */
  getLiveNoticeDay(state) {
    return state.liveNoticeDay;
  },

  /*
   * 获取是否显示登录框
   */
  getLoginShow(state) {
    return state.showStruct.loginShow;
  },

  // 登陆框关闭按钮
  getLoginCLose(state) {
    return state.showStruct.loginCLose;
  },
  /*
   * 获取是否显示注册框
   */
  getRegisterShow(state) {
    return state.showStruct.registerShow;
  },

  /*
   * 获取是否已经登录
   */
  getisLogin(state) {
    return state.loginStruct.isLogin;
  },

  /*
   * 获取是否已经登录
   */
  getGetpwdShow(state) {
    return state.showStruct.getpwdShow;
  },

  /*
   * 获取是否表情框
   */
  getEmojiShow(state) {
    return state.showStruct.emojiShow;
  },


  /*
   * 获取历史消息
   */
  getChatHistoryMsg(state) {
    return state.chatStruct.chatHistoryMsg;
  },

  /*
   * 获取当前输入emojicode
   */
  getCurrEmojiCode(state) {
    return state.currEmoji;
  },


  /*
   * 获取是否自动滚屏
   */
  getIfScrollScreen(state) {
    return state.chatStruct.ifScrollScreen;
  },

  /**
   * 获取聊天室消息体
   */
  getChatStruct(state) {
    return state.chatStruct;
  },
  /**
   * 获取聊天室所有消息
   */
  getChatMsgAll(state) {
    return state.chatStruct.chatMsgList;
  },
  /**
   * 获取马甲名称
   */
  getSjdata(state) {
    return state.userinfoStruct.sjdata;
  },
  /**
   * 获取马甲发言消息体
   */
  getMjStruct(state) {
    return state.mjStruct;
  },
  /**
   * 获取直播视频地址
   */
  getVideoUrl(state) {
    return state.viedoStruct;
  },
  /**
   * 获取历史消息最小id
   */
  getMinMsgId(state) {
    let minid = 0;
    if (state.chatStruct.chatMsgList.length > 0) {
      minid = state.chatStruct.chatMsgList[0].id;
    }
    return minid;
  },
  /**
   * 获取黑名单
   */
  getHmd(state) {
    return state.hmd;
  },
  // 获取预告图
  getNoticePic(state) {
    return state.noticePic;
  },

  // 获取返回直播
  getVideoTitle(state) {
    return state.videoTitle;
  },
  teacherModal(state) {
    return state.teacherModal;
  },
  activityShow(state) {
    return state.activityShow;
  },
  strategyShow(state) {
    return state.strategyShow;
  },
  strategyTeacher(state) {
    return state.strategyTeacher;
  },
  showRegisterBtn(state) {
    return state.showRegisterBtn;
  },
  // 禁言列表
  laheilist(state) {
    return state.laheilist;
  },
  // 及时策略
  noticeStrategy(state) {
    return state.noticeStrategy;
  },
};
