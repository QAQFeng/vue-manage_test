import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由是动态添加的，动态路由信息在 permission.js 文件里，children 里的路由信息可以注释掉
const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        // redirect: '/home',
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/home')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/User')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../views/mall')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('../views/other/pageOne.vue')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('../views/other/pageTwo.vue')
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// 重复点击导航报错处理
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// 对 router 进行全局暴露，这样就不需要每个文件都导入一次 router
export default router
