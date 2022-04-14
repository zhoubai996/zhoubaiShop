import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import SearchGoods from '@/views/SearchGoods'
import Search from '@/views/Search'
const Cart = () => import('@/views/Cart')
const Order = () => import('@/views/Order')
const OrderMan = () => import('@/views/OrderMan')
const User = () => import('@/views/User')
export default [
  {path: '*', redirect: '/home'},
  {path: '/home', component: Home, name: 'Home'},
  {path: '/goods/:parentId', component: SearchGoods, props: true},
  {path: '/search', component: Search},
  {path: '/register', component: Register, meta: {login: true}},
  {path: '/login', component: Login, meta: {login: true}},
  {path: '/cart', name: 'Cart', component: Cart, meta: {isLogin: true}},
  {path: '/order/:goods_info/:price', name: 'Order', component: Order, props: true, meta: {isLogin: true}},
  {path: '/orderman', name: 'OrderMan', component: OrderMan, meta: {isLogin: true}},
  {path: '/user', name: 'User', component: User, meta: {isLogin: true}}
]
