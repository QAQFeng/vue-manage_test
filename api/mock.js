// mock 拦截 axios 请求
import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'

Mock.mock('/home/getData', homeApi.getStatisticalData)
// "添加用户" 和 "编辑用户"
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
// 获取列表数据生成 table
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
// 删除用户数据
Mock.mock(/user\/del/, 'post', userApi.deleteUser)

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
