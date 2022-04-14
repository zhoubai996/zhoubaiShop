<style lang="less" scoped></style>
<template>
  <div class="address-container">
    <el-dialog :title="title" :visible.sync="dialogShow" width="70%">
      <!-- 内容区域 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="consignee">
          <el-input v-model="ruleForm.consignee"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ addButton }}</el-button>
          <el-button @click="dialogShows">取 消</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddressDialog',
  inject: ['reload'],
  props: {
    title: {
      type: String,
      default: '添加分类',
    },
    row: {
      type: Object,
      default: function () {
        return {}
      },
    },
    addButton: {
      type: String,
      default: '立即添加',
    },
  },
  data() {
    return {
      dialogShow: false,
      ruleForm: {
        consignee: '',
        phone: '',
        address: '',
      },
      rules: {
        consignee: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
      },
    }
  },
  watch: {
    row(val) {
      this.ruleForm.consignee = val.consignee
      this.ruleForm.phone = val.phone
      this.ruleForm.address = val.address
    },
  },
  created() {},
  // inject: ['reload'],
  computed: {
    ...mapGetters(['goodsClassList']),
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
        // this.dialogShow = false
      })
      if (this.title === '添加地址') {
        try {
          this.$message({
            message: '添加地址成功',
            type: 'success',
          })
          // 添加分类方法
          await this.$store.dispatch('addAddre', this.ruleForm)
          this.reload()
        } catch (e) {
          this.$message({
            message: `添加地址失败${e}`,
            type: 'warning',
          })
        }
      } else {
        try {
          this.$message({
            message: '修改地址成功',
            type: 'success',
          })
          // 修改地址
          let id = this.row.id
          let addressInfo = this.ruleForm
          this.$store.dispatch('updateAddre', { id, addressInfo })
          this.ruleForm = {
            consignee: '',
            phone: '',
            address: '',
          }
        } catch (e) {
          this.$message({
            message: `修改地址失败${e}`,
            type: 'warning',
          })
        }
      }
      this.dialogShow = false
      this.reload()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    dialogShows() {
      this.dialogShow = false
    }
  },
}
</script>
