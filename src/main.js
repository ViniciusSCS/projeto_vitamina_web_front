// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import axios from 'axios'
import lodash from 'lodash'
import router from './router'
import Datepicker from 'vuejs-datepicker';

Vue.use(Vuex, lodash)
Vue.config.productionTip = false

// Vue.prototype.$http = axios
// Vue.prototype.$urlApi = 'http://localhost:8000/api/'

var store = {
    state: {
        produto: [],
        titulo: 'Vitamina Web',
        usuario: sessionStorage.getItem('usuario') ?
            JSON.parse(sessionStorage.getItem('usuario')) : null,
    },
    getters: {
        getUsuario: state => {
            return state.usuario
        },

        getToken: state => {
            return state.usuario.token
        },

        getProducts: state => {
            return state.produto
        },

        getSaleslOpportunity: state => {
            return state.oportunidade_venda
        },

        getTitulo: state => {
            return state.titulo
        }
    },
    mutations: {
        setUsuario(state, n) {
            state.usuario = n
        },

        setProducts(state, n) {
            state.produto = n
        },

        setSaleslOpportunity(state, n) {
            state.oportunidade_venda = n
        }
    },
}

new Vue({
    el: '#app',
    router,
    components: {App, Datepicker},
    template: '<App/>',
    store: new Vuex.Store(store)
})
