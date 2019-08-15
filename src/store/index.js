import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        title: '',
        siderCollapsed: false,
        scrollTop: 0
    },
    mutations: {
        setUser (state, data = {}) {
            state.user = data
        },
        setTitle (state, data) {
            state.title = data
            document.title = data
        },
        setLoading (state, data = {}) {
            state[data.type] = Boolean(data.data)
        },
        setCollapsed (state, data) {
            state.siderCollapsed = Boolean(data)
        },
        setScrollTop (state, data) {
            state.scrollTop = Number(data)
        }
    },
    actions: {

    },
    modules: {
        user
    }
})

export default store
