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

