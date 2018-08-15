//状态管理
'use strict'

import Vue    from 'vue'
import Vuex   from 'vuex'
import { mutation } from './utils/vuexUtil'

// import modules
import demo from './modules/demo'
import common from './modules/common'
import login from './modules/login'

Vue.use(Vuex)

let state = {}
let mutations = mutation(state, {})
let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {},
    actions: {},
    modules: {
        demo,
        common,
        login
    }
})

export default store