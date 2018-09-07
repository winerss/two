<template>
  <div id="mall-detail">
    <Header :showLeft="showLeft">
      <p slot="title">商品详情</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="banner" :style="{backgroundImage:'url(' + url + data.img + ')'}"></div>
        <h4>{{data.title}}</h4>
        <div class="bottom">
          <div class="price">￥{{data.price}}</div>
          <div class="num-input">
            <button @click="changeNum('mins')" class="mins" size="small">-</button>
            <input type="number" v-model="buyCount">
            <button @click="changeNum('plus')" class="plus" size="small">+</button>
          </div>
        </div>
        <h4>商品详情</h4>
        <p class="text">{{data.content}}</p>
        <div v-show="data.type === '2'">
          <mt-field label="以太坊钱包地址" placeholder="请输入以太坊钱包地址" v-model="address"></mt-field>
          <mt-field label="支付密码" type="password" placeholder="请输入≥6的字母+数字的密码" v-model="erji"></mt-field>
        </div>
      </div>
    </div>
    <footer v-show="data.type === '1'">
      <p class="buy" @click="addCart('buy')">立即购买</p>
      <p class="add" @click="addCart('add')">加入购物车</p>
    </footer>
    <footer v-show="data.type === '2'">
      <p class="buy" @click="buyNow">立即购买</p>
    </footer>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      url: '',
      showLeft: true,
      buyCount: 1,
      id: '',
      address: '',
      erji: '',
      data: {}
    }
  },
  created () {
    this.url = process.env.API_ROOT
  },
  methods: {
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
    },
    changeNum (type) {
      if (type === 'mins') {
        if (this.buyCount > 1) {
          this.buyCount--
        } else {
          this.$toast({
            message: '数量不能小于1',
            position: 'bottom',
            duration: 1000
          })
        }
      } else if (type === 'plus') {
        this.buyCount++
      }
    },
    buyNow () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('address', this.address)
      params.append('shopid', this.data.id)
      params.append('amount', this.buyCount)
      params.append('erji', this.erji)
      this.axios.post(process.env.API_ROOT + '/api/block/buy_eth', params).then((res) => {
        if (res.data.code === 1) {
          this.$router.push('/mallOrder')
        }
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
    },
    addCart (type) {
      this._addCart(type)
    },
    getData () {
      var params = new FormData()
      params.append('shop_id', this.id)
      this.axios.post(process.env.API_ROOT + '/api/block/get_shop_detail', params).then((res) => {
        this.data = res.data.data
      })
    },
    _addCart (type) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('shop_id', this.data.id)
      params.append('num', this.buyCount)
      this.axios.post(process.env.API_ROOT + '/api/block/add_buy_car', params).then((res) => {
        if (type === 'buy') {
          this.$router.push('/cart')
          return false
        }
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.id = this.$route.params.id
    this.getData()
    this._initScroll()
  }
}
</script>

<style lang="stylus">
#mall-detail
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .mint-field .mint-cell-title
    width 130px
  .container
    position absolute
    top 2.4rem
    bottom 2.6rem
    left 0
    right 0
    .wrapper
      .banner
        height 14rem
        background-size cover
        background-repeat no-repeat
        background-position center
      h4
        color #333
        padding 0 .4rem
        line-height 1.6rem
        font-size 1rem
      .bottom
        display flex
        justify-content space-between
        height 40px
        padding 0 .4rem
        line-height 40px
        .price
          color #f00
          font-size 1.2rem
        .num-input
          position absolute
          right 1rem
          float right
          line-height 20px
          margin-top 8px
          .mins
            float left
          .plus
            float right
          .mins,.plus
            cursor pointer
            height 22px
            width 20px
            padding 0
            border 1px solid  #ccc
            background none
            color #666
            border-radius 4px
            outline none
          input
            width 60px
            height 20px
            float left
            margin 0 4px
            text-align center
            border 1px solid #ccc
            border-radius 4px
            outline none
            color #666
      .text
        margin-top .4em
        line-height 1.2rem
        text-indent 20px
        padding 0 .4rem
        color #666
  footer
    position fixed
    height 2.6rem
    display flex
    bottom 0
    width 100%
    text-align center
    line-height 2.6rem
    color #fff
    p
      flex 1
    .buy
      background #eda407
    .add
      background #d00707
</style>
