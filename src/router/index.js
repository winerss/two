import Vue from 'vue'
import Router from 'vue-router'
// 底部导航
import index from '@/views/Index'
// 首页
import home from '@/views/Home'
import balance from '@/views/Home/balance'
import newScale from '@/views/Home/newScale'
import transfer from '@/views/Home/transfer'
import receive from '@/views/Home/receive'
import noticeList from '@/views/Home/noticeList'
import noticeDetail from '@/views/Home/noticeDetail'
// import scan from '@/views/Home/scan'
// import scan from '@/views/scan'

// 订单
import order from '@/views/Order'
import buyOrder from '@/views/Order/buyOrder'
import saleOrder from '@/views/Order/saleOrder'
import putup from '@/views/Order/putup'
import putsale from '@/views/Order/putsale'
import putbuy from '@/views/Order/putbuy'
import citys from '@/views/Order/citys'

// 信息
import message from '@/views/Message'
import messagedetail from '@/views/Message/detail'

// 我的
import about from '@/views/About'
import product from '@/views/About/product'
import qrcode from '@/views/About/qrcode'
import orderRecord from '@/views/About/orderRecord'
import myorder from '@/views/About/myorder'
import reward from '@/views/About/reward'
import release from '@/views/About/release'
import gupoint from '@/views/About/gupoint'

import freeze from '@/views/About/freeze'
import user from '@/views/About/user'
import nickname from '@/views/About/nickname'
import avatar from '@/views/About/avatar'
import convert from '@/views/About/convert'
import hfcc from '@/views/About/hfcc'
import eth from '@/views/About/eth'

import pickUp from '@/views/About/pickUp'
import redpacket from '@/views/About/redpacket'
import packetrecord from '@/views/About/packetrecord'

// 设置
import setting from '@/views/Setting'
// 登陆注册
import login from '@/views/Login/login'
import register from '@/views/Login/register'
import password from '@/views/Login/password'
// 设置新手机号
import changeTel from '@/views/Setting/changeTel'
import set from '@/views/Setting/changeTel/set'
// 设置密码
import changePass from '@/views/Setting/changePass'
import setpass from '@/views/Setting/changePass/set'
// 设置语言
import language from '@/views/Setting/language'
import tran from '@/views/Setting/tran'

// 关于app
import aboutApp from '@/views/Setting/about'
// 商城
import mall from '@/views/Mall'
import mallDetail from '@/views/Mall/detail'
import cart from '@/views/Mall/cart'
import confirm from '@/views/Mall/confirm'
import addressEdit from '@/views/Mall/addressEdit'
import address from '@/views/Mall/address'
import mallOrder from '@/views/Mall/mallOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mall',
      component: index,
      children: [{
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: 'HFCC'
        }
      }, {
        path: '/order',
        redirect: '/order/saleOrder',
        component: order,
        children: [{
          path: '/order/buyOrder',
          name: 'buyOrder',
          component: buyOrder
        }, {
          path: '/order/saleOrder',
          name: 'saleOrder',
          component: saleOrder
        }]
      }, {
        path: '/message',
        name: 'message',
        component: message,
        meta: {
          title: '消息'
        }
      }, {
        path: '/messagedetail/:id',
        name: 'messagedetail',
        component: messagedetail,
        meta: {
          title: '消息'
        }
      }, {
        path: '/about',
        name: 'about',
        component: about,
        meta: {
          title: '我的'
        }
      }, {
        path: '/mall',
        name: 'mall',
        component: mall
      }]
    },
    // 商城
    {
      path: '/mallDetail/:id',
      name: 'detail',
      component: mallDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: confirm
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component: addressEdit
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/mallOrder',
      name: 'mallOrder',
      component: mallOrder
    },
    /**
     * Home模块
     */
    // 余额
    {
      path: '/balance/:type',
      name: 'balance',
      component: balance,
      meta: {
        title: 'HFCC余额'
      }
    }, {
      path: '/newScale/:type',
      name: 'newScale',
      component: newScale
    }, {
      path: '/transfer',
      name: 'transfer',
      component: transfer,
      meta: {
        title: '发送'
      }
    }, {
      path: '/receive',
      name: 'receive',
      component: receive,
      meta: {
        title: '接收'
      }
    }, {
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList,
      meta: {
        title: '公告'
      }
    }, {
      path: '/noticeDetail/:id',
      name: 'noticeDetail',
      component: noticeDetail,
      meta: {
        title: '新闻详情'
      }
    },
    /**
     * 订单
     */
    {
      path: '/putup',
      redirect: '/putup/putbuy',
      component: putup,
      children: [{
        path: '/putup/putbuy',
        name: 'putbuy',
        component: putbuy
      }, {
        path: '/putup/putsale',
        name: 'putsale',
        component: putsale
      }]
    }, {
      path: '/citys',
      name: 'citys',
      component: citys,
      meta: {
        title: '城市'
      }
    },
    /**
     * 我的模块
     */
    {
      path: '/product/:id',
      name: 'product',
      component: product
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: qrcode
    },
    {
      path: '/orderRecord',
      name: 'orderRecord',
      component: orderRecord
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/redpacket',
      name: 'redpacket',
      component: redpacket
    },
    {
      path: '/packetrecord',
      name: 'packetrecord',
      component: packetrecord
    },
    {
      path: '/reward',
      name: 'reward',
      component: reward
    },
    {
      path: '/freeze/:id',
      name: 'freeze',
      component: freeze
    },
    {
      path: '/release/:id',
      name: 'release',
      component: release
    },
    {
      path: '/gupoint/:id',
      name: 'gupoint',
      component: gupoint
    },
    {
      path: '/hfcc/:id',
      name: 'hfcc',
      component: hfcc
    },
    {
      path: '/eth/:id',
      name: 'eth',
      component: eth
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/nickname',
      name: 'nickname',
      component: nickname
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: avatar
    },
    {
      path: '/convert/:id',
      name: 'convert',
      component: convert
    },
    {
      path: '/pickUp',
      name: 'pickUp',
      component: pickUp
    },
    // setting
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    /**
     * 登录注册
     */
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/password',
      name: 'password',
      component: password
    },
    // 更改手机号
    {
      path: '/changeTel',
      name: 'changeTel',
      component: changeTel
    }, {
      path: '/changeTel/set',
      name: 'set',
      component: set
    },
    // 设置密码
    {
      path: '/changePass/:type',
      name: 'changePass',
      component: changePass
    }, {
      path: '/changePass/setpass/:type',
      name: 'setpass',
      component: setpass
    },
    {
      path: '/language',
      name: 'language',
      component: language
    },
    {
      path: '/tran',
      name: 'tran',
      component: tran
    },
    {
      path: '/aboutapp',
      name: 'aboutApp',
      component: aboutApp
    }
  ]
})
