
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
        liveQuerys:{},
    },

    getters: {
        allQuerys: (_state) => { return _.map(_state.allQuerys, (q) => { return q }) },
        getQueryList: (_state) => (_list) =>{ return _.map(_state[_list], (q) => { return q }) },
        //selected: (_state) => { return _state.allQuerys.filter((query => { return query.selected })); },
        selected: (_state) => {
            const selected = _.filter(_state.allQuerys, 'selected')
            return selected.length > 0 ? selected[0] : '';
        },
        result: (_state) => (_payload) => {
            console.log('_payload',_payload);
            if (_payload?.query?.id) {
                const list =  _state[_payload.list]
                console.log(_payload.query.id);
                console.log(list[_payload.query.id]);


                const queryToEcecute = _state[_payload.list][_payload.query.id];
                //Ausfühbare Query mit Errorhandling erstellen
                const execute = new Function('data', `try{${queryToEcecute.queryString}}catch(e){return {error: {message: e.message,fileName: e.fileName,lineNumber: e.lineNumber}}}`)
                //Query ausführen
                let result = execute(window.inputData)
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

            let newQuery = {
                id: typeof _payload.query.id !== 'undefined' && uuidValidateV4(_payload.query.id) ? _payload.query.id : UUID4(),
                resultKey: typeof _payload.query.resultKey !== 'undefined' ? _payload.query.resultKey : '\u{1F4BD}',
                queryString: typeof _payload.query.queryString !== 'undefined' ? _payload.query.queryString : `let result = memorySizeOf(data)\nreturn result;`,
                type: typeof _payload.query.type !== 'undefined' ? _payload.query.type : 'query',
            }
            console.log('_state[_payload.list]',_state[_payload.list]);
            _state[_payload.list] = {..._state[_payload.list], [newQuery.id]:newQuery };
        },

        setInputData(_state, _payload) {
            _state.inputData = _payload
        },

        remove(_state, _payload) {
            if (_payload && _payload.id) {
                Vue.delete(_state.allQuerys, _payload.id)
            }
        },

        /**
         * Deselektiert alle Elemente
         */
        unselect(_state) {
            for (const item in _state.allQuerys) {
                _state.allQuerys[item].selected = false;
            }
        },

        select(_state, _payload) {
            // Vue.set(_state.allQuerys[_payload.id], 'selected', true)
            _state.allQuerys[_payload.id] = { ..._state.allQuerys[_payload.id], 'selected': true }
        },
    },

    actions: {
        add(_context, _payload) {
            if (!_payload) {
                _payload = {query:{},list:'liveQuerys'};
            }
            _context.commit('add', _payload)
        },
        remove(_context, _payload) {
            if (!_payload) {
                _payload = {};
            }
            _context.commit('remove', _payload)
        },
        removeSelected(_context) {
            const selected = _context.getters.selected
            if (selected) {
                _context.commit('remove', selected)
            }

        },
        unselect(_context) {
            _context.commit('unselect')
        },
        select(_context, _payload) {
            if (!_payload) {
                _payload = {};
            }
            _context.commit('unselect')
            _context.commit('select', _payload)
        },
        setInputData(_context, _payload) {
            if (_payload) {
                _context.commit('setInputData', _payload)
            }
        },
        listResults(_context) {
            const listResults = {};
            for (const query in _context.state.allQuerys) {
                if (Object.hasOwnProperty.call(_context.state.allQuerys, query)) {
                    const element = _context.state.allQuerys[query];
                    listResults[element.resultKey] = _context.getters.result(element)
                }
            }
            return listResults;
        },
    }
}