// vuex 公共组件
import Cookie from 'js-cookie'
// import VueRouter from 'vue-router'

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
        currentMenu: null,
        menu: []
    },
    mutations: {
        // 对侧边栏的显示属性 isCollapes 进行取反操作
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 面包屑的显示
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
        },
        // tag 点击与删除
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            // 避免在刷新后丢失 menu 数据，将其存储到 cookie 里
            Cookie.set('menu', JSON.stringify(val))
        },
        // 初始化 menu 为空数组，并清空 cookie
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return 
            }
            // 将 cookie 里的 menu 转换为 JS 对象
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            // 获取 peimission 里的动态路由，管理员 和 普通用户 的路由不同
            menu.forEach(item => {
                // permission 里的动态路由没有 component，只有 url(文件路径)
                if (item.children) {
                    // 如果存在二级路由，说明是 管理员 路由
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });  
            // 路由的动态添加
            menuArray.forEach(item => {
                // console.log(router)
                router.addRoute('Main', item)
            })
        }
    }
}