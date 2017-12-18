import Vue from 'vue';
import {
  mapGetters,
  mapActions,
} from 'vuex';
import template from './index.html';

const pagesize = 10;

export default Vue.extend({
  template,
  data() {
    return {
      phone: '',
      pageIndex: 1,
      channelId: undefined,
      nickModal: false,
      curNickname: '',
      curUserid: undefined,
      levelColumns: [{
        title: 'id',
        key: 'userid',
        align: 'center',
      }, {
        title: '归属地',
        key: 'channelName',
        align: 'center',
      }, {
        title: '昵称',
        key: 'nickname',
        align: 'center',
      }, {
        title: '手机',
        key: 'mobile',
        align: 'center',
      }, {
        title: 'IP',
        key: 'ip',
        align: 'center',
      }, {
        title: '用户级别',
        key: 'role',
        align: 'center',
        render(h, { row }) {
          return h('div', row.role.map((item) => {
            return h('span', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                marginRight: '10px',
              },
            }, item.name);
          }));
        },
      }, {
        title: '注册时间',
        key: 'regtime',
        align: 'center',
      }, {
        title: '状态',
        key: 'status',
        align: 'center',
        width: 80,
        render: (h, { row }) => {
          return h('Button', {
            props: {
              type: 'primary',
              size: 'small',
            },
            on: {
              click: () => {
                this.disable(row.userid, row.status);
              },
            },
          }, row.status);
        },
      }, {
        title: '设置级别',
        key: 'update',
        align: 'center',
        width: 100,
        render: (h, { row }) => {
          return h('Select', {
            props: {
              placeholder: '选择用户级别',
              value: `${row.role[0].id}`,
            },
            on: {
              'on-change': (value) => {
                this.reset(row.userid, value);
              },
            },
          }, this.roleList.map((item) => {
            return h('Option', {
              props: {
                value: item.roleid,
                key: item.roleid,
              },
            }, item.rolename);
          }));
        },
      }, {
        title: '编辑',
        key: 'options',
        width: 230,
        align: 'center',
        render: (h, { row }) => {
          return h('div', [
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
                  this.delete(row.userid);
                },
              },
            }, '删除'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                marginRight: '10px',
              },
              on: {
                click: () => {
                  this.resetpwd(row.userid);
                },
              },
            }, '重置密码'),
            h('Button', {
              props: {
                type: 'success',
                size: 'small',
              },
              on: {
                click: () => {
                  this.showNickModal(row.userid);
                },
              },
            }, '修改昵称'),
          ]);
        },
      }],
    };
  },
  computed: {
    ...mapGetters([
      'levelList',
      'roleList',
      'levelChannelList',
    ]),
  },
  mounted() {
    this.updateUserLevelList();
    this.getRoleList();
  },
  methods: {
    ...mapActions([
      'getUserLevelList',
      'getRoleList',
      'deleteLevel',
      'disableLevel',
      'resetLevel',
      'resetRole',
      'modifyNickname',
    ]),
    changePage(pageindex) {
      this.pageIndex = pageindex;
      this.updateUserLevelList();
    },
    disable(userid, status) {
      this.disableLevel({
        userid,
        status: status === '正常' ? 1 : 0,
      }).then((res) => {
        if (res.code === 0) {
          this.updateUserLevelList();
          this.$Message.success(res.message || '操作成功');
        } else {
          this.$Message.warn(res.message || '操作失败!');
        }
      });
    },
    delete(userid) {
      this.deleteLevel({ userid }).then((res) => {
        if (res.code === 0) {
          this.updateUserLevelList();
          this.$Message.success('删除成功!');
        } else {
          this.$Message.warn(res.message || '删除失败!');
        }
      });
    },
    resetpwd(userid) {
      this.resetLevel({ userid }).then((res) => {
        if (res.code === 0) {
          this.$Message.success(res.message || '改密成功!');
        } else {
          this.$Message.warn(res.message || '操作失败!');
        }
      });
    },
    showNickModal(userid) {
      this.curUserid = userid;
      this.nickModal = true;
    },
    modifyNicknameHandler() {
      this.modifyNickname({
        userid: this.curUserid,
        nickName: this.curNickname,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.$Message.success('修改成功');
          this.updateUserLevelList();
          this.curNickname = '';
          this.curUserid = undefined;
          this.nickModal = false;
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    reset(userid, roles) {
      this.resetRole({ userid, roles }).then((res) => {
        if (res.code === 0) {
          this.updateUserLevelList();
          this.$Message.success('设置成功!');
        } else {
          this.$Message.warn(res.message || '操作失败!');
        }
      });
    },
    updateUserLevelList() {
      this.getUserLevelList({
        pagesize,
        pageindex: this.pageIndex,
        phone: this.phone,
        channelIds: this.channelId,
      });
    },
  },
});
