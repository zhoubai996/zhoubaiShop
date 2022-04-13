import {reqGetAddress} from '@/api/index'
const state = {
  addressInfo: []
}

const mutations = {
  GETADDRESS(state, data) {
    state.addressInfo = data
  }
}

const actions = {
  // 获取地址信息
  async getAddress({ commit }) {
    let result = await reqGetAddress()
    if (result.code === 0) {
      commit('GETADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  }
}

const getters = {
  addressList(state) {
    return state.addressInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
