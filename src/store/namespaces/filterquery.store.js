
//https://github.com/uuidjs/uuid
import { v4 as UUID4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import Input from '../../assets/js/inputJson'
function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
export default {
    namespaced: true,
    state: {
        allQuerys: {},
    },

    getters: {
        allQuerys: (_state) => { return _state.allQuerys },
        selected: (_state) => { return _state.allQuerys.filter((query => { return query.selected })); },
    },

    mutations: {
        /**
         * Erstellt ein neues Default Query Objekt und befüllt es
         * mit optional übergebenen Werten
         * @param {Object} _state 
         * @param {object} _payload //optonales Query Objekt
         */
        addQuery(_state, _payload) {
            let newQuery = {
                id: typeof _payload.id !== 'undefined' && uuidValidateV4(_payload.id) ? _payload.id : UUID4(),
                resultKey: typeof _payload.resultKey !== 'undefined' ? _payload.resultKey : '\u{1F4BD}',
                query: typeof _payload.query !== 'undefined' ? _payload.query : `let result = memorySizeOf(data)\nreturn result;`,
                type: typeof _payload.type !== 'undefined' ? _payload.type : 'query',
            }
            _state.allQuerys[newQuery.id] = newQuery;
        },
        result(_state, _id) {
            
            if (_id) {
                const queryToEcecute = _state.allQuerys[_id];
                console.log('result()', queryToEcecute.query)
                //Ausfühbare Query mit Errorhandling erstellen
                const execute = new Function('data', `try{${queryToEcecute.query}}catch(e){return {error: {message: e.message,fileName: e.fileName,lineNumber: e.lineNumber}}}`)
                //Query ausführen
                let result = execute(Input.lastJsonData)
                if (typeof result !== 'undefined') {

                    if (result['error']) {
                        result = '\u{1F41E} ' + result.error.message || '';
                    }
                } else {
                    //undefined Ergebnisse mit emoji kennzeichnen
                    result = '\u{1F630} undefined'
                }
                console.log('this.result', result)
                return result;
            }
        }

    },

    actions: {

    }
}