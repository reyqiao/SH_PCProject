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

const MarqueeList = Vue.extend({
  template: '<Table width="800" border :columns="marqueeColumns" :data="list"></Table>',
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
      marqueeColumns: [
        {
          title: '公告文本',
          key: 'MarqueeText',
          align: 'center',
          width: 300,
        },
        {
          title: '跳转链接',
          key: 'MarqueeLink',
          align: 'center',
          width: 300,
        }, {
          title: '操作',
          key: 'option',
          align: 'center',
          render(row) {
            const {
              Id,
            } = row;
            return `<i-button type="error" @click="deleteMarquee(${Id})">删除</i-button>`;
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      'getLiveBaseData',
      'updateLiveMarquee',
    ]),
    deleteMarquee(Id) {
      this.updateLiveMarquee({
        Id,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
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

export default Vue.extend({
  template: tem,
  components: {
    MarqueeList,
  },
  data() {
    return {
      guestModel: false,
      marqueeMessage: '',
      marqueeUrl: '',
      notice: '',
      bannerData: '',
      bannerLink: '',
      headerBannerData: '',
      headerBannerLink: '',
      headerBannerLinkTo: '',      
      prosum1: '',
      prosum2: '',
      prosum3: '',
      poppicData: '',
      poppicLink: '',
    };
  },
  watch: {
    liveBaseData() {
      console.log(this.liveBaseData);
      this.notice = this.liveBaseData.Notice;
      this.bannerData = this.liveBaseData.TopBanner;
      this.bannerLink = this.liveBaseData.BannerLink;
      this.headerBannerData = this.liveBaseData.HeaderBannerData;
      this.headerBannerLink = this.liveBaseData.HeaderBannerLink;
      this.headerBannerLinkTo = this.liveBaseData.HeaderBannerLinkTo;      
      this.prosum1 = this.liveBaseData.Prosum1;
      this.prosum2 = this.liveBaseData.Prosum2;
      this.prosum3 = this.liveBaseData.Prosum3;
      this.poppicData = this.liveBaseData.PoppicData;
      this.poppicLink = this.liveBaseData.PoppicLink;
    },
  },
  computed: {
    ...mapGetters([
      'liveBaseData',
    ]),
  },
  mounted() {
    this.getLiveBaseData();
  },
  methods: {
    ...mapActions([
      'getLiveBaseData',
      'updateVisitor',
      'addLiveMarquee',
      'updateLiveBaseNotice',
      'updateLiveBaseTopBanner',
      'updateLiveBaseHeaderBanner',
      'updateLiveBaseProsum',
      'updateLiveBasePoppic',
    ]),
    changeGuest(model) {
      // this.guestModel = model;
      this.updateVisitor({
        IsVisitor: model ? 1 : 0,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
        } else {
          console.log('[error]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[error]', err);
        this.$Message.error(MSG_ERR);
      });
      return false;
    },
    addMarquee() {
      this.addLiveMarquee({
        MarqueeText: this.marqueeMessage,
        MarqueeLink: this.marqueeUrl,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
          this.marqueeMessage = '';
          this.marqueeUrl = '';
        } else {
          console.log('[erroe]', res);
          this.$Message.console.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
    updateNotice() {
      this.updateLiveBaseNotice({
        Notice: this.notice,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[erroe]', res);
          this.$Message.console.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
    updateProsum() {
      this.updateLiveBaseProsum({
        Prosum1: this.prosum1,
        Prosum2: this.prosum2,
        Prosum3: this.prosum3,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[erroe]', res);
          this.$Message.console.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
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
          this.bannerData = data;
          console.log(this.bannerData);
        }
      };
      reader.readAsDataURL(files[0]);
      return false;
    },
    headerUploadImg({
      target: {
        files,
      },
    }) {
      const reader1 = new FileReader();
      reader1.onload = () => {
        const data1 = reader1.result;
        if (data1.length > 0) {
          this.headerBannerData = data1;
          console.log(this.headerBannerData);
        }
      };
      reader1.readAsDataURL(files[0]);
      return false;
    },
    popUploadImg({
      target: {
        files,
      },
    }) {
      const reader2 = new FileReader();
      reader2.onload = () => {
        const data2 = reader2.result;
        if (data2.length > 0) {
          this.poppicData = data2;
          console.log(this.poppicData);
        }
      };
      reader2.readAsDataURL(files[0]);
      return false;
    },
    saveBanner() {
      this.updateLiveBaseTopBanner({
        TopBanner: this.bannerData,
        BannerLink: this.bannerLink,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[erroe]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
    headerSaveBanner() {
      console.log(this.headerBannerData);
      console.log(this.headerBannerLink);
      this.updateLiveBaseHeaderBanner({
        HeaderBannerData: this.headerBannerData,
        HeaderBannerLink: this.headerBannerLink,
        HeaderBannerLinkTo: this.headerBannerLinkTo,        
      }).then((res) => {
        console.log(res);
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
          this.$Message.success(MSG_SUC);
        } else {
          console.log('[erroe]', res);
          this.$Message.error(MSG_SERVER_ERR);
        }
      }, (err) => {
        console.log('[erroe]', err);
        this.$Message.console.error(MSG_ERR);
      });
    },
    SavePoppic() {
      console.log(this.poppicData);
      console.log(this.poppicLink);
      this.updateLiveBasePoppic({
        PoppicData: this.poppicData,
        PoppicLink: this.poppicLink,
      }).then((res) => {
        console.log(res);
        if (res.result === 1 || res.result === '1') {
          this.getLiveBaseData();
          this.$Message.success(MSG_SUC);
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
