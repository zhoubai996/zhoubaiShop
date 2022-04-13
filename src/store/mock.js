import {reqGetBannerList, reqGetFloorList} from '@/api/index.js'
const state = {
  bannerList: [],
  floorList: []
}

const mutations = {
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
 //获取首页轮播图的数据
 async getBannerList({commit}) {
  let result = await reqGetBannerList()
  if(result.code === 200) {
    commit('GETBANNERLIST', result.data)
  }
},
// 获取floor轮播图数据
async getFloorList({commit}) {
  let result = await reqGetFloorList()
  if(result.code === 200) {
    commit('GETFLOORLIST', result.data)
  }
}
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
