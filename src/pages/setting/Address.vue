<template>
  <div>
    <div class="m-v-20">
      <i class="el-icon-info pr-color"></i>
      <span class="info-color f-14">新增收货地址</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small" class="address-form">
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
      <el-form-item size="large">
        <el-button :disabled="table.length >= 10" size="small" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <div class="m-v-20">
      <i class="el-icon-info pr-color"></i>
      <span class="info-color f-14">已保存了{{table.length}}条地址，还能保存{{10 - table.length}}条地址</span>
    </div>
    <el-table
      :fit="true"
      :data="table">
      <el-table-column
        prop="consignee"
        label="收货人"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="area"
        label="所在地区"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="详细地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="联系方式">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="">
        <template slot-scope="scope">
          <el-button size="mini">设置默认地址</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      rules: {
        area: [{ required: true, message: '请输入所在地区', trigger: 'blur' }],
        consignee: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      },
      table: []
    }
  },
  methods: {
    handleEdit (index, row) {
      this.form = { ...row }
    },
    async handleDelete (index, row) {
      const re = await this.$utils.confirm('确定要删除该地址吗？')
      if (re) {
        let params = { id: row.id }
        const { data } = await this.$store.dispatch('postDelAddress', params)
        if (data.code === 200) {
          this.getFindAddress()
        }
      }
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = {
            ...this.form,
            user_id: this.$ls.getJSON('info').id
          }
          const { data } = await this.$store.dispatch(params.id ? 'postEditAddress' : 'postAddAddress', params)
          if (data.code === 200) {
            this.getFindAddress()
            this.form = {}
          }
        }
      })
    },
    async getFindAddress () {
      let params = { user_id: this.$ls.getJSON('info').id }
      const { data } = await this.$store.dispatch('getFindAddress', params)
      if (data.data) {
        this.table = data.data
      }
    }
  },
  created () {
    this.getFindAddress()
  }
}
</script>

<style lang="scss">
.address-form {
  width: 500px;
}
</style>
