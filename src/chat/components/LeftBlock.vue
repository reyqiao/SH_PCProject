<template>
  <div class="left-nav">
    <div class="nav-item" @click="openWindow">
      <img src="../img/about.png">
      <p>关于我们</p>
    </div>
    <div class="nav-item" @click="showTeacher">
      <img src="../img/teacher.png">
      <p>名师风采</p>
    </div>
    <div class="nav-item" @click="showStrategy">
      <img src="../img/time.png">
      <p>即时策略</p>
    </div>
    <div class="nav-item" @click="showAdvance">
      <img src="../img/advance.png">
      <p>直播预告</p>
    </div>
    <div class="nav-item" @click="download">
      <img src="../img/download.png">
      <p>软件下载</p>
    </div>
    <div class="nav-item" @click="service">
      <img src="../img/service_system.png">
      <p>服务体系</p>
    </div>
    <div class="nav-qrcode">
      <lightbox src="./static/img/qrcode.png">
        <img src="../img/qrcode.png">
        <p>微信扫一扫
          <br>手机看直播</p>
      </lightbox>
    </div>
    <div class="modals">
      <Modal :mask-closable="false" title="汇交易 - 专注交易者实战交易" v-model="aboutus" class="about-modal" width='800' height="500">
        <div class="content">
          <div class="section">
            <div class="title">汇交易简介</div>
            <p class="des">
              汇交易学院是一家致力于为外汇交易者打造实战能力的教育平台，从实战出发开发出一套完善的新手教学体系以及互动式进阶指导体系，旨在丰富外汇投资者的外汇知识、提高他们的交易水平。下设汇交易金融研究所，专注于黄金外汇投资领域的深度研究，致力成为国内领先、国际知名的民间第三方金融研究与服务机构。
            </p>
          </div>
          <div class="section section2">
            <div class="title">汇交易优势与目标</div>
            <p class="des">
              本公司地处中国经济繁华的沿海城市—上海，在地理位置上有着得天独厚的优势和资源。目标：帮助交易者在实战中学习，在学习中打造专属自己的交易系统，实现稳定盈利。
            </p>
          </div>
          <div class="section">
            <div class="title">我们的服务</div>
            <p class="des">
              免费直播在线讲解，多层次交易教学体系，互动式VIP会员服务体系以及基于交易系统的策略喊单订阅服务；同时基于大数据在交易领域的技术应用，配套量化智能指标，让普通交易者掌握市场动向，把握入场时机。目前汇交易提供黄金外汇常规服务：《交易日刊》《大数据特刊》、《关键波段布局》、《多空通道线》（智能量化指标）以及投资者外汇知识学习培训等。
            </p>
          </div>
        </div>
      </Modal>
      <Modal :mask-closable="false" v-model="showService" class="service-modal" width='576' height="442">
        <img src="../img/server_system_detail.png" alt="">
      </Modal>
      <Modal :mask-closable="false" v-model="showdownload" width="846" title="软件下载" class="down-modal">
        <Row class="content">
          <Col span="12">
          <h3 class="title">pc版 meta trader 4</h3>
          <p class="des">
            metatrader4向您提供基本的工具和资源来分析市场并优化您交易外汇和差价合约的体验。向各种级别的交易者提供：高级技术分析，灵活的交易系统，算法交易，智能交易系统。
          </p>
          <a type="primary" class="todown" href="https://download.mql5.com/cdn/web/huanying.international.limited/mt4/huanying4setup.exe">立即下载</a>
          </Col>
          <Col span="12" class="col-right">
          <img src="../img/down_computer.png" alt="">
          </Col>
        </Row>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      showService: false,
      showdownload: false,
      aboutus: false,
    }
  },
  methods: {
    ...mapMutations([
      'setStrategyShow',
      'setStrategyTeacher',
    ]),
    showTeacher() {
      this.$store.commit('setTeacherModal', true);
    },
    openWindow() {
      // window.open('http://www.fxtrade888.com/default.aspx');
      this.aboutus = true;
    },
    showAdvance() {
      this.$store.commit('setVideoInfosType', 'VideoTrailer');
    },
    showStrategy() {
      this.setStrategyTeacher(undefined);
      this.setStrategyShow(true);
    },
    service() {
      this.showService = true;
    },
    download() {
      this.showdownload = true;
    }
  }
}
</script>


<style lang="scss">
.about-modal {
  .content {
    padding: 30px 20px 10px 20px;
    .section {
      .title {
        position: relative;
        width: 88px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: rgb(146, 99, 37);
        text-align: center;
        background: #FDC62E;
      }
      .title::before {
        content: ' ';
        width: 0;
        height: 0;
        position: absolute;
        right: -11px;
        top: 0;
        border-top: 11px solid #FDC62E;
        border-right: 11px solid transparent;
      }
      .title::after {
        content: ' ';
        width: 0;
        height: 0;
        position: absolute;
        right: -11px;
        bottom: 0;
        border-bottom: 11px solid #FDC62E;
        border-right: 11px solid transparent;
      }
      .des {
        font-size: 16px;
        color: #fff;
        margin-top: 18px;
        margin-bottom: 40px;
      }
    }
    .section2 {
      .title {
        width: 118px;
      }
    }
  }
  .ivu-modal-header-inner {
    color: #fff;
  }
  .ivu-icon.ivu-icon-ios-close-empty {
    color: #fff;
  }
  .ivu-modal-header {
    background: rgb(59, 59, 66);
    border-bottom: 1px solid rgb(59, 59, 66);
  }
  .ivu-modal-body {
    padding: 0;
    background: #2D2D2E;
  }
}

.service-modal {
  .ivu-modal-body {
    padding: 0;
  }
  .ivu-icon.ivu-icon-ios-close-empty {
    color: #fff;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.down-modal {
  .ivu-modal-header-inner {
    color: #fff;
  }
  .ivu-icon.ivu-icon-ios-close-empty {
    color: #fff;
  }
  .ivu-modal-header {
    background: rgb(59, 59, 66);
    border-bottom: 1px solid rgb(59, 59, 66);
  }
  .ivu-modal-body {
    padding: 0;
    background: #2D2D2E;
  }
  .content {
    padding: 48px 50px;
    .title {
      font-size: 20px;
      color: #fff;
    }
    .des {
      width: 298px;
      font-size: 16px;
      color: #fff;
      margin-top: 32px;
    }
    .todown {
      display: block;
      width: 300px;
      height: 60px;
      margin-top: 32px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      color: rgb(146, 99, 37);
      padding: 0;
      background-color: rgb(246, 199, 68);
      border: none;
      border-radius: 4px;
    }
    .col-right {
      text-align: center;
    }
  }
}

.left-nav {
  width: 6%;
  height: 100%;
  padding-top: 20px;
  background: rgb(52, 56, 64);
  .nav-item {
    width: 100%;
    text-align: center;
    margin: 16px auto;
    cursor: pointer;
    img {
      width: 42%;
    }
    p {
      color: #fff;
    }
  }
  .nav-qrcode {
    width: 100%;
    padding-top: 16px;
    text-align: center;
    cursor: pointer;
    img {
      width: 70%;
      padding-bottom: 8px;
    }
    p {
      color: rgb(255, 198, 0);
    }
  }
}
</style>
