import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/User',
        name: 'User',
        component: () => import('../views/User.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// 对 router 进行全局暴露，这样就不需要每个文件都导入一次 router
export default router
