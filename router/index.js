import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/User')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('../views/mall')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../views/other/pageOne.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../views/other/pageTwo.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// 对 router 进行全局暴露，这样就不需要每个文件都导入一次 router
export default router
