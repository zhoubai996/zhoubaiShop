<style lang="less" scoped>
.header-container {
  #shortcut {
    background-color: #545c64;
    .el-menu {
      border-bottom: none;
    }
  }
  #header {
    width: 100%;
    height: 141px;
    background-color: #fff;
    .header-content {
      position: relative;
      height: 100%;
      .logo {
        position: absolute;
        top: 10px;
        left: 0;
        width: 190px;
        height: 120px;
        background-color: #c0c0c0;
        .logo_tit {
          position: absolute;
          .logo_tit_lk {
            background-image: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/header/sprite.png);
            background-position: 0 0;
            background-repeat: no-repeat;
            overflow: hidden;
            display: block;
            width: 190px;
            height: 120px;
            font-size: 0;
          }
        }
        .logo_subtit {
          display: none;
        }
      }
      .search {
        position: absolute;
        top: 30px;
        left: 250px;
        .form {
          float: left;
          width: 550px;
          height: 36px;
          .el-input {
            width: 480px;
          }
          .el-button {
          }
        }
        .dropdown {
          float: right;
          width: 132px;
          height: 36px;
          margin-left: 10px;
          .item {
            // margin-top: 10px;
            // margin-right: 40px;
            .el-button {
              width: 132px;
              height: 40px;
            }
          }
        }
      }
      .navitems {
        position: absolute;
        bottom: 0;
        left: 220px;
        width: 746px;
        height: 60px;
        // background-color: #c0c0c0;
        ul,
        li {
          float: left;
        }
        ul {
          margin-top: 20px;
        }
        li {
          height: 40px;
          padding: 0 20px;
          line-height: 40px;
          margin-left: 1px;
          background-color: #fff;
        }
      }
      .treasure {
        position: absolute;
        top: 10px;
        right: 0;
        width: 190px;
        height: 120px;
        // background-color: #c0c0c0;
        .promo_lk {
          position: relative;
          display: block;
          width: 190px;
          height: 120px;
          z-index: 3;
          background-repeat: no-repeat;
          background-position: bottom;
          -webkit-animation: promoShow 0.3s ease;
          animation: promoShow 0.3s ease;
        }
      }
    }
  }
}
</style>
<template>
  <div class="header-container">
    <div id="shortcut">
      <div class="content w">
        <el-menu :default-active="$router.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" router active-text-color="#ffd04b">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/login" v-show="isShow">登录</el-menu-item>
          <el-menu-item index="/register" v-show="isShow">注册</el-menu-item>
          <el-menu-item index="/orderman">订单管理</el-menu-item>
          <el-menu-item index="/user">个人中心</el-menu-item>
          <el-menu-item @click="loginOut">退出登录</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div id="header">
      <div class="header-content w">
        <div class="logo">
          <h1 class="logo_tit">
            <router-link :to="'/home'" class="logo_tit_lk">昼白商城</router-link>
          </h1>
          <h2 class="logo_subtit">昼白商城</h2>
        </div>
        <div class="search">
          <div class="search-m">
            <div class="form">
              <el-input class="fl" placeholder="请输入内容" v-model="input" clearable> </el-input>
              <el-button class="fr" @click="search">搜索</el-button>
            </div>
            <div class="dropdown">
              <el-badge :value="getCartTotal" class="item">
                <router-link :to="'/cart'">
                  <el-button size="small">我的购物车</el-button>
                </router-link>
              </el-badge>
            </div>
          </div>
        </div>
        <div class="navitems">
          <ul id="navitems-group1" @click="searchLi">
            <li>小米</li>
            <li>华为</li>
            <li>苹果</li>
            <li>测试</li>
            <li>华为</li>
            <li>笔记本</li>
            <li>测试</li>
            <li>华为</li>
            <li>笔记本</li>
            <li>测试</li>
          </ul>
        </div>
        <div class="treasure">
          <a
            id="J_promo_lk"
            class="promo_lk"
            href="//prodev.jd.com/mall/active/cWQsAx8q42bP8LVhFHBvve33GrS/index.html?babelChannel=ttt7"
            target="_blank"
            aria-label="推广位"
            style="background-image: url('//img11.360buyimg.com/babel/jfs/t1/203334/35/20427/86415/6247fe8bE7477373a/afe70913f31f62cb.png.webp'); background-size: cover"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      isShow: true,
      input: '',
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  created() {
    this.$bus.$on('isFlod',(val) => {
      this.isShow = val
    })
  },
  computed: {
    ...mapGetters(['getCartTotal'])
  },
  methods: {
    ...mapMutations(['CLEARUSERINFO']),
    searchLi(event) {
      this.input = event.target.innerText
      this.search()
    },
    search() {
      // console.log(this.$router.app._route.fullPath);
      this.$bus.$emit('search', this.input)
      if (this.$router.app._route.fullPath === '/search') {
        return
      }
      this.$router.push('/search')
    },
    loginOut() {
      if (localStorage.getItem('user')) {
        // 清空vuex数据
        this.CLEARUSERINFO()
        // 清除本地数据
        localStorage.removeItem('user')
        // 返回登录页面
        this.$router.push('/login')
      } else {
        this.$message({
          message: '你还未登录',
          type: 'warning',
        })
      }
    },
  },
}
</script>
