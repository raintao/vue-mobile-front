import Vue from 'vue'
import VueRouter from 'vue-router'

// import modules
import login from './modules/login'
import demo from './modules/demo'
import store from 'store'


Vue.use(VueRouter)

let routes = []
const router = new VueRouter({
    routes: routes
        .concat(login)
        .concat(demo)

})

router.beforeEach((to, from, next) => {
    // // 友盟统计
    // if (window._czc) {  
    //     let location = window.location  
    //     let contentUrl = location.pathname + location.hash  
    //     let refererUrl = '/'  
    //     window._czc.push(['_trackPageview', contentUrl, refererUrl])  
    // }
    // // 百度统计
    // let _hmt = window._hmt || []
    // if (to.path) {
    //     _hmt.push(['_trackPageview', '/#' + to.fullPath])
    // }
    
    let token = store.state.login.token
    if(to.path == '/login'){
        if(token) {
            // 从url获取的token替代本地token，并删除本地信息后跳转到登录url
            if (to.query.token && to.query.token !== token) {
                store.dispatch('login/logout', { query: { token: to.query.token } })
            } else {
                next('/demo')
            }
        } else {
            next()
        }
    }else {
        if(token) {
            // 从url获取的token替代本地token，并删除本地信息后跳转到登录url
            if (to.query.token && to.query.token !== token) {
                store.dispatch('login/logout', { query: { token: to.query.token, redirect: to.path } })
            } else {
                // 登陆过首页就能进入
                // if(to.path == '/demo' || to.path == '/business/personalCenter') {
                //     next()
                // }else {
                //     // 是否认证
                //     let userMsg = storage.get('userMsg')
                //     let adopt = userMsg.register_state == 'adopt'
                //     if(adopt) {
                //         next()
                //     }else {
                //         next('/demo')
                //     }
                // }
                next()
            }
        }else {
            let param = {path: '/login'}
            if (to.query.token) param.query = { token: to.query.token, redirect: to.path }
            next(param)
        }    
    }         
})

export default router