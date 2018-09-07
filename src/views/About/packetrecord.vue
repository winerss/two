<template>
  <div id="packetrecord">
    <Header :showLeft="showLeft">
        <p slot="title">领取记录</p>
    </Header>
    <div class="container">
      <div class="items">
        <div class="item" v-for="(item, index) in items" :key="index">
          <div class="top">
            <p>{{item.amount}}</p>
            <p>{{item.create_time}}</p>
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
      items: []
    }
  },
  methods: {
    getdata () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/lottery_record', params).then((response) => {
        this.items = response.data.data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getdata()
  }
}
</script>

<style lang="stylus">
#packetrecord
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    background #f5f5f5
    overflow-y scroll
    font-size .8rem
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .items
      color #333
      .item
        background #ffffff
        padding 0 .6rem
        margin-top 8px;
        line-height 30px
        border-top 1px solid #ddd
        border-bottom 1px solid #ddd
        .top,.bottom
          display flex
          justify-content space-between
</style>
