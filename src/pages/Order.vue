<template>
  <div>
    <h1>结算页</h1>
    <!-- 地址管理 -->
    <el-card class="m-v-20">
      <div slot="header">
        <h3>收货人信息</h3>
      </div>
      <div flex="">
        <div v-for="info in addressInfo" :key="info.id" @click="checkAdress(info)" :class="{checked: isChecked}" class="adress w-280 h-120 p-10 m-lv-10 b-o p-r f-14" flex="dir:top main:center">
          <i class="el-icon-check f-18 p-a" :class="{checked: isChecked}"></i>
          <div>{{info.consignee}}</div>
          <div>{{info.address}}</div>
          <div>{{info.phone}}</div>
          <div class="action w-p-100 p-a f-18">
            <div class="edit w-p-50 p-v-5 f-l a-c c-p"><i class="el-icon-edit"></i></div>
            <div class="delete w-p-50 p-v-5 f-l a-c c-p"><i class="el-icon-delete"></i></div>
          </div>
        </div>
        <div class="w-280 h-120 p-10 f-18 b-o" flex="main:center cross:center"><i class="el-icon-circle-plus c-p pr-color" @click="dialogFormVisible = true"><span class="f-16"> 新增收货人信息</span></i></div>
      </div>
    </el-card>
    <!-- 支付方式 -->
    <el-card class="m-b-20">
      <div slot="header">
        <h3>支付方式</h3>
      </div>
      <div>
        <el-radio v-model="radio" label="1">货到付款</el-radio>
        <el-radio v-model="radio" label="2">在线支付</el-radio>
      </div>
    </el-card>
    <!-- 商品信息 -->
    <el-card>
      <div slot="header">
        <h3>送货清单</h3>
        <el-table ref="table" :data="dataList">
          <el-table-column prop="name" label="商品" align="center"></el-table-column>
          <el-table-column prop="price" label="单价" align="center"></el-table-column>
          <el-table-column prop="count" label="数量" align="center"></el-table-column>
          <el-table-column label="小计" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.price * scope.row.count}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
      </div>
    </el-card>
    <div class="m-t-20 a-r f-14">
      <div><span class="pr-color f-18">{{totalCount}}</span> 件商品，应付总额：￥<span class="pr-color f-18">{{totalPrice}}</span></div>
      <div class="m-v-5">寄送至：{{orderAddress.address}} 收货人：{{orderAddress.consignee}} {{orderAddress.phone}}</div>
      <div><el-button type="danger" @click="onSubmit">提交订单</el-button></div>
    </div>
    <!-- 地址管理弹框 -->
    <el-dialog title="新增收货人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form"  label-width="80px">
        <el-form-item label="所在地区">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="form.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSaveAddress">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isChecked: false,
      radio: '1',
      dataList: [],
      dialogFormVisible: false,
      form: {},
      addressInfo: [],
      selectedAddress: {}
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.dataList.forEach(d => {
        total = total + d.price * d.count
      })
      return total
    },
    totalCount () {
      let total = 0
      this.dataList.forEach(d => {
        total = total += d.count
      })
      return total
    },
    orderAddress () {
      return this.selectedAddress
    }
  },
  methods: {
    checkAdress (info) {
      this.isChecked = true
      this.selectedAddress = info
    },
    // 提交订单信息
    async onSubmit () {
      let params = {
        address_id: this.orderAddress.id,
        user_id: this.$ls.getJSON('info').id,
        products: this.dataList
      }
      const { data } = await this.$store.dispatch('postAddOrder', params)
      if (data.data) {
        this.$store.commit('deleteCart', this.dataList)
        this.$router.push({ path: 'pay', query: { orderid: data.data.orderId } })
      }
    },
    async getSelectedCart () {
      let params = { userId: this.$ls.getJSON('info').id }
      const { data } = await this.$store.dispatch('getFindCart', params)
      if (data.data) {
        this.dataList = data.data.filter(d => d.selected === 1)
      }
    },
    // 地址信息保存
    async onSaveAddress () {
      let params = {
        ...this.form,
        user_id: this.$ls.getJSON('info').id
      }
      const { data } = await this.$store.dispatch('postAddAddress', params)
      if (data.code === 200) {
        this.dialogFormVisible = false
      }
    },
    // 获取收货人信息
    async getFindAddress () {
      let params = { user_id: this.$ls.getJSON('info').id }
      const { data } = await this.$store.dispatch('getFindAddress', params)
      if (data.data) {
        this.addressInfo = data.data
      }
    }
  },
  created () {
    this.getSelectedCart()
    this.getFindAddress()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/vars.scss';
.adress {
  .el-icon-check {
    display: none;
    top: 10px;
    right: 10px;
  }
  .el-icon-check.checked {
    display: block;
    color: $color-primary;
  }
  &:hover {
    .action {
      display: block;
    }
  }
  .action {
    display: none;
    bottom: 0;
    left: 0;
    .edit {
      &:hover {
        background: #ccc;
      }
    }
    .delete {
      &:hover {
        background: #ccc;
      }
    }
  }
}
.adress.checked {
  border: 2px solid $color-primary;
}
</style>
