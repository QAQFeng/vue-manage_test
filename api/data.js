// 接口请求数据
import axios from 'axios'

// 测试接口
export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu', // 接口地址
        method: 'post',  // 接口请求类型
        data: param
    })
}

// 首页左侧菜单栏数据接口
export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}

// 用户界面 table 数据接口
export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

