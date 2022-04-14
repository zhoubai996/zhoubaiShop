<style lang="less" scoped>
.footer-container {
  margin-top: 40px;
}
.footer-box {
  background-color: #eaeaea;
}
.wrap {
  padding-left: 45px;
}

.slogen {
  padding-left: 65px;
  margin-right: -23px;
}
.slogen {
  *zoom: 1;
  position: relative;
  height: 42px;
  padding: 30px 0 30px 55px;
  overflow: hidden;
}

.slogen .item {
  float: left;
  position: relative;
  width: 292px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  font-weight: 700;
  text-indent: 46px;
  color: #444;
}
.slogen .item i {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 42px;
  text-indent: -9999px;
  background-image: url(//misc.360buyimg.com/jdf/1.0.0/unit/service/5.0.0/i/ico_service.png);
  background-repeat: no-repeat;
  background-position: 0 0;
}
.jd-help {
  border-top: solid 1px #dedede;
  border-bottom: solid 1px #dedede;
  background-color: #eaeaea;
  .wrap {
    margin-right: -140px;
    padding: 20px 0 200px 55px;
    dl {
      width: 255px;
      line-height: 22px;
      float: left;
      dt {
        display: block;
        padding-bottom: 6px;
        font-weight: 700;
        font-size: 14px;
        color: #777;
        height: 22px;
      }
      dd {
        font-size: 12px;
        color: #666;
        height: 22px;
        overflow: hidden;
        display: block;
      }
    }
  }
}
</style>
<template>
  <div class="footer-container">
    <div class="footer-box">
      <div class="w">
        <ol class="slogen">
          <li class="item fore1"><i>多</i>品类齐全，轻松购物</li>
          <li class="item fore2"><i>快</i>多仓直发，极速配送</li>
          <li class="item fore3"><i>好</i>正品行货，精致服务</li>
          <li class="item fore4"><i>省</i>天天低价，畅选无忧</li>
        </ol>
      </div>
      <div class="jd-help">
        <div class="w">
          <div class="wrap">
            <dl class="fore1">
              <dt>购物指南</dt>
              <dd><a rel="nofollow" target="_blank" href="">购物流程</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">会员介绍</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">生活旅行/团购</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">常见问题</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">大家电</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">联系客服</a></dd>
            </dl>
            <dl class="fore2">
              <dt>配送方式</dt>
              <dd><a rel="nofollow" target="_blank" href="">上门自提</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">211限时达</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">配送服务查询</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">配送费收取标准</a></dd>
              <dd><a target="_blank" href="">海外配送</a></dd>
            </dl>
            <dl class="fore3">
              <dt>支付方式</dt>
              <dd><a rel="nofollow" target="_blank" href="">货到付款</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">在线支付</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">分期付款</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">公司转账</a></dd>
            </dl>
            <dl class="fore4">
              <dt>售后服务</dt>
              <dd><a rel="nofollow" target="_blank" href="">售后政策</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">价格保护</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">退款说明</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">返修/退换货</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">取消订单</a></dd>
            </dl>
            <dl class="fore5">
              <dt>特色服务</dt>
              <dd><a target="_blank" href="">夺宝岛</a></dd>
              <dd><a target="_blank" href="">DIY装机</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">延保服务</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">京东E卡</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">京东通信</a></dd>
              <dd><a rel="nofollow" target="_blank" href="">京鱼座智能</a></dd>
            </dl>
            <span class="clr"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
}
</script>
