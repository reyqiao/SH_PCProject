import Vue from 'vue';
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
import moment from 'moment';
import tem from './index.html';

moment.locale('zh-cn');

const MSG_SUC = '操作成功';
const MSG_ERR = '操作异常';
const MSG_SERVER_ERR = '服务器异常';

const NoticeList = Vue.extend({
  template: '<Table :columns="columns" :data="list"></Table>',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      columns: [{
        title: '时间',
        key: 'Day',
        align: 'center',
        width: 240,
        render(row) {
          const {
            Day,
            BeginTime,
            EndTime,
          } = row;
          const temDay = moment(Day, 'YYYY-MM-DD').format('YYYY/MM/DD ddd');
          return `${temDay} ${BeginTime}-${EndTime}`;
        },
      }, {
        title: '直播主题',
        key: 'LiveTheme',
        align: 'center',
      }, {
        title: '老师',
        key: 'Teacher',
        align: 'center',
      }, {
        title: '直播类型',
        key: 'LiveType',
        align: 'center',
        render(row) {
          const {
            LiveType,
          } = row;
          return LiveType === '1' ? '视频直播' : '图文直播';
        },
      }, {
        title: '操作',
        key: 'actions',
        align: 'center',
        render(row) {
          const {
            Id,
          } = row;
          return `<i-button type="error" @click="deleteNotice('${Id}')">删除</i-button>`;
        },
      }],
    };
  },
  methods: {
    ...mapActions([
      'getLiveNoticeList',
      'deleteLiveNotice',
    ]),
    deleteNotice(Id) {
      console.log(Id);
      this.deleteLiveNotice({
        Id,
      }).then((res) => {
        if (res.result === '1' || res.result === 1) {
          this.getLiveNoticeList();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[error]', err);
        this.$Message.error(MSG_ERR);
      });
    },
  },
});

export default Vue.extend({
  template: tem,
  components: {
    NoticeList,
  },
  data() {
    return {
      liveNotice: {
        Day: '',
        BeginTime: '',
        EndTime: '',
        LiveTheme: '',
        Teacher: '',
        LiveType: '1',
        LiveIntroduce: '',
      },
      ruleValidate: {
        Day: [{
          required: true,
          message: '日期不能为空',
          trigger: 'blur',
        }],
        BeginTime: [{
          required: true,
          message: '起始时间不能为空',
          trigger: 'blur',
        }],
        EndTime: [{
          required: true,
          message: '结束时间不能为空',
          trigger: 'change',
        }],
        LiveTheme: [{
          required: true,
          message: '请输入直播主题',
          trigger: 'blur',
        }],
        Teacher: [{
          required: true,
          message: '请输入老师姓名',
          trigger: 'blur',
        }],
        LiveType: [{
          required: true,
          message: '请选择直播类型',
          trigger: 'change',
        }],
        LiveIntroduce: [{
          required: true,
          message: '请输入直播介绍',
          trigger: 'blur',
        },
        {
          type: 'string',
          min: 10,
          message: '介绍不能少于10字',
          trigger: 'blur',
        },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'liveNoticeList',
      'noticePic',
    ]),
  },
  mounted() {
    this.getLiveNoticeList();
    this.getNoticePic();
  },
  methods: {
    ...mapActions([
      'getLiveNoticeList',
      'addLiveNotice',
      'addLiveNoticePic',
      'getNoticePic',
    ]),
    ...mapMutations(['SET_LIVE_NOTICE_PIC']),
    addNotice(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.addLiveNotice(this.liveNotice).then((res) => {
            if (res.result === '1' || res.result === 1) {
              this.clearNotice();
              this.getLiveNoticeList();
              this.$Message.success(MSG_SUC);
            } else {
              console.log('[error]', res);
              this.$Message.error(MSG_SERVER_ERR);
            }
          }, (err) => {
            console.log('[error]', err);
            this.$Message.error(MSG_ERR);
          });
        } else {
          this.$Message.error('表单填写错误!');
        }
      });
    },
    clearNotice() {
      this.liveNotice = {
        Day: '',
        BeginTime: '',
        EndTime: '',
        LiveTheme: '',
        Teacher: '',
        LiveType: '1',
        LiveIntroduce: '',
      };
    },
    dayChange(day) {
      this.liveNotice.Day = day;
    },
    beginTimeChange(time) {
      this.liveNotice.BeginTime = time;
    },
    endTimeChange(time) {
      this.liveNotice.EndTime = time;
    },
    uploadImg({ target: { files } }) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.$store.commit('SET_LIVE_NOTICE_PIC', reader.result || '');
      };
      return false;
    },
    addNoticePic() {
      this.addLiveNoticePic({
        NoticePic: this.noticePic,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getNoticePic();
          this.$Message.success(res.message);
        } else {
          console.log('[erroe]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
  },
});
