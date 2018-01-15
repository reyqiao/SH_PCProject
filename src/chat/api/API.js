/**
 * 数据接口
 */
import Vue from 'vue';
import liveHost from '../../api/host.js';

const shliveHost = `${liveHost}api/BeforeApi.ashx`; 
const livepcHost = liveHost; 


const get = (url, arg) => {
  return new Promise((resolve, reject) => {
    Vue.http
      .get(url, {
        params: arg
      })
      .then(res => {
        resolve(res.data);
      }, reject);
  });
};

const post = (url, arg) => {
  return new Promise((resolve, reject) => {
    Vue.http
      .post(url, arg, {
        emulateJSON: true
      })
      .then(res => {
        resolve(res.data);
      }, reject);
  });
};

module.exports = {
  /**
   * 匿名用户注册(独立直播)
   */
  register(arg) {
    return get(`${livepcHost}/user/api/userAnonymous/register`, arg);
  },

  // 根据token获取游客信息

  getYkInfo(arg) {
    return get(`${livepcHost}/user/api/userAnonymous/getUserInfo`, arg);
  },

  /**
   * 用户注册(独立直播)
   */
  userregister(arg) {
    return get(`${livepcHost}/user/api/user/register`, arg);
  },
  /**
   * 用户登录(独立直播)
   */
  login(arg) {
    return post(`${livepcHost}/user/api/user/login`, arg);
  },
  /**
   * 获取登录用户信息token
   */
  getUserInfo(arg) {
    return get(`${livepcHost}/user/api/user/getUserInfo`, arg);
  },
  /**
   * 获取验证码
   */
  getVCode(arg) {
    return get(`${livepcHost}/user/api/sms/getverifycode`, arg);
  },
  /**
   * 重置密码找回密码(独立直播)
   */
  restpwd(arg) {
    return get(`${livepcHost}/user/api/user/resetPassword`, arg);
  },
  /**
   * 获取聊天室地址
   */
  RequestAddr(arg) {
    return post(`${livepcHost}/chatroom/chartroom/RequestAddr`, arg);
  },
  GetLiveMainData(arg) {
    return get(`${shliveHost}`, arg);
  },
  GetLiveVideoType(arg) {
    return post(`${shliveHost}`, arg);
  },
  /**
   * 获取精品视频下某一tabs下的列表数据
   */
  GetLiveVideo(arg) {
    return post(`${shliveHost}`, arg);
  },
  /**
   * 获取vip老师列表
   */
  GetLiveTeacherList(arg) {
    return post(`${shliveHost}`, arg);
  },
  /**
   * 获取直播日数据列表
   */
  GetLiveNoticeDay(arg) {
    return post(`${shliveHost}`, arg);
  },
  /**
   * 发送消息
   */
  sendMsg(arg) {
    return post(`${livepcHost}/chatroom/chartroom/sendmsg`, arg);
  },

  /**
   * 审核通过
   */
  audit(arg) {
    return post(`${livepcHost}/chatroom/chartroom/Audit`, arg);
  },

  /**
   * 将用户禁言
   */
  del(arg) {
    return post(`${livepcHost}/chatroom/chartroom/del`, arg);
  },

  /**
   * 添加用户到黑名单
   */
  blockUser(arg) {
    return post(`${livepcHost}/chatroom/chartroom/BlockUser`, arg);
  },

  /**
   * 移除黑名单
   */
  removeBlockUser(arg) {
    return post(`${livepcHost}/chatroom/chartroom/RemoveBlockUser`, arg);
  },

  /**
   * 取当前房间所有黑名单用户
   */
  getRoomBlockUser(arg) {
    return post(`${livepcHost}/chatroom/chartroom/GetRoomBlockUser`, arg);
  },

  /**
   * 获取历史消息
   */
  getChatHistoryMsg(arg) {
    return post(`${livepcHost}/chatroom/chartroom/detail`, arg);
  },

  /**
   * 获取视频直播链接
   */
  getPlayLive(arg) {
    return get(`${livepcHost}/video/VideoList/PlayLive`, arg);
  },

  GetLiveNoticePic(arg) {
    return get(`${shliveHost}`, arg);
  },

  getRobot(arg) {
    return get(`${livepcHost}/chatroom/chartroom/RobotList`, arg);
  },
  addRobot(arg) {
    return post(`${livepcHost}/chatroom/chartroom/addrobot`, arg);
  },
  delRobot(arg) {
    return post(`${livepcHost}/chatroom/chartroom/DelRobot`, arg);
  },
  /**
   * @param 
   * {
   * mobile:手机号
   * nickname:昵称
   * password:密码
   * }  
   */
  addUser(arg) {
    return get(`${livepcHost}/user/api/user/adduser`, arg);
  },
  /**
   * 喊单
   * usertoken: 操作人
   * ctype:品种ID
   * ctypename:品种名称
   * dir: 喊单方向  1：多 0 ：空
   * jcprice:建仓价格
   * zyprice:止盈价格
   * zsprice:止损价格
   * action:callorder
   * @returns 
   */
  liveMesMag(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 删除喊单
   * usertoken:操作人
   * action:callorderdel
   * cid: 单ID
   * @returns 
   */
  delMesMag(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 喊单列表
   * @param
   * usertoken:cnVYeublbLHCSRexzAmWXCVu8xlRlOIxMHKE3p8WYGSt8aLNEadEXQ**
   * action:getcallorderlist
   * tid:老师ID  //全部传0；
   * type:  1是当天  0：历史
   * page:页码
   * @return
   * ...
   */
  getLiveMesMagList(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 添加黑名单
   * usertoken: 操作人usertoken
   * uid:被添加人
   * action:addblacklist
   * @return {"result":"1","code":"0||-1","action":"addblacklist","message":"添加成功"}
   */
  addBlack(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 删除禁言
   * @param
   * usertoken:操作人usertoken
   * uid:被删除人
   * action:deleteblacklist
   * @return 
   * {"result":"1","code":"0||-1","action":"deleteblacklist","message":"删除成功"}
   */
  delBlack(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 黑名单列表
   * @param
   * usertoken:操作人usertoken
   * page: 页码
   * size:每页数量
   * action: getblackpagelist
   * @returns 
   * {
     "action": "getblackpagelist",
     "code": 0,
     "message": "",
     "result": 1,
     "totalcount": "4", //总数
     "data": [
      {
      "userid": "11",   //用户ID
      "nickName": "kefu"   //用户昵称
      },
    ]
    } 
   */
  blackList(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 获取交易品种
   * @param
   * @returns 
   * {
   *  "status": "1",
   *  "info": "success",
   *  "data": [
   *  {
   *  "openstatus": 1,
   *  "openstatustext": "交易中(交易时间05:00-00:00)",
   *  "contractid": 5140,     //交易品种ID
   *  "symbol": "EURGBP",
   *  "symbolname": "欧元英镑",   //交易品种名称
   *  "introduce": "",
   *  "contracttypeid": 9
   *  },
   */
  getConstractList(arg) {
    return get('https://mktdata.intechtrading.com/mktdata/contractlist.ashx?version=1&packtype=1&proxyid=2', arg);
  },
  /**
   * 平仓
   * @param
   * usertoken:操作人
   * action:callpc
   * cid: 单ID
   * pcprice:平仓价格
   * @return
   * 同喊单返回字段
   */
  closePosition(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * @param
   * {usertoken:cnVYeublbLHCSRexzAmWXCVu8xlRlOIxMHKE3p8WYGSt8aLNEadEXQ**
   * ,action:getallteacherlist}
   * @return
   */
  getAllTeachers(arg) {
    return get(`${livepcHost}/api/LiveMesMag.ashx`, arg);
  },
  /**
   * 获取在线人数
   * @param
   * {usertoken:cnVYeublbLHCSRexzAmWXCVu8xlRlOIxMHKE3p8WYGSt8aLNEadEXQ**
   * ,action:getcount}
   * @return
   */
  getInlinePersons(arg) {
    return get(`${livepcHost}/chatroom/chartroom/getcount`, arg);
  },
  getLiveServiceQQ(arg) {
    return get(`${livepcHost}/api/BeforeApi.ashx?action=GetLiveServiceQQ`, arg);
  },
  /**
   * 获取所有渠道列表
   */
  getChannelList() {
    return get(`${livepcHost}/api/getChannelList.ashx`);
  },
  /**
   * 添加登录登出日志
   */
  userOperationLog(payload) {
    return get(`${livepcHost}/user/api/user/userOperationLog`, payload);
  }
};