
//https://github.com/uuidjs/uuid
import { v4 as UUID4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import Vue from 'vue';
import _ from 'lodash';
import memorySizeOf from '../../assets/js/memorysize';
window.memorySizeOf = memorySizeOf;
console.log('Window.memorySizeOf ', window.memorySizeOf)



function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
export default {
    namespaced: true,
    state: {
        allQuerys: {},
        inputData: {},
        outputData: {}
    },

    getters: {
        allQuerys: (_state) => { return _.map(_state.allQuerys, (q) => { return q }) },
        //selected: (_state) => { return _state.allQuerys.filter((query => { return query.selected })); },
        selected: (_state) => { return _.filter(_state.allQuerys, 'selected'); },
        result: (_state) => (_payload) => {
            if (_payload.id) {
                console.log('_state.inputData', _state.inputData);
                const queryToEcecute = _state.allQuerys[_payload.id];
                console.log('queryToEcecute.query',queryToEcecute.queryString);
                //Ausfühbare Query mit Errorhandling erstellen
                const execute = new Function('data', `try{console.log('data',data);${queryToEcecute.queryString}}catch(e){return {error: {message: e.message,fileName: e.fileName,lineNumber: e.lineNumber}}}`)
                //Query ausführen
                console.log('window.inputData',window.inputData)
                console.log('execute',execute);
                let result = execute(window.inputData)
                console.log('this.result', result)
                if (typeof result !== 'undefined') {

                    if (result['error']) {
                        result = '\u{1F41E} ' + result.error.message || '';
                    }
                } else {
                    //undefined Ergebnisse mit emoji kennzeichnen
                    result = '\u{1F630} undefined'
                }
                console.log('this.result', result)
                console.log('resulttype?', typeof result);
                return result;
            }
        },
        inputData: (_state) => { return _state.inputData; },
    },

    mutations: {
        /**
         * Erstellt ein neues Default Query Objekt, 
         * befüllt es mit optional übergebenen Werten
         * fügt es der Queryliste Hinzu und gibt das Objekt zurück
         * @param {Object} _state 
         * @param {object} _payload //optonales Query Objek
         */
        add(_state, _payload) {

            let newQuery = {
                id: typeof _payload.id !== 'undefined' && uuidValidateV4(_payload.id) ? _payload.id : UUID4(),
                resultKey: typeof _payload.resultKey !== 'undefined' ? _payload.resultKey : '\u{1F4BD}',
                queryString: typeof _payload.query !== 'undefined' ? _payload.query : `let result = memorySizeOf(data)\nreturn result;`,
                type: typeof _payload.type !== 'undefined' ? _payload.type : 'query',
            }
            Vue.set(_state.allQuerys, newQuery.id, newQuery)
            return _state.allQuerys[newQuery.id];
        },

        setInputData(_state, _payload) {
            console.log('setInputData', _payload);
            _state.inputData = _payload
        },
        // remove(_state, _payload){

        // }


    },

    actions: {
        add(_context, _payload) {
            if (!_payload) {
                _payload = {};
            }
            _context.commit('add', _payload)
        },

        setInputData(_context, _payload) {
            if (_payload) {
                _context.commit('setInputData', _payload)
            }
        }
    }
}