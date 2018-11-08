import * as robot from "robot-js";
import {ToWorkerMessage} from "./keyboardEvents";

class Listener {
    static KEY_DOWN_LISTENER = Symbol();
    static KEY_UP_LISTENER = Symbol();
    key: number;
    callback: () => void;
    type: symbol;

    constructor(key: number, callback: () => void, type: symbol) {
        this.key = key;
        this.callback = callback;
        this.type = type;
    }

    isActive(keyStates: Record<number, boolean>) {
        const isDown = keyStates[this.key];
        return this.type===Listener.KEY_DOWN_LISTENER?isDown:!isDown;
    }

}

const listeners:Listener[] = [];
const isActiveOnPreviousTick = new WeakMap<Listener, boolean>();

function addKeyDownListener(key:number, callback:()=>void) {
    listeners.push(new Listener(key, callback, Listener.KEY_DOWN_LISTENER));
}


function addKeyUpListener(key:number, callback:()=>void) {
    listeners.push(new Listener(key, callback, Listener.KEY_UP_LISTENER));
}

function daemonTask() {
    const keyStates = {...robot.Keyboard.getState(),...robot.Mouse.getState()};
    for(const listener of listeners) {
        const isActive = listener.isActive(keyStates);
        if(!isActiveOnPreviousTick.get(listener) && isActive) listener.callback();
        isActiveOnPreviousTick.set(listener, isActive);
    }
}

daemonTask();
setInterval(daemonTask, 10);

process.on("message", (m:ToWorkerMessage)=>{
    if(m.type === "addKeyDownListener") {
        addKeyDownListener(m.key, ()=>process.send!(m));
    }
    else if(m.type === "addKeyUpListener") {
        addKeyUpListener(m.key, ()=>process.send!(m));
    }
});