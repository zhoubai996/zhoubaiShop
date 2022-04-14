import request from './request.js'
import mockRequest from './mock'
// 获取首页轮播图
export const reqGetBannerList = () => mockRequest({url: '/banner', method: 'get'})
// 获取floor数据
export const reqGetFloorList = () => mockRequest({url: '/floor', method: 'get'})
// 用户注册
export const reqRegister = (userInfo) => request({url: '/users/register', method: 'post', data: userInfo})
// 发送验证码
export const reqGetCode = (phone) => request({url: '/users/phone', method: 'post', data: {phone}})
// 修改密码
export const updatePass = (password) => request({url: '/users', method: 'patch', data: {password}})
// 登录接口
export const userLogin = (userInfo) => request({url: '/users/login', method: 'post', data: userInfo})
// 获取全部商品
export const reqGetGoodsInfo = (pageNum, pageSize) => request({url: `/goods?pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 获取分类接口
export const resGetGoodsClass = (level, pageNum, pageSize) => request({url: `/cla?level=${level}&pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 获取二级分类接口
export const reqGetLevelTwoCla = (parentId) => request({url: `/cla/children/${parentId}`, method: 'get'})
// 根据分类搜索商品接口
export const reqGetClaGoods = (id, pageNum, pageSize) => request({url: `/goods/search?id=${id}&pageNum=${pageNum}&pageSize=${pageSize}`})
// 搜索商品接口
export const reqGetSearch = (goods_name, pageNum, pageSize) => request({url: `/goods/search?pageNum=${pageNum}&pageSize=${pageSize}`, method: 'post', data: {goods_name}})
// 加入购物车接口
export const addShopCarts = (goods_id) => request({url: '/carts', method: 'post', data: {goods_id}})
// 获取购物车接口
export const reqGetCarts = (pageNum, pageSize) => request({url: `/carts?pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 更新购物车接口
export const updateCart = (id, goodsInfo) => request({url: `/carts/${id}`, method: 'patch', data: goodsInfo})
// 全选与全不选接口
export const updateAllCheck = (check) => request({url: `carts/select/${check}`, method: 'post'})
// 删除商品接口
export const deleteCartGoods = (ids) => request({url: '/carts', method: 'delete', data: {ids}})
// 获取地址
export const reqGetAddress = () => request({url: '/address', method: 'get'})
// 新增地址
export const addAddress = (addressInfo) => request({url: '/address', method: 'post', data: addressInfo})
// 修改地址
export const updateAddress = (id, addressInfo) => request({url: `/address/${id}`, method: 'put', data: addressInfo})
// 删除地址
export const deleteAddress = (id) => request({url: `/address/${id}`, method: 'delete'})
// 设置默认地址
export const defaultAddress = (id) => request({url: `/address/${id}`, method: 'patch'})
// 提交订单
export const addOrder = (orderInfo) => request({url: '/orders', method: 'post', data: orderInfo})
// 修改订单接口
export const updateOrder = (orderId, status) => request({url: `/orders/${orderId}`, method: 'patch', data: {status}})
// 获取订单接口
export const reqGetOrder = (status, pageNum, pageSize) => request({url: `/orders?pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`, method: 'get'})
