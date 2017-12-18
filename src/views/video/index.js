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

const VideoTypeList = Vue.extend({
  template: '<Table border :columns="columns" :data="list"></Table>',
  props: {
    list: {
      type: Array,
    },
    editHandler: {
      type: Function,
    },
    deleteHandler: {
      type: Function,
    },
  },
  data() {
    return {
      columns: [{
        title: '栏目名称',
        align: 'center',
        key: 'VideoName',
      }, {
        title: '操作',
        key: 'actions',
        align: 'center',
        render(row) {
          const {
            Id,
            VideoName,
          } = row;
          return `<i-button type="primary" @click="editVideoType('${Id}', '${VideoName}')">编辑</i-button><i-button type="error" @click="deleteVideoType('${Id}')" style="margin-left: 8px">删除</i-button>`;
        },
      }],
    };
  },
  methods: {
    editVideoType(Id, name) {
      this.editHandler(Id, name);
    },
    deleteVideoType(Id) {
      this.deleteHandler(Id);
    },
  },
});

const VideoList = Vue.extend({
  template: '<Table border :columns="columns" :data="list"></Table>',
  props: {
    list: {
      type: Array,
    },
    deleteHandler: {
      type: Function,
    },
  },
  data() {
    return {
      columns: [{
        title: '视频主题',
        align: 'center',
        key: 'VideoTheme',
      }, {
        title: '操作',
        key: 'actions',
        align: 'center',
        render(row) {
          const {
            Id,
          } = row;
          return `<i-button type="error" @click="deleteVideo('${Id}')" style="margin-left: 8px">删除</i-button>`;
        },
      }],
    };
  },
  methods: {
    deleteVideo(Id) {
      this.deleteHandler(Id);
    },
  },
});

export default Vue.extend({
  template: tem,
  components: {
    VideoTypeList,
    VideoList,
  },
  data() {
    return {
      liveVideo: {
        VideoTheme: '',
        VideoId: '',
        Cover: '',
        Introduce: '',
      },
      ruleValidate: {

      },
      VideoTypeName: '',
      VideoTypeId: '',
    };
  },
  computed: {
    ...mapGetters([
      'liveVideoList',
      'liveVideoTypeList',
      'totalLiveVideoList',
    ]),
  },
  mounted() {
    this.getLiveVideoList();
  },
  methods: {
    ...mapActions([
      'getLiveVideoList',
      'addLiveVideoType',
      'updateLiveVideoType',
      'deleteLiveVideoType',
      'addLiveVideo',
      'deleteLiveVideo',
    ]),
    addVideoType() {
      if (this.VideoTypeName.length === 0 || /^[ ]+$/.test(this.VideoTypeName)) {
        this.$Message.warning('栏目名称不能为空');
        return;
      }
      this.addLiveVideoType({
        VideoName: this.VideoTypeName,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveVideoList();
          this.VideoTypeName = '';
          this.VideoTypeId = '';
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
          console.log('[error]', res);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
    selectEditLiveVideoType(Id, name) {
      this.VideoTypeId = Id;
      this.VideoTypeName = name;
    },
    deleteVideoType(Id) {
      this.deleteLiveVideoType({
        Id,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveVideoList();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
          console.log('[error]', res);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
    editVideoType() {
      if (this.VideoTypeName.length === 0 || /^[ ]+$/.test(this.VideoTypeName)) {
        this.$Message.warning('栏目名称不能为空');
        return;
      }
      this.updateLiveVideoType({
        Id: this.VideoTypeId,
        VideoName: this.VideoTypeName,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveVideoList();
          this.VideoTypeName = '';
          this.VideoTypeId = '';
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
          console.log('[error]', res);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
    resetVideo() {
      this.liveVideo = {
        VideoTheme: '',
        VideoId: '',
        Cover: '',
        Introduce: '',
      };
    },
    addVideo() {
      this.addLiveVideo(this.liveVideo).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveVideoList();
          this.resetVideo();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
          console.log('[error]', res);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
      });
    },
    deleteVideo(VideoId) {
      this.deleteLiveVideo({
        VideoId,
      }).then((res) => {
        if (res.result === 1 || res.result === '1') {
          this.getLiveVideoList();
          this.$Message.success(MSG_SUC);
        } else {
          this.$Message.error(MSG_SERVER_ERR);
          console.log('[error]', res);
        }
      }, (err) => {
        this.$Message.error(MSG_ERR);
        console.log('[error]', err);
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
          this.liveVideo.Cover = data;
        }
      };
      reader.readAsDataURL(files[0]);
      return false;
    },
    changePhone() {
      this.$refs.phone.click();
    },
    removePhone() {
      this.liveVideo.Cover = '';
    },
  },
});
