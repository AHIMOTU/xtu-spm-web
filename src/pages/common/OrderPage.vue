<template>
  <div>
    <el-card class="m-b-10" shadow="hover" :body-style="{ padding: '0 20px 20px 20px'}" v-for="(order, index) in orders" :key="index">
      <div slot="header">
        <span>{{order[0].create_time}}</span><span class="m-l-15">订单号： {{order[0].order_num}}</span>
        <el-button v-if="order[0].status === 0" @click="$router.push({ path: 'pay', query: { orderid: order[0].order_id } })" style="float: right; padding: 3px 0" type="text">去付款</el-button>
      </div>
      <div>
        <el-table
          :data="order"
          :span-method="objectSpanMethod"
          :show-header="true"
          header-row-class-name="table-header"
          style="width: 100%; margin-top: 20px">
          <el-table-column
            align="center"
            label="商品">
            <template slot-scope="scope">
              <div flex="cross:center main:center">
                <img width="80" height="80" :src="scope.row.picture_url" alt="">
                <span class="m-l-10">{{scope.row.name}}</span>
              </div>
            </template>
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
            label="实付款(元)">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="订单状态"
            :formatter="(row, column, cellValue, index) => row.status === 0 ? '待付款' : '已支付'">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 1" @click="$router.push({ path: '/comment', query: { order_id: scope.row.order_id, product_id: scope.row.id }})" size="mini">评价</el-button>
              <el-button size="mini">再次购买</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array
    }
  },
  methods: {
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
  }
}
</script>
