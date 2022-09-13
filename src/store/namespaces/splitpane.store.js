export default {
    state: {
        splitPanes: {
            input: {
                size: {
                    orig: 50,
                    last: 50,
                    active: 100,
                },
            },
            output: {
                size: {
                    orig: 50,
                    last: 50,
                    active: 0,
                },
            },
            filter: {
                size: {
                    orig: 30,
                    last: 30,
                    active: 0,
                },
            },
            editors: {
                size: {
                    orig: 70,
                    last: 100,
                    active: 100,
                },
            },
        },
    },
    getters: {
        inputPaneSize: (_state) => {
            return _state?.splitPanes?.input?.size;
        },
        outputPaneSize: (_state) => {
            return _state?.splitPanes?.output?.size;
        },
        filterPaneSize: (_state) => {
            return _state?.splitPanes?.filter?.size;
        },
        editorsPaneSize: (_state) => {
            return _state?.splitPanes?.editors?.size;
        },
    },
    mutations: {
        setPaneSize(_state, _payload) {
            _state.splitPanes[_payload.paneName].size[_payload.sizeKey] = _payload.size;
        },
        resetPaneSize(_state, _paneName) {
            const size = _state.splitPanes[_paneName].size;
            size.active = size.orig;
            size.last = size.orig;
            console.log(_paneName, '\tActive:', size.active, '\tLast:', size.last, '\tOrig:', size.orig);
        },
        loadUI(_state) {
            if (!runningInSandbox()) {
                _state.splitPanes = JSON.parse(localStorage.getItem('UI'));
            }
            function runningInSandbox(){
                try {
                    localStorage.getItem('sandbox')
                } catch (error) {
                    return error.message.indexOf('sandbox') >= 0;
                }
                return false;
            }
        },
    },
    actions: {
        onResizedFilter(_context, _payload) {
            console.log('onResizedFilter ', _payload.paneName, parseInt(_payload.nowSize));
            _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'active', size: parseInt(_payload.nowSize) });
            _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'last', size: parseInt(_payload.nowSize) });

            _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'active', size: 100 - parseInt(_payload.nowSize) });
            _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) });
        },
        onResizedInput(_context, _payload) {
            console.log('onResizedInput ', _payload.paneName, parseInt(_payload.nowSize));

            const inputEditorWidth = parseInt(_payload.nowSize);
            _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: inputEditorWidth });
            _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: inputEditorWidth });

            _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 100 - inputEditorWidth });
            _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: 100 - inputEditorWidth });

            const inputSize = _context.getters.inputPaneSize.active;
            const outputSize = _context.getters.outputPaneSize.active;

            console.log('inputSize', inputSize);
            console.log('outputSize', outputSize);
        },
        toggleEditorPane(_context, _payload) {
            const outputSize = _context.getters.outputPaneSize;
            const inputSize = _context.getters.inputPaneSize;
            console.log(_payload);
            if (_payload.paneName == 'input') {
                if (outputSize.active > 0) {
                    //Input Editor ist offen, kann geschlossen werden, Größe merken.
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: parseInt(_payload.nowSize) });
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: 0 });
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: parseInt(100 - _payload.nowSize) });
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 100 });
                } else {
                    //Output Editor ist geschlossen, muss geöffnet werden.
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: outputSize.last });
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: inputSize.last });
                }
            } else {
                if (inputSize.active > 0) {
                    //Output Editor ist offen, kann geschlossen werden, Größe merken.
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'last', size: parseInt(_payload.nowSize) });
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: 0 });
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'last', size: parseInt(100 - _payload.nowSize) });
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: 100 });
                } else {
                    //Input Editor ist geschlossen, muss geöffnet werden.
                    _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: inputSize.last });
                    _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: outputSize.last });
                }
            }
        },
        openOutputPane(_context) {
            console.log('openOutputPane');
            const outputSize = _context.getters.outputPaneSize;
            const inputSize = _context.getters.inputPaneSize;

            _context.commit('setPaneSize', { paneName: 'output', sizeKey: 'active', size: outputSize.orig });
            _context.commit('setPaneSize', { paneName: 'input', sizeKey: 'active', size: inputSize.orig });
        },
        toggleFilterPane(_context, _payload) {
            const filterSize = _context.getters.filterPaneSize;
            const editorsSize = _context.getters.editorsPaneSize;

            if (_payload.paneName == 'filter') {
                if (filterSize.active > 0) {
                    //Filterquerys sind offen, kann geschlossen werden, Größe merken.
                    _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'last', size: parseInt(_payload.nowSize) });
                    _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'active', size: 0 });
                    _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'last', size: 100 - parseInt(_payload.nowSize) });
                    _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'active', size: 100 });
                } else {
                    //Editoren sind geschlossen, muss geöffnet werden.
                    _context.commit('setPaneSize', { paneName: 'editors', sizeKey: 'active', size: editorsSize.last });
                    _context.commit('setPaneSize', { paneName: 'filter', sizeKey: 'active', size: filterSize.last });
                }
            }
        },
        resetUI(_context) {
            _context.commit('resetPaneSize', 'filter');
            _context.commit('resetPaneSize', 'editors');
            _context.commit('resetPaneSize', 'input');
            _context.commit('resetPaneSize', 'output');

            const inputSize = _context.getters.inputPaneSize.active;
            const outputSize = _context.getters.outputPaneSize.active;

            console.log('inputSize', inputSize);
            console.log('outputSize', outputSize);
        },
    },
};
