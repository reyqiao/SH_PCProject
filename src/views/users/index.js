import Vue from 'vue';
import {
  mapGetters,
  mapActions,
} from 'vuex';
import tem from './index.html';
import './style.scss';

const MSG_SUC = '操作成功';
const MSG_ERR = '操作异常';
const MSG_SERVER_ERR = '服务器异常';
// 分页条数
const pagesize = 10;

// 禁言列表
const JYList = Vue.extend({
  template: '<Table :columns="columns" :data="list" @on-selection-change="selectionChange"></Table>',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    refresh: {
      type: Function,
    },
    selectionChange: {
      type: Function,
    },
  },
  data() {
    return {
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center',
      }, {
        title: '用户名',
        key: 'user',
        className: 'user-item',
        render(row) {
          const {
            UserName,
            // headpicurl,
          } = row;
          return `<span class="user-name">${UserName}</span>`;
        },
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render(row) {
          const {
            Id,
          } = row;
          return `<i-button type="error" @click="deleteUser('${Id}', 1)">解禁</i-button>`;
        },
      }],
    };
  },
  methods: {
    ...mapActions([
      'deleteSilenceUser',
    ]),
    deleteUser(Id) {
      this.deleteSilenceUser({
        target: Id,
        // type,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.refresh();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(res.message || MSG_SERVER_ERR);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
  },
});
// 黑名单列表
const HMDList = Vue.extend({
  template: '<Table :columns="columns" :data="list" @on-selection-change="selectionChange"></Table>',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    refresh: {
      type: Function,
    },
    selectionChange: {
      type: Function,
    },
  },
  data() {
    return {
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center',
      }, {
        title: '用户名',
        key: 'user',
        align: 'center',
        className: 'user-item',
        render(row) {
          const {
            nickName,
            // headpicurl,
          } = row;
          return `<span class="user-name">${nickName}</span>`;
        },
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render(row) {
          const {
            userid,
          } = row;
          return `<i-button type="error" @click="deleteUser('${userid}', 2)">解除</i-button>`;
        },
      }],
    };
  },
  methods: {
    ...mapActions([
      'deleteBackUser',
    ]),
    deleteUser(Id) {
      this.deleteBackUser({
        uid: Id,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.refresh();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(res.message || MSG_SERVER_ERR);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
  },
});

const HYList = Vue.extend({
  template: '<Table :columns="columns" :data="list" @on-selection-change="selectionChange"></Table>',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    refresh: {
      type: Function,
    },
    selectionChange: {
      type: Function,
    },
  },
  data() {
    return {
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center',
      }, {
        title: '用户名',
        key: 'user',
        align: 'center',
        className: 'user-item',
        render(row) {
          const {
            nickname,
            headpicurl,
          } = row;
          return `<img src="${headpicurl}" class="user-phone"/><span class="user-name">${nickname}</span>`;
        },
      // }, {
      //   title: '操作',
      //   key: 'action',
      //   align: 'center',
      //   render(row) {
      //     const {
      //       Id,
      //     } = row;
      //     return `<i-button type="success" @click="deleteUser('${Id}', 3)">转为永久会员</i-button>`;
      //   },
      }],
    };
  },
  methods: {
    ...mapActions([
      'deleteLiveUser',
    ]),
    deleteUser(Id, type) {
      this.deleteLiveUser({
        Id,
        type,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.refresh();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
  },
});

export default Vue.extend({
  template: tem,
  components: {
    JYList,
    HMDList,
    HYList,
  },
  data() {
    return {
      test: 'index',
      silencePageIndex: 1,
      silenceSelection: [],
      blackPageIndex: 1,
      blackSelection: [],
      vipPageIndex: 1,
      vipSelection: [],
    };
  },
  computed: {
    ...mapGetters([
      'silenceList',
      'blackList',
      'vipList',
    ]),
  },
  mounted() {
    this.updateSilenceList();
    this.updateBlackList();
    // this.updateVipList();
  },
  methods: {
    ...mapActions([
      'getSilenceList',
      'getBlackList',
      'getVipList',
      'deleteLiveUser',
    ]),
    silenceChangePage(pageindex) {
      this.silencePageIndex = pageindex;
      this.updateSilenceList();
    },
    updateSilenceList() {
      // this.getSilenceList({
      //   pagesize,
      //   pageindex: this.silencePageIndex,
      // });
      this.getSilenceList();
    },
    silenceSelectionChange(selection) {
      this.silenceSelection = selection.map(item => item.Id);
    },
    deleteAllSilence() {
      this.deleteLiveUser({
        Id: this.silenceSelection.join(','),
        type: 1,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.updateSilenceList();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[error]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[error]', err);
        this.$Message.error(MSG_ERR);
      });
    },
    blackChangePage(pageindex) {
      this.blackPageIndex = pageindex;
      this.updateBlackList();
    },
    updateBlackList() {
      this.getBlackList({
        pagesize,
        pageindex: this.blackPageIndex,
      });
    },
    blackSelectionChange(selection) {
      this.blackSelection = selection.map(item => item.Id);
    },
    deleteAllBlack() {
      this.deleteLiveUser({
        Id: this.blackSelection.join(','),
        type: 2,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.updateBlackList();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[error]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[error]', err);
        this.$Message.error(MSG_ERR);
      });
    },
    vipChangePage(pageindex) {
      this.vipPageIndex = pageindex;
      this.updateVipList();
    },
    updateVipList() {
      this.getVipList({
        pagesize,
        pageindex: this.vipPageIndex,
      });
    },
    vipSelectionChange(selection) {
      this.vipSelection = selection.map(item => item.Id);
    },
    deleteAllVip() {
      this.deleteLiveUser({
        Id: this.vipSelection.join(','),
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.updateVipList();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[error]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[error]', err);
        this.$Message.error(MSG_ERR);
      });
    },
  },
});
