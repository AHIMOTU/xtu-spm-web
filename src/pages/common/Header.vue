<template>
  <div>
    <!-- <div class="h-18 a-r f-12 p-v-5 p-lv-80" style="background: #eee;line-height:18px">
      <div class="f-l">
        <span>首页</span>
      </div>
      <div class="f-r">
        <span class="">您好！</span>
        <span class="c-p">[请登录]</span>
        <span class="c-p">[免费注册]</span>
      </div>
    </div> -->
    <div class="nav w-p-100 h-80" :class="{fixed: isFixed}" flex="cross:center main:justify">
      <div class="m-l-150"><img class="c-p" @click="$router.push('/')" src="../../assets/images/logo.png" alt="" width="130" height="48"></div>
      <div class="m-r-150" flex="">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
          <el-button slot="append" @click="onSearch">搜索</el-button>
        </el-input>
        <div class="car-user m-l-120" :class="{fixed: isFixed}" flex="cross:center">
          <el-dropdown @command="handleCommand">
            <bs-icon v-if="$ls.get('token') && $ls.getJSON('info') && $ls.getJSON('info').id" name="head" size="30" class="m-lv-20"></bs-icon>
            <bs-icon @click.native="$router.push('/login')" v-else name="nohead" size="30" class="m-lv-20"></bs-icon>
            <el-dropdown-menu v-if="$ls.get('token') && $ls.getJSON('info') && $ls.getJSON('info').id" slot="dropdown">
              <el-dropdown-item command="myorder">订单中心</el-dropdown-item>
              <el-dropdown-item command="setting">账户设置</el-dropdown-item>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-badge :hidden="cartNum<=0" :value="cartNum" class="item">
            <bs-icon @click.native="$router.push('/cart')" name="shopcard" class="m-lv-20 c-p"></bs-icon>
          </el-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isFixed: false,
      keyword: '',
      select: '1'
    }
  },
  computed: {
    ...mapGetters(['cartNum'])
  },
  methods: {
    handleCommand (command) {
      // 订单中心
      if (command === 'myorder') {
        this.$router.push('/myorder')
      }
      // 账户设置
      if (command === 'setting') {
        this.$router.push('/setting/address')
      }
      // 退出
      if (command === 'loginout') {
        this.$ls.remove('token')
        this.$ls.remove('info')
        this.$router.push('/login')
      }
    },
    onSearch () {
      this.$router.push({ path: '/search', query: { keyword: this.keyword } })
    },
    // 控制头部导航栏的固定
    navFixed () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop >= 100
    },
    // 为了解决刷新后vuex的值初始化导致购物车数量为空的问题
    // 每次刷新从后台拿到购物车信息，并存到vuex中
    async findCart () {
      if (!(this.$ls.get('token') && this.$ls.getJSON('info') && this.$ls.getJSON('info').id)) return
      let params = { userId: this.$ls.getJSON('info').id }
      const { data } = await this.$store.dispatch('getFindCart', params)
      if (data.data) {
        let arr = data.data.map(d => ({ product_id: d.id, count: d.count }))
        this.$store.commit('setCart', arr)
      }
    }
  },
  created () {
    setTimeout(() => {
      window.addEventListener('scroll', this.navFixed)
    })
    this.findCart()
  }
}
</script>

<style lang="scss">
@import '../../assets/css/vars.scss';
.nav {
  .input-with-select {
    border: 3px solid $color-primary;
  }
  .el-input__inner {
    width: 300px;
    border: 0 !important;
    border-radius: 0 !important;
  }
  .el-input-group__append {
    background-color: $color-primary !important;
    border: 0 !important;
    border-radius: 0 !important;
    color: $color-white !important;
  }
}
</style>

<style lang="scss" scoped>
  @import '../../assets/css/vars.scss';
  .bar {
    background: #000;
  }
  .nav {
    z-index: 20;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 21;
      background-image: linear-gradient(#fff, #f1f1f1);
      border-bottom: 1px solid #dadada;
    }
  }
  .car-user {
    color: $color-primary;
  }
</style>
