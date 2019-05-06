<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button-group>
          <el-button :type="allType" size="medium" @click="onAllSort">综合</el-button>
          <el-button :type="saleType" size="medium" @click="onSalesCount">销量</el-button>
          <el-button :type="priceType" size="medium" @click="onPriceSort">价格 <i :class="{'el-icon-sort-up': priceSort === 1, 'el-icon-sort-down': priceSort === 0}"></i></el-button>
        </el-button-group>
      </div>
      <div>
        <div class="" flex="" v-loading="loading">
          <bs-product :detail="product"  v-for="(product, index) in list" :key="index"></bs-product>
        </div>
        <el-pagination
          class="a-c m-v-20"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :current-page="pageNum"
          @size-change="sizeChange"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      loading: false,
      priceSort: null,
      allType: 'primary',
      saleType: '',
      priceType: ''
    }
  },
  computed: {
    keyword () {
      return this.$route.query.keyword
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler (val) {
        this.getData()
      }
    }
  },
  methods: {
    onTabClick ({ index }) {
    },
    onAllSort () {
      this.allType = 'primary'
      this.saleType = ''
      this.priceType = ''
      this.getData()
    },
    // 按销量排序
    onSalesCount () {
      this.allType = ''
      this.saleType = 'primary'
      this.priceType = ''
      this.getData(null, 0)
    },
    // 按价格排序
    onPriceSort () {
      if (this.priceSort === null) {
        this.priceSort = 1
      } else if (this.priceSort === 1) {
        this.priceSort = 0
      } else if (this.priceSort === 0) {
        this.priceSort = 1
      }
      this.allType = ''
      this.saleType = ''
      this.priceType = 'primary'
      this.getData(this.priceSort)
    },
    async getData (priceSort, salesSort) {
      let params = {
        keyword: this.keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        priceSort,
        salesSort
      }
      this.loading = true
      const { data } = await this.$store.dispatch('getProductList', params)
      this.loading = false
      if (data.data) {
        this.list = data.data.records
        this.total = data.data.total
      }
    },
    // 分页操作
    currentChange (pageNum) {
      this.pageNum = pageNum
      this.getData()
    },
    sizeChange (pageSize) {
      this.pageSize = pageSize
      this.getData()
    }
  },
  created () {
  }
}
</script>
