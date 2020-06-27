import {ChildProcess, fork} from "child_process";
import {Result} from "active-win";
let worker: ChildProcess | null = null;
type Listener = (r:Result)=>any;

let listeners:Listener[] = [];

function handleWorkerMessage(r:Result) {
    for(const listener of listeners) {
        listener(r);
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
    if(listeners.length === 0) stopWorker();
}
let _cleanupTimer:any = null;
function cleanupWorkerOnNextTick() {
    if(_cleanupTimer != null) return;
    _cleanupTimer = setImmediate(()=>{
        _cleanupTimer = null;
        cleanupWorkerIfNoListeners();
    });
}


export function addActiveWindowChangeListener(listener:Listener) {
    startWorker();
    const idx = listeners.indexOf(listener);
    if(idx >= 0) return;
    listeners.push(listener);
}

export function removeActiveWindowChangeListener(listener:Listener) {
    const idx = listeners.indexOf(listener);
    if(idx < 0) return;
    if(listeners.length === 1) {
        listeners = [];
        cleanupWorkerOnNextTick();
    }
    else {
        listeners.splice(idx, 1);
    }
}