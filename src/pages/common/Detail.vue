<template>
  <div>
    <div flex="box:first">
      <div>
        <div class="w-400 h-400 m-r-50 b-o">
          <bs-picture :url="detail.picture_url" :highUrl="detail.picture_url" width="100%" height="100%" :outShow="true"></bs-picture>
        </div>
      </div>
      <div>
        <h3 class="m-v-30">{{detail.name}}</h3>
        <div class="content f-14 p-v-10 p-l-20 w-500">
          <div>价 格<span class="price m-l-10 f-24">￥{{detail.price}}</span></div>
          <div>库 存<span class="m-l-10">{{detail.stock}}</span></div>
          <div>销 量<span class="m-l-10">{{detail.sales_count}}</span></div>
        </div>
        <div class="p-v-30">
          <el-input-number v-model="count" :min="1" :max="10"></el-input-number>
          <el-button type="danger" @click="addCar">加入购物车</el-button>
        </div>
      </div>
    </div>
    <div class="p-t-80">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="商品介绍" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="规格与包装" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="售后保障" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="商品评价" name="fourth">
          <div v-if="!$ls.get('info')" class="f-14 m-v-20" flex="main:center cross:center">
            <span class="pr-color m-r-10"><i class="el-icon-info f-16"></i></span>
            登录后才能看到所有评价！
            <el-link type="success" @click="$router.push('/login')">点击登录</el-link>
          </div>
          <div v-else-if="comments.length">
            <div class="b-o p-10" style="background: #f7f7f7;color: #666"><h3>商品评价</h3></div>
            <div class="p-20" flex="">
              <span class="m-r-40">整体好评率</span>
              <el-rate v-model="averageRate" :colors="['#e22a40', '#e22a40', '#e22a40']" disabled show-score text-color="#e22a40;" score-template="{value}"></el-rate>
            </div>
            <div class="b-o p-5 f-14" style="background: #f7f7f7;color: #666">全部评价</div>
            <ul>
              <li v-for="(comment, index) in comments" :key="index">
                <div class="b-b p-v-15">
                  <div flex="cross:center">
                    <div class="w-140 info-color" flex="cross:center"><bs-icon name="nohead" size="30" class="m-lv-20"></bs-icon>{{comment.username}}</div>
                    <el-rate :value="comment.rate" :colors="['#e22a40', '#e22a40', '#e22a40']" disabled text-color="#e22a40;" score-template="{3.7}"></el-rate>
                  </div>
                  <div class="p-l-140 p-v-10 p-r-50">{{comment.content}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="f-14 a-c m-v-20">
            <span class="pr-color m-r-5"><i class="el-icon-info f-16"></i></span>
            暂无评论
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {},
      comments: [],
      averageRate: null,
      count: 1,
      activeName: 'fourth'
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    async addCar () {
      let params = {
        product_id: this.detail.id,
        userId: this.$ls.getJSON('info').id,
        count: this.count
      }
      const { data } = await this.$store.dispatch('postDirectAddCart', params)
      if (data.code === 200) {
        this.$store.commit('directAddCart', { product_id: this.detail.id, count: this.count })
      }
    },
    async getDetail () {
      let params = { id: this.id }
      const { data } = await this.$store.dispatch('getProductDetail', params)
      if (data.data) {
        this.detail = data.data
      }
    },
    async getComment () {
      let params = { id: this.id }
      const { data } = await this.$store.dispatch('getFindComment', params)
      if (data.data) {
        this.comments = data.data
        let num = 0
        data.data.forEach(d => { num += d.rate })
        this.averageRate = num / data.data.length
      }
    }
  },
  created () {
    this.getDetail()
    if (this.$ls.get('info')) {
      this.getComment()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  color: #999;
  background: url('../../assets/images/price-bg.png');
  .price {
    color: #E4393C;
  }
}
</style>
