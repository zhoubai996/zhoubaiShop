import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import SearchGoods from '@/views/SearchGoods'
import Search from '@/views/Search'
const Cart = () => import('@/views/Cart')
const Order = () => import('@/views/Order')
export default [
  {path: '*', redirect: '/home'},
  {path: '/home', component: Home, name: 'Home'},
  {path: '/goods/:parentId', component: SearchGoods, props: true},
  {path: '/search', component: Search},
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  {path: '/cart', name: 'Cart', component: Cart},
  {path: '/order/:goods_info/:price', name: 'Order', component: Order, props: true},
]
