<template>
  <div class="login">
    <div class="welcome" flex="cross:center main:justify">
      <div class="m-l-150" flex="cross:center main:justify">
        <img class="c-p" @click="$router.push('/')" src="../../assets/images/logo.png" alt="" width="130" height="48">
        <span class="f-24 m-l-20" style="color: #333;">欢迎登录</span>
      </div>
    </div>
    <el-card class="card">
      <h2 class="m-b-20 a-c">湘大超市</h2>
      <el-form @keyup.enter.native="onLogin" size="big" ref="form" :rules="rules" :model="formData" class="m-h-20 full-width">
        <el-form-item prop="username">
          <el-input v-model="formData.username" type="text" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="formData.captcha" placeholder="验证码">
            <img slot="append" ref="captcha" @click="changeCaptcha" height="34" :src="captchaSrc" alt="">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="m-h-20" flex="box:justify cross:center">
        <el-checkbox v-model="rememberUser" class="remember">记住用户名</el-checkbox>
        <span></span>
        <div @click="$router.push('/resetpassword')" class="c-p c-danger f-12">忘记密码？</div>
      </div>
      <div class="m-h-80" flex="main:center">
        <el-button @click="onLogin" size="big" class="w-300 m-t-30 f-18 l-s" type="primary">登录</el-button>
      </div>
      <div class="a-r m-t-10 f-12">没有账号？<a @click="$router.push('/registe')" class="c-p c-success">点击注册</a></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      captchaSrc: '/users/captcha',
      formData: {
        username: this.$ls.get('username')
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      rememberUser: false
    }
  },
  methods: {
    // 刷新验证码
    changeCaptcha () {
      this.$refs.captcha.src = this.captchaSrc + '?m=' + Math.random()
    },
    // 登录
    onLogin () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.formData))
          const { data, error } = await this.$store.dispatch('login', { ...params, role: 0 })
          if (data) {
            // this.$utils.message('登录成功')
            if (this.rememberUser) {
              this.$ls.set('username', data.data.info.username)
            }
            this.$ls.set('token', data.data.token)
            this.$ls.set('info', data.data.info)
            this.$router.push('/')
          }
          if (error) {
            this.$utils.message(error.msg, 'error')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  /*background: seagreen;*/
  .card {
    float: right;
    margin-top: 50px;
    margin-right: 100px;
    width: 450px;
  }
  .welcome {
    height: 110px;
    background: url('../../assets/images/welcome_bg.jpg') repeat-x left bottom;
  }
}
</style>
