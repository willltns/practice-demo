import Vue from 'vue'
import App from './components/App'
import {store} from './store/store'

Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
