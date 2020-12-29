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
  beforeCreate() { 
    console.log('APP.beforeCreate ()');
    this.$store.commit('FilterQuerys/loadSavedQuerys',null, { root: true }); 
  },
  mounted() {
    console.log('APP.mounted ()');
    this.$store.watch((_state) => { console.log(_state.FilterQuerys); return _state.FilterQuerys }, (_new) => {
      console.log(_new);
      persistAllQuerys(_new)
    }, {
      deep: true
    })
  },
  render: h => h(App)
}).$mount('#app')


function persistAllQuerys(_FilterQuerys) {
  console.log('persistAllQuerys()',JSON.stringify( _FilterQuerys.allQuerys, null, 2));
  console.log('persistAllQuerys()',JSON.stringify( _FilterQuerys.allQuerys));
  localStorage.setItem('allQuerys',JSON.stringify( _FilterQuerys.allQuerys, null, 2));
  console.log(localStorage.getItem('allQuerys'));
}