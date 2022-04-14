<style lang="less" scoped>
.cart-header {
  height: 60px;
  margin: 10px auto;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
}
.paging {
  margin-top: 20px;
  .paging-box {
    width: 400px;
    margin: auto;
  }
}
.order-box {
  background-color: #fff;
}
.header {
  margin: 10px auto;
  height: 50px;
  background-color: #fff;
  button {
    margin-top: 5px;
    margin-left: 20px;
  }
}
</style>
<template>
  <div class="orderman-container">
    <div class="cart-header w">
      <h2>订单管理</h2>
    </div>
    <div class="header w">
      <el-button type="primary" @click="state(1)">已完成</el-button>
      <el-button type="primary" @click="state(0)">未完成</el-button>
    </div>
    <div class="order-box w">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="订单ID" width="80"> </el-table-column>
        <el-table-column prop="goods_info" label="订单信息" width="250" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="150"> </el-table-column>
        <el-table-column prop="total" label="订单金额" width="100"> </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            {{ scope.row.status ? '已完成结算订单' : '未完成结算订单' }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="订单创建时间" width="180"> </el-table-column>
        <el-table-column prop="updatedAt" label="订单更新时间" width="180"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">结算</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging w">
      <div class="paging-box">
        <Paging :total="orderTotal" :pageSize="parseInt(orderSize)" @changePage="changePage"></Paging>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/Paging.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'OrderMan',
  inject: ['reload'],
  data() {
    return {
      status: 0,
      pageNum: 1,
      pageSize: 10,
    }
  },
  components: {
    Paging
  },
  created() {
    this.getOrder()
  },
  computed: {
    ...mapGetters(['orderList', 'orderTotal', 'orderSize']),
    tableData() {
      return this.orderList
    },
  },
  methods: {
    changePage(pageNum) {
      this.pageNum = pageNum
      this.getOrder()
    },
    handleClick(row) {
      if (row.status === 1) {
        this.$message({
            type: 'success',
            message: '已结算过!'
          });
      } else {
        this.$confirm(`是否进行结算?需支付${row.total}元`, '提示', {
          confirmButtonText: '支付',
          cancelButtonText: '取消支付',
          type: 'success'
        }).then(() => {
          this.$store.dispatch('updateOrders', {orderId: row.id, status: 1})
          this.$message({
            type: 'success',
            message: '结算成功!'
          });
          this.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
    },
    getOrder() {
      let { status, pageNum, pageSize } = this
      // console.log('函数执行');
      this.$store.dispatch('getOrder', { status, pageNum, pageSize })
    },
    state(val) {
      let { pageNum, pageSize } = this
      let status = val
      this.$store.dispatch('getOrder', { status, pageNum, pageSize })
    }
  },
}
</script>
