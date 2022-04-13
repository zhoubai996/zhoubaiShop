<style lang="less" scoped>
</style>
<template>
  <div class="Paging-container">
    <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        :total="total" :page-size="pageSize" @current-change="changePage">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  props: {
    total: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    changePage(pageNum) {
      this.$emit('changePage', pageNum)
    }
  },
}
</script>
