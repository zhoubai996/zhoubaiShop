import {reqGetSearch, reqGetClaGoods, reqGetLevelTwoCla, resGetGoodsClass, reqGetGoodsInfo } from '@/api/index'
const state = {
  goodsInfo: {},
  goodsClassInfo: {},
  levelTwoCla: {},
  claGoodsInfo: {},
  searchGoodsInfo: {}
}

const mutations = {
  GETGOODSLIST(state, data) {
    state.goodsInfo = data
  },
  GETGOODSCLASS(state, data) {
    state.goodsClassInfo = data
  },
  GETLEVELTWOCLA(state, data) {
    state.levelTwoCla = data
  },
  CLAGOODS(state, data) {
    state.claGoodsInfo = data
  },
  SRARCHGOODS(state, data) {
    state.searchGoodsInfo = data
  }
}

const actions = {
  // 获取购物车数据
  async getGoodsInfo({ commit }, { paNum = 1, paSize = 10 }) {
    let pageNum = paNum
    let pageSize = paSize
    let result = await reqGetGoodsInfo(pageNum, pageSize)
    if (result.code == 0) {
      commit('GETGOODSLIST', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取分类信息
  async getGoodsClass({ commit }, { paNum = 1, paSize = 10, level }) {
    let pageNum = paNum
    let pageSize = paSize
    let result = await resGetGoodsClass(level, pageNum, pageSize)
    if (result.code === 0) {
      commit('GETGOODSCLASS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取二级分类
  async getLevelTwoCla({ commit }, parentId) {
    let result = await reqGetLevelTwoCla(parentId)
    if (result.code === 0) {
      commit('GETLEVELTWOCLA', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 根据分类获取商品
  async claGoods({ commit }, {id, paNum = 1, paSize = 10}) {
    let pageNum = paNum
    let pageSize = paSize
    let result = await reqGetClaGoods(id, pageNum, pageSize)
    if (result.code === 0) {
      commit('CLAGOODS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 搜索商品
  async searchGoods({ commit }, {name, pageNum, pageSize}) {
    let result = await reqGetSearch(name, pageNum, pageSize)
    if (result.code === 0) {
      commit('SRARCHGOODS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}

const getters = {
  // 商品列表
  goodsList(state) {
    return state.goodsInfo.list
  },
  goodsTotal(state) {
    return state.goodsInfo.total
  },
  goodsSize(state) {
    return state.goodsInfo.pageSize
  },
  claList(state) {
    return state.goodsClassInfo.list
  },
  levelTwoList(state) {
    return state.levelTwoCla
  },
  claGoodsList(state) {
    return state.claGoodsInfo.list
  },
  claGoodsTotal(state) {
    return state.claGoodsInfo.total
  },
  claGoodsSize(state) {
    return state.claGoodsInfo.pageSize
  },
  searchList(state) {
    return state.searchGoodsInfo.list
  },
  searchTotal(state) {
    return state.searchGoodsInfo.total
  },
  searchSize(state) {
    return state.searchGoodsInfo.pageSize
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
