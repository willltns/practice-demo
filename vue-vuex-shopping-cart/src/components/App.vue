<template>
  <div id="app" v-cloak>
    <h1>Shopping Cart Example</h1>

    <product-list></product-list>
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart'
export default {
  name: 'App',
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-left: 20px;
    color: darkslategrey;
  }

  h1 {
    margin: 20px 0;
    font-weight: 700;
  }
  .products {
    border-top: 1px solid #cacaca;
  }

  h2 {
    margin: 20px 0;
  }

  .product-list {
    margin-left: 20px;
  }

  .product {
    margin-top: 9px;
  }

  .product button {
    margin: 5px 0;
  }

  .cart {
    border-top: 1px solid #cacaca;
    margin-top: 20px;
  }
  .total {
    margin: 15px 0;
  }

  button {
    padding: 1px 5px;
  }

  .cart-list {
    margin-left: 20px;
  }

  .cart-product {
    margin-bottom: 10px;
  }

  .checkout-status {
    margin-top: 20px;
  }

  .sold-out {
    color: red;
    margin-left: 10px;
  }
</style>
