<style lang="less" scoped>
.paging {
  margin-top: 20px;
  .paging-box {
    width: 400px;
    margin: auto;
  }
}</style>
<template>
  <div class="search-container">
    <div class="goods-box">
      <GoodsList :goodsList="searchList"></GoodsList>
    </div>
    <div class="paging">
      <div class="paging-box">
        <Paging :total="searchTotal" :pageSize="parseInt(searchSize)" @changePage="changePage"></Paging>
        </div>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/Paging.vue'
import GoodsList from '@/components/GoodsList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      goods_name: '',
      // 初始pageNum
      pageNum: 1,
      // 初始pageSize
      pageSize: 10,
    }
  },
  components: {
    GoodsList,
    Paging,
  },
  mounted() {
    this.$bus.$on('search', (name) => {
      this.searchGoodsInfo(name)
    })
  },
  created() {},
  computed: {
    ...mapGetters(['searchSize', 'searchList', 'searchTotal']),
  },
  methods: {
    // 获取商品数据
    searchGoodsInfo(name) {
      let { pageNum, pageSize } = this
      this.goods_name = name
      this.$store.dispatch('searchGoods', { name, pageNum, pageSize })
    },
    // 获取页码
    changePage(pageNum) {
      this.pageNum = pageNum
      this.searchGoodsInfo(this.goods_name)
    }
  },
}
</script>


