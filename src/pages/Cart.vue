<template>
  <div>
    <el-table v-loading="loading" ref="table" :data="dataList" @select="onSelect" @select-all="onSelectAll">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="商品" align="center"></el-table-column>
      <el-table-column prop="price" label="单价" align="center"></el-table-column>
      <el-table-column prop="count" label="数量" align="center">
        <template slot-scope="scope">
          <el-input-number :min="1" :value="scope.row.count" @input="(value) => scope.row.count = value" @change="(value) => onChange(value, scope.row)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price * scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="onDelete([scope.row])" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-20 p-15 b-o" flex="main:justify">
      <div flex="cross:center">
        <el-checkbox v-model="checkedAll" @change="onAllChange">全选</el-checkbox>
        <el-button @click="onDelete(selectDataList)" size="mini">删除选中的商品 <i class="el-icon-delete"></i></el-button>
      </div>
      <div>
        <span class="m-r-20">已选择{{totalCount}}件商品</span>
        <span class="m-r-20">总价：￥{{totalPrice}}</span>
        <el-button :disabled="!totalCount" type="primary" @click="$router.push('/order')">去结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedAll: false,
      dataList: [],
      selectDataList: [],
      loading: false
    }
  },
  watch: {
    selectDataList: {
      handler (val) {
        debugger
        if (val.length !== 0) {
          this.checkedAll = val.length === this.dataList.length // 同步自定义全选按钮
        } else {
          this.checkedAll = false // 同步自定义全选按钮
        }
      }
    }
  },
  computed: {
    totalPrice () { // 总价 只计算当前选中的商品
      let total = 0
      this.selectDataList.forEach(d => {
        total = total + d.price * d.count
      })
      return total
    },
    totalCount () {
      let total = 0
      this.selectDataList.forEach(d => {
        total = total += d.count
      })
      return total
    }
  },
  methods: {
    // 将商品从购物车中删除
    async onDelete (rows) {
      let productIds = rows.map(r => r.id)
      debugger
      const re = await this.$utils.confirm('确定要将该商品从购物车中删除吗？')
      if (re) {
        let params = {
          productIds,
          userId: this.$ls.getJSON('info').id
        }
        const { data } = await this.$store.dispatch('postDelCart', params)
        if (data.code === 200) {
          this.$store.commit('deleteCart', rows)
          this.getCart()
        }
      }
    },
    // 勾选数据行的 Checkbox 时触发的事件
    async onSelect (rows, row) {
      this.selectDataList = rows
      let isSeclected = rows.length && rows.indexOf(row) !== -1 // 判断当前行是选中还是取消选中
      let params = {
        product_id: row.id,
        userId: this.$ls.getJSON('info').id,
        selected: isSeclected ? 1 : 0
      }
      const { data } = await this.$store.dispatch('postSelectCart', params)
      if (data.code === 200) {
        console.log(data.data)
      }
    },
    // 勾选全选 Checkbox 时触发的事件
    async onSelectAll (rows) {
      this.checkedAll = rows.length > 0 // 同步自定义全选按钮
      let selected = rows.length ? 1 : 0
      this.selectAll(selected)
    },
    // 全选、全不选接口方法
    async selectAll (selected) {
      let params = {
        userId: this.$ls.getJSON('info').id,
        selected
      }
      const { data } = await this.$store.dispatch('postSelectAllCart', params)
      if (data.code === 200) {}
    },
    // 勾选自定义全选按钮
    onAllChange (checkbox) {
      this.$nextTick(() => {
        this.dataList.forEach(d => {
          this.$refs.table.toggleRowSelection(d, checkbox)
        })
      })
      let selected = checkbox ? 1 : 0
      this.selectAll(selected)
    },
    // 购物车数量chang
    async onChange (value, row) {
      let params = {
        product_id: row.id,
        userId: this.$ls.getJSON('info').id,
        count: value
      }
      const { data } = await this.$store.dispatch('postAddCart', params)
      if (data.code === 200) {
        this.$store.commit('addCart', { product_id: row.id, count: value })
      }
    },
    async getCart () {
      let params = { userId: this.$ls.getJSON('info').id }
      this.loading = true
      const { data } = await this.$store.dispatch('getFindCart', params)
      this.loading = false
      if (data.data) {
        this.dataList = data.data
        // 通过selectDataList计算total
        this.selectDataList = this.dataList.filter(d => d.selected === 1)
        this.$nextTick(() => { // 控制商品的选中回显
          this.dataList.forEach(d => {
            if (d.selected === 1) {
              this.$refs.table.toggleRowSelection(d)
            }
          })
        })
      }
    }
  },
  created () {
    this.getCart()
  }
}
</script>
