import * as types from './mutation-types';

export default {
  [types.GET_LIVE_MAIN_DATA](state, payload) {
    if (payload && payload.code === '0') {
      state.isVisitor = payload.IsVisitor;
      state.notice = payload.Notice;
      state.topBanner = payload.TopBanner;
      state.marquee = payload.Marquee;
      state.bannerLink = payload.BannerLink;
      state.HeaderBannerData = payload.HeaderBannerData;
      state.HeaderBannerLink = payload.HeaderBannerLink;
      state.HeaderBannerLinkTo = payload.HeaderBannerLinkTo;
      state.PoppicData = payload.PoppicData;
      state.PoppicLink = payload.PoppicLink;
    }
  },
  [types.GET_LIVE_VIDEO_TYPE](state, payload) {
    if (payload && payload.code === '0') {
      state.liveVideoType = payload.list;
    }
  },
  [types.GET_LIVE_VIDEO](state, payload) {
    if (payload && payload.code === '0') {
      state.liveVideoType = payload.list;
    }
  },
  [types.GET_LIVE_TEACHER_LIST](state, payload) {
    if (payload && payload.code === '0') {
      state.teacherList = payload.list;
    }
  },
  /**
   * 获取精品视频列表
   */
  [types.GET_LIVE_VIDEO](state, payload) {
    if (payload && payload.code === 0) {
      state.getLiveVideo = payload.list;
    }
  },
  /*
   * 设置跑马灯是否显示
   */
  setMarqueeifshow(state, payload) {
    state.marqueeifshow = payload;
  },

  /*
   * 获取直播、精品课程、直播预告当前选中项 默认直播选中
   */
  setVideoInfosType(state, payload) {
    state.videoInfosType = payload;
  },

  /*
   * 设置精品视频下当前选中的tabs ID
   */
  setCurrVideoInfosType(state, payload) {
    state.currLiveVideoType = payload;
  },

  /*
   * 设置直播日数据列表
   */
  setLiveNoticeDay(state, payload) {
    state.liveNoticeDay = payload.list || [];
  },

  /*
   * 设置是否显示登录框
   */
  setLoginShow(state, payload) {
    state.showStruct.loginShow = payload;
  },

  setLoginCLose(state, payload) {
    state.showStruct.loginCLose = payload;
  },
  /*
   * 设置是否显示注册框
   */
  setRegisterShow(state, payload) {
    state.showStruct.registerShow = payload;
  },

  /*
   * 设置是否已登录
   */
  setIsLogin(state, payload) {
    state.loginStruct.isLogin = payload;
  },

  /*
   * 设置是否显示找回密码框
   */
  setGetpwdShow(state, payload) {
    state.showStruct.getpwdShow = payload;
  },

  /*
   * 设置是否表情框
   */
  setEmojiShow(state, payload) {
    state.showStruct.emojiShow = payload;
  },

  /**
   * 发送消息
   */
  addMsgs(state, payload) {
    const { custom } = payload;
    const jsoncustom = JSON.parse(custom);
    state.chatStruct.chatMsgList.push(jsoncustom);
  },

  /**
   * 清屏
   */
  clearScreen(state) {
    state.chatStruct.chatMsgList = [];
  },

  /**
   * 设置历史消息
   */
  addMsgHistory(state, payload) {
    state.chatStruct.chatMsgList.push(payload);
  },

  /**
   * 加载历史消息
   */
  addUpMsgHistory(state, payload) {
    state.chatStruct.chatMsgList = [
      ...payload,
      ...state.chatStruct.chatMsgList
    ];
  },
  /**
   * 清空历史数据
   */
  clearMsgHistory(state) {
    state.chatStruct.chatMsgList = [];
  },

  //  删除消息
  deleteMsg(state, payload) {
    const tmp = state.chatStruct.chatMsgList.filter(
      item => item.msgId !== payload
    );
    state.chatStruct.chatMsgList = tmp;
  },
  /**
   * 向输入框中添加表情
   */
  addEmoji(state, payload) {
    state.currEmoji = payload;
  },

  /**
   * 设置是否显示加载框
   */
  setIsLoading(state, payload) {
    state.showStruct.isLoading = payload;
  },

  /**
   * 设置登录用户账号信息
   */
  setUserInfos(state, payload) {
    state.userinfoStruct = Object.assign({}, state.userinfoStruct, payload);
  },

  /**
   * 设置是否自动滚屏
   */
  setIfScrollScreen(state, payload) {
    state.chatStruct.ifScrollScreen = payload;
  },

  /**
   * 设置马甲
   */
  setSjdata(state, payload) {
    state.userinfoStruct.sjdata = payload;
  },

  // 添加水军
  addSjdata(state, payload) {
    state.userinfoStruct.sjdata.push(payload);
  },

  // 删除水军
  delSjdata(state, payload) {
    const tmp = state.userinfoStruct.sjdata.filter(item => item.Id !== payload);
    state.userinfoStruct.sjdata = tmp;
  },
  /**
   * 马甲发言
   */
  setMjStruct(state, payload) {
    state.mjStruct = payload;
  },
  /**
   * 设置直播视频地址
   */
  setVideoUrl(state, payload) {
    state.viedoStruct = Object.assign({}, payload);
  },
  /**
   * 设置黑名单
   */
  setHmd(state, payload) {
    state.hmd = payload;
  },
  // 设置预告图片
  setNoticePic(state, payload) {
    state.noticePic = payload;
  },
  // 设置返回直播
  setVideoTitle(state, payload) {
    state.videoTitle = payload;
  },
  setTeacherModal(state, payload) {
    state.teacherModal = payload;
  },
  setActivityShow(state, payload) {
    state.activityShow = payload;
  },
  setStrategyShow(state, payload) {
    state.strategyShow = payload;
  },
  setStrategyTeacher(state, payload) {
    console.log(9999, payload);
    state.strategyTeacher = payload;
  },
  // 设置注册按钮的显示
  showRegisterBtn(state, payload) {
    // if (payload !== 0) {
    if (payload === 13 || payload === 7 || payload === 14 || payload === 5) {
      state.showRegisterBtn = true;
    } else {
      state.showRegisterBtn = false;
    }
  },
  setRegisterBtnShow(state, payload) {
    state.showRegisterBtn = payload;
  },
  // 设置拉黑列表
  setLaHeiList(state, payload) {
    state.laheilist = payload;
  },
  // 通知即时策略更新数据
  noticeStrategy(state, payload) {
    state.noticeStrategy = payload;
  },
  // 设置定时banner图片
  setBannerModal(state, payload) {
    state.bannerModal = payload;
  },
};
