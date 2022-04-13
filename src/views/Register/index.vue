<style lang="less" scoped>
.container {
  .progress-bar {
    position: relative;
    margin: 80px auto 0;
    width: 400px;
  }
  .main {
    margin: 50px auto 186px;
    width: 400px;
  }
}
</style>
<template>
  <div class="register-container">
    <div class="container w">
      <div class="progress-bar">
        <h2>注册</h2>
      </div>
      <div class="main">
        <div class="phone">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
              <el-input type="text" v-model="ruleForm.verificationCode" autocomplete="off"></el-input>
              <el-button :disabled="buttonDis" @click="send">{{ buttonText }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  data() {
    let validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'))
      } else {
        if (this.ruleForm.verificationCode !== '') {
          this.$refs.ruleForm.validateField('verificationCode')
        }
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.ruleForm.verificationCode !== '') {
          this.$refs.ruleForm.validateField('verificationCode')
        }
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else {
        if (this.ruleForm.verificationCode !== '') {
          this.$refs.ruleForm.validateField('verificationCode')
        }
        callback()
      }
    }
    let validateVerificationCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      codeTime: 60,
      buttonDis: false,
      buttonText: '发送',
      active: 0,
      ruleForm: {
        account: '',
        password: '',
        phone: '',
        verificationCode: '',
      },
      rules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        verificationCode: [{ validator: validateVerificationCode, trigger: 'blur' }],
      },
    }
  },
  created() {},
  computed: {
    ...mapGetters(['code']),
  },
  methods: {
    async send() {
      try {
        await this.$store.dispatch('sendCode', this.ruleForm.phone)
        this.$message({
          message: '验证码发送成功，请注意接收！',
          type: 'success',
        })
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: `${e.message}`,
        })
      }
      let _self = this
      _self.buttonDis = true
      let timer = setInterval(() => {
        if (_self.codeTime == 0) {
          clearInterval(timer)
          _self.buttonDis = false
          _self.codeTime = 60
          _self.buttonText = '发送'
        } else {
          _self.codeTime--
          _self.buttonText = `${_self.codeTime}秒`
        }
      }, 1000)
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.code === parseInt(this.ruleForm.verificationCode)) {
            try {
              let user_name = this.ruleForm.account
              let password = this.ruleForm.password
              let phone = this.ruleForm.phone
              this.$store.dispatch('userRegister', { user_name, password, phone })
              this.$message({
                message: '注册成功',
                type: 'success',
              })
              // this.$router.push('/home')
            } catch (e) {
              this.$notify.error({
                title: '错误',
                message: `${e.message}`,
              })
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '验证码错误',
            })
          }
        } else {
          this.$message.error('注册失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
