import iohook from "iohook";


type Callback = ()=>any;

const keyDownListenersStorage = new Map<number, Callback[]>();
const keyUpListenersStorage = new Map<number, Callback[]>();

function triggerListeners(key:number, storage:Map<number, Callback[]>) {
    const listeners = storage.get(key);
    if(listeners == null) return;
    for(const listener of listeners) {
        listener();
    }
}

iohook.addListener("keydown", e=>{
    triggerListeners(e.rawcode, keyDownListenersStorage);
});

iohook.addListener("keyup", e=>{
    triggerListeners(e.rawcode, keyUpListenersStorage);
});

iohook.addListener("mousedown", e=>{
    triggerListeners(-e.button, keyDownListenersStorage);
});

iohook.addListener("mouseup", e=>{
    triggerListeners(-e.button, keyUpListenersStorage);
});

function addKeyListener(key:number, callback:Callback, storage:Map<number, Callback[]>) {
    const listeners = storage.get(key);
    if(listeners == null) storage.set(key, [callback]);
    else if(!listeners.includes(callback)) listeners.push(callback);
}

export function addKeyDownListener(key:number, callback:Callback) {
    addKeyListener(key, callback, keyDownListenersStorage);
}
export function addKeyUpListener(key:number, callback:Callback) {
    addKeyListener(key, callback, keyUpListenersStorage);
}

function removeKeyListener(key:number, callback:Callback, storage:Map<number, Callback[]>) {
    const listeners = storage.get(key);
    if(listeners == null) return;
    const index = listeners.indexOf(callback);
    if(index < 0) return;
    listeners.splice(index, 1);
}

export function removeKeyDownListener(key:number, callback:Callback) {
    removeKeyListener(key, callback, keyDownListenersStorage);
}
export function removeKeyUpListener(key:number, callback:Callback) {
    removeKeyListener(key, callback, keyUpListenersStorage);
}

export function removeKeyListeners(key:number) {
    keyUpListenersStorage.delete(key);
    keyDownListenersStorage.delete(key);
}
