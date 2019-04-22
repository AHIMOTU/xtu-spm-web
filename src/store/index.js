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
    getProductList (context, params) {
      return api.getProductList(params)
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
    postAddOrder (context, params) {
      return api.postAddOrder(params)
    },
    getFindByOrderId (context, params) {
      return api.getFindByOrderId(params)
    },
    getFindAllOrder (context, params) {
      return api.getFindAllOrder(params)
    }
  }
})
