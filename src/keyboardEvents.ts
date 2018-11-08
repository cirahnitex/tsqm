import {ChildProcess, fork} from "child_process";
import TupleMap from "ts-json-key-map";

export interface ToWorkerMessage {
    type: "addKeyDownListener"|"addKeyUpListener";
    key: number;
}
export type FromWorkerMessage = ToWorkerMessage;
type Callback = ()=>any;
const keyDownListeners = new TupleMap<ToWorkerMessage, Callback[]>();

const getWorker = (()=>{
    let worker:ChildProcess|null = null;
    return ()=>{
        if(worker) return worker;
        worker = fork(__dirname+"/keyboardEventsWorker");
        worker.on("message",(m:FromWorkerMessage)=>{
            const listeners = keyDownListeners.get(m);
            if(listeners) listeners.forEach(cb=>cb());
        });
        return worker;
    }
})();

function addCommandListener(cmd:ToWorkerMessage, callback:Callback) {
    const listeners = keyDownListeners.get(cmd);
    if(listeners) {
        listeners.push(callback);
    }
    else {
        keyDownListeners.set(cmd, [callback]);
        getWorker().send(cmd);
    }
}

export function addKeyDownListener(key:number, callback:Callback) {
    addCommandListener({type:"addKeyDownListener",key}, callback);
}
export function addKeyUpListener(key:number, callback:Callback) {
    addCommandListener({type:"addKeyUpListener",key}, callback);
}