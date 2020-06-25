import {ChildProcess, fork} from "child_process";
import {Message} from "./Message";
type Callback = ()=>any;

const keyDownListeners = new Map<number, Callback[]>();
const keyUpListeners = new Map<number, Callback[]>();

let worker:ChildProcess|null = null;


function handleWorkerMessage(e:Message) {
    const listenerMap = (()=>{
        if(e.type==='down') return keyDownListeners;
        if(e.type==='up') return keyUpListeners;
        throw new Error("unknown keyboard event message type: " + e.type);
    })();

    const listeners = listenerMap.get(e.keycode);
    if(!listeners) return;
    for(const listener of listeners) {
        listener();
    }
}
function startWorker() {
    if(worker != null) return;
    worker = fork(__dirname+"/worker");
    worker.on("message", handleWorkerMessage);
}
function stopWorker() {
    if(worker == null) return;
    worker.off('message', handleWorkerMessage);
    worker.kill();
    worker = null;
}

function cleanupWorkerIfNoListeners() {
    if(keyDownListeners.size === 0 && keyUpListeners.size === 0) stopWorker();
}

let _cleanupTimer:any = null;
function cleanupWorkerOnNextTick() {
    if(_cleanupTimer != null) return;
    _cleanupTimer = setImmediate(()=>{
        _cleanupTimer = null;
        cleanupWorkerIfNoListeners();
    });
}

export function addKeyDownListener(key:number, callback:Callback) {
    startWorker();
    let listeners = keyDownListeners.get(key);
    if(listeners == null) {
        listeners = [];
        keyDownListeners.set(key, listeners);
    }
    if(!listeners.includes(callback)) listeners.push(callback);
}
export function addKeyUpListener(key:number, callback:Callback) {
    startWorker();
    let listeners = keyUpListeners.get(key);
    if(listeners == null) {
        listeners = [];
        keyUpListeners.set(key, listeners);
    }
    if(!listeners.includes(callback)) listeners.push(callback);
}

export function removeKeyDownListener(key:number, callback:Callback) {
    const listeners = keyDownListeners.get(key);
    if(listeners == null) return;
    const idx = listeners.indexOf(callback);
    if(idx < 0) return;
    if(listeners.length === 1) {
        keyDownListeners.delete(key);
        cleanupWorkerOnNextTick();
    }
    else listeners.splice(idx, 1);
}

export function removeKeyUpListener(key:number, callback:Callback) {
    const listeners = keyUpListeners.get(key);
    if(listeners == null) return;
    const idx = listeners.indexOf(callback);
    if(idx < 0) return;
    if(listeners.length === 1) {
        keyUpListeners.delete(key);
        cleanupWorkerOnNextTick();
    }
    else listeners.splice(idx, 1);
}

export function removeKeyDownListeners(key:number) {
    keyDownListeners.delete(key);
    cleanupWorkerOnNextTick();
}
export function removeKeyUpListeners(key:number) {
    keyUpListeners.delete(key);
    cleanupWorkerOnNextTick();
}
export function removeAllKeyListeners() {
    keyDownListeners.clear();
    keyUpListeners.clear();
    cleanupWorkerOnNextTick();
}
