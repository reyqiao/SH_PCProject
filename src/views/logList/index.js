import Vue from 'vue';
import {
  mapGetters,
  mapActions,
} from 'vuex';
import template from './index.html';
import './style.scss';

export default Vue.extend({
  template,
  data() {
    return {
      logColumns: [
        {
          title: 'ID',
          key: 'id',
          align: 'center',
        },
        {
          title: '归属',
          key: 'channelName',
          align: 'center',
        },
        {
          title: '昵称',
          key: 'nickName',
          align: 'center',
        },
        {
          title: '手机号',
          key: 'mobile',
          align: 'center',
        },
        {
          title: '级别',
          key: 'roleName',
          align: 'center',
        },
        {
          title: '时间',
          key: 'addTime',
          align: 'center',
        },
        {
          title: '平台',
          key: 'source',
          align: 'center',
        },
        {
          title: '操作',
          key: 'operateType',
          align: 'center',
        },
      ],
      pageSize: 20,
      pageindex: 1,
      mobile: undefined,
      nickName: undefined,
      channelId: undefined,
      source: undefined,
      addTime: undefined,
    };
  },
  computed: {
    ...mapGetters([
      'logList',
      'channelList',
      'logTotal',
    ]),
  },
  mounted() {
    // this.getChannelList();
    this.refreshLogList();
  },
  methods: {
    ...mapActions([
      // 'getChannelList',
      'getLogList',
      'exportLogList'
    ]),
    refreshLogList() {
      this.getLogList({
        pageindex: this.pageindex,
        pageSize: this.pageSize,
        mobile: this.mobile,
        nickName: this.nickName,
        channelId: this.channelId,
        source: this.source,
        addTime: this.addTime,
      });
    },
    changePage(pageindex) {
      this.pageindex = pageindex;
      this.refreshLogList();
    },
    exportHandler() {
      this.exportLogList({
        mobile: this.mobile,
        nickName: this.nickName,
        channelId: this.channelId,
        source: this.source,
        addTime: this.addTime,
      });
    },
  },
});