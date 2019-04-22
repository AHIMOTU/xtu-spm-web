<template>
  <div class="login" flex="main:center cross:center">
    <el-card class="card">
      <h2 class="m-b-20 a-c">湘大超市</h2>
      <el-form size="big" :model="formData" class="m-h-20 full-width">
        <el-form-item>
          <el-input v-model="formData.username" type="text" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.captcha" placeholder="验证码">
            <img slot="append" ref="captcha" @click="changeCaptcha" height="34" :src="captchaSrc" alt="">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="m-h-20" flex="box:justify cross:center">
        <el-checkbox class="remember" checked>记住用户名</el-checkbox>
        <span></span>
        <div class="c-p c-danger f-12">忘记密码？</div>
      </div>
      <div class="m-h-80" flex="main:center">
        <el-button @click="onLogin" size="big" class="w-300 m-t-30 f-18 l-s" type="primary">登录</el-button>
      </div>
      <div class="a-r m-t-10 f-12">没有账号？<a class="c-p c-success">点击注册</a></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      captchaSrc: '/users/captcha',
      formData: {}
    }
  },
  methods: {
    // 刷新验证码
    changeCaptcha () {
      this.$refs.captcha.src = this.captchaSrc + '?m=' + Math.random()
    },
    // 登录
    async onLogin () {
      let params = JSON.parse(JSON.stringify(this.formData))
      const { data, error } = await this.$store.dispatch('login', { ...params, role: 0 })
      if (data) {
        // this.$utils.message('登录成功')
        this.$ls.set('token', data.data.token)
        this.$ls.set('info', data.data.info)
        this.$router.push('/')
      }
      if (error) {
        this.$utils.message(error.msg, 'error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: seagreen;
  .card {
    width: 450px;
  }
}
</style>
