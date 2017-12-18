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
      activeName: 'index',
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  mounted() {
    this.activeName = this.$route.name;
  },
  methods: {
    ...mapActions([
      'clearUserInfo',
    ]),
    selectMenu(menu) {
      this.$router.push(menu);
    },
    logout() {
      this.clearUserInfo();
      this.$router.push('login');
    },
  },
});
