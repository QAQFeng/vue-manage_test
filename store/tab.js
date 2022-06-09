
export default {
    state: {
        isCollapse: false,
        // 初始化标签，默认显示 “首页”
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null
    },
    mutations: {
        // 对侧边栏的显示属性 isCollapes 进行取反操作
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                // 查看 tabsList 里是否存在当前点击的页面路由，如果不存在则添加到 tabsList
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                } 
            } else {
                state.currentMenu = null
            }
        }
    }
}