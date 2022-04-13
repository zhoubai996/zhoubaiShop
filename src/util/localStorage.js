// 数据持久化
import store from '@/store'
// 持久化/刷新不退出
let user = localStorage.getItem('user')
if (user) {
  user = JSON.parse(user)
  store.commit('LOGIN', user)
}
