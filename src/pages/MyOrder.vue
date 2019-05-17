<template>
  <div>
    <el-tabs id="order-tabs" type="border-card">
      <el-tab-pane v-loading="loading" label="全部订单">
        <order-page v-if="orders.length" :orders="orders"></order-page>
        <div v-else class="f-14 a-c m-v-20">
          <span class="pr-color m-r-5"><i class="el-icon-info f-16"></i></span>
          暂无订单，快去下单吧！
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <el-badge :value="nopayOrders.length" :hidden="nopayOrders.length<=0">待付款</el-badge>
        </span>
        <order-page v-if="nopayOrders.length" :orders="nopayOrders"></order-page>
        <div v-else class="f-14 a-c m-v-20">
          <span class="pr-color m-r-5"><i class="el-icon-info f-16"></i></span>
          暂无订单，快去下单吧！
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <el-badge :value="payedOrders.length" :hidden="payedOrders.length<=0">待收货</el-badge>
        </span>
        <order-page v-if="payedOrders.length" :orders="payedOrders"></order-page>
        <div v-else class="f-14 a-c m-v-20">
          <span class="pr-color m-r-5"><i class="el-icon-info f-16"></i></span>
          暂无订单，快去下单吧！
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import orderPage from './common/OrderPage.vue'

export default {
  components: {
    orderPage
  },
  data () {
    return {
      loading: false,
      orders: []
    }
  },
  computed: {
    nopayOrders () {
      return this.orders.filter(o => o[0].status === 0)
    },
    payedOrders () {
      return this.orders.filter(o => o[0].status === 1)
    }
  },
  methods: {
    async getAllOrder () {
      let params = {
        userId: this.$ls.getJSON('info').id
      }
      this.loading = true
      const { data } = await this.$store.dispatch('getFindAllOrder', params)
      this.loading = false
      if (data.data) {
        this.orders = data.data
      }
    }
  },
  created () {
    this.getAllOrder()
  }
}
</script>

<style lang="scss">
@import '../assets/css/vars.scss';
#order-tabs {
  .el-badge__content.is-fixed {
    top: 10px !important;
    right: 0 !important;
  }
  .el-card__header {
    // background: #ccc;
    font-size: 14px;
  }
}
</style>
