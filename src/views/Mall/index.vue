<template>
  <div id="mall">
    <Header :showTitle="showTitle" :showRight="showRight">
      <p slot="title">商城</p>
      <p slot="right" @click="goPage('/mallOrder')">我的订单</p>
    </Header>
    <div class="container">
      <div class="items" ref="wrapper">
        <div class="wrapper">
          <!-- product -->
          <h4 class="header-title" style="line-height: 2rem;text-align:center;color:#00a8ff;">会员区</h4>
          <div class="product">
            <div class="item" v-for="(item, index) in product" :key="index" @click="goPage('/product/', item.id)">
              <div class="banner" :style="{backgroundImage:'url(' + url + item.img + ')'}"></div>
              <h4>{{item.title}}</h4>
              <p class="content">{{item.content || '暂无数据'}}</p>
              <div class="bottom">
                <p class="price">{{item.point}}</p>
                <p class="price">{{item.reword}}</p>
              </div>
            </div>
          </div>
          <!-- shop -->
          <h4 class="header-title" style="line-height: 2rem;text-align:center;color:#00a8ff;">消费区</h4>
          <div class="shop">
            <div class="item" v-for="(item, index) in shop" :key="index" @click="goPage('/mallDetail/', item.id)">
              <div class="banner" :style="{backgroundImage:'url(' + url + item.img + ')'}"></div>
              <h4>{{item.title}}</h4>
              <p class="content">{{item.content || '暂无数据'}}</p>
              <div class="bottom">
                <p class="price">￥{{item.price}}</p>
                <p class="cart" @click.stop="addCart(item)"><img src="../../assets/img/cart.png" alt="">购物车</p>
              </div>
            </div>
          </div>
          <!-- eth -->
          <h4 class="header-title" style="line-height: 2rem;text-align:center;color:#00a8ff;">ETH</h4>
          <div class="eths">
            <div class="item" v-for="(item, index) in eths" :key="index" @click="goPage('/mallDetail/', item.id)">
              <div class="banner" :style="{backgroundImage:'url(' + url + item.img + ')'}"></div>
              <h4>{{item.title}}</h4>
              <p class="content">{{item.content || '暂无数据'}}</p>
              <div class="bottom">
                <p class="price">￥{{item.price}}</p>
                <!-- <p class="cart" @click.stop="addCart(item)"><img src="../../assets/img/cart.png" alt="">购物车</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="cart" @click="goPage('/cart')">
      <img src="../../assets/img/cart.png" alt="">
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      url: '',
      showTitle: true,
      showRight: true,
      product: [],
      shop: [],
      eths: []
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
    goPage (path, id) {
      if (!localStorage.getItem('sid')) {
        this.$router.push('/login')
        return false
      }
      if (id) {
        this.$router.push(path + id)
      } else {
        this.$router.push(path)
      }
    },
    addCart (item) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('shop_id', item.id)
      params.append('num', 1)
      this.axios.post(process.env.API_ROOT + '/api/block/add_buy_car', params).then((res) => {
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
    },
    get_product () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_product').then((res) => {
        this.product = res.data.data
        console.log(this.product)
      })
    },
    get_eth () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_eth').then((res) => {
        this.eths = res.data.data
        console.log(this.eths)
      })
    },
    get_shop () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_shop').then((res) => {
        this.shop = res.data.data
        console.log(this.shop)
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_product()
    this.get_shop()
    this.get_eth()
    this._initScroll()
  }
}
</script>

<style lang="stylus">
#mall
  position absolute
  top 0
  bottom 2.6rem
  left 0
  right 0
  background url('../../assets/img/beijing.jpg')
  background-size cover
  .header-title
    background rgba(255,255,255,0.4)
  .item
    float left
    width 44%
    margin-left 4%
    margin-top 1rem
    // background #fff
    border-radius 6px
    overflow hidden
    box-shadow 0px 0px 5px 2px #ccc
    .banner
      height 7rem
      background-size cover
      background-repeat no-repeat
      background-position center
    h4
      color #333
      padding 0 .4rem
      margin-top .3rem
    .content
      line-height 1.4rem
      padding 0 .4rem
      color #666
    .bottom
      padding 0 .2rem
      display flex
      justify-content space-between
      line-height 30px
      .price
        color #f00
      .cart
        height 30px
        color #333
        img
          float left
          margin-right 4px
          height 20px
          margin-top 5px
  #cart
    position fixed
    bottom 4rem
    right 1rem
    padding 6px
    border-radius 50%
    background rgba(255,255,255,0.6)
    box-shadow 0px 0px 4px 4px #ccc
    img
      height 24px
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    // background #fff
    .items
      position absolute
      top 0
      left 0
      right 0
      bottom .4rem
      .wrapper
        overflow hidden
        padding-bottom 2rem
        .product,.shop,.eths
          padding-bottom .8rem
          overflow hidden
</style>
