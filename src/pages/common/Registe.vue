<template>
  <div>
    <div class="welcome" flex="cross:center main:justify">
      <div class="m-l-150" flex="cross:center main:justify">
        <img class="c-p" @click="$router.push('/')" src="../../assets/images/logo.jpg" alt="" width="130" height="48">
        <span class="f-24 m-l-20" style="color: #333;">欢迎注册</span>
      </div>
    </div>
<!--    <el-card>-->
      <el-steps :active="actived" finish-status="success" simple style="margin-top: 50px">
        <el-step title="步骤 1" ></el-step>
        <el-step title="步骤 2" ></el-step>
        <el-step title="步骤 3" ></el-step>
      </el-steps>
<!--      手机验证码-->
      <div class="" v-if="actived === 1">
        <el-form :key="1" ref="sms" :rules="smsRules" :model="smsForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="smsForm.phone" autocomplete="off">
              <el-button @click="getSms" slot="append">发送验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="sms">
            <el-input v-model="smsForm.sms" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="a-c">
            <el-button size="small" type="primary" @click="submitSMS()">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--      个人信息-->
      <div class="" v-if="actived === 2">
        <el-form :key="2" ref="user" :rules="userRules" :model="userForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="a-c">
            <el-button size="small" type="primary" @click="submitRegiste()">提交</el-button>
            <el-button size="small" @click="$refs.user.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--      注册成功-->
      <div class="a-c m-v-100" v-if="actived === 3">
        <bs-icon name="suc"></bs-icon>
        <div>注册成功! <el-link @click="$router.push('/login')" type="success">返回登录</el-link></div>
      </div>
<!--    </el-card>-->
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.user.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      actived: 1,
      smsForm: {},
      smsRules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        sms: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      userForm: {
        sex: 1,
        password: '',
        checkPass: ''
      },
      userRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取验证码
    async getSms () {
      if (this.smsForm.phone === '') return
      let params = {
        phone: this.smsForm.phone
      }
      const { data } = await this.$store.dispatch('getSms', params)
      if (data.code === 200) {
      }
    },
    // 步骤一
    submitSMS () {
      this.$refs.sms.validate(async (valid) => {
        if (valid) {
          let params = { ...this.smsForm }
          const { data } = await this.$store.dispatch('postCheckSms', params)
          if (data.code === 200) {
            this.actived = 2
          }
        }
      })
    },
    // 步骤二
    submitRegiste () {
      this.$refs.user.validate(async (valid) => {
        if (valid) {
          let params = { ...this.smsForm, ...this.userForm }
          const { data } = await this.$store.dispatch('regist', params)
          if (data.code === 200) {
            this.actived = 3
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .demo-ruleForm {
    width: 400px;
    margin: 20px auto;
  }
</style>

<style lang="scss" scoped>
  .welcome {
    height: 110px;
    background: url('../../assets/images/welcome_bg.jpg') repeat-x left bottom;
  }
</style>
