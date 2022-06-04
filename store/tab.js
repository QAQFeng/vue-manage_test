// 对侧边栏的显示属性 isCollapes 进行取反操作
export default {
    state: {
        isCollapse: false
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}