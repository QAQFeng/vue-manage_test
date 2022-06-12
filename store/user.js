// 系统登录凭证 token
import Cookie from 'js-cookie'

export default {
    state: {
        token: ''
    },
    mutations: {
        // 设置系统登录凭证 token
        setToken(state, val) {
            state.token = val,
            Cookie.set('token', val)
            
                console.log(state.token, 'state.token')
            
        },
        // 清空系统登录凭证 token
        clearToken(state) {
            state.token = '',
            Cookie.remove('token')
        },
        // 获取系统登录凭证 token
        getToken(state) {
            // 当前系统中有 token 直接获取，否则从 state 中获取
            state.token = state.token || Cookie.get('token')
        }
    }

}