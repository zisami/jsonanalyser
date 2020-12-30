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
                    orig: 25,
                    last: 25,
                    active: 25
                }
            },
            editors: {
                size:
                {
                    orig: 75,
                    last: 75,
                    active: 75
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
        },
        resetPaneSize(_state, _paneName) {
            console.log(_state.splitPanes[_paneName].size.active);
            _state.splitPanes[_paneName].size.active =  _state.splitPanes[_paneName].size.orig;
            _state.splitPanes[_paneName].size.last =  _state.splitPanes[_paneName].size.orig;
        },
        loadUI(_state) {
            if (localStorage.getItem('UI')) {
                _state.splitPanes = JSON.parse(localStorage.getItem('UI'));
            }
        }
    },
    actions: {
        onResizedFilter(_context, _payload) {
            _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'active', size: parseInt(_payload.nowSize) })
            _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'last', size: parseInt(_payload.nowSize) })
            _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'active', size: 100 - parseInt(_payload.nowSize) })
            _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) })

        }, 
        onResizedInput(_context, _payload) {
            _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: parseInt(_payload.nowSize) })
            _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: parseInt(_payload.nowSize) })
            _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 100 - parseInt(_payload.nowSize) })
            _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) })

        },
        toggleEditorPane(_context, _payload) {
            const outputSize = _context.getters.outputPaneSize
            const inputSize = _context.getters.inputPaneSize
            console.log(_payload.paneName);
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
        },
        toggleFilterPane(_context, _payload) {
            const filterSize = _context.getters.filterPaneSize
            const editorsSize = _context.getters.editorsPaneSize

            if (_payload.paneName == 'filter') {

                if (filterSize.active > 0) {
                    //Filterquerys sind offen, kann geschlossen werden, Größe merken.
                    _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'last', size: parseInt(_payload.nowSize) })
                    _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'active', size: 0 });
                    _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) })
                    _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'active', size: 100 });
                } else {
                    //Editoren sind geschlossen, muss geöffnet werden.
                    _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'active', size: editorsSize.last })
                    _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'active', size: filterSize.last })
                }
            }
        },
        resetUI(_context){
            _context.commit('resetPaneSize', 'filter');
            _context.commit('resetPaneSize', 'editors');
            _context.commit('resetPaneSize', 'input');
            _context.commit('resetPaneSize', 'output');
        },
    }
}