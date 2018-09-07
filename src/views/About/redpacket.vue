<template>
    <div id="redpacked">
        <Header :showLeft="showLeft" :showRight="showRight">
            <p slot="title">我的红包</p>
            <p slot="right" @click="gopage">领取记录</p>
        </Header>
        <div class="container">
            <div class="income">
                <p class="current">当前值为</p>
                <p class="curMoney" >{{ data.lottery_point }}</p>
            </div>
            <p class="footer1" @click="getMoney()">领取红包</p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      showRight: true,
      data: {}
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        this.data = data.data
      })
    },
    gopage () {
      this.$router.push('/packetrecord')
    },
    getMoney () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_jingtai', params).then((res) => {
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (res.data.code === 1) {
          this.$router.push('/about')
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_user_info()
  }
}
</script>

<style lang="stylus">
#redpacked
  position absolute
  top 0
  left 0
  right 0
  bottom 0
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
    .footer1
      height 2rem
      line-height 2rem
      text-align center
      background #00a8ff
      margin 0 1rem
      border-radius .4rem
      color #fff
</style>
