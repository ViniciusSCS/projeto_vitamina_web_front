<template>
    <site>
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
                                    <th>Status</th>
                                    <th>Vendedor</th>
                                    <th>Cliente</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>

                            <tbody v-if="salesOpportunities.length > 0">
                                <tr v-for="salesOpportunity in salesOpportunities" :key="salesOpportunity.id">
                                    <td>{{ salesOpportunity.product.name }}</td>
                                    <td>{{ salesOpportunity.status }}</td>
                                    <td>{{ salesOpportunity.saller.name }}</td>
                                    <td>{{ salesOpportunity.client.name }}</td>
                                    <td>
                                        <botao tipo_icone="fas"
                                            icone="check"
                                            titulo="Aprovar Oportunidade de Venda"
                                            v-on:click.native="approve(salesOpportunity.id)"
                                            v-if="salesOpportunity.status != 'Aprovado'"
                                        />
                                        <botao tipo_icone="fas"
                                            icone="times"
                                            titulo="Recusar Oportunidade de Venda"
                                            cor="orange"
                                            v-on:click.native="refuse(salesOpportunity.id)"
                                            v-if="salesOpportunity.status != 'Recusado'"
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
    </site>


</template>

<script>
import Site from "../../template/Site";
import Grid from "../../components/layouts/Grid";
import Botao from "../../components/layouts/Botao.vue";
import Paginacao from "../../components/layouts/Paginacao";
import { apiVitaminaWeb } from "../../service/Api";

export default {
    name: "SalesOpportunityListar",
    components: {Paginacao, Botao, Grid, Site},
    data() {
        return {
            usuario: false,
            salesOpportunities: [],
            paginacao: {},
        }
    },
    methods: {
        navegacao(page) {
            var self = this

            apiVitaminaWeb.getSalesOpportunity()
                .then(function (response) {
                    if (response.data.status) {
                        self.salesOpportunities = response.data.oportunidade_venda
                        self.paginacao = response.data.oportunidade_venda
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

        approve(id) {
            var self = this

            apiVitaminaWeb.aprovarSalesOpportunity(id)
                .then(function (response) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Oportunidade de venda aprovada com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    self.$router.push('/oportunidade-venda/')
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })

        },

        refuse(id) {
            var self = this

            apiVitaminaWeb.recusarSalesOpportunity(id)
                .then(function (response) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Oportunidade de venda recusada com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    self.$router.push('/oportunidade-venda/')
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
            apiVitaminaWeb.getSalesOpportunity()
                .then(function (response) {
                    if (response.data.status) {
                        self.salesOpportunities = response.data.oportunidade_venda
                        self.paginacao = response.data.oportunidade_venda
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
