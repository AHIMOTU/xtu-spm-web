import Vue from 'vue'
import Vuex from 'vuex'
import api from '../global/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  getters: {
    cartNum: (state) => {
      let num = 0
      state.cart.forEach(c => {
        num = num + c.count
      })
      return num
    }
  },
  mutations: {
    setCart (state, params) {
      state.cart = params
    },
    // 覆盖
    addCart (state, params) {
      let index = state.cart.findIndex(c => c.product_id === params.product_id)
      if (index === -1) { // 购物车里还没有该商品
        state.cart = [...state.cart, params]
      } else {
        state.cart[index].count = params.count
      }
    },
    // 累加
    directAddCart (state, params) {
      let index = state.cart.findIndex(c => c.product_id === params.product_id)
      if (index === -1) {
        state.cart = [...state.cart, params]
      } else {
        state.cart[index].count += params.count
      }
    },
    // 删除
    deleteCart (state, params) {
      let arr = params.map(p => p.id)
      state.cart = state.cart.filter(c => !arr.includes(c.product_id))
    }
  },
  actions: {
    login (context, params) {
      return api.login(params)
    },
    getSms (context, params) {
      return api.getSms(params)
    },
    postCheckSms (context, params) {
      return api.postCheckSms(params)
    },
    regist (context, params) {
      return api.regist(params)
    },
    getPhone (context, params) {
      return api.getPhone(params)
    },
    postEditPassword (context, params) {
      return api.postEditPassword(params)
    },
    getProductList (context, params) {
      return api.getProductList(params)
    },
    getProductListBySales (context, params) {
      return api.getProductListBySales(params)
    },
    getProductByCateId (context, params) {
      return api.getProductByCateId(params)
    },
    getProductDetail (context, params) {
      return api.getProductDetail(params)
    },
    getCategoryList (context, params) {
      return api.getCategoryList(params)
    },
    postAddCart (context, params) {
      return api.postAddCart(params)
    },
    postDelCart (context, params) {
      return api.postDelCart(params)
    },
    postSelectAllCart (context, params) {
      return api.postSelectAllCart(params)
    },
    postDirectAddCart (context, params) {
      return api.postDirectAddCart(params)
    },
    getFindCart (context, params) {
      return api.getFindCart(params)
    },
    postSelectCart (context, params) {
      return api.postSelectCart(params)
    },
    postAddAddress (context, params) {
      return api.postAddAddress(params)
    },
    getFindAddress (conntext, params) {
      return api.getFindAddress(params)
    },
    postEditAddress (context, params) {
      return api.postEditAddress(params)
    },
    postDelAddress (context, params) {
      return api.postDelAddress(params)
    },
    postAddOrder (context, params) {
      return api.postAddOrder(params)
    },
    postChangeStatus (context, params) {
      return api.postChangeStatus(params)
    },
    getFindByOrderId (context, params) {
      return api.getFindByOrderId(params)
    },
    getFindAllOrder (context, params) {
      return api.getFindAllOrder(params)
    },
    postAddComment (context, params) {
      return api.postAddComment(params)
    },
    getFindComment (context, params) {
      return api.getFindComment(params)
    }
  }
})
