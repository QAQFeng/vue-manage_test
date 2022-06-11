import Vue from 'vue'
import Vuex from 'vuex'

// 导入 tab.js 模块
import tab from './tab'
import user from './user'

Vue.use(Vuex)

// 创建 Vuex 实例 Store，并进行全局暴露
export default new Vuex.Store({
    modules: {
        tab,
        user
    }
})