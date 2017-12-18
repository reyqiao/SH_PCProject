import Vue from 'vue';
import {
  mapActions,
} from 'vuex';
import template from './index.html';
import './style.scss';

export default Vue.extend({
  template,
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      rule: {
        name: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur',
        }],
        password: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur',
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.login({
            userName: this.user.name,
            passWord: this.user.password,
          }).then((userInfo) => {
            if (userInfo && userInfo.userToken) {
              this.loading = false;
              this.$router.push('index');
            } else {
              this.loading = false;
              this.$Modal.warning({
                content: '登录失败，',
              });
            }
          });
          // this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
  },
});
