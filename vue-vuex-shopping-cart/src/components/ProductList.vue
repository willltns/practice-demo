<template>
  <section class="products">
    <h2>Products</h2>
    <ul class="product-list">
      <li class="product"
        v-for="product in allProducts"
        :key="product.id">
        <p>{{product.title}} - {{product.price | currency}}</p>
        <button :disabled="!product.inventory"
                @click="addToCart(product)">
                Add to cart
        </button>
        <span class="sold-out" v-show="!product.inventory">sold out!!</span>
      </li>
    </ul>
  </section>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "product-list",

    computed: {
      allProducts (){
        return this.$store.getters.allProducts;
      }
    },

    methods: {
      ...mapActions([
        'addToCart'
      ])
    },

    created () {
      this.$store.dispatch("getAllProducts");
    }
  }
</script>

<style scoped>

</style>
