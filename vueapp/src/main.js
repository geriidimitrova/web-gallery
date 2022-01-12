import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import * as M from 'materialize-css/dist/js/materialize'
Vue.prototype.$M = M

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
