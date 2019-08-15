import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Main from '../layout/Main.vue'

Vue.use(Router)

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

export const routes = [{
    path: '/',
    component: Main,
    children: [{
        path: '',
        name: 'index',
        meta: {
            title: '首页',
            role: [1]
        },
        component: () => import('../views/index.vue')
    }, {
        path: 'user',
        name: 'user_list',
        meta: {
            title: '用户列表',
            role: [2]
        },
        component: () => import('../views/user_list.vue')
    }, {
        path: 'user/add',
        name: 'user_add',
        meta: {
            title: '添加用户',
            role: [2, 3]
        },
        component: () => import('../views/user_add.vue')
    }]
}, {
    path: 'login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: () => import('../views/login.vue')
}]

const router = new Router({
    mode: 'history',
    routes,
    fallback: true,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach(async (to, from, next) => {
    NProgress.done().start()
    for (let item in to.query) {
        const data = to.query[item]
        if (/^[\d]+$/.test(data)) {
            to.query[item] = Number(data)
        }
    }
    for (let item in to.params) {
        const data = to.params[item]
        if (/^[\d]+$/.test(data)) {
            to.params[item] = Number(data)
        }
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
