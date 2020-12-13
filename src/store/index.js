import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: '??????',
    splitPanes: {
      input: {
        size:
        {
          orig: 50,
          last: 50,
          active: 50
        }
      },
      output: {
        size:
        {
          orig: 50,
          last: 50,
          active: 50
        }
      },
      filter: {
        size:
        {
          orig: 50,
          last: 50,
          active: 20
        }
      },
      editors: {
        size:
        {
          orig: 50,
          last: 50,
          active: 80
        },

      },

    }

  },
  getters: {
    inputPaneSize: state => { return state.splitPanes.input.size },
    outputPaneSize: state => { return state.splitPanes.output.size },
    filterPaneSize: state => { return state.splitPanes.filter.size },
    editorsPaneSize: state => { return state.splitPanes.editors.size },
  },
  mutations: {
    setPaneSize(state, payload) {
      state.splitPanes[payload.paneName].size[payload.sizeKey] = payload.size;
    }
  },
  actions: {
    toggleEditorPane(context, payload) {
      if (payload.paneName == 'input') {
        if (context.getters.outputPaneSize.active > 0) {
          //Input Editor ist offen, kann geschlossen werden, Größe merken.
          context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: parseInt(payload.nowSize)})
          context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: 0 });
          context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: 100 - parseInt(payload.nowSize) })
          context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 100 });
        } else {
          //Output Editor ist geschlossen, muss geöffnet werden.
          context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: context.getters.outputPaneSize.last })
          context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: context.getters.inputPaneSize.last })
        }
      } else {
        if (context.getters.inputPaneSize.active > 0) {
          //Output Editor ist offen, kann geschlossen werden, Größe merken.
          context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: parseInt(payload.nowSize) })
          context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 0 })
          context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: 100 - parseInt(payload.nowSize) })
          context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: 100 });
        } else {
          //Input Editor ist geschlossen, muss geöffnet werden.
          context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: context.getters.inputPaneSize.last })
          context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: context.getters.outputPaneSize.last })
        }
      }



    }
  },
  modules: {
  }
})
