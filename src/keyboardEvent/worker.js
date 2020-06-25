const FFI = require('ffi');

var user32 = new FFI.Library('user32', {
    'GetAsyncKeyState': [
        'int32', ['int32']
    ]
});

function resetAsyncKeyStates() {
    for (var i = 0; i < 255; ++i) {
        user32.GetAsyncKeyState(i);
    }
}

resetAsyncKeyStates();

const pressedKeys = new Set();

function handleKeydown(keycode) {
    process.send({type:"down", keycode})
}

function handleKeyup(keycode) {
    process.send({type:"up", keycode})
}

setInterval(()=>{
    for (var i = 0; i < 255; ++i) {
        var state = user32.GetAsyncKeyState(i);
        if (state !== 0) {
            if(!pressedKeys.has(i)) {
                pressedKeys.add(i);
                handleKeydown(i);
            }
        }
        else {
            if(pressedKeys.has(i)) {
                pressedKeys.delete(i);
                handleKeyup(i);
            }
        }
    }
}, 10);