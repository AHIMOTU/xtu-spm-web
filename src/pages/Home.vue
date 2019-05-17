<template>
  <div>
    <div flex="box:first">
      <div class="menu p-r b-o">
        <div class="title p-10 a-c">湘大超市频道分类</div>
<!--        第一季菜单-->
        <div class="menu-item w-200" @click="onClickCate(item.id)" v-for="(item, index) in category" :key="index">
          <div class="menu-item-head" flex="main:justify cross:center">
            <span>{{item.name}}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="menu-item-body p-a">
            <div class="w-700 p-10 f-14">
<!--              第二级菜单-->
              <template v-if="item.children">
                <div class="w-222 h-88 b-r o-h f-l m-r-5 p-t-16 p-b-15 p-b-25 m-r-2" v-for="(child, index) in item.children" :key="index">
                  <h4>{{child.name}}</h4>
<!--                  第三级菜单-->
                  <template v-if="child.children">
                    <p class="f-12 m-t-10" style="color: #666;">
                      <span @click.stop="onClickCate(grandson.id)" class="childCategory b-l p-l-9 c-p" v-for="(grandson, index) in child.children" :key="index">{{grandson.name}}</span>
                    </p>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-carousel height="450px">
          <el-carousel-item v-for="(img, index) in srcLists" :key="index">
            <img width="900" height="450" :src="img.url" alt="">
          </el-carousel-item>
        </el-carousel>
        </div>
    </div>
    <div class="discount a-c f-24 p-v-20"><h3>今日特惠</h3></div>
    <div class="list1">
<!--      <div class="w-p-14">-->
        <bs-product v-for="(product, index) in discountProduct" :key="index" :detail="product"></bs-product>
<!--      </div>-->
    </div>
    <div class="discount a-c f-24 p-v-20"><h3>热卖商品</h3></div>
    <div class="list1">
<!--      <div class="" v-for="(product, index) in discountProduct" :key="index">-->
        <bs-product v-for="(product, index) in salesProduct" :key="index" :detail="product"></bs-product>
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      srcLists: [
        { url: require('../assets/images/carousel1.jpg') },
        { url: require('../assets/images/carousel2.jpg') },
        { url: require('../assets/images/carousel3.jpg') }
      ],
      discountProduct: [], // 今日特惠
      salesProduct: [], // 热卖商品
      category: [] // 品类
    }
  },
  methods: {
    onClickCate (id) {
      this.$router.push({ path: '/catesearch', query: { id } })
    },
    async getDiscountProduct () {
      const { data } = await this.$store.dispatch('getProductList', { pageNum: 1, pageSize: 6 })
      if (data.data) {
        this.discountProduct = data.data.records
      }
    },
    async getProductListBySales () {
      const { data } = await this.$store.dispatch('getProductListBySales', { pageNum: 1, pageSize: 6 })
      if (data.data) {
        this.salesProduct = data.data.records
      }
    },
    async getCategoryList () {
      const { data } = await this.$store.dispatch('getCategoryList')
      if (data.data) {
        this.category = this.$utils.list2tree(data.data, 0, 'id', 'p_id')
      }
    }
  },
  created () {
    this.getCategoryList()
    this.getDiscountProduct()
    this.getProductListBySales()
  }
}
</script>

<style lang="scss">
@import '../assets/css/vars.scss';
.menu {
  .title {
    color: #fff;
    background-color: $color-primary;
  }
  .menu-item {
    &:hover {
      .menu-item-head {
        position: relative;
        color: #fff;
        background-color: $color-primary;
        /* 品类hover书签样式 */
        &:after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          border: 4px solid #52050e;
          border-left-color: #fff;
          border-bottom-color: #fff;
        }
      }
      .menu-item-body {
        display: block;
        .childCategory {
          margin-left: -10px;
          margin-right: 18px;
          &:hover {
            display: inline-block;
            color: $color-primary;
          }
        }
      }
    }
    .menu-item-head {
      height: 50px;
      padding: 0 10px;
      color: #515151;
    }
    .menu-item-body {
      width: 800px;
      height: 400px;
      border: 3px solid $color-primary;
      background: #fff;
      opacity: 0.9;
      z-index: 999;
      display: none;
      top: 0;
      left: 200px;
    }
  }
}
.discount {
  background: url('../assets/images/line.png') repeat-x 0 50%;
  h3 {
    display: inline;
    padding: 0 10px;
    background-color: $color-white;
  }
}
.el-carousel {
  width: 900px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.list1 {
  display: flex;
  flex-wrap: wrap;
}
</style>
