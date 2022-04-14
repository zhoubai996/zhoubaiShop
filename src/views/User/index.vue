<style lang="less" scoped>
.cart-header {
  height: 60px;
  margin: 10px auto;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
}
.user-box {
  background-color: #fff;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.address-header {
  height: 50px;
}
</style>
<template>
  <div class="user-container">
    <div class="cart-header w">
      <h2>个人中心</h2>
    </div>
    <div class="user-box w">
      <el-tabs type="border-card">
        <el-tab-pane label="用户信息">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="loginOut">退出登录</el-button>
            </div>
            <div class="text item">
              {{ '用户ID: ' + userId }}
            </div>
            <div class="text item">
              {{ '用户名称: ' + userName }}
            </div>
            <div class="text item">
              {{ '用户电话: ' + userPhone }}
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="地址管理">
          <div class="address-header">
            <el-button plain @click="addressDialog">新增地址</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="id" label="地址Id" width="100"> </el-table-column>
            <el-table-column prop="consignee" label="姓名" width="160"> </el-table-column>
            <el-table-column prop="phone" label="电话" width="170"> </el-table-column>
            <el-table-column prop="address" label="详细地址" width="300"> </el-table-column>
            <el-table-column label="默认地址" width="100">
              <template slot-scope="scope">
                {{ scope.row.is_default ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.$index, scope.row)">编辑地址</el-button>
                <el-button type="text" size="small" @click="defaultAddress(scope.$index, scope.row)">设为默认</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除地址</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 弹窗 -->
    <addressDialog ref="dialog" :title="title" :row="row" :addButton="addButton"></addressDialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import addressDialog from './addressDialog.vue'
export default {
  name: 'User',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 弹窗控制是否显示
      dialogShow: false,
      // 弹窗标题
      title: '',
      // 传递给弹窗的商品信息
      row: {},
      addButton: '',
      ruleForm: {
        password: '',
        checkPass: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  components: {
    addressDialog,
  },
  created() {
    this.getAddress()
  },
  computed: {
    ...mapGetters(['userId', 'userName', 'userPhone', 'addressList']),
    tableData() {
      return this.addressList
    },
  },
  inject: ['reload'],
  methods: {
    ...mapMutations(['CLEARUSERINFO']),
    // 设为默认
    async defaultAddress(index, {id}) {
      try {
        await this.$store.dispatch('defaultAddre', id)
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.reload()
      } catch (e) {
        this.$message({
          message: `设置失败:${e}`,
          type: 'warning'
        })
      }
    },
    getAddress() {
      this.$store.dispatch('getAddress')
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      try {
        await this.$store.dispatch('updatePassword', this.ruleForm.password)
        this.$message({
          message: `修改成功,修改后的密码为:${this.ruleForm.password}`,
          type: 'success',
        })
        this.reload()
      } catch (e) {
        this.$message({
          message: `修改失败${e}`,
          type: 'warning',
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 退出登录
    loginOut() {
      // 清空vuex数据
      this.CLEARUSERINFO()
      // 清除本地数据
      localStorage.removeItem('user')
      // 返回登录页面
      this.$router.push('/login')
    },
    handleClick(index, row) {
      this.$refs.dialog.dialogShow = true
      ;(this.title = '编辑地址'), (this.addButton = '立即修改')
      this.row = row
    },
    async handleDelete(index, { id }) {
      try {
        await this.$store.dispatch('deleteAddre', id)
        this.$message({
          type: 'success',
          message: `删除成功,删除地址ID:${id}`,
        })
        this.reload()
      } catch (e) {
        this.$message({
          message: `删除失败${e}`,
          type: 'warning',
        })
      }
    },
    // 显示弹窗
    addressDialog() {
      this.$refs.dialog.dialogShow = true
      this.title = '添加地址'
      this.addButton = '立即添加'
    },
  },
}
</script>
