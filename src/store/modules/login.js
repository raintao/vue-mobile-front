import Vuex from 'vuex'
import { getTypes, getModule, getStore } from '../utils/storeUtil'
import { getter, mutation, action } from '../utils/vuexUtil'
import api from 'api'
import storage from 'src/unit/storage'
import router from '../../router'


export const storeName = 'login'

/*** state ***/
let state = {
    userMsg: storage.get('userMsg'),
    token: storage.get('token'),
    isLoading: false

}

/*** getters ***/
let getters = getter(state, {

})

/*** mutations ***/
let mutations = mutation(state, {
    setUserMsg(state, data) {
        state.userMsg = data
        state.token = data.token
        storage.set('userMsg', data)
        storage.set('token', data.token)
    },

    logout(state, parameter = {}) {
        state.userMsg = null
        state.token = null
        storage.remove('userMsg')
        storage.remove('token')
        parameter.path = '/login'
        router.push(parameter)
    }

})

/*** actions ***/
let actions = action(state, {
    setUserMsg({ commit }, res) {
        commit('setUserMsg', res)
    },

    async login({ commit }, data) {
        if(data) {
            //点击登陆 保存密码
            storage.set("loginMsg", data)
        }else {
            //自动登陆
            let loginMsg = storage.get('loginMsg')
            if(loginMsg.login && loginMsg.password) {
                try {
                    let resultData = await api.login.userLogin({
                        login: loginMsg.login,
                        password: loginMsg.password
                    })
                    commit('setUserMsg', resultData)
                }catch (err) {
                   router.push('/login')
                }
            }else {
                router.push('/login')
            }
        }
    },

    logout({ commit }, parameter) {
        commit('logout', parameter)
    },

    pageLoading({ commit }, loading) {
        state.isLoading = loading
    }
})

/*** module store ***/
let store = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

/*** exports ***/
export let types = getTypes(store)
export let module = getModule(storeName)
export let Store = getStore(module, types)

export default store