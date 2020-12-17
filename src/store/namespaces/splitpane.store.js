export default {
    state: {

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
                    active: 50
                }
            },
            editors: {
                size:
                {
                    orig: 50,
                    last: 50,
                    active: 50
                },

            },

        }

    },
    getters: {

        inputPaneSize: _state => { return _state.splitPanes.input.size },
        outputPaneSize: _state => { return _state.splitPanes.output.size },
        filterPaneSize: _state => { return _state.splitPanes.filter.size },
        editorsPaneSize: _state => { return _state.splitPanes.editors.size },
    },
    mutations: {
        setPaneSize(_state, _payload) {
            _state.splitPanes[_payload.paneName].size[_payload.sizeKey] = _payload.size;
        }
    },
    actions: {
        toggleEditorPane(_context, _payload) {
            const outputSize = _context.getters.outputPaneSize
            const inputSize = _context.getters.inputPaneSize
            if (_payload.paneName == 'input') {
                
                if (outputSize.active > 0) {
                    //Input Editor ist offen, kann geschlossen werden, Größe merken.
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: parseInt(_payload.nowSize) })
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: 0 });
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) })
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 100 });
                } else {
                    //Output Editor ist geschlossen, muss geöffnet werden.
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: outputSize.last })
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: inputSize.last })
                }
            } else {
                
                if (inputSize.active > 0) {
                    //Output Editor ist offen, kann geschlossen werden, Größe merken.
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: parseInt(_payload.nowSize) })
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 0 })
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) })
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: 100 });
                } else {
                    //Input Editor ist geschlossen, muss geöffnet werden.
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: inputSize.last })
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: outputSize.last })
                }
            }



        }
    }
}