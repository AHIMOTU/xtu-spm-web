<template>
  <div>
    <div class="welcome" flex="cross:center main:justify">
      <div class="m-l-150" flex="cross:center main:justify">
        <img class="c-p" @click="$router.push('/')" src="../../assets/images/logo.png" alt="" width="130" height="48">
        <span class="f-24 m-l-20" style="color: #333;">找回密码</span>
      </div>
    </div>
<!--    <el-card>-->
      <el-steps :active="actived" finish-status="success" simple style="margin-top: 20px">
        <el-step title="步骤 1" ></el-step>
        <el-step title="步骤 2" ></el-step>
        <el-step title="步骤 3" ></el-step>
        <el-step title="步骤 4" ></el-step>
      </el-steps>
<!--      请输入你需要找回登录密码的账户名-->
      <div class="" v-if="actived === 1">
        <div class="m-v-20 p-l-200">
          <i class="el-icon-info pr-color"></i>
          <span class="info-color f-14">请输入你需要找回登录密码的账户名</span>
        </div>
        <el-form :key="1" ref="username" :rules="usernameRules" :model="usernameForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录名" prop="username">
            <el-input v-model="usernameForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="a-c">
            <el-button size="small" type="primary" @click="submitUsername()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--      手机验证码-->
      <div class="" v-if="actived === 2">
        <el-form :key="2" ref="sms" :rules="smsRules" :model="smsForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="smsForm.phone" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="getSms">点此获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="sms">
            <el-input v-model="smsForm.sms" autocomplete="off"> </el-input>
          </el-form-item>
          <el-form-item class="a-c">
            <el-button size="small" type="primary" @click="submitSMS()">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--      个人信息-->
      <div class="" v-if="actived === 3">
        <el-form :key="3" ref="user" :rules="userRules" :model="userForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="a-c">
            <el-button size="small" type="primary" @click="submitReset()">提交</el-button>
            <el-button size="small" @click="$refs.user.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--      密码重置成功-->
      <div class="a-c m-v-100" v-if="actived === 4">
        <bs-icon name="suc"></bs-icon>
        <div>密码重置成功! <el-link @click="$router.push('/login')" type="success">返回登录</el-link></div>
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
      usernameForm: {},
      usernameRules: {
        username: [{ required: true, message: '请输入登录名', trigger: 'blur' }]
      },
      smsForm: {},
      smsRules: {
        sms: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      userForm: {
        password: '',
        checkPass: ''
      },
      userRules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 步骤一
    submitUsername () {
      this.$refs.username.validate(async (valid) => {
        if (valid) {
          let params = { ...this.usernameForm }
          const { data } = await this.$store.dispatch('getPhone', params)
          if (data.code === 200) {
            this.smsForm.phone = data.data
            this.actived = 2
          }
        }
      })
    },
    // 获取验证码
    async getSms () {
      let params = {
        phone: this.smsForm.phone
      }
      const { data } = await this.$store.dispatch('getSms', params)
      if (data.code === 200) {
      }
    },
    // 步骤二
    submitSMS () {
      this.$refs.sms.validate(async (valid) => {
        if (valid) {
          let params = { ...this.smsForm }
          const { data } = await this.$store.dispatch('postCheckSms', params)
          if (data.code === 200) {
            this.actived = 3
          }
        }
      })
    },
    // 步骤三
    submitReset () {
      this.$refs.user.validate(async (valid) => {
        if (valid) {
          let params = { ...this.usernameForm, ...this.userForm }
          const { data } = await this.$store.dispatch('postEditPassword', params)
          if (data.code === 200) {
            this.actived = 4
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
