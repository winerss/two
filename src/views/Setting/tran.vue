<template>
  <div id="tran">
    <Header :showLeft="showLeft" :showRight=showRight :showTitle="showTitle">
      <p slot="title">转移方式</p>
      <p slot="right" @click="confirm">保存</p>
    </Header>
    <div class="container">
      <p style="margin-top: .8rem; color: #f00;padding: 0 .6rem;" v-show="is_auto_system === '0'">系统设置为手动转移 (系统方式优先)</p>
      <p style="margin-top: .8rem; color: #f00;padding: 0 .6rem;" v-show="is_auto_system === '1'">系统设置为自动转移 (系统方式优先)</p>
      <div class="items">
        <mt-cell @click.native="select('0')" title="手动转移">
          <p v-show="is_auto === '0'">√</p>
        </mt-cell>
        <mt-cell @click.native="select('1')" title="自动转移">
          <p v-show="is_auto === '1'">√</p>
        </mt-cell>
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
      showRight: true,
      showTitle: true,
      is_auto: '0',
      is_auto_system: String
    }
  },
  methods: {
    select (id) {
      this.is_auto = id
    },
    tran_type () {
      this.axios.post(process.env.API_ROOT + '/api/transfer/tran_type').then((res) => {
        this.is_auto_system = res.data.data.is_auto
        console.log(this.is_auto)
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.is_auto = res.data.data.is_auto
      })
    },
    confirm () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('is_auto', this.is_auto)
      this.axios.post(process.env.API_ROOT + '/api/user/edit_tran_type', params).then((res) => {
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
    this.get_user_info()
    this.tran_type()
  }
}
</script>

<style lang="stylus">
#tran
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
    .items
      .mint-cell-wrapper
        background-image none
      .mint-field
        .mint-cell-title
          width 80px
      .mint-cell
        margin-top .8rem
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
</style>
