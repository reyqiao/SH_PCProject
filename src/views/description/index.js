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

export default Vue.extend({
  template: tem,
  data() {
    return {
      teacherColumns: [
        {
          title: '老师',
          key: 'teachername',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render(row) {
            const {
              Id,
            } = row;
            return `<i-button type="primary" @click="selectEditLiveTeacher('${Id}')">编辑</i-button><i-button type="error" @click="deleteTeacher('${Id}')" style="margin-left: 8px">删除</i-button>`;
          },
        },
      ],
      ruleValidate: {
        teachername: [
          {
            required: true,
            message: '老师姓名不能为空',
            trigger: 'blur',
          },
        ],
      },
      currTeacherTag: '',
      teacherTagList: [],
    };
  },
  computed: {
    ...mapGetters([
      'liveTeacherList',
      'liveTeacher',
    ]),
  },
  watch: {
    'liveTeacher.TeacherTag': {
      handler() {
        if (this.liveTeacher.TeacherTag && this.liveTeacher.TeacherTag.length > 0) {
          this.teacherTagList = this.liveTeacher.TeacherTag.split(',');
        } else {
          this.teacherTagList = [];
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getLiveTeacherList().then(() => {
      console.log('6666', this.liveTeacherList);
    });
  },
  methods: {
    ...mapActions([
      'getLiveTeacherList',
      'getLiveTeacher',
      'changeTeacherTags',
      'changeTeacherPhone',
      'addLiveTeacher',
      'updateLiveTeacher',
      'clearLiveTeacher',
      'deleteLiveTeacher',
    ]),
    addTeacherTag() {
      if (this.currTeacherTag.length === 0 || /^[ ]+$/.test(this.currTeacherTag)) {
        this.$Message.warning('老师标签不能为空');
        return;
      }
      const temList = this.teacherTagList.slice(0);
      temList.push(this.currTeacherTag);
      this.changeTeacherTags(temList.join(',')).then(() => {
        this.currTeacherTag = '';
      });
    },
    removeTeacherTag(index) {
      const temList = this.teacherTagList.slice(0);
      temList.splice(index, 1);
      this.changeTeacherTags(temList.join(','));
    },
    changePhone() {
      this.$refs.phone.click();
    },
    removePhone() {
      this.changeTeacherPhone();
    },
    uploadImg({
      target: {
        files,
      },
    }) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        if (data.length > 0) {
          this.changeTeacherPhone(data);
        }
      };
      reader.readAsDataURL(files[0]);
      return false;
    },
    selectEditLiveTeacher(Id) {
      this.getLiveTeacher({
        Id,
      }).then((res) => {
        if (res.result !== '1' && res.result !== 1) {
          console.log('[error]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[error]', err);
        this.$Message.error(MSG_ERR);
      });
    },
    saveLiveTeacher() {
      this.$refs.liveTeacher.validate((valid) => {
        if (valid) {
          let saveHandler;
          // console.log(this.liveTeacher.Id);
          if (typeof this.liveTeacher.Id === 'undefined') {
            saveHandler = this.addLiveTeacher;
          } else {
            saveHandler = this.updateLiveTeacher;
          }
          saveHandler(this.liveTeacher).then((res) => {
            if (res.result === '1' || res.result === 1) {
              this.getLiveTeacherList();
              this.clearLiveTeacher();
              this.$Message.success(MSG_SUC);
            } else {
              console.log('[error]', res);
              this.$Message.error(MSG_ERR);
            }
          }, (err) => {
            console.log('[error]', err);
            this.$Message.error(MSG_SERVER_ERR);
          });
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
    clearTeacher() {
      this.clearLiveTeacher();
    },
    deleteTeacher(Id) {
      this.deleteLiveTeacher({
        Id,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.$Message.success(MSG_SUC);
          this.getLiveTeacherList();
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
