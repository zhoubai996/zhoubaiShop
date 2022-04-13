import { userLogin, reqRegister, reqGetCode } from '@/api/index.js'
const state = {
  code: 0,
  userInfo: {},
  userRegister: {}
}

const mutations = {
  SENDCODE(state, data) {
    state.code = data
  },
  USERREGISTER(state, data) {
    state.userRegister = data
  },
  LOGIN(state, data) {
    state.userInfo = data
    localStorage.setItem('user', JSON.stringify(data))
  },
}

const actions = {
  // 发送短信
  async sendCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code === 0) {
      commit('SENDCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 用户注册
  async userRegister({ commit }, userInfo) {
    try {
      let result = await reqRegister(userInfo)
      if (result.code === 0) {
        commit('USERREGISTER', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('注册错误'))
      }
    } catch (e) {
      console.log(e)
    }
  },
  // 用户登录
  async login({ commit }, userInfo) {
    let result = await userLogin(userInfo)
    if (result.code === 0) {
      commit('LOGIN', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('登录错误'))
    }
  },
}

const getters = {
  code(state) {
    return state.code
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
