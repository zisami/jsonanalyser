import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/splitpanes.css'
import './assets/app.scss'
import splitPane from 'vue-splitpane'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.component('split-pane', splitPane);