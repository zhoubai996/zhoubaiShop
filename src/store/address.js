import {defaultAddress, deleteAddress, updateAddress, addAddress, reqGetAddress} from '@/api/index'
const state = {
  addressInfo: []
}

const mutations = {
  GETADDRESS(state, data) {
    state.addressInfo = data
  }
}

const actions = {
  // 设置默认地址
  async defaultAddre({ commit }, id) {
    let result = await defaultAddress(id)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 删除地址
  async deleteAddre({ commit }, id) {
    let result = await deleteAddress(id)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 修改地址
  async updateAddre({ commit }, {id, addressInfo}) {
    let result = await updateAddress(id, addressInfo)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 新增地址
  async addAddre({ commit }, addressInfo) {
    let result = await addAddress(addressInfo)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
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
