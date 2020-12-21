//Globale Componenten importieren
//import './assets/js/ace/ace'



//Vue Standard Imports
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Style Imports
import './assets/css/tailwind.css'
import './assets/css/splitpanes.css'
import './assets/css/app.scss'




Vue.config.productionTip = false

//Eine eigene Vue Instanz für einen Globalen Event-Bus
export const EventBus = new Vue();

//Haut APP erzeugen
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




