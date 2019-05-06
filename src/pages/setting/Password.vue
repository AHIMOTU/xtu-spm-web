<template>
  <div>
<!--    <el-card>-->
      <el-steps :active="actived" finish-status="success" simple style="margin-top: 20px">
        <el-step title="步骤 1" ></el-step>
        <el-step title="步骤 2" ></el-step>
        <el-step title="步骤 3" ></el-step>
      </el-steps>
      <!--      手机验证码-->
      <div class="" v-if="actived === 1">
        <el-form :key="1" ref="sms" :rules="smsRules" :model="smsForm" label-width="100px" class="demo-ruleForm">
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
      <div class="" v-if="actived === 2">
        <el-form :key="2" ref="userForm" :rules="userRules" :model="userForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldpassword">
            <el-input type="password" v-model="userForm.oldpassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="a-c">
            <el-button size="small" type="primary" @click="submitReset()">提交</el-button>
            <el-button size="small" @click="$refs.userForm.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--      密码重置成功-->
      <div class="a-c m-v-100" v-if="actived === 3">
        <bs-icon name="suc"></bs-icon>
        <div>密码重置成功! </div>
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
          this.$refs.userForm.validateField('checkPass')
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
      smsForm: {
        phone: this.$ls.getJSON('info').phone
      },
      smsRules: {
        sms: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      userForm: {
        oldpassword: '',
        password: '',
        checkPass: ''
      },
      userRules: {
        oldpassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取验证码
    async getSms () {
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
    submitReset () {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          let params = { ...this.userForm, username: this.$ls.getJSON('info').username }
          const { data, error } = await this.$store.dispatch('postEditPassword', params)
          if (data && data.code === 200) {
            this.actived = 3
            this.$router.push('/login')
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

<style lang="scss">
  .demo-ruleForm {
    width: 400px;
    margin: 20px auto;
  }
</style>
