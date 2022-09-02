import memorySizeOf from '../../assets/js/memorysize';
function countDataPoints(data) {
    return JSON.stringify(data).match(/(,|\}|\])/g).length;
}
export default {
    namespaced: true,
    state: {
        inputData: {},
        outputData: {},
    },

    getters: {
        inputData: (state) => { return state.inputData },
        outputData: (state) => { return state.outputData },
        inputDataSize: (state) => { return memorySizeOf(state.inputData) },
        outputDataSize: (state) => { return memorySizeOf(state.outputData) },
        inputDataCount: (state)  => { return countDataPoints(state.inputData)},
        outputDataCount: (state) => { return countDataPoints(state.outputData) },
    },

    mutations: {
        setInputData(state, newJson) { state.inputData = newJson  },
        setOutputData(state, newJson) { state.outputData = newJson },
    },

    actions: {
        setInputData(context, payload) {
            if (payload) {
                context.commit('setInputData', payload)
            }else{
                context.commit('setInputData', {Tipp: "You can paste data from your clipboard by pressing Ctrl+V"})
            }
        },
        setOutputData(context, payload) {
            if (payload) {
                context.commit('setOutputData', payload)
            }
        }
    },
}