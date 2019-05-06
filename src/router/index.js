import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/common/Index.vue'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/common/Detail.vue'
import Cart from '@/pages/Cart.vue'
import Order from '@/pages/Order.vue'
import Login from '@/pages/common/Login.vue'
import Registe from '@/pages/common/Registe.vue'
import ResetPassword from '@/pages/common/ResetPassword'
import Payment from '@/pages/Payment.vue'
import Search from '@/pages/Search.vue'
import CateSearch from '@/pages/CateSearch.vue'
import MyOrder from '@/pages/MyOrder.vue'
import Setting from '@/pages/common/Setting.vue'
import Address from '@/pages/setting/Address.vue'
import Password from '@/pages/setting/Password.vue'
import Comment from '@/pages/Comment.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'order',
          name: 'order',
          component: Order
        },
        {
          path: 'pay',
          name: 'pay',
          component: Payment
        },
        {
          path: 'search',
          name: 'search',
          component: Search
        },
        {
          path: 'catesearch',
          name: 'catesearch',
          component: CateSearch
        },
        {
          path: 'myorder',
          name: 'myorder',
          component: MyOrder
        },
        {
          path: 'comment',
          name: 'comment',
          component: Comment
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
          children: [
            {
              path: '/setting/address',
              name: 'address',
              component: Address
            },
            {
              path: '/setting/security',
              name: 'security',
              component: Password
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registe',
      name: 'registe',
      component: Registe
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    }
  ]
})
