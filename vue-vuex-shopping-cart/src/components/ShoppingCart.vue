<template>
  <section class="cart">
    <h2>Your Cart</h2>
    <section class="card-detail">
      <i v-show="!cartList.length">please add some products to cart</i>
      <ul class="cart-list">
        <li class="cart-product" v-for="cartProduct in cartList">
          {{ cartProduct.title }} - {{ cartProduct.price | currency }} x {{ cartProduct.quantity }}
        </li>
      </ul>
      <p class="total">Total: {{cartTotalPrice | currency}}</p>
      <button :disabled="!cartList.length"
              @click="checkout(cartList)">
              Checkout
      </button>
      <p class="checkout-status" v-show="checkoutStatus">
        Checkout {{checkoutStatus}}
      </p>
    </section>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "shopping-cart",

    computed: {
      ...mapGetters([
        'checkoutStatus',
        'cartList',
        'cartTotalPrice'
      ])
    },

    methods: {
      ...mapActions([
        'checkout'
      ])
    }
  }

</script>

<style scoped>

</style>
