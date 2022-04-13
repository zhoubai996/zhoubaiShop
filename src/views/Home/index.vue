<style lang="less" scoped>
.home-container {
  .content {
    height: 100%;
    // border: 1px solid #ff8040;
  }
  .fs {
    position: relative;
    margin-bottom: 30px;
    #header {
      height: 480px;
      // background-color: #d31212;
      .fs_col1,
      .fs_col2 {
        float: left;
        height: 480px;
        margin-right: 10px;
      }
      .fs_col1 {
        width: 190px;
        // background-color: #fff;
        .cate {
          position: relative;
          z-index: 3;
          .cate_menu {
            overflow: hidden;
            padding: 10px 0;
            height: 450px;
            background-color: #fefefe;
            color: #636363;
            margin-top: 10px;
            .cate_menu_item {
              height: 40px;
              line-height: 40px;
              margin: 10px auto;
              overflow: hidden;
              padding-left: 18px;
              font-size: 18px;
              -webkit-transition: background-color 0.2s ease;
              transition: background-color 0.2s ease;
              &:hover { 
                background-color: #D9D9D9;
                color: rgb(173, 44, 44);
              }
            }
          }
          .cate_pop {
            position: absolute;
            left: 191px;
            top: 0;
            width: 998px;
            min-height: 468px;
            border: 1px solid #f7f7f7;
            background-color: rgb(197, 106, 106);
            -webkit-box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
            box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
            -webkit-transition: top 0.25s ease;
            transition: top 0.25s ease;
          }
        }
      }
      .fs_col2 {
        width: 790px;
        margin-top: 10px;
        .el-carousel__item h3 {
          color: #475669;
          font-size: 18px;
          opacity: 0.75;
          line-height: 300px;
          margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
      .fs_col3 {
        position: relative;
        float: right;
        width: 190px;
        height: 470px;
        margin-top: 10px;
        z-index: 1;
        background-color: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="home-container">
    <div class="content">
      <div class="fs">
        <div id="header" class="w">
          <div class="fs_col1">
            <div class="cate">
              <ul class="cate_menu">
                <li class="cate_menu_item" v-for="(item, index) in claList" :key="item.id">
                  <router-link :to="`/goods/${item.id}`">
                    {{item.cla_name}}
                  </router-link>
                </li>
              </ul>
              <div class="cate_pop" style="top: 0; display: none"></div>
            </div>
          </div>
          <div class="fs_col2">
            <el-carousel height="470px" :interval="5000" arrow="always">
              <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" style="width:100%;height:100%;">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="fs_col3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      level: 1,
      paNum: 1,
      paSize: 10
    }
  },
  mounted() {
    this.goodsClass()
    this.BannerList()
  },
  created() {},
  computed: {
    ...mapGetters(['claList']),
    ...mapState({ 
      bannerList: state => state.Mock.bannerList
    })
  },
  methods: {
    goodsClass() {
      let {level, paNum, paSize} = this
      this.$store.dispatch('getGoodsClass', {level, paNum, paSize})
    },
    BannerList() {
      this.$store.dispatch('getBannerList')
    }
  },
}
</script>
