import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock/mockServe'
// 数据持久化
import '@/util/localStorage'
// 初始化样式
import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
