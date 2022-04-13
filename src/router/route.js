import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import SearchGoods from '@/views/SearchGoods'
import Search from '@/views/Search'
export default [
  {path: '*', redirect: '/home'},
  {path: '/home', component: Home, name: 'Home'},
  {path: '/goods/:parentId', component: SearchGoods, props: true},
  {path: '/search', component: Search},
  {path: '/register', component: Register},
  {path: '/login', component: Login},
]
