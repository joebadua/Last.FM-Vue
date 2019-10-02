import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dotenv from 'dotenv'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import * as VueSpinnersCss from "vue-spinners-css";

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(dotenv)
Vue.use(Buefy)
Vue.use(VueSpinnersCss)


new Vue({
  render: h => h(App),
}).$mount('#app')
