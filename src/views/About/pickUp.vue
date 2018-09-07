<template>
  <div id="pickUp">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">提取HFCC</p>
    </Header>
    <div class="container">
      <mt-field label="转入数量" placeholder="数量不能低于10" v-model='form.amount'></mt-field>
      <mt-field label="输入地址" type="text" placeholder="请输入地址" v-model='form.address'></mt-field>
      <mt-button size="small" :class="{ active: isActive }" @click="confirm('consum')" class="confirm">提取HFCC</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      isActive: false,
      showTitle: true,
      form: {
        amount: '',
        address: ''
      },
      type: ''
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.address && oldValue.amount) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    confirm (type) {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('amount', this.form.amount)
      params.append('address', this.form.address)
      this.axios.post(process.env.API_ROOT + '/api/transfer/hfcc_imtoken', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (data.code === 1) {
          this.$router.push('/about')
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.type = this.$route.params.id
  }
}
</script>

<style lang="stylus">
#pickUp
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
  color #000
  .mint-cell
    margin-top .4rem
  .mint-popup-bottom
    width 100%
  .mint-cell-wrapper
    background-image none
  .mint-field
    .mint-cell-title
      width 80px
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    .page-part
      position absolute
      z-index 2
      top 0
      width 100%
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #ddd
    .active
      background #00a8ff
      color #fff
</style>
