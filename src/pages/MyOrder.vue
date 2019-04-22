<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="全部订单">
        <el-card class="m-b-10" shadow="hover" :body-style="{ padding: '0 20px 20px 20px'}" v-for="(order, index) in orders" :key="index">
          <div slot="header">
            <span>{{order[0].create_time}} 订单号： 86140907504</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <el-table
              :data="order"
              :span-method="objectSpanMethod"
              :show-header="true"
              header-row-class-name="table-header"
              border
              style="width: 100%; margin-top: 20px">
              <el-table-column
                prop="name"
                align="center"
                label="商品">
              </el-table-column>
              <el-table-column
                prop="price"
                align="center"
                label="单价（元）">
              </el-table-column>
              <el-table-column
                prop="number"
                align="center"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="total_price"
                align="center"
                label="实付款">
              </el-table-column>
              <el-table-column
                prop="amount3"
                align="center"
                label="">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="待付款">待付款</el-tab-pane>
      <el-tab-pane label="待收货">待收货</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: []
    }
  },
  methods: {
    async getAllOrder () {
      let params = {
        userId: this.$ls.getJSON('info').id
      }
      const { data } = await this.$store.dispatch('getFindAllOrder', params)
      if (data.data) {
        this.orders = data.data
      }
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3 || columnIndex === 4) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
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
.el-card__header {
  // background: #ccc;
  font-size: 14px;
}
</style>
