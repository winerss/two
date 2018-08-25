<template>
  <div id="hfcc">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">HFCC</p>
    </Header>
    <div class="container">
      <div class="income">
        <p class="current">当前值</p>
        <p class="curMoney">{{ curMoney }}</p>
      </div>
      <div class="detail">
        <p class="title"><span></span>资产明细</p>
        <div class="items">
          <div class="item" v-for="(item, index) in items" :key="index">
            <div class="top">
              <p>{{item.note}}</p>
              <p>{{item.account}}</p>
            </div>
            <div class="bottom">
              <p>{{item.create_time}}</p>
              <p>{{item.c_account}}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="footer1" @click="goPage()">提取HFCC</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showTitle: true,
      showLeft: true,
      items: [],
      curMoney: 0
    }
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 10)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        let data = res.data.data
        this.items = data
      })
    },
    goPage () {
      this.$router.push('/pickUp')
    }
  },
  components: {
    Header
  },
  mounted () {
    this.curMoney = this.$route.params.id
    this.getData()
  }
}
</script>

<style lang="stylus">
#hfcc
  position absolute
  top 0
  left 0
  right 0
  bottom 0rem
  font-size .8rem
  background #f5f5f5
  color #000
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .income
      margin .8rem
      padding .5rem 0
      text-align center
      background #fff
      border-radius .4rem
      box-shadow 0px 0px 10px 1px #ccc
      .current
        font-size .8rem
        color #00a8ff
      .curMoney
        font-size 1.6rem
        line-height 3rem
        color #666
    .detail
      margin-top 1rem
      .title
        color #00a8ff
        padding 0 0.8rem
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #00a8ff
      .items
        color #666
        margin-bottom 2.5rem
        .item
          margin-top 8px;
          padding 0 .8rem
          height 60px
          line-height 30px
          border-top 1px solid #ebebeb
          border-bottom 1px solid #ebebeb
          background #fff
          .top,.bottom
            display flex
            justify-content space-between
    .footer1
      position fixed
      left 0
      right 0
      bottom 0
      height 2rem
      line-height 2rem
      text-align center
      background #ccc
      color #00a8ff
</style>
