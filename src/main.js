//Vue Standard Imports
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Style Imports
import './assets/tailwind.css'
import './assets/splitpanes.css'
import './assets/app.scss'

//Globale Componenten importieren


Vue.config.productionTip = false

//Eine eigene Vue Instanz für einen Globalen Event-Bus
export const EventBus = new Vue();

//Haut APP erzeugen
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//Globale Componenten initalisieren




