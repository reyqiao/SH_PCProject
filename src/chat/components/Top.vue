<template lang="html">
	<div class="top" id="top">
		<Modal title="黑名单管理" v-model="hmdoptshow" :mask-closable="false">
      <div class="blacklist-content">
        <div class="handler">
          <a href="javascript:;" @click="handlerClick(1)" class="btn jinyan" :class="{'active':handleIndex === 1}">禁言列表</a>
          <a href="javascript:;" @click="handlerClick(2)" class="btn lahei" :class="{'active':handleIndex === 2}">拉黑列表</a>
        </div>
        <div class="table" v-if="handleIndex ===1">
          <Table height="200" :columns="columns2" :data="getHmd"></Table>
        </div>
        <div class="table" v-if="handleIndex ===2">
          <Table height="200" :columns="laheiColumns" :data="laheilist"></Table>
        </div>
      </div>
		</Modal>
		<Modal title="马甲设置" v-model="sjoptshow" :mask-closable="false">
 			<Table height="200" :columns="columns1" :data="getSjdata"></Table>
			<Input style="width:200px;" v-model="value" placeholder="请输入..."></Input>
      <Select v-model="vestStyle" style="width:200px">
        <Option v-for="item in vestStyles" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
			<Button @click="addvalue">添加</Button>
		</Modal>
    <!--喊单-->
    <Modal title="我要喊单" width="404" v-model="handanshow" :mask-closable="false">
      <div class="handan clearfix">
          <audio id="bgMusic" >
              <source src="http://live.fxtrade888.com/live/source/handan.mp3" type="audio/mp3">
          </audio>
          <div class="item jprice">
              <div>建仓价</div>
              <Input v-model="jcprice" size="large" placeholder="请输入价格"></Input>
          </div>
          <div class="item breed">
              <div>品种</div>
              <Select v-model="symbol" size="large" style="width:150px">
                  <Option v-for="item in symbols" :value="item.value" :key="item.contractid">{{item.value}}</Option>
              </Select>
          </div>
          <div class="item zloss">
              <div>止损价</div>
              <Input v-model="zsprice" size="large" placeholder="请输入价格"></Input>
          </div>
          <div class="item dir">
              <div>方向</div>
              <Select v-model="dir" size="large" style="width:150px">
                  <Option v-for="item in dirs" :value="item.key" :key="item.key">{{ item.value }}</Option>
              </Select>
          </div>
          <div class="item zprofit">
              <div>止盈价</div>
              <Input v-model="zyprice" size="large" placeholder="请输入价格"></Input>
          </div>
          <div class="submit">
            <Button type="warning" @click="handanSubmit" long :loading="handLoading">立即添加</Button>
          </div>
      </div>
    </Modal>
		<div class="logo f-l">
			<a href="/live/index.html"><img src="../img/logo.png"></a>

		</div>
		<div class="top_option f-l">
			<div class="top-btn" v-show="getUserInfos.roleid == 5||getUserInfos.roleid == 7|| getUserInfos.roleid == 13|| getUserInfos.roleid == 14" @click.stop="clickhmdopt">黑名单管理</div>
			<div class="top-btn" v-show="getUserInfos.roleid == 5||getUserInfos.roleid == 7|| getUserInfos.roleid == 13|| getUserInfos.roleid == 14" @click.stop="clicksjopt">设置水军</div>
      <div class="top-btn" v-show="getUserInfos.roleid == 7|| getUserInfos.roleid == 14" @click.stop="handanshow=true">我要喊单</div>
      <img class="top-img kefu" src="../img/kefu.png" @click="openQQ(1334076804)" v-show="false"/>
      <img class="top-img shenji" src="../img/majia.png" @click="openQQ(1334076804)" v-show="false"/>
      <a class="top-btn to-desk" download href="http://live.fxtrade888.com/live/source/%E6%B1%87%E4%BA%A4%E6%98%93%E7%9B%B4%E6%92%AD.url">
      <img src="../images/todeskicon.png" alt="">
        保存到桌面
      </a>
		</div>

		<div class="userleft f-r clearfix">
			<div class="username" v-show="getisLogin">
				您好，{{getUserInfos.niuguname}}
			</div>
			<div v-show="!getisLogin" class="login_btn f-l" @click="loginbtn">
				登录
			</div>
			<div v-show="showRegisterBtn" class="reg_btn f-l"  @click="regbtn">
				注册
			</div>
			<div v-show="getisLogin" class="logout_btn f-l" @click="logout">
				退出
			</div>
		</div>

		<Login @token="token => $emit('token', token)" @roleid="roleId => $emit('roleid', roleId)"></Login>
		<Register/>
		<Getpwd/>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapGetters, mapMutations, mapActions, } from 'vuex';
