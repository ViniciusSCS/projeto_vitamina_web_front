<template>
    <site>
        <span slot="principal">
            <div class="container">
                <h2>{{ product ? "Atualizar Pet" : "Cadastrar Pet" }}</h2>
                <div class="row">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="name" type="text" class="validate" v-model="name">
                            <label for="name">Nome</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="description" type="text" class="validate" v-model="description">
                            <label for="description">Descrição</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="price" type="text" class="validate" v-model="price">
                            <label for="price">Preço</label>
                        </div>
                    </div>
                    <botao acao="Salvar"
                           tipo_icone="fas"
                           icone="save"
                           tamanho="s3"
                           v-on:click.native="salvar()"
                           v-if="!product"
                    />
                    <botao acao="Atualizar"
                           cor="orange"
                           tipo_icone="fas"
                           icone="save"
                           tamanho="s3"
                           v-on:click.native="salvar()"
                           v-if="product"
                    />
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
        </span>
    </site>

</template>

<script>
import Site from "../../template/Site";
import Botao from "../../components/layouts/Botao";
import Login from "../login/Login";
import { apiVitaminaWeb } from '../../service/Api';

export default {
    name: "Products",
    components: {Botao, Site},
    created() {
        var self = this

        var verificaRota = self.currentRoute

        if (verificaRota.match(/editar.*/)) {
            var aux = self.$store.getters.getProducts
            console.log('AQUI: ', aux)
            if (aux.id != null) {
                self.product = self.$store.getters.getProducts
                self.name = self.product.name
                self.description = self.product.description
                self.price = self.product.price
            }
        }
    },
    data() {
        return {
            name: '',
            description: '',
            price: '',
            currentRoute: window.location.pathname,

            product: false,
        }
    },
    methods: {
        salvar() {
            var self = this

            if(self.currentRoute.match(/editar.*/)){
                apiVitaminaWeb.putProducts(self.product.id, {
                    name: self.name,
                    description: self.description,
                    price: self.price
                })
                    .then(function (response) {

                        if (response.data.status) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: process.env.PRODUTO_ATUALIZADO_SUCESSO,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            self.$store.commit('setProducts', response.data)
                            self.$router.push('/')
                        } else if (response.data.status == false && response.data.validacao) {
                            var erros = '';
                            for (var e of Object.values(response.data.erros)) {
                                erros += e + ' ';
                            }
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Erro: ' + erros,
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: process.env.PRODUTO_CADASTRADO_ERRO,
                            })
                        }
                    }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
            } else {
                apiVitaminaWeb.postProducts({
                    name: self.name,
                    description: self.description,
                    price: self.price
                })
                    .then(function (response) {
                        if (response.data.status) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: process.env.PRODUTO_CADASTRADO_SUCESSO,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.clear()
                            self.$store.commit('setProducts', response.data)
                            self.$router.push('/')
                        } else if (response.data.status == false && response.data.validacao) {
                            var erros = '';
                            for (var e of Object.values(response.data.erros)) {
                                erros += e + ' ';
                            }
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Erro: ' + erros,
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: process.env.PRODUTO_CADASTRADO_ERRO,
                            })
                        }
                    }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
            }
        },

        clear(){
            var self = this

            self.product = false

            self.name = ''
            self.description = ''
            self.price = ''
        },
    }
}
</script>

<style scoped>

</style>
