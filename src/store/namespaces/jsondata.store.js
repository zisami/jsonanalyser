import memorySizeOf from '../../assets/js/memorysize';
function countDataPoints(_data) {
    const data = JSON.stringify(_data)
    let index = 0;
    let count = 0;
    while (data[index]) {
        if (data[index] === ',') {
            count++;
        }
        index++;
    }
    if (count > 0) {
        //Das letzte
        count++;
    }
    return count
}
export default {
    namespaced: true,
    state: {
        inputData: {},
        outputData: {},
    },

    getters: {
        inputData: (_state) => { return _state.inputData },
        outputData: (_state) => { return _state.outputData },
        inputDataSize: (_state) => { return memorySizeOf(_state.inputData) },
        outputDataSize: (_state) => { return memorySizeOf(_state.outputData) },
        inputDataCount: (_state)  => { return countDataPoints(_state.inputData)},
        outputDataCount: (_state) => { return countDataPoints(_state.outputData) },
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
                _context.commit('setOutputData', _payload)
            }
        }
    },
}