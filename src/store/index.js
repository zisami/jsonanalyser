import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import FilterQuerys from './namespaces/filterquery.store';
import SplitPanes from './namespaces/splitpane.store';


export default new Vuex.Store({
  modules: {
    FilterQuerys: FilterQuerys,
    SplitPanes: SplitPanes,
  },
  state: {

  },
  getters: {
  },
  mutations: {

  },
  actions: {

  }
})
