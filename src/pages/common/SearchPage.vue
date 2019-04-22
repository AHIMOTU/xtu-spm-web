<template>
  <div>
    <div class="w-p-14 f-l" v-for="(product, index) in list" :key="index">
      <bs-product :detail="product"></bs-product>
    </div>
    <el-pagination
      class="a-c"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNum"
      @size-change="sizeChange"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String
    }
  },
  data () {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 1
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
    async getData () {
      let params = {
        keyword: this.keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      const { data } = await this.$store.dispatch('getProductList', params)
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
  }
}
</script>
