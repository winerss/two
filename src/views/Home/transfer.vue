<template>
  <div id="transfer">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container">
      <p style="margin-bottom: .8rem; color: #00a8ff;padding: 0 .6rem;" v-show="is_allow_trade === '0' && value ==='1'">消费积分转移功能关闭</p>
      <p style="margin-bottom: .8rem; color: #00a8ff;padding: 0 .6rem;" v-show="is_allow_trade === '1' && value ==='1'">消费积分转移功能开启</p>
      <mt-radio
        v-model="value"
        :options="options">
      </mt-radio>
      <mt-field :label="lang.lable2" :placeholder="lang.lable3" v-model='form.address'></mt-field>
      <mt-field :label="lang.lable4" :placeholder="lang.lable5" v-model="form.number"></mt-field>
      <!-- <mt-cell title="手机归属地" is-link to="/citys">
        <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
      </mt-cell>
      <mt-field label="手机号码" v-model="form.tel" readonly placeholder="请输入手机号码"></mt-field> -->
      <!-- <div class="telphone">
        <mt-cell title="验证码">
          <input type="text" v-model="form.code">
          <p v-show="codeSta" @click="getCode" style="font-size: 0.6rem;color:#00a8ff;">获取验证码</p>
          <mt-button v-show="!codeSta" style="font-size: 0.6rem;" size="small" type="primary">{{time + ' 秒后获取'}}</mt-button>
        </mt-cell>
      </div> -->
      <mt-field :label="lang.lable6" type="password" :placeholder="lang.lable7" v-model="form.password"></mt-field>
      <mt-button :class="{ active: isActive }" class="confirm" size="small" @click="comfirm" type="default">{{lang.lable9}}</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      showTitle: true,
      title: '',
      codeSta: true,
      value: '1',
      options: [{
        label: '消费积分', value: '1'
      }, {
        label: '注册积分', value: '2'
      }],
      time: 60,
      is_allow_trade: 0,
      form: {
        address: '',
        number: '',
        password: ''
        // code: '',
        // tel: ''
      },
      isActive: false,
      lang: {}
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.address && oldValue.number && oldValue.password) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
    }
  },
  methods: {
    zhuce_status () {
      this.axios.post(process.env.API_ROOT + '/api/transfer/zhuce_status').then((res) => {
        this.is_allow_trade = res.data.data.is_allow_trade
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.form.tel = res.data.data.tel
      })
    },
    getCode () {
      let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(this.form.tel)) {
        this.$toast({
          message: '请检查您的手机格式',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      this.codeSta = false
      var params = new FormData()
      params.append('tel', this.form.tel)
      params.append('type', '积分转移')
      this.axios.post(process.env.API_ROOT + '/api/block/send_codes', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
      let timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timer)
          this.codeSta = true
          this.time = 60
        }
      }, 1000)
    },
    comfirm () {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('host', this.form.address)
      params.append('amount', this.form.number)
      // params.append('tel', this.form.tel)
      params.append('type', this.value)
      params.append('erji', this.form.password)
      // params.append('code', this.form.code)
      this.axios.post(process.env.API_ROOT + '/api/transfer/from_host', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (data.code === 1) {
          this.$router.push('/home')
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.zhuce_status()
    this.get_user_info()
    this.form.address = localStorage.getItem('scan') || ''
    let lang = {
      en: {
        lable1: 'Send',
        lable2: 'User address',
        lable3: 'Please enter user address',
        lable4: 'Send quantity',
        lable5: 'Please enter the number of',
        lable6: 'Pay the password',
        lable7: 'Please enter payment passv',
        lable9: 'Confirmation of transfer'
      },
      cn: {
        lable1: '发送',
        lable2: '用户地址',
        lable3: '请输入用户地址',
        lable4: '发送数量',
        lable5: '请输入发送数量',
        lable6: '支付密码',
        lable7: '请输入≥6的字母+数字的密码',
        lable9: '确认转账'
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
#transfer
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
    .mint-cell
      border-bottom 1px solid #ddd
      background #fff
      .mint-cell-wrapper
        background-image none
      .mint-cell-title
        width 80px
        font-size .8rem
      .mint-cell-text
        vertical-align top
        font-size .8rem
      .mint-cell-value
        input
          font-size .8rem
          color #333
          outline none
          background #fff
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #999
      color #ccc
    .active
      background #00a8ff
      color #fff
    .tips
      text-align center
      .num
        color #fff
</style>
