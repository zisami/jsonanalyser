
//https://github.com/uuidjs/uuid
import { v4 as UUID4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import Vue from 'vue';
import _ from 'lodash';
import moment from 'moment'
window.moment = moment;
import memorySizeOf from '../../assets/js/memorysize';
window.memorySizeOf = memorySizeOf;



function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
export default {
    namespaced: true,
    state: {
        allQuerys: {},
        liveQuerys: {},
        queryToEdit: "",
        showSavedQuerys: false,
    },

    getters: {
        allQuerys: (state) => { return _.map(state.allQuerys, (q) => { return q }) },
        getQueryList: (state) => (list) => { return _.map(state[list], (q) => { return q }) },
        selected: (state) => (list) => {
            const selected = _.filter(state[list], 'selected')
            return selected.length > 0 ? selected[0] : '';
        },
        result: (state, getters, rootState) => (payload) => {

            if (payload?.query?.id) {
                let queryToEcecute
                if (payload.list) {
                    queryToEcecute = state[payload.list][payload.query.id];
                } else {
                    queryToEcecute = payload.query;
                }

                //Ausfühbare Query mit Errorhandling erstellen
                const execute = new Function('data', `try{${queryToEcecute.queryString}}catch(e){return {error: {message: e.message,fileName: e.fileName,lineNumber: e.lineNumber}}}`)
                //Query ausführen
                let result = execute(rootState.JsonData.inputData)
                if (typeof result !== 'undefined') {

                    if (result['error']) {
                        result = '\u{1F41E} ' + result.error.message || '';
                    }
                } else {
                    //undefined Ergebnisse mit emoji kennzeichnen
                    result = '\u{1F630} undefined'
                }
                return result;
            }
        },
        queryToEdit: (state) => {
            if (!state.queryToEdit) {
                return false;
            } else {
                return state.queryToEdit;
            }
        },
        showSavedQuerys: (state) => { return state.showSavedQuerys },
    },

    mutations: {
        /**
         * Erstellt ein neues Default Query Objekt, 
         * befüllt es mit optional übergebenen Werten
         * fügt es der Queryliste Hinzu
         * @param {Object} state 
         * @param {object} payload //optonales Query Objek
         */
        add(state, payload) {
            if (!payload.list) {
                //Live Querys als Default Liste
                payload.list = "liveQuerys"
            }
            //Neue Query anlegen/vervollständigen
            let newQuery = {
                id: typeof payload.query.id !== 'undefined' && uuidValidateV4(payload.query.id) ? payload.query.id : UUID4(),
                description: typeof payload.query.description !== 'undefined' ? payload.query.description : '',
                resultKey: typeof payload.query.resultKey !== 'undefined' ? payload.query.resultKey : '\u{1F4BD}',
                queryString: typeof payload.query.queryString !== 'undefined' ? payload.query.queryString : `let result = memorySizeOf(data)\nreturn result;`,
                type: typeof payload.query.type !== 'undefined' ? payload.query.type : 'query',
                edit: typeof payload.query.edit !== 'undefined' ? payload.query.edit : true,
                listTosave: payload.list,
                time: moment()
            }

            if (newQuery.edit) {
                //Entweder bearbeiten
                state.queryToEdit = newQuery
            } else {
                //oder in Liste speichern.
                state[payload.list] = { ...state[payload.list], [newQuery.id]: newQuery };
            }


        },

        clearQueryToEdit(state) {
            state.queryToEdit = ''
        },
        setQueryToEdit(state, query) {
            state.queryToEdit = query
        },
        remove(state, payload) {
            if (payload?.query?.id) {
                Vue.delete(state[payload.list], payload.query.id)
            }
        },

        /**
         * Deselektiert alle Elemente
         */
        unselect(state, payload) {
            for (const item in state[payload.list]) {
                state[payload.list][item].selected = false;
            }
        },

        select(state, payload) {
            state[payload.list][payload.query.id] = { ...state[payload.list][payload.query.id], 'selected': true }
        },
        removeAll(state, list) {
            state[list] = {};
        },
        toggleSavedQuerys(state) {
            state.showSavedQuerys = !state.showSavedQuerys;
        },
        loadSavedQuerys(state) {
            if (!runningInIframe()) {
                if (localStorage.getItem('allQuerys')) {
                    state.allQuerys = JSON.parse(localStorage.getItem('allQuerys'));
                }
            }
            function runningInIframe(){
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            }
        }
    },

    actions: {
        add(context, payload) {
            if (!payload) {
                payload = { query: {}, list: 'liveQuerys' };
            } else if (payload.query?.resultKey === '') {
                payload.query.resultKey = 'result';
            }
            context.commit('add', payload)
            context.dispatch('listResults')
        },
        remove(context, payload) {
            if (!payload) {
                payload = {};
            }
            context.commit('remove', payload)
        },
        removeSelected(context, list) {
            const selected = context.getters.selected(list.list)
            if (selected) {
                context.commit('remove', { query: selected, list: list.list })
            }
            context.dispatch('listResults');

        },
        editSelected(context, list) {
            const selected = context.getters.selected(list.list)
            if (selected) {
                context.commit('setQueryToEdit', selected)
            }

        },
        unselect(context, payload) {
            context.commit('unselect', payload)
        },
        select(context, payload) {
            if (!payload) {
                payload = {};
            }
            context.commit('unselect', payload)
            context.commit('select', payload)
        },
        clearQueryToEdit(context) {
            context.commit('clearQueryToEdit')
        },
        listResults(context) {
            const list = context.rootState.FilterQuerys.liveQuerys;
            const listResults = {};
            for (const query in list) {
                if (Object.hasOwnProperty.call(list, query)) {
                    const element = list[query];
                    let counter = 0;
                    let key = element.resultKey;
                    while (Object.hasOwnProperty.call(listResults, key)) {
                        key = element.resultKey;
                        counter++;
                        key = key + '-' + counter;
                    }
                    listResults[key] = context.getters.result({ query: element, list: 'liveQuerys' })
                }
            }
            context.dispatch('JsonData/setOutputData', listResults, { root: true })
            //context.rootState.JsonData.outputData = {...listResults};
        },
        removeAll(context, list) {
            context.commit('removeAll', list);
            context.dispatch('listResults');
        },
        toggleSavedQuerys(context) {
            context.commit('toggleSavedQuerys');
        },
        exportList(context, list) {
            const expotData = { querys: context.rootGetters['FilterQuerys/getQueryList'](list) }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expotData), null, 2);
            let downLoadElement = document.createElement('a');
            downLoadElement.style.display = 'none';
            downLoadElement.href = dataStr;
            downLoadElement.download = `${list || 'Liste'}.json`;
            downLoadElement.click();
        },
        exportSelectedQuery(context, list) {
            const elementToExport = { querys: [context.rootGetters['FilterQuerys/selected'](list)] };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elementToExport), null, 2);
            let downLoadElement = document.createElement('a');
            downLoadElement.style.display = 'none';
            downLoadElement.href = dataStr;
            downLoadElement.download = `${elementToExport.resultKey || 'Query'}.json`;
            downLoadElement.click();
        },
    }
}