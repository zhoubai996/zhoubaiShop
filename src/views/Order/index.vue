<style lang="less" scoped>
.cart-header {
  height: 60px;
  margin: 10px auto;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
}
.order-box {
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
}
</style>
<template>
  <div class="order-container">
    <div class="cart-header w">
      <h2>订单提交</h2>
    </div>
    <div class="order-box w">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="订单信息" prop="goods_info">
          <el-input v-model="ruleForm.goods_info" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="total">
          <el-input v-model="ruleForm.total" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address_id">
          <el-select v-model="ruleForm.address_id" placeholder="请选择地址">
            <el-option v-for="(item, index) in addressList" :key="item.id" :label="`姓名:${item.consignee}|电话:${item.phone}|${item.address}`" :value="`${item.id}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'order',
  props: ['goods_info', 'price'],
  data() {
    return {
      ruleForm: {
        goods_info: '',
        total: '',
        address_id: 0,
      },
      rules: {
        address_id: [{ required: true, message: '请选择地址', trigger: 'change' }],
      },
    }
  },
  mounted() {
      this.ruleForm.goods_info = this.goods_info
      this.ruleForm.total = this.price
  },
  created() {
    this.getAddress()
  },
  computed: {
    ...mapGetters(['addressList'])
  },
  methods: {
    async submitForm(formName) {
      this.ruleForm.address_id = parseInt(this.ruleForm.address_id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('格式验证成功');
        } else {
          console.log('error submit!!')
          return false
        }
      })
      try {
        await this.$store.dispatch('addOrderInfo', this.ruleForm)
        this.$message({
            message: '提交成功',
            type: 'success'
          })
      } catch (e) {
        this.$message({
            message: `提交失败:${e}`,
            type: 'warning'
          })
      }
    },
    async resetForm(formName) {
      this.ruleForm.address_id = parseInt(this.ruleForm.address_id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('格式验证成功');
        } else {
          console.log('error submit!!')
          return false
        }
      })
      try {
        await this.$store.dispatch('addOrderInfo', this.ruleForm)
        this.$message({
            message: '取消成功',
            type: 'success'
          })
      } catch (e) {
        this.$message({
            message: `取消失败:${e}`,
            type: 'warning'
          })
      }
    },
    getAddress() {
      this.$store.dispatch('getAddress')
    }
  },
}
</script>
