<template>
  <div id="mall-order">
    <Header :showLeft="showLeft">
      <p slot="title">我的订单</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item @click.native="getData('api/block/get_self_buy')" id="1">消费订单</mt-tab-item>
        <mt-tab-item @click.native="getData('api/block/get_eth_buy')" id="2">ETH订单</mt-tab-item>
      </mt-navbar>
        <div class="items">
          <div class="item" v-for="(item, index) in data" :key="index">
            <div class="title">
              <p class="name">商品名：{{item.title}}</p>
              <p v-show="item.order_type === 0" class="price">￥{{item.price}}</p>
              <p v-show="item.order_type === 1" class="price">总价：￥{{item.price * item.amount}}</p>
            </div>
            <div class="footer">
              <p v-show="item.order_type === 0" class="detail">支付方式：{{item.detail}}</p>
              <p v-show="item.order_type === 1" class="detail">支付方式：ETH积分支付</p>
              <p style="color: #00a8ff;" v-show="item.is_fa === '0'">未发货</p>
              <p style="color: #00a8ff;" v-show="item.is_fa === '1'">已发货</p>
              <p v-show="item.order_type === 1">数量: {{item.amount}}</p>
            </div>
            <p v-show="item.order_type === 0" class="address">收货地址：{{item.address}}</p>
            <p v-show="item.order_type === 1" class="address">以太坊地址：{{item.address}}</p>
            <div class="footer">
              <p v-show="item.order_type === 0" class="tel">联系方式：{{item.phone}}</p>
              <p class="date">日期：{{item.create_time}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      selected: '1',
      data: []
    }
  },
  methods: {
    getData (url) {
      this.data = []
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + url, params).then((res) => {
        this.data = res.data.data
      })
    },
    _initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            scrollY: true,
            probeType: 2
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getData('api/block/get_self_buy')
    this._initScroll()
  }
}
</script>

<style lang="stylus">
#mall-order
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    background #f5f5f5
    .wrapper
      .items
        line-height 1.2rem
        .item
          background #fff
          margin-top .4rem
          padding 0 .4rem
          .title
            height 2rem
            line-height 2rem
            display flex
            justify-content space-between
            font-size 1rem
            .price
              color #f00
          .footer
            display flex
            justify-content space-between
            height 2rem
            line-height 2rem
</style>
