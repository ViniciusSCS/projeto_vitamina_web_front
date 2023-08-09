import Vue from 'vue'
import Router from 'vue-router'
import Home from "../pages/home/Home.vue";
import Login from "../pages/login/Login";
import Cadastro from "../template/Cadastro";
import Products from "../pages/products/Products";
import SalesOpportunity from "../pages/salesOpportunity/SalesOpportunity.vue";
import SalesOpportunityListar from "../pages/salesOpportunity/SalesOpportunityListar.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/cadastro',
            name: 'Cadastro',
            component: Cadastro
        },
        {
            path: '/produto/cadastro',
            name: 'Cadastro',
            component: Products
        },
        {
            path: '/produto/editar/:id',
            name: 'Editar',
            component: Products
        },
        {
            path: '/oportunidade-venda/',
            name: 'Listar',
            component: SalesOpportunityListar
        },
        {
            path: '/oportunidade-venda/cadastro',
            name: 'Cadastro',
            component: SalesOpportunity
        },
        // {
        //     path: '/medicamento/cadastro',
        //     name: 'Cadastro',
        //     component: Medicamento
        // },
    ]
})
