<style lang="less" scoped>
.cart-header {
  height: 60px;
  margin: 10px auto;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
}
.bottomBox {
  height: 40px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-top: none;
  .select-all {
    padding: 10px;
    margin-left: 2px;
    overflow: hidden;
    span {
      padding: 5px;
      vertical-align: middle;
    }
    input {
      vertical-align: middle;
    }
  }
  .goods-price {
    padding: 10px;
    overflow: hidden;
    color: red;
  }
  .delete-goods {
    overflow: hidden;
  }
  .settlement {
    overflow: hidden;
  }
}
.paging {
  margin-top: 20px;
  .paging-box {
    width: 400px;
    margin: auto;
  }
}
.el-button {
  background-color: #fff;
  border: none;
}
</style>
<template>
  <div class="cart-container">
    <div class="cart-header w">
      <h2>购物车</h2>
    </div>
    <div class="cart-list w">
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
        <el-table-column label="选择" width="55">
          <template slot-scope="scope">
            <input type="checkbox" :checked="scope.row.selected" @change="updateChecked(scope.row, $event)" />
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="200"> </el-table-column>
        <el-table-column prop="goods_info.goods_name" label="商品名称" width="200"> </el-table-column>
        <el-table-column prop="goods_info.goods_price" label="商品价格" width="200"> </el-table-column>
        <el-table-column label="商品数量" width="250">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number" @change="handleChange(scope.row, $event)" :min="1" :max="scope.row.goods_info.goods_num" label="描述文字"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottomBox w">
      <div class="select-all fl">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllCheck" />
        <span>全选</span>
      </div>
      <div class="goods-price fr">
        <span>总价：{{totalPrice}}</span>
      </div>
      <div class="delete-goods fl">
        <el-button type="danger" plain @click="updateAllSelect">删除选中</el-button>
      </div>
      <div class="settlement fr">
        <router-link :to="`/order/${goods_info}/${totalPrice}`"><el-button type="success" plain>提交订单</el-button></router-link>
      </div>
    </div>
    <div class="paging w">
      <div class="paging-box">
        <Paging :total="getCartTotal" :pageSize="parseInt(getCartSize)" @changePage="changePage"></Paging>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/Paging.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      ids: [],
      goods_info: '订单信息'
    }
  },
  components: {
    Paging
  },
  mounted() {
    this.getShopCart()
  },
  computed: {
    ...mapGetters(['getCartList', 'getCartTotal', 'getCartSize']),
    tableData() {
      return this.getCartList
    },
    //判断底部复选框是否勾选【全部产品都选中，采勾选】
    isAllCheck() {
      return this.getCartList.every(item => item.selected === true)
    },
    // 计算购物车总价
    totalPrice() {
      let sum = 0
      let goodsArray = this.getCartList.filter(item => item.selected === true)
      // console.log(goodsArray);
      goodsArray.forEach(item => {
        sum += item.goods_info.goods_price * item.number
        this.ids.push(item.id)
        this.goods_info += '-' + item.goods_info.goods_name
        })
      return sum
    },
  },
  methods: {
    async handleClick(row) {
      try {
        await this.$store.dispatch('deleteCart', [row.id])
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      } catch (e) {
        this.$message({
          message: `错误：${e}`,
          type: 'warning',
        })
      }
    },
    async getShopCart() {
      try {
        let { pageNum, pageSize } = this
        await this.$store.dispatch('getCart', { pageNum, pageSize })
      } catch (e) {
        this.$message({
          message: `错误：${e}`,
          type: 'warning',
        })
      }
    },
    // 更新选中状态接口
    async updateChecked(cart, event) {
      //带给服务器的参数isChecked，不是布尔值，应该是0|1
      // console.log(cart);
      try {
        let selected = event.target.checked
        // console.log(selected);
        let number = parseInt(cart.number)
        let id = parseInt(cart.id)
        let goodsInfo = { selected, number }
        await this.$store.dispatch('updateCarts', { id, goodsInfo })
      } catch (e) {
        this.$message({
          message: `错误：${e}`,
          type: 'warning',
        })
      }
    },
    async handleChange(cart, value) {
      // console.log(cart, value)
      try {
        let selected = cart.selected
        // console.log(selected);
        let number = value
        let id = parseInt(cart.id)
        let goodsInfo = { selected, number }
        await this.$store.dispatch('updateCarts', { id, goodsInfo })
      } catch (e) {
        this.$message({
          message: `错误：${e}`,
          type: 'warning',
        })
      }
    },
    // 全选按钮改变产品选中状态
    async updateAllCheck(event) {
      //带给服务器的参数isChecked，不是布尔值，应该是0|1
      let checked = event.target.checked
      try {
        await this.$store.dispatch('updataAllChecked', checked)
      } catch (e) {
        this.$message({
          message: `错误：${e}`,
          type: 'warning',
        })
      }
    },
    changePage(pageNum) {
      this.pageNum = pageNum
      this.getShopCart()
    },
    async updateAllSelect() {
      try {
        await this.$store.dispatch('deleteCart', this.ids)
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      } catch (e) {
        this.$message({
          message: `错误：${e}`,
          type: 'warning',
        })
      }
    }
  },
}
</script>
