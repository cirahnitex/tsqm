import iohook from "iohook";


type Callback = ()=>any;

const keyStates = new Set<number>();

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
    if(keyStates.has(e.rawcode)) return;
    keyStates.add(e.rawcode);
    triggerListeners(e.rawcode, keyDownListenersStorage);
});

iohook.addListener("keyup", e=>{
    keyStates.delete(e.rawcode);
    triggerListeners(e.rawcode, keyUpListenersStorage);
});

iohook.addListener("mousedown", e=>{
    if(keyStates.has(-e.button)) return;
    keyStates.add(-e.button);
    triggerListeners(-e.button, keyDownListenersStorage);
});

iohook.addListener("mouseup", e=>{
    keyStates.delete(-e.button);
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

export function isKeyDown(key:number):boolean {
    return keyStates.has(key);
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

export function removeKeyListeners(key?:number) {
    if(key == null) {
        keyUpListenersStorage.clear();
        keyDownListenersStorage.clear();
    }
    else {
        keyUpListenersStorage.delete(key);
        keyDownListenersStorage.delete(key);
    }

}