import Vuex from 'vuex'
import { getTypes, getModule, getStore } from '../utils/storeUtil'
import { getter, mutation, action } from '../utils/vuexUtil'
import api from 'api'

export const storeName = 'common'

/*** state ***/
let state = {
    // 合同
    contractState: null,    // 合同状态
    initContractState: false

}

/*** getters ***/
let getters = getter(state, {
    // 合同状态
    contractState(state) {
        return state.contractState
    },
  
})

/*** mutations ***/
let mutations = mutation(state, {
    // 合同状态
    setContractState(state, contractState) {
        state.initContractState = true
        state.contractState = contractState
    },
    
})

/*** actions ***/
let actions = action(state, {
    // 获取合同状态
    async getContractState({ state, commit }, reload = false) {
        if (!reload && state.initContractState) return state.contractState

        let res = await api.common.getDict({
            table: 'contract',
            field: 'state'
        })
        commit('setContractState', res)
        return res
    },

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