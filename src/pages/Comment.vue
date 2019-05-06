<template>
  <div flex="box:first">
    <div>
      <div class="w-300 h-400 b-r" flex="dir:top cross:center">
        <img width="120" height="120" :src="detail.picture_url" alt="">
        <span>{{detail.name}}</span>
        <span class="info-color f-14">{{detail.description}}</span>
        <span class="info-color f-14">￥{{detail.price}} * {{detail.number}}</span>
      </div>
    </div>
    <div class="p-lv-50">
      <div class="m-v-20">
        <i class="el-icon-info pr-color"></i>
        <span class="info-color f-14">亲，请如实填写商品评价</span>
      </div>
      <el-form ref="commentForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品评分" prop="rate">
          <el-rate class="m-t-10" v-model="form.rate"></el-rate>
        </el-form-item>
        <el-form-item label="商品评价" prop="content">
          <el-input placeholder="分享体验心得，给想买的人一个参考~" class="w-500" type="textarea" :rows="5" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm">发表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validateScore = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error('商品评分最低也只能是一星哦!'))
      } else {
        callback()
      }
    }
    return {
      detail: {},
      form: {},
      rules: {
        rate: [{ required: true, validator: validateScore, trigger: 'change' }],
        content: [{ required: true, message: '请输入商品评价', trigger: 'blur' }]
      }
    }
  },
  computed: {
    order_id () {
      return this.$route.query.order_id
    },
    product_id () {
      return this.$route.query.product_id
    }
  },
  methods: {
    submitForm () {
      this.$refs.commentForm.validate(async (valid) => {
        if (valid) {
          let params = {
            product_id: this.product_id,
            ...this.form
          }
          const { data } = await this.$store.dispatch('postAddComment', params)
          if (data.code === 200) {
          }
        }
      })
    },
    async getDetail () {
      let params = {
        id: this.order_id
      }
      const { data } = await this.$store.dispatch('getFindByOrderId', params)
      if (data.data) {
        this.detail = data.data.find(d => d.id === parseInt(this.product_id))
      }
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
