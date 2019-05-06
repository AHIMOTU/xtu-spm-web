<template>
  <div id="bs-product" class="w-180 h-260 p-5 p-r o-h m-lv-5 m-v-5">
    <div @click="onDetail(detail.id)" class="h-200 w-180 c-p" flex="cross:center main:center"><img width="80%" height="80%" :src="detail.picture_url" alt=""></div>
    <p class="sub-detail f-12" style="color: #7d7d7d;">{{detail.name}}</p>
    <div class="price">￥{{detail.price}}</div>
    <div @click="addCart" class="add-car c-p p-a w-p-100 h-30 f-14" flex="cross:center main:center">
      <bs-icon name="shopcard" size="16" class="m-r-5"></bs-icon>
      <span>加入购物车</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: [Object]
  },
  data () {
    return {
    }
  },
  methods: {
    async addCart () {
      let params = {
        product_id: this.detail.id,
        // userId: this.$ls.getJSON('info').id,
        count: 1
      }
      const { data } = await this.$store.dispatch('postDirectAddCart', params)
      if (data && data.code === 200) {
        this.$store.commit('directAddCart', { product_id: this.detail.id, count: 1 })
        this.$utils.notice('添加购物车成功！')
      }
    },
    onDetail (id) {
      this.$router.push({ path: 'detail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/vars.scss';
#bs-product {
  transition: all .5s;
  background: #fff;
  &:hover {
    box-shadow: 1px 1px 20px #999;
    .add-car {
      transition: bottom .25s ease;
      bottom: 0;
    }
    .sub-detail {
      display: none;
    }
  }
  .price {
    color: $color-primary;
  }
  .add-car {
    color: #fff;
    background: $color-primary;
    bottom: -30px;
    left: 0;
  }
}
</style>
