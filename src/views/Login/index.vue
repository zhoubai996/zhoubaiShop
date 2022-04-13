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
  <div class="login-container">
    <div class="container w">
      <div class="progress-bar">
        <h2>登录</h2>
      </div>
      <div class="main">
        <div class="phone">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user_name">
              <el-input type="text" v-model="ruleForm.user_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
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
export default {
  name: 'Login',
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.account !== '') {
          this.$refs.ruleForm.validateField('account')
        }
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user_name: '',
        password: '',
      },
      rules: {
        user_name: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
      },
    }
  },
  created() {},
  computed: {},
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，调用登录接口
          try {
            this.$store.dispatch('login', this.ruleForm)
            // 1.存储登录信息/数据持久化(vuex中完成)
            // 2.跳转网页
            // 2.1给时间让vuex存储数据
            setTimeout(() => {
              this.$router.push('/home')
            }, 1000)
          } catch (e) {
            this.$notify.error({
              title: '错误',
              message: `${e.message}`,
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '输入的格式有误！',
          })
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
