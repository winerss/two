<template>
  <div id="balance">
    <Header :showLeft="showLeft">
      <p slot="title">{{ title }}</p>
    </Header>
    <div class="container">
      <div class="income">
        <p class="current">{{lang.lable2}}</p>
        <p class="curMoney">{{curMoney}}</p>
      </div>
      <div class="detail">
        <p class="title"><span></span>{{lang.lable3}}</p>
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
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      title: '',
      type: 0,
      items: [],
      curMoney: 0,
      lang: {}
    }
  },
  methods: {
    getTitle () {
      let type = this.$route.params.type.split('=')[0]
      if (type === 'balance') {
        this.type = 0
        if (localStorage.getItem('language') === 'en') {
          this.title = 'HFCC balance'
        } else {
          this.title = 'HFCC余额'
        }
      } else if (type === 'consume') {
        this.type = 1
        if (localStorage.getItem('language') === 'en') {
          this.title = 'Consumption points'
        } else {
          this.title = '消费积分'
        }
      } else if (type === 'cash') {
        this.type = 2
        if (localStorage.getItem('language') === 'en') {
          this.title = 'Cashintegral'
        } else {
          this.title = '复消积分'
        }
      } else if (type === 'enroll_point') {
        this.type = 9
        if (localStorage.getItem('language') === 'en') {
          this.title = 'Register points'
        } else {
          this.title = '注册积分'
        }
      }
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', this.type)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        let data = res.data.data
        this.items = data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.curMoney = this.$route.params.type.split('=')[1]
    this.getTitle()
    this.getData()
    let lang = {
      en: {
        lable2: 'Current value',
        lable3: 'Asset details'
      },
      cn: {
        lable2: '当前值为',
        lable3: '资产明细'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  }
}
</script>

<style lang="stylus">
#balance
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
  color #333
  overflow-y scroll
  -webkit-overflow-scrolling touch
  &::-webkit-scrollbar
    display none
  .container
    margin-top 3.2rem
    .income
      margin .8rem .6rem
      padding 1rem 0
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
      .title
        padding 0 .6rem
        color #00a8ff
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #00a8ff
      .items
        color #666
        .item
          background #fff
          margin-top 8px;
          padding 0 .6rem
          height 60px
          line-height 30px
          border-top 1px solid #ebebeb
          border-bottom 1px solid #ebebeb
          .top,.bottom
            display flex
            justify-content space-between
</style>
