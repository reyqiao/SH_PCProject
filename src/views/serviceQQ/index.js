import Vue from 'vue';
import {
  mapGetters,
  mapActions,
} from 'vuex';
import template from './index.html';
import moment from 'moment';
import './style.scss';

moment.locale('zh-cn');

const MSG_SUC = '操作成功';
const MSG_ERR = '操作异常';
const MSG_SERVER_ERR = '服务器异常';

export default Vue.extend({
  template,
  data() {
    return {
      QQScheduleColumns: [
        {
          title: 'ID',
          key: 'Id',
          align: 'center',
        },
        {
          title: '起始时间',
          key: 'BeginTime',
          align: 'center',
        },
        {
          title: '结束时间',
          key: 'EndTime',
          align: 'center',
        },
        {
          title: '客服群组名称',
          key: 'GroupName',
          align: 'center',
        },
        {
          title: '编辑',
          key: 'options',
          width: 230,
          align: 'center',
          render: (h, { row }) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                },
                on: {
                  click: () => {
                    this.getScheduleEdit(row.Id);
                  },
                },
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                },
                on: {
                  click: () => {
                    this.delSchedule(row.Id);
                  },
                },
              }, '删除'),
            ]);
          },
        }
      ],
      QQGroupColumns: [
        {
          title: 'ID',
          key: 'Id',
          align: 'center',
        },
        {
          title: '客服群组名称',
          key: 'GroupName',
          align: 'center',
        },
        {
          title: 'QQ号码',
          key: 'QQNums',
          align: 'center',
        },
        {
          title: '更新时间',
          key: 'UpdateTime',
          align: 'center',
        },
        {
          title: '编辑',
          key: 'options',
          width: 230,
          align: 'center',
          render: (h, { row }) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                },
                on: {
                  click: () => {
                    this.getGrpupEdit(row.Id);
                  },
                },
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                },
                on: {
                  click: () => {
                    this.delGroup(row.Id);
                  },
                },
              }, '删除'),
            ]);
          },
        }
      ],
      pageSize: 20,
      pageindex: 1,
      beginTime: '',
      endTime: '',
      qqGroupId: '',
      qqgroupName: '',
      qqNums: '',
      grpupEditId: 0,
      ScheduleEditId: 0,
    };
  },
  computed: {
    ...mapGetters([
      'qqScheduleList',
      'qqGroupsList',
    ]),
  },
  mounted() {
    this.getQQScheduleList();
    this.getQQGrpupsList();
  },
  methods: {
    ...mapActions([
      'getQQScheduleList',
      'getQQSchedule',      
      'addQQSchedule',
      'updateQQSchedule',
      'deleteQQSchedule',
      'getQQGrpupsList',
      'getQQGrpup',      
      'addQQGrpups',
      'updateQQGrpups',
      'deleteQQGrpups',
    ]),
    getScheduleEdit(Id) {
      this.getQQSchedule({
        Id
      }).then((res) => {
        if (res && res.Schedulelist.length > 0) {
          const slist = res.Schedulelist;
          this.ScheduleEditId = slist[0].Id;
          this.beginTime = slist[0].BeginTime;
          this.endTime = slist[0].EndTime;          
          this.qqGroupId = slist[0].QQGroupId;  
        } else {
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
    getGrpupEdit(Id) {
      this.getQQGrpup({
        Id
      }).then((res) => {
        if (res && res.Grouplist.length > 0) {
          const glist = res.Grouplist;
          this.grpupEditId = glist[0].Id;          
          this.qqgroupName = glist[0].GroupName;
          this.qqNums = glist[0].QQNums;          
        } else {
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
    addSchedule() {
      if (this.ScheduleEditId === 0) {
        this.addQQSchedule({
          beginTime: this.beginTime,
          endTime: this.endTime,
          qqGroupId: this.qqGroupId
        }).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.$Message.success(MSG_SUC);
          } else {
            this.$Message.error(MSG_SERVER_ERR);
          }
        }, (err) => {
          console.log('[erroe]', err);
          this.$Message.console.error(MSG_ERR);
        });
      } else {
        this.updateQQSchedule({
          beginTime: this.beginTime,
          endTime: this.endTime,
          qqGroupId: this.qqGroupId,
          Id: this.ScheduleEditId
        }).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.beginTime = '';
            this.endTime = '';
            this.ScheduleEditId = 0;
            this.$Message.success(MSG_SUC);
          } else {
            this.$Message.error(MSG_SERVER_ERR);
          }
        }, (err) => {
          console.log('[erroe]', err);
          this.$Message.console.error(MSG_ERR);
        });
      }
      this.getQQScheduleList();                
    },
    addGrpups() {
      if (this.grpupEditId === 0) {
        this.addQQGrpups({
          qqgroupName: this.qqgroupName,
          qqNums: this.qqNums
        }).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.$Message.success(MSG_SUC);
          } else {
            this.$Message.error(MSG_SERVER_ERR);
          }
        }, (err) => {
          console.log('[erroe]', err);
        });
      } else {
        this.updateQQGrpups({
          qqgroupName: this.qqgroupName,
          qqNums: this.qqNums,
          Id: this.grpupEditId
        }).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.grpupEditId = 0;
            this.qqgroupName = '';
            this.qqNums = '';
            this.$Message.success(MSG_SUC);
          } else {
            this.$Message.error(MSG_SERVER_ERR);
          }
        }, (err) => {
          console.log('[erroe]', err);
        });
      }
      this.getQQGrpupsList();     
    },
    delSchedule(Id) {
      this.deleteQQSchedule({
        Id
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
      this.getQQScheduleList();                      
    },
    delGroup(Id) {
      this.deleteQQGrpups({
        Id
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
      this.getQQGrpupsList();           
    },
    beginTimeChange(time) {
      this.beginTime = time;
    },
    endTimeChange(time) {
      this.endTime = time;
    },
  },
});