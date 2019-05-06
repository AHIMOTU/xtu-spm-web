<template>
  <div>
    <div v-if="order[0].status === 0">
      <el-card class="m-b-20">
        <div slot="header">
          <h3>订单提交成功，请尽快付款！</h3>
        </div>
        <div class="info-color f-14">
          <div>订 单 号 ：{{order[0].order_num}}</div>
          <div>收货地址：{{order[0].address}}</div>
          <div>
            <div class="f-l">商品名称：</div>
            <div class="f-l p-b-20">
              <div v-for="(item, index) in order" :key="index">{{item.name}}</div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <h3>支付方式</h3>
        </div>
        <div flex="">
          <div @click="onCode" class="c-p"><img height="34px" src="../assets/images/alipay.png" alt=""></div>
          <div @click="onCode" class="c-p"><img height="34px" src="../assets/images/qqpay.png" alt=""></div>
          <div @click="onCode" class="c-p"><img height="34px" src="../assets/images/weixinpay.png" alt=""></div>
        </div>
      </el-card>
    </div>
    <el-card v-else>
      <div class="m-v-50" flex="main:center">
        <bs-icon name="suc"></bs-icon>
        <span class="m-l-10">付款成功！</span>
        <el-link class="f-14" type="primary">继续购买</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: []
    }
  },
  computed: {
    orderId () {
      return this.$route.query.orderid
    }
  },
  methods: {
    onCode () {
      const code = require('../assets/images/code.png')
      this.$utils.alert(`<strong><img width="180" height="180" src="${code}" alt=""></strong>`, '请扫描下方二维码进行支付', { callback: this.onPay,dangerouslyUseHTMLString: true, center: true, confirmButtonClass: 'confirmBtn' })
    },
    async onPay (action, instance) {
      let params = {
        status: 1,
        orderId: this.orderId
      }
      const { data } = await this.$store.dispatch('postChangeStatus', params)
      if (data.code === 200) {
        this.getOrderDetail()
      }
    },
    async getOrderDetail () {
      let params = {
        id: this.orderId
      }
      const { data } = await this.$store.dispatch('getFindByOrderId', params)
      if (data.data) {
        this.order = data.data
      }
    }
  },
  created () {
    this.getOrderDetail()
  }
}
</script>

<style>
@import "../assets/css/vars.scss";
</style>
