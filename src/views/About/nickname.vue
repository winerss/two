<template>
  <div id="nickname">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">设置姓名</p>
    </Header>
    <div class="container">
      <mt-field label="昵称" placeholder="请设置您的真实姓名" v-model='realname'></mt-field>
      <!-- <p class="tips">设置后，其他人将看到您的昵称。</p> -->
      <mt-button :class="{ active: isActive }" size="small" @click="setName">保存</mt-button>
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
      realname: '',
      isActive: false
    }
  },
  watch: {
    nickname () {
      if (this.nickname) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  },
  components: {
    Header
  },
  methods: {
    setName () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('realname', this.realname)
      this.axios.post(process.env.API_ROOT + '/api/user/edit_realname', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (res.data.code === 1) {
          this.$router.push('/about')
        }
      })
    }
  }
}
</script>

<style lang="stylus">
#nickname
  position absolute
  top 0
  left 0
  right 0
  bottom 2.6rem
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
    .mint-cell
      margin-top 1rem
      border-bottom 1px solid #ddd
      background #fff
      .mint-cell-wrapper
        background-image none
      .mint-cell-title
        width 80px
      .mint-cell-text
        vertical-align top
        font-size .8rem
      .mint-cell-value
        input
          font-size .8rem
          color #333
          outline none
          background #fff
    .tips
      line-height 2rem
      padding 0 .4rem
      color #999
    button
      display block
      width 90%;
      margin 1rem auto
      background #fff
    .active
      background #00a8ff
      color #fff
</style>
