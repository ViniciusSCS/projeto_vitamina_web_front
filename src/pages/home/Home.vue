<template>
    <site>
        <span slot="principal">
            <products-listar/>
        </span>
    </site>
</template>

<script>
import Products from "../products/Products.vue";
import Site from "../../template/Site";
import ProductsListar from "../products/ProductsListar.vue";

export default {
    name: "Home",
    components: {Products, ProductsListar, Site},
    data() {
        return {
            products: [],
        }
    },
    created() {
        var self = this

        var aux = self.$store.getters.getUsuario
        if (aux) {
            self.usuario = self.$store.getters.getUsuario
        } else {
            self.$router.push('/login').catch(err => {})
        }
    },
}
</script>

<style scoped>

</style>