import API from '../api/API';
import Login from './Login.vue';
import Register from './Register.vue';
import Getpwd from './Getpwd.vue';

export default {
  data() {
    return {
      value: '',
      sjoptshow: false,
      hmdoptshow: false,
      handanshow: false,
      handLoading: false,
      handleIndex: 1,// 黑名单管理中切换的id
      jcprice: '', // 喊单中的字段
      vestStyle: '',
      vestStyles: [
        {
          label: '游客',
          value: 0
        }, {
          label: '学前班',
          value: 1
        }, {
          label: '小学生',
          value: -1
        }, {
          label: '中学生',
          value: 2
        }, {
          label: '大学生',
          value: 4
        }
      ],
      symbol: '',
      zsprice: '',
      dir: '',
      zyprice: '',
      symbols: [],
      dirs: [{ key: 0, value: '空' }, { key: 1, value: '多' }],
      columns1: [
        {
          title: '马甲名称',
          key: 'RobotName',
        },
        {
          title: '马甲',
          key: 'roleName',
        },
        {
          title: '操作',
          key: 'operation',
          width: 150,
          render: (h, { row }) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.deleteSj(row.Id);
                  },
                },
              }, '删除')
            ]);
          },
        }
      ],
      columns2: [
        {
          title: '用户名',
          key: 'UserName',
        },
        {
          title: '用户id',
          key: 'Id'
        },
        {
          title: '操作',
          key: 'operation',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    API.removeBlockUser({
                      roomId: this.getHmd[params.index].roomId,
                      usertoken: this.getUserInfos.niugutoken,
                      target: this.getHmd[params.index].Id,
                    }).then((res) => {
                      this.getHmd.splice(params.index, 1);
                      this.$store.commit('setHmd', this.getHmd);
                    }).catch(() => { });
                  },
                },
              }, '解禁')
            ]);
          },
        }
      ],
      laheiColumns: [
        {
          title: '用户名',
          key: 'nickName',
        },
        {
          title: '用户id',
          key: 'userid'
        },
        {
          title: '操作',
          key: 'operation',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    API.delBlack({
                      action: 'deleteblacklist',
                      uid: params.row.userid,
                      usertoken: this.$root.token, // Cookies.get('token'),
                    }).then((res) => {
                      this.laheilist.splice(params.index, 1);
                      this.$store.commit('setLaHeiList', this.laheilist);
                    }).catch(() => { });
                  },
                },
              }, '解除')
            ]);
          },
        }
      ],
      sjdata: [],
      htm: [],
    }
  },
  mounted() {
    // 获取黑名单
    this.$store.dispatch('getRoomBlockUser');
    // 获取水军列表
    // this.$store.dispatch('getRobot', Cookies.get('token'));
    this.getRobot(this.$root.token).then(() => {}, () => {});
    // 获取喊单品种
    this.getConstractList();
    // 获取禁言列表
    this.$store.dispatch('getLaHeiList', this.$root.token); // Cookies.get('token'));
  },
  components: {
    Login,
    Register,
    Getpwd,
  },

  methods: {
    ...mapMutations({ noticeStrategy: 'noticeStrategy' }),
    /**
     * 获取黑名单列表
     */
    ...mapActions(['getRoomBlockUser', 'getRobot', 'addRobot', 'delRobot']),
    handanSubmit() {
      if (this.jcprice === '' || this.zyprice === '' || this.zsprice === '' || this.symbol === '' || this.dir === '') {
        return false;
      }
      if (this.dir === '空') {
        if (this.zsprice < this.jcprice || this.jcprice < zyprice) {
          this.$Message.error('喊单无效');
        }
        return false;
      } else if (this.dir === '多') {
        if (this.zsprice > this.jcprice || this.jcprice > zyprice) {
          this.$Message.error('喊单无效');
        }
        return false;
      }
      this.handLoading = true;
      API.liveMesMag({
        usertoken: this.$root.token, // Cookies.get('token'),
        ctype: this.ctype,
        ctypename: this.symbol,
        dir: this.dir,
        jcprice: this.jcprice,
        zyprice: this.zyprice,
        zsprice: this.zsprice,
        action: 'callorder'
      }).then(res => {
        this.handLoading = false;
        if (res.code === '0') {
          this.$Message.success(res.message);
          // // 通知更新及时策略
          // this.noticeStrategy(new Date().toString());
          // 重置值
          this.ctype = '';
          this.symbol = '';
          this.dir = '';
          this.jcprice = '';
          this.zyprice = '';
          this.zsprice = '';
        } else {
          this.$Message.error(res.message);
        }
      })
    },
    getConstractList() {
      API.getConstractList({}).then(res => {
        if (res.status === '1') {
          this.symbols = res.data.map(item => {
            let symbol = {};
            symbol.value = item.symbolname;
            symbol.ctype = item.contractid;
            return symbol;
          });
        }
      });
    },
    handlerClick(index) {
      this.handleIndex = index;
    },
    openQQ(str) {
      window.open(`http://wpa.qq.com/msgrd?v=3&uin=${str}&site=qq&menu=yes`);
    },
    deleteSj(Id) {
      this.$store.dispatch('delRobot', {
        Id,
        usertoken: this.$root.token, // Cookies.get('token'),
      })
    },
    addvalue() {
      this.$store.dispatch('addRobot', {
        robotName: this.value,
        roleId: this.vestStyle,
        usertoken: this.$root.token, // Cookies.get('token')
      });
      this.value = '';
    },
    clicksjopt() {
      this.sjoptshow = true;
    },
    clickhmdopt() {
      this.hmdoptshow = true;
    },
    loginbtn() {
      this.$store.commit('setLoginShow', true);
      this.$store.commit('setLoginCLose', true);
    },
    regbtn() {
      this.$store.commit('setRegisterShow', true);
      this.$store.commit('setLoginCLose', true);
    },
    logout() {
      const usertoken = this.$root.token; // Cookies.get('token');
      API.userOperationLog({
        usertoken,
        operateType: 2, // 1:登录,2:登出
        source: 1, // 1：web,2:h5
      });
      // Cookies.set('token', '', { expires: 0 });
      // Cookies.set('roleId', '', { expires: 0 });
      this.$emit('logout');
      this.$store.commit('setIsLogin', false);
      this.$store.commit('setIsLoading', true);
      this.$store.commit('clearMsgHistory');
      this.$store.commit('setRegisterBtnShow', false);
      this.$store.commit('noticeStrategy', false);
      if (Cookies.get('yk-token')) {
        this.$store.dispatch('getYkInfo', {
          usertoken: Cookies.get('yk-token'),
          userid: 0,
        }).then((res) => {
          this.$store.commit('setIsLoading', false);
          this.$store.dispatch('getChatHistoryMsg', {
            direction: '-1',
            order: '1',
            id: '0',
            usertoken: this.getUserInfos.niugutoken,
            roomid: this.getUserInfos.roomid,
            type: 'up',
          })
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.$store.dispatch('noUserRegister').then(() => {
          Cookies.set('yk-token', this.getUserInfos.niugutoken, { expires: 7 });
          this.$store.dispatch('getChatHistoryMsg', {
            direction: '-1',
            order: '1',
            id: '0',
            usertoken: this.getUserInfos.niugutoken,
            roomid: this.getUserInfos.roomid,
            type: 'up',
          })
          this.$store.commit('setIsLoading', false);
        }).catch((err) => {
          this.$Message.warning(err, 2);
        });
      }
      // this.$store.dispatch('noUserRegister').then(() => {
      //   /**
      //    * 获取最新20条聊天记录
      //    */
      //   this.$store.dispatch('getChatHistoryMsg', {
      //     direction: '-1',
      //     order: '1',
      //     id: '0',
      //     usertoken: this.getUserInfos.niugutoken,
      //     roomid: this.getUserInfos.roomid,
      //     type: 'up',
      //   }).then(() => {
      //     console.log('退出时 匿名登录完成');
      //     this.$store.commit('setIsLoading', false);
      //   }).catch(() => { });
      // }).catch((err) => {
      //   this.$Message.warning(err);
      // });
    },
  },
  computed: {
    /**
     * getTopBanner获取首页banner图
     * getisLogin获取是否已登录
     * getUserInfos 获取正式登录用的信息
     * getIsVisitor 是否开启了游客登录
     * getHmd 获取黑名单列表
     */
    ...mapGetters(['getTopBanner', 'getisLogin', 'getUserInfos', 'getIsVisitor', 'getHmd', 'getSjdata', 'showRegisterBtn', 'laheilist', 'noticeBlackList']),
    /*
     * setLoginShow设置是否显示登录框
     * setRegisterShow设置是否显示注册框
     * setIsLogin 设置是否登录或退出
     * setUserInfos 设置登录用户信息
     * setIsLoading 设置是否显示loading
     * setSjdata 设置马甲
     * setHmd 设置黑名单
     */
    ...mapMutations(['setLoginShow', 'setRegisterShow', 'setIsLogin', 'setUserInfos', 'setIsLoading', 'setSjdata', 'setHmd', 'setLoginCLose']),
    ctype() {
      let type = '';
      this.symbols.map(item => {
        if (item.symbol = this.symbol) {
          type = item.ctype;
        }
      })
      return type;
    }
  },
}
</script>

<style lang="scss">
.v-transfer-dom {
  .blacklist-content {
    .handler {
      margin-bottom: 10px;
      .btn {
        display: inline-block;
        width: 76px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        background: rgb(88, 88, 92);
      }
      .active {
        color: rgb(154, 97, 15);
        background: rgb(255, 198, 0);
      }
    }
  }
  .handan {
    .ivu-select {
      width: 150px;
    }
    .item {
      width: 150px;
      float: left;
      margin-top: 20px;
    }
    .breed,
    .dir {
      margin-left: 40px;
    }
    .submit {
      .ivu-btn {
        height: 50px;
        margin-top: 40px;
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
}

.ivu-modal-footer {
  display: none;
}

#top {
  width: 100%;
  height: 74px;
  color: #fff;
  padding: 0 24px;
  .logo,
  .top_option,
  .userleft {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    line-height: 74px;
  }
  .top_option {
    margin-left: 20px;
    .top-btn {
      width: 120px;
      height: 48px;
      line-height: 48px;
      background-color: rgb(59, 64, 74);
      margin: 0 7px;
      text-align: center;
      font-size: 14px;
      border-radius: 4px;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
    }
    .to-desk {
      background: url('../images/todeskbac.png') no-repeat;
      color: rgb(154, 97, 15);
      width: 160px;
      border-radius: inherit;
    }
    .top-img {
      margin: 0 7px;
      width: 120px;
      height: auto;
    }
  }
  & .userleft {
    height: 100%;
    & .username {
      text-align: center;
      font-size: 16px;
      margin-left: 12px;
    }
    & .login_btn,
    .reg_btn,
    .logout_btn {
      margin-left: 20px;
      width: 74px;
      height: 32px;
      font-size: 16px;
      line-height: 32px;
      border-radius: 3.5px;
      text-align: center;
      background: rgb(255, 198, 0);
      color: #fff;
      cursor: pointer;
    }
    .reg_btn {
      background: rgb(248, 136, 27);
    }
    .logout_btn {
      background: #64B3F0;
    }
  }
}
</style>
