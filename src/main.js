import 'vue-svgicon/dist/polyfill'
import Vue from 'vue'
import router from './router'
import store from 'store'
import meta from 'vue-meta'
import * as filters from 'common/filters'

// Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 注册过滤函数
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 注册全局组件
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

import 'common/globalComponents'
 

import 'src/style/app.scss'
import App from 'src/views/app'

// import all icons
import * as svgicon from 'vue-svgicon'
import './views/icons'
Vue.use(svgicon, {
    tagName: 'icon'
})

Vue.use(meta, {
    keyName: 'metaInfo'
})
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
})
