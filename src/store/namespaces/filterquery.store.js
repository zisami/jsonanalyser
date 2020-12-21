
//https://github.com/uuidjs/uuid
import { v4 as UUID4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import Vue from 'vue';
import _ from 'lodash';
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
    },

    getters: {
        allQuerys: (_state) => { return _.map(_state.allQuerys, (q) => { return q }) },
        getQueryList: (_state) => (_list) => { console.log(_list); return _.map(_state[_list], (q) => { return q }) },
        //selected: (_state) => { return _state.allQuerys.filter((query => { return query.selected })); },
        selected: (_state) => (_list) => {
            const selected = _.filter(_state[_list], 'selected')
            return selected.length > 0 ? selected[0] : '';
        },
        result: (_state, _getters, _rootState) => (_payload) => {
            // console.log('_payload',_payload);
            if (_payload?.query?.id) {
                // const list =  _state[_payload.list]
                // console.log(_payload.query.id);
                // console.log(list[_payload.query.id]);


                const queryToEcecute = _state[_payload.list][_payload.query.id];
                //Ausfühbare Query mit Errorhandling erstellen
                const execute = new Function('data', `try{${queryToEcecute.queryString}}catch(e){return {error: {message: e.message,fileName: e.fileName,lineNumber: e.lineNumber}}}`)
                //Query ausführen
                let result = execute(_rootState.JsonData.inputData)
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
        queryToEdit: (_state) => {
            if (!_state.queryToEdit) {
                return false;
            } else {
                return _state.queryToEdit;
            }
        }
    },

    mutations: {
        /**
         * Erstellt ein neues Default Query Objekt, 
         * befüllt es mit optional übergebenen Werten
         * fügt es der Queryliste Hinzu
         * @param {Object} _state 
         * @param {object} _payload //optonales Query Objek
         */
        add(_state, _payload) {
            if (!_payload.list) {
                //Live Querys als Default Liste
                _payload.list = "liveQuerys"
            }
            //Neue Query anlegen/vervollständigen
            let newQuery = {
                id: typeof _payload.query.id !== 'undefined' && uuidValidateV4(_payload.query.id) ? _payload.query.id : UUID4(),
                resultKey: typeof _payload.query.resultKey !== 'undefined' ? _payload.query.resultKey : '\u{1F4BD}',
                queryString: typeof _payload.query.queryString !== 'undefined' ? _payload.query.queryString : `let result = memorySizeOf(data)\nreturn result;`,
                type: typeof _payload.query.type !== 'undefined' ? _payload.query.type : 'query',
                edit: typeof _payload.query.edit !== 'undefined' ? _payload.query.edit : true,
            }
            
            if (newQuery.edit) {
                //Entweder bearbeiten
                _state.queryToEdit = newQuery
            } else {
                //oder in Liste speichern.
                _state[_payload.list] = { ..._state[_payload.list], [newQuery.id]: newQuery };
            }
            

        },

        clearQueryToEdit(_state) {
            _state.queryToEdit = ''
        },

        remove(_state, _payload) {
            console.log(_payload);
            if (_payload?.query?.id) {
                Vue.delete(_state[_payload.list], _payload.query.id)
            }
        },

        /**
         * Deselektiert alle Elemente
         */
        unselect(_state, _payload) {
            for (const item in _state[_payload.list]) {
                _state[_payload.list][item].selected = false;
            }
        },

        select(_state, _payload) {
            console.log(_payload);
            _state[_payload.list][_payload.query.id] = { ..._state[_payload.list][_payload.query.id], 'selected': true }
        },
    },

    actions: {
        add(_context, _payload) {
            if (!_payload) {
                _payload = { query: {}, list: 'liveQuerys' };
            }
            _context.commit('add', _payload)
            _context.dispatch('listResults')
        },
        remove(_context, _payload) {
            if (!_payload) {
                _payload = {};
            }
            _context.commit('remove', _payload)
        },
        removeSelected(_context, _list) {
            console.log(_list);
            const selected = _context.getters.selected(_list.list)
            if (selected) {
                _context.commit('remove', { query: selected, list: _list.list })
            }

        },
        unselect(_context, _payload) {
            _context.commit('unselect', _payload)
        },
        select(_context, _payload) {
            if (!_payload) {
                _payload = {};
            }
            _context.commit('unselect', _payload)
            _context.commit('select', _payload)
        },
        clearQueryToEdit(_context) {
                _context.commit('clearQueryToEdit')
        },
        listResults(_context) {
            const list = _context.rootState.FilterQuerys.liveQuerys;
            const listResults = {};
            for (const query in list) {
                if (Object.hasOwnProperty.call(list, query)) {
                    const element = list[query];
                    listResults[element.resultKey] = _context.getters.result({ query: element, list: 'liveQuerys' })
                }
            }
            _context.dispatch('JsonData/setOutputData', listResults, { root: true })
            //_context.rootState.JsonData.outputData = {...listResults};
        },
    }
}