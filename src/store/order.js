import {addOrder} from '@/api/index'

const state = {

}

const mutations = {

}

const actions = {
  // 提交订单
  async addOrderInfo({ commit }, orderInfo) {
    let result = await addOrder(orderInfo)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  }
}

const getters = {
  
}

export default {
  state,
  mutations,
  actions,
  getters,
}
