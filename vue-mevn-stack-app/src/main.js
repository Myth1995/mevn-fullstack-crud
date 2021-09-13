import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'
import 'vue-select/dist/vue-select.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
library.add(faUserSecret)

Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
