import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import User from './user'
import Goods from './goods'
import Mock from './mock'
export default new Vuex.Store({
  modules: {
    User,
    Goods,
    Mock
  }
})
