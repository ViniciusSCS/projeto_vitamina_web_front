<template>
    <span slot="principal">
        <div class="container">
            <div class="row"></div>
            <div class="row">
                <botao acao="Cadastrar Produto"
                       tipo_icone="fas"
                       cor="blue"
                       icone="plus"
                       tamanho="s3"
                       url="/produto/cadastro"
                />
                <botao acao="Cadastrar Oportunidade de Venda"
                       tipo_icone="fas"
                       cor="green"
                       icone="plus"
                       tamanho="s5"
                       url="/oportunidade-venda/cadastro"
                />

                <grid tamanho="12">
                    <table class="responsive-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody v-if="products.length > 0">
                            <tr v-for="product in products" :key="product.id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.price }}</td>
                                <td>
                                    <botao tipo_icone="fas"
                                           icone="edit"
                                           titulo="Editar Produto"
                                           cor="orange"
                                           v-on:click.native="editar(product.id)"
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td></td>
                                <td class="">Nenhum produto cadastrado</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center">
                        <paginacao :source="paginacao"
                                   @navegacao="navegacao"
                        />
                    </div>
                </grid>
            </div>
        </div>
    </span>

</template>

<script>
import Site from "../../template/Site";
import Grid from "../../components/layouts/Grid";
import Botao from "../../components/layouts/Botao";
import Paginacao from "../../components/layouts/Paginacao";
import { apiVitaminaWeb } from "../../service/Api";

export default {
    name: "ProductsListar",
    components: {Paginacao, Botao, Grid, Site},
    data() {
        return {
            usuario: false,
            products: [],
            paginacao: {},
        }
    },
    methods: {
        navegacao(page) {
            var self = this

            apiVitaminaWeb.getProducts()
                .then(function (response) {
                    if (response.data.status) {
                        self.products = response.data.produto
                        self.paginacao = response.data.produto
                    } else
                        sweetAlert(response.data.erro)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })

        },

        editar(id) {
            var self = this

            apiVitaminaWeb.showProducts(id)
                .then(function (response) {
                    self.products = response.data.produto
                    self.$store.commit('setProducts', response.data.produto)
                    self.$router.push('/produto/editar/' + id)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
        },

        salesOpportunity(id) {
            var self = this

            self.$http.get(self.$urlApi + 'produto/editar/' + id,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    self.product = response.data.products
                    self.$store.commit('setProducts', response.data.produto)
                    self.$router.push('/procedimento/cadastro/' + id)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })

        }
    },
    created() {
        var self = this
        var aux = self.$store.getters.getUsuario
        if (aux) {
            self.usuario = self.$store.getters.getUsuario
            apiVitaminaWeb.getProducts()
                .then(function (response) {
                    if (response.data.status) {
                        self.products = response.data.produto
                        self.paginacao = response.data.produto
                    } else
                        sweetAlert(response.data.erro)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
        } else {
            self.$router.push('/login').catch(err => {
            })
        }
    },
}
</script>

<style scoped>

</style>
