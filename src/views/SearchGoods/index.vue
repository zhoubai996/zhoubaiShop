<style lang="less" scoped>
.class-list {
  margin-top: 10px;
  // background-color: #ffffff;
  ul li {
    display: inline;
    float: left;
    padding: 5px 20px;
    margin: 10px 10px;
    // border: 1px solid red;
    background-color: #fff;
  }
}
.paging {
  margin-top: 20px;
  .paging-box {
    width: 400px;
    margin: auto;
  }
}</style>
<template>
  <div class="goods-container">
    <div class="class-list w clearfix">
      <ul>
        <li>分类 :</li>
        <li v-for="(item, index) in levelTwoList" :key="item.id" @click="getGoodsCla(item.id)">{{item.cla_name}}</li>
      </ul>
    </div>
    <div class="goods-box">
      <GoodsList :goodsList="claGoodsList"></GoodsList>
    </div>
    <div class="paging">
      <div class="paging-box">
        <Paging :total="claGoodsTotal" :pageSize="parseInt(claGoodsSize)" @changePage="changePage"></Paging>
        </div>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/Paging.vue'
import GoodsList from '@/components/GoodsList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'SearchGoods',
  props: ['parentId'],
  data() {
    return {
      id: 0,
      // 初始pageNum
      paNum: 1,
      // 初始pageSize
      paSize: 10,
    }
  },
  components: {
    GoodsList,
    Paging,
  },
  mounted() {
    this.levelTwo()
    // console.log(this.parentId);
  },
  created() {},
  computed: {
    ...mapGetters(['levelTwoList', 'claGoodsList', 'claGoodsTotal', 'claGoodsSize']),
  },
  methods: {
    // 获取商品数据
    claGoodsInfo(id) {
      let { paNum, paSize } = this
      this.$store.dispatch('claGoods', { id,paNum, paSize })
    },
    // 获取二级分类
    levelTwo() {
      this.$store.dispatch('getLevelTwoCla', this.parentId)
    },
    // 获取页码
    changePage(pageNum) {
      this.paNum = pageNum
      this.claGoodsInfo(this.id)
    },
    getGoodsCla(id) {
      this.id = id
      this.claGoodsInfo(id)
    }
  },
}
</script>
