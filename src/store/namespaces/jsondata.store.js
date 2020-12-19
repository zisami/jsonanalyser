
export default {
    namespaced: true,
    state: {
        inputData: {},
        outputData: {},
    },

    getters: {
        inputData: (_state) => { return _state.inputData },
        outputData: (_state) => { return _state.outputData },
    },

    mutations: {
        setInputData(_state, _newJson) { _state.inputData = { ..._newJson } },
        setOutputData(_state, _newJson) { _state.outputData = { ..._newJson } },
    },

    actions: {
        setInputData(_context, _payload) {
            if (_payload) {
                _context.commit('setInputData', _payload)
            }
        },
        setOutputData(_context, _payload) {
            if (_payload) {
                console.log(_payload);
                _context.commit('setOutputData', _payload)
            }
        }
    },
}