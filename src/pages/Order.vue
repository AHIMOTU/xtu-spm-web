<template>
  <div>
    <h1>结算页</h1>
    <!-- 地址管理 -->
    <el-card class="m-v-20">
      <div slot="header">
        <h3>收货人信息</h3>
      </div>
      <div flex="">
        <div v-for="(info, index) in addressInfo" :key="info.id" @click="checkAdress(info, index)" :class="{checked: selectedIndex === index}" class="adress w-280 h-120 p-10 m-lv-10 b-o p-r f-14" flex="dir:top main:center">
          <i class="el-icon-check f-18 p-a" :class="{checked: selectedIndex === index}"></i>
          <div>{{info.consignee}}</div>
          <div>{{info.address}}</div>
          <div>{{info.phone}}</div>
          <div class="action w-p-100 p-a f-18">
            <div @click.stop="onEdit(info)" class="edit w-p-50 p-v-5 f-l a-c c-p"><i class="el-icon-edit"></i></div>
            <div @click.stop="onDel(info, index)" class="delete w-p-50 p-v-5 f-l a-c c-p"><i class="el-icon-delete"></i></div>
          </div>
        </div>
        <div class="w-280 h-120 p-10 f-18 b-o" flex="main:center cross:center"><i class="el-icon-circle-plus c-p pr-color" @click="onAdd"><span class="f-16"> 新增收货人信息</span></i></div>
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
          <el-table-column label="商品" align="center">
            <template slot-scope="scope">
              <div flex="cross:center main:center">
                <img width="80" height="80" :src="scope.row.picture_url" alt="">
                <span class="m-l-10">{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>
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
      <div><el-button :disabled="!dataList.length || !selectedAddress.id" type="danger" @click="onSubmit">提交订单</el-button></div>
    </div>
    <!-- 地址管理弹框 -->
    <el-dialog title="新增收货人信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :rules="rules" :model="form" size="small" label-width="80px">
        <el-form-item label="所在地区" prop="area">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="consignee">
          <el-input v-model="form.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="onSaveAddress">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedIndex: null,
      isChecked: false,
      radio: '1',
      dataList: [],
      dialogFormVisible: false,
      form: {},
      rules: {
        area: [{ required: true, message: '请输入所在地区', trigger: 'blur' }],
        consignee: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      },
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
    // 选中和取消选中地址
    checkAdress (info, index) {
      if (index === this.selectedIndex) {
        this.selectedIndex = null
        this.selectedAddress = {}
      } else {
        this.selectedIndex = index
        this.selectedAddress = info
      }
    },
    // 新增地址
    onAdd () {
      this.form = {}
      this.dialogFormVisible = true
    },
    // 编辑收货地址
    async onEdit (info) {
      this.form = { ...info }
      this.dialogFormVisible = true
    },
    // 删除收获地址
    async onDel (info, index) {
      const re = await this.$utils.confirm('确定要删除该地址吗？')
      if (re) {
        let params = { id: info.id }
        const { data } = await this.$store.dispatch('postDelAddress', params)
        if (data.code === 200) {
          if (index === this.selectedIndex) {
            this.selectedAddress = null
            this.selectedAddress = {}
          }
          this.getFindAddress()
        }
      }
    },
    // 提交订单信息
    async onSubmit () {
      // if (!this.orderAddress.id) {
      //   this.$utils.message('请选择收货地址', 'warning')
      //   return
      // }
      let params = {
        address_id: this.orderAddress.id,
        products: this.dataList,
        total_price: this.totalPrice
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
    onSaveAddress () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = {
            ...this.form,
            user_id: this.$ls.getJSON('info').id
          }
          const { data } = await this.$store.dispatch(params.id ? 'postEditAddress' : 'postAddAddress', params)
          if (data.code === 200) {
            this.dialogFormVisible = false
            this.getFindAddress()
          }
        }
      })
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
