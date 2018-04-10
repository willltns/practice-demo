import Vue from 'vue'
import App from './components/App'
import store from './store'
import {currency} from "./currency";

Vue.config.productionTip = false;

Vue.filter('currency', currency);

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
