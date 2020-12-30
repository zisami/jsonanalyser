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
    this.$store.commit('FilterQuerys/loadSavedQuerys', null, { root: true });
    this.$store.commit('loadUI');
  },
  mounted() {
    this.$store.watch((_state) => { return _state.FilterQuerys }, (_new) => {
      persistAllQuerys(_new)
    }, {
      deep: true
    });
    this.$store.watch((_state) => { return _state.SplitPanes }, (_new) => {
      persistUI(_new)
    }, {
      deep: true
    })
  },
  render: h => h(App)
}).$mount('#app')


function persistAllQuerys(_FilterQuerys) {
  const valuesToSave = { ..._FilterQuerys.allQuerys } //__proto__ entfernen
  localStorage.setItem('allQuerys', JSON.stringify(valuesToSave, null, 2));
}
function persistUI(_ui) {
  console.clear
  const valuesToSave = { ..._ui.splitPanes } //__proto__ entfernen
  localStorage.setItem('UI', JSON.stringify(valuesToSave, null, 2));
}