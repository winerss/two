<template>
  <div id="mall-confirm">
    <Header :showLeft="showLeft">
      <p slot="title">确认购买</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="pay-type">
          <mt-cell title="支付类型">
            <mt-radio class="mt-check" v-model="typeValue" @change.native="checked" :options="options"></mt-radio>
          </mt-cell>
        </div>
        <mt-field label="联系人" placeholder="请输入联系人姓名" v-model='form.name'></mt-field>
        <mt-field label="联系方式" placeholder="请输入联系方式" v-model='form.tel'></mt-field>
        <div class="address">
          <mt-field label="收货地区" placeholder="请选择收货地区" :value="form.address" readonly @click.native="showAddressAreaPicker = !showAddressAreaPicker" class="address"></mt-field>
          <p class="link"></p>
          <mt-field label="详细地址" placeholder="请输入详细地址信息" v-model='form.addressDetail'></mt-field>
        </div>
        <mt-field label="支付密码" type="password" placeholder="请输入密码" v-model='form.erji'></mt-field>
        <div class="lists">
          <div class="title">
            <p>产品编号</p><p>产品名称</p><p>单价</p><p>数量</p><p>总金额</p>
          </div>
          <div class="items">
            <div class="item" v-for="(item, index) in items" :key="index">
              <p>{{item.id}}</p>
              <p>{{item.title}}</p>
              <p>{{parseFloat(item.single_price)}}</p>
              <p>{{parseInt(item.num)}}</p>
              <p>{{parseFloat(item.single_price) * parseInt(item.num)}}</p>
            </div>
            <div class="total">合计 {{items.length}} 金额： {{allPrice}}</div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="showAddressAreaPicker" class="address-picker" position="bottom">
      <mt-picker :slots="slots1" value-key="name" @change="onValuesChange1"></mt-picker>
      <mt-picker :slots="slots2" value-key="name" @change="onValuesChange2"></mt-picker>
      <mt-picker :slots="slots3" value-key="name" @change="onValuesChange3"></mt-picker>
    </mt-popup>
    <footer>
      <p class="buy" @click="buy">确认无误，购买</p>
      <p class="cart" @click="goPage">返回购物车</p>
    </footer>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      typeValue: '5',
      showAddressAreaPicker: false,
      provinceList: [],
      allPrice: 0,
      city: [],
      area: [],
      selectedp: '',
      selectedc: '',
      selecteda: '',
      items: [],
      data: [],
      slots1: [
        {
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      slots3: [
        {
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      options: [{
        label: '20%注册积分+80%复消积分',
        value: '5'
      },
      {
        label: '100%消费积分',
        value: '6'
      }],
      form: {
        name: '',
        tel: '',
        address: '',
        addressDetail: '',
        erji: ''
      }
    }
  },
  methods: {
    buy () {
      let data = []
      this.items.forEach(element => {
        data.push({
          id: element.id,
          num: element.num
        })
      })
      if (!this.form.address || !this.form.addressDetail) {
        this.$toast({
          message: '请输入地址',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      if (!this.form.name) {
        this.$toast({
          message: '请输入联系人',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      if (!this.form.tel) {
        this.$toast({
          message: '请输入联系人电话',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      if (!this.form.erji) {
        this.$toast({
          message: '请输入支付密码',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('receive_name', this.form.name)
      params.append('receive_address', this.form.address + this.form.addressDetail)
      params.append('receive_tel', this.form.tel)
      params.append('erji', this.form.erji)
      params.append('sign', this.typeValue)
      params.append('data', JSON.stringify(data))
      this.axios.post(process.env.API_ROOT + '/api/block/buy_shop', params).then((res) => {
        if (res.data.code === 1) {
          this.$router.push('/mallOrder')
          return false
        }
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
    },
    goPage () {
      this.$router.push('/cart')
    },
    getArea () {
      var params = new FormData()
      params.append('cityId', '1')
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_address', params).then((response) => {
        this.data = response.data.data
        this.data.forEach(element => {
          if (element.type === '1') {
            this.provinceList.push(element)
          } else if (element.type === '2') {
            this.city.push(element)
          } else if (element.type === '3') {
            this.area.push(element)
          }
        })
        this.slots1[0].values = this.provinceList
      })
    },
    // 获取城市选择的值
    onValuesChange1 (picker, values) {
      // 获取city
      this.selectedp = ''
      this.slots2[0].values = ['请选择']
      this.provinceList.forEach(province => {
        if (province.name === picker.getSlotValue(0).name) {
          this.city.forEach(city => {
            if (city.parent_id === picker.getSlotValue(0).id) {
              this.slots2[0].values.push(city)
            }
          })
        }
      })
      this.selectedp = picker.getSlotValue(0).name
    },
    onValuesChange2 (picker, values) {
      this.selectedc = ''
      this.slots3[0].values = ['请选择']
      this.city.forEach(city => {
        if (city.name === picker.getSlotValue(0).name) {
          this.area.forEach(area => {
            if (area.parent_id === picker.getSlotValue(0).id) {
              this.slots3[0].values.push(area)
            }
          })
        }
      })
      this.selectedc = picker.getSlotValue(0).name
    },
    onValuesChange3 (picker, values) {
      this.selecteda = picker.getSlotValue(0).name
      this.form.address = this.selectedp + this.selectedc + this.selecteda
    },
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
    checked () {
      this.$nextTick(() => {
        console.log(this.typeValue)
      })
    }
  },
  components: {
    Header
  },
  beforeDestroy () {
    window.localStorage.removeItem('confirm')
  },
  mounted () {
    this.items = JSON.parse(window.localStorage.getItem('confirm'))
    console.log(this.items)
    this.items.forEach(element => {
      this.allPrice += parseFloat(element.num) * parseFloat(element.single_price)
    })
    this.getArea()
    this._initScroll()
  }
}
</script>

<style lang="stylus">
#mall-confirm
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .address-picker
    display flex
  .picker
    flex 1
    text-align center
  .mint-popup-bottom
    width 100%
  .mint-field
    .mint-cell-title
      width 80px
  .mint-cell-wrapper, .mint-radiolist-label
    background none
    font-size .8rem
    color #333
  .mint-cell:last-child
    background none
  .container
    position absolute
    top 2.4rem
    bottom 2.6rem
    left 0
    right 0
    background #f5f5f5
    .wrapper
      .address
        background #fff
      .pay-type
        margin-top .4rem
        background #fff
        font-size 0.8rem
        .mint-radiolist
          display flex
      .lists
        background #fff
        margin-top .4rem
        .title, .item
          display flex
          height 2rem
          line-height 2rem
          p
            flex 1
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .item:nth-child(2n+1)
          background #f5f5f5
        .total
          line-height 2rem
          padding 0 .4rem
  footer
    position fixed
    height 2.6rem
    display flex
    bottom 0
    width 100%
    text-align center
    line-height 2.6rem
    color #fff
    font-size .8rem
    font-weight bold
    p
      flex 1
    .buy
      background #d00707
    .cart
      background #eda407
</style>
