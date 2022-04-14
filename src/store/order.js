import {reqGetOrder, updateOrder, addOrder} from '@/api/index'

const state = {
  orderInfo: {}
}

const mutations = {
  GETORDER(state, data) {
    state.orderInfo = data
  }
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
  },
  // 修改订单状态
  async updateOrders({ commit}, {orderId, status}) {
    let result = await updateOrder(orderId, status)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 获取订单接口
  async getOrder({ commit}, {status, pageNum, pageSize}) {
    // console.log('订单接口执行');
    let result = await reqGetOrder(status, pageNum, pageSize)
    if (result.code === 0) {
      // console.log(result.data);
      commit('GETORDER', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  }
}

const getters = {
  orderList(state) {
    return state.orderInfo.list
  },
  orderTotal(state) {
    return state.orderInfo.total
  },
  orderSize(state) {
    return state.orderInfo.pageSize
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
