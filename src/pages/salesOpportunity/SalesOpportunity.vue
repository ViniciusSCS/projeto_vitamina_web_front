<template>
    <site>
        <span slot="principal">
            <div class="container">
                <h2>Cadastrar Oportunidade de Venda</h2>
                <div class="row">
                    <div class="row">
                        <div class="row">
                            <div class="input-field col s6">
                                <label>Produto</label>
                                <select class="browser-default" v-model="product">
                                    <option value="" disabled selected></option>
                                    <option v-for="product in produto_selecionado" v-bind:value="product.id">
                                        {{ product.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field col s6">
                                <label>Cliente</label>
                                <select class="browser-default" v-model="client">
                                    <option value="" disabled selected></option>
                                    <option v-for="client in cliente_selecionado" v-bind:value="client.id">
                                        {{ client.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="date" type="date" class="validate" v-model="data">
                                <label for="date">Data</label>
                            </div>
                        </div>
                        <botao acao="salvar"
                               tipo_icone="fas"
                               icone="save"
                               tamanho="s3"
                               v-on:click.native="salvar()">
                        </botao>

                        <botao acao="voltar"
                               cor=""
                               tipo_icone="fas"
                               icone="arrow-left"
                               tamanho="s3"
                               url="/"
                               v-on:click.native="clear()"
                        />
                    </div>
                </div>
            </div>

        </span>
    </site>
</template>

<script>
import Site from "../../template/Site";
import Botao from "../../components/layouts/Botao";
import Icone from "../../components/layouts/Icone";
import { apiVitaminaWeb } from '../../service/Api';

export default {
    name: "SalesOpportunity",
    components: {Icone, Botao, Site},
    created() {
        var self = this

        self.product = self.$store.getters.get
    },
    mounted: function () {
        this.produto_select()
        this.client_select()
    },
    data() {
        return {
            data: '',

            product: null,
            client: null,

            produto_selecionado: [],
            cliente_selecionado: [],
        }
    },

    methods: {
        salvar() {
            var self = this

            console.log('CLIETE', self.client)
            console.log('PRODUTO', self.product)
            console.log('saller', self.$store.getters.getUsuario.id)

            apiVitaminaWeb.postSalesOpportunity({
                client_id: self.client,
                date: self.data,
                product_id: self.product,
                saller_id: self.$store.getters.getUsuario
            })
                .then(function (response) {
                    if (response.data.status) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Procedimento cadastrado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.clear()
                        self.$router.push('/oportunidade-venda/')
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Erro ao cadastrar procedimento!',
                        })
                        this.clear()
                        self.$router.push('/oportunidade-venda/')
                    }
                }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ERRO, tente novamente mais tarde!',
                })
                this.clear()
                self.$router.push('/oportunidade-venda/')
            })

        },

        clear() {
            var self = this
            self.product = ''
            self.client = ''
            self.data = ''
        },

        produto_select: function () {
            var self = this

            apiVitaminaWeb.selectProducts()
                .then(function (response) {
                    if (response.data.status) {
                        self.produto_selecionado = response.data.produto
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

        client_select: function () {
            var self = this

            apiVitaminaWeb.selectCliente()
                .then(function (response) {
                    if (response.data.status) {
                        self.cliente_selecionado = response.data.clientes
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
        }
    }
}
</script>

<style scoped>

</style>
