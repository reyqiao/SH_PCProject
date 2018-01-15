<template lang="html">
  <div class="strategy">
      <Modal v-model="pingCangModal" width="848" class="pingModal">
        <p slot="header" style="color:;text-align:left" class="header">
            <span>平仓</span>
        </p>
        <div style="text-align:center">
             <Input class="pingcanginput" v-model="pingCangPrice" :number="true" size="large" placeholder="平仓价格"></Input>
        </div>
        <div class="footer">
          <Button type="error" class="pingcangfooter" size="large" long  @click="surePingCang">立即添加</Button>
        </div>
    </Modal>

     <div class="strategy-modal" id="strategyModal">
      <div class="close-btn" @click="close"></div>
      <div class="header clearfix">
        <div class="handler f-l">
          <a href="javascript:;" @click="changeHandlerIndex(1)" class="btn" :class="{'active':handlerIndex === 1}">今日观点</a>
          <a href="javascript:;" @click="changeHandlerIndex(0)" class="btn" :class="{'active':handlerIndex === 0}">历史观点</a>
        </div>
        <div class="teachers f-l">
         <ul class="clearfix">
           <li class="f-l" @click="clickTitem(0)"><a class="item" :class="{'active':tactive === 0}" href="javascript:;">全部</a></li>
           <li class="f-l" @click="clickTitem(item.userid,item.nickName)" v-for="(item,index) in teachers"><a class="item" :class="{'active':tactive === item.userid}" href="javascript:;">{{item.nickName}}</a></li>
         </ul>
        </div>

      </div>
      <div class="table-content">
        <div class="tb-header clearfix">
          <div class="item item1">入场时间</div>
          <div class="item item2">讲师</div>
          <div class="item item3">品种</div>
          <div class="item item4">方向</div>
          <div class="item item5">建仓</div>
          <div class="item item6">止损</div>
          <div class="item item7">止盈价</div>
          <div class="item item8">平仓价</div>
          <div class="item item9">平仓时间</div>          
          <div class="item item10">止盈点数</div>
        </div>
        <div class="content">
          <div class="tr clearfix" v-for="(item,index) in megList">
            <div class="item item1 date">{{item.createtime}}</div>
            <div class="item item2 name">{{item.nickName}}</div>
            <div class="item item3 pinzhong">{{item.ctypeName}}</div>            
            <div class="item item4 dir">{{item.direction===''?'--':item.direction}}</div>
            <div class="item item5 jiancang">{{item.jcPrice.trim()===''?'--':item.jcPrice}}</div>
            <div class="item item6 zhisun">{{item.zsPrice.trim()===''?'--':item.zsPrice}}</div>
            <div class="item item7 zhiying">{{item.zyPrice===''?'--':item.zyPrice}}</div>
            <div class="item item8 pingcang">{{item.pcPrice===''?'--':item.pcPrice}}</div>
            <div class="item item9 pctime">{{item.pctime===''?'--':item.pctime}}</div>
            <div class="item item10 point">
              <span class="number" :class="{'red':item.color=='1','gray':item.color=='0','green':item.color=='2'}" v-show="item.zyPoint!==''">{{item.zyPoint}}</span>  
                <span v-show="item.zyPoint===''&&authId===2">
                  <span class="pc" @click="pcCLick(item.callId,item.direction==='空'?0:1,item.jcPrice)">平仓</span>
                  <span class="del" @click="delClick(item.callId,index)">删除</span> 
                </span>
            </div>
          </div>
          <div class="tr clearfix nodata" v-show="total<=0 || megList.length===0">暂无数据</div>         
        </div>
      </div>
      <div class="pager clearfix">
         <Page :current="current" @on-change="currentChange" :total="total" style="width:400px"></Page>
         <div class="hint">
           投资观点仅供参考，不作为入市依据，据此操作，风险自担
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types';
import { mapGetters, mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import API from '../api/API';
export default {
  name: 'strategy',
  data() {
    return {
      tactive: 0, // 老师选中的index
      tid: 0,//老师id,0默认为全部
      handlerIndex: 1, // 今日建议的index
      current: 1,
      total: 0,
      pingCangModal: false,
      pingCangId: '',
      pingCangPrice: '',
      pingCangDir: '',
      jianCangPrice: '',
      point: '',
      teachers: [],
      megList: [],
      authId: 0,// 权限id ,0 游客;1白银,黄金,至尊,巡管,客服;2超级讲师,超管
      tableTitles: [
        {
          title: '入场时间/平仓时间',
          key: 'date'
        },
        {
          title: '讲师',
          key: 'name'
        },
        {
          title: '品种/方向',
          key: 'dir',
        },
        {
          title: '止损/止盈价',
          key: 'zprice',
        },
        {
          title: '建仓/平仓价',
          key: 'pprice',
        },
        {
          title: '止盈点数',
          key: 'zpoint',
        }
      ],
      teachersData: [
        {
          date: '2016-10-03',
          name: '王小明',
          dir: '美原油',
          zprice: '46/56',
          pprice: '298/234',
          zpoint: '0.3'
        },
        {
          name: '张小刚',
          dir: '美原油',
          address: '北京市海淀区西二旗',
          date: '2016-10-01'
        },
        {
          name: '李小红',
          dir: '美原油',
          address: '上海市浦东新区世纪大道',
          date: '2016-10-02'
        },
        {
          name: '周小伟',
          dir: '美原油',
          address: '深圳市南山区深南大道',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setStrategyShow']),
    surePingCang() {
      if (this.pingCangPrice === '') {
        this.$Message.info('请输入平仓价');
      }
      // 获取平仓价
      // 计算出点数
      // 成功后更新megList
      API.closePosition({
        // usertoken: Cookies.get('token'),
       usertoken: this.$root.token,
        action: 'callpc',
        cid: this.pingCangId,
        pcprice: this.pingCangPrice
      }).then((res) => {
        if (res.code === '0') {
          this.getMesMagList();
          this.pingCangModal = false;
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      })
    },
    updateMegList() {
      let point = 0;
      // 多
      if (this.pingCangDir === 1) {
        point = this.pingCangPrice - this.jianCangPrice;
      } else {
        point = this.jianCangPrice - this.pingCangPrice;
      }
      this.megList.map(item => {
        if (item.callId === this.pingCangId) {
          item.zyPoint = point;
          item.pcPrice = this.pingCangPrice;
        }
        return item;
      });

    },
    close() {
      this.setStrategyShow(false);
    },
    /**
     * 选中老师的index修改
     */
    clickTitem(index) {
      this.tactive = index;
      this.tid = index;
      this.getMesMagList();
    },
    /**
     * 修改今日建议,历史建议index
     */
    changeHandlerIndex(index) {
      this.handlerIndex = index;
      this.getMesMagList();
    },
    /**
     * 平仓
     */
    pcCLick(id, dir, jcprice) {
      this.pingCangModal = true;
      this.pingCangId = id;
      this.pingCangDir = dir;
      this.jianCangPrice = jcprice
    },
    /**
     * 删除
     */
    delClick(cid, index) {
      API.delMesMag({
        action: 'callorderdel',
        // usertoken: Cookies.get('token'),
       usertoken: this.$root.token,
        cid,
      }).then(res => {
        if (res.code === '0') {
          this.$Message.success(res.message);
          this.megList.splice(index, 1);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getTeacherList() {
      API.getAllTeachers({
        // usertoken: Cookies.get('token'),
       usertoken: this.token,
        action: 'getallteacherlist'
      }).then(res => {
        if (res.code === 0) {
          this.teachers = res.data;
        } else {
          console.log('getTeacherList', res);
        }
      })
    },
    getMesMagList() {
      this.getRoleId();
      API.getLiveMesMagList({
        usertoken: this.$root.token,
        // usertoken:Cookies.get('token'),
        action: 'getcallorderlist',
        tid: this.tid,
        type: this.handlerIndex,
        page: this.current
      }).then(res => {
        if (res.code === 0) {
          this.total = parseInt(res.totalCount);
          this.megList = res.data;
          // 根据roleid去显示
          this.filterMesMagList();
        } else {
          this.total = 0;
          this.megList = [];
        }

      })
    },
    filterMesMagList() {
      if (this.authId === 0) {
        this.megList.map(item => {
          item.zsPrice = '*';
          item.zyPrice = '*';
          item.jcPrice = '*';
          item.pcPrice = '*';
          item.zyPoint = '*';
        });
      }

    },
    getRoleId() {
      const roleid = '' +this.$root.roleId; // Cookies.get('roleId');
      if (roleid === '7' || roleid === '14') {
        this.authId = 2
      } else if (roleid === '-1' || roleid === '2' || roleid === '4' || roleid === '5' || roleid === '8' || roleid === '13') {
        this.authId = 1
      } else {
        this.authId = 0;
      }
    },
    currentChange(page) {
      this.current = page;
      this.getMesMagList();
    },
  },
  watch: {
    noticeStrategy(value) {
      this.getMesMagList();
      this.getTeacherList();
    },
    strategyShow(nVal) {
      if (nVal && this.strategyTeacher) {
        const selectedTeachers = this.teachers.filter(item => item.nickName === this.strategyTeacher);
        console.log(8888, selectedTeachers);
        if (selectedTeachers.length > 0) {
          this.handlerIndex = 0;
          this.tactive = selectedTeachers[0].userid;
          this.tid = selectedTeachers[0].userid;
        } else {
          this.handlerIndex = 1;
          this.tactive = 0;
          this.tid = 0;
        }
      } else {
        this.handlerIndex = 1;
        this.tactive = 0;
        this.tid = 0;
      }
      this.getMesMagList();
    },
  },
  computed: {
    ...mapGetters(['noticeStrategy', 'strategyShow', 'strategyTeacher']),
  },
  mounted() {
    this.getTeacherList();
    this.getMesMagList();
  },
}
</script>

<style lang="scss">
.pingModal {
  .ivu-modal-header {
    padding: 32px 60px;
    border-bottom: none;
  }
  .ivu-modal-body {
    padding: 0 60px 60px 60px;
  }
  .ivu-modal-close {
    right: 60px;
    top: 20px;
  }
  .ivu-modal-close .ivu-icon-ios-close-empty {
    font-size: 40px;
  }
  .header {
    font-size: 20px;
  }
  .pingcangfooter {
    height: 56px;
    background-color: rgb( 255, 119, 0);
    color: #fff;
    font-size: 16px;
    margin-top: 40px;
  }
  .hint {
    color: rgb(102, 102, 102);
    font-size: 16px;
    padding: 10px 0;
  }
  .pingcanginput {
    height: 56px;
    input {
      height: 100%;
      font-size: 14px;
    }
  }
}

.strategy {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 222;
  .header {
    padding-bottom: 20px;
    .handler {
      margin-top: 14px;
      margin-left: 12px;
      .btn {
        display: inline-block;
        margin-right: 8px;
        width: 76px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
        background: rgb(88, 88, 92);
      }
      .active {
        color: rgb(154, 97, 15);
        background: rgb( 255, 198, 0);
      }
    }
    .teachers {
      ul {
        padding-top: 15px;
      }
      .item {
        position: relative;
        font-size: 14px;
        text-align: center;
        padding: 7px 10px;
      }
      .active {
        color: rgb( 255, 198, 0);
      }
      .active::after {
        content: " ";
        left: 0;
        right: 0;
        margin: 0 auto;
        display: block;
        position: absolute;
        bottom: 0;
        height: 1px;
        width: 18px;
        background: #ffc600;
      }
    }
  }
  .table-content {
    .tb-header {
      padding: 0 1px;
      .item {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        background: #6c6c6e;
        float: left;
      }
      .item1 {
        width: 145px;
      }
      .item2 {
        width: 70px;
      }
      .item3 {
        width: 70px;
      }
      .item4 {
        width: 54px;
      }
      .item5 {
        width: 80px;
      }
      .item6 {
        width: 80px;
      }
      .item7 {
        width: 80px;
      }
      .item8 {
        width: 80px;
      }
      .item9 {
        width: 145px;
      }
      .item10 {
        width: 106px;
      }
    }
    .content {
      padding: 0 1px;
      min-height: 330px;
      .tr {
        .item {
          float: left;
          height: 32px;
          line-height: 32px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          border-right: 1px solid #5a595a;
        }
        .item1 {
          width: 145px;
        }
        .item2 {
          width: 70px;
        }
        .item3 {
          width: 70px;
        }
        .item4 {
          width: 54px;
        }
        .item5 {
          width: 80px;
        }
        .item6 {
          width: 80px;
        }
        .item7 {
          width: 80px;
        }
        .item8 {
          width: 80px;
        }
        .item9 {
          width: 145px;
        }
        .item10 {
          width: 106px;
          .pc,
          .del {
            padding: 4px;
            cursor: pointer;
          }
          .red {
            color: rgb( 255, 76, 81);
          }
          .green {
            color: rgb( 76, 255, 84);
          }
          .gray {
            color: #fff;
          }
        }
        .item:last-child {
          border: none;
        }
        border-bottom: 1px solid #5a595a;
      }
      .nodata {
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
      }
    }
  }
  .pager {
    padding: 10px;
    .ivu-page {
      float: left;
    }
    .ivu-page-item,
    .ivu-page-prev,
    .ivu-page-next,
    .ivu-page-item-jump-prev,
    .ivu-page-item-jump-next {
      color: rbg( 255, 198, 0);
      background: none;
      min-width: 28px;
      height: 28px;
    }

    .ivu-page-item-active {
      background: rgb( 255, 198, 0);
    }
  }
  .hint {
    margin-top: 10px;
    color: #ffc600;
    text-align: right;
    float: right;
  }
}

.strategy-modal {
  position: absolute;
  width: 914px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('../images/strategy_bac.png') no-repeat;
  background-size: cover;
  border: 1px solid #fff;
  border-radius: 4px;
  .close-btn {
    position: absolute;
    width: 34px;
    height: 34px;
    top: -70px;
    right: 0;
    cursor: pointer;
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
}
</style>
