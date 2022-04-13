import {deleteCartGoods, updateAllCheck, updateCart, reqGetCarts, addShopCarts} from '@/api/index'
const state = {
  addCartInfo: {},
  getCart: {},
  updateCart: {},
}

const mutations = {
  ADDCART(state, data) {
    state.addCartInfo = data
  },
  GETCART(state, data) {
    state.getCart = data
  },
  UPDATECART(state, data) {
    state.updateCart = data
  }
}

const actions = {
  // 加入购物车
  async addCart({commit}, goods_id) {
    let result = await addShopCarts(goods_id)
    if (result.code === 0) {
      commit('ADDCART', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 获取购物车列表
  async getCart({ commit}, {pageNum, pageSize}) {
    let result = await reqGetCarts(pageNum, pageSize)
    if (result.code === 0) {
      commit('GETCART', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 更新购物车接口
  async updateCarts({ commit }, {id, goodsInfo}) {
    // console.log(typeof id);
    let result = await updateCart(id, goodsInfo)
    if (result.code === 0) {
      commit('UPDATECART', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 全选与全不选
  async updataAllChecked({ commit }, check) {
    let result = await updateAllCheck(check)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 删除商品接口
  async deleteCart({ commit }, ids) {
    let result = await deleteCartGoods(ids)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  }
}

const getters = {
  getCartList(state) {
    return state.getCart.list
  },
  getCartTotal(state) {
    return state.getCart.total
  },
  getCartSize(state) {
    return state.getCart.pageSize
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
