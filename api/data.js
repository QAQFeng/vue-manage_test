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

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}

