<template>
  <div>
    <el-card>
      <div slot="header">
        <h3>订单提交成功，请尽快付款！</h3>
      </div>
      <div>
        <div>收货地址：</div>
        <div>商品名称：</div>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <h3>支付方式</h3>
      </div>
      <div flex="">
        <div class=""><img height="34px" src="../assets/images/alipay.png" alt=""></div>
        <div><img height="34px" src="../assets/images/qqpay.png" alt=""></div>
        <div><img height="34px" src="../assets/images/weixinpay.png" alt=""></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  computed: {
    orderId () {
      return this.$route.query.orderid
    }
  },
  methods: {
    async getOrderDetail () {
      let params = {
        id: this.orderId
      }
      const { data } = await this.$store.dispatch('getFindByOrderId', params)
      if (data.data) {
        console.log(data.data)
      }
    }
  },
  created () {
    this.getOrderDetail()
  }
}
</script>
