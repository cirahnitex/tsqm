import iohook from "iohook";

const keyStates = new Map<number, boolean>();

iohook.addListener("keydown", e=>{
    keyStates.set(e.rawcode, true);
});

iohook.addListener("keyup", e=>{
    keyStates.set(e.rawcode, false);
});

iohook.addListener("mousedown", e=>{
    keyStates.set(-e.button, true);
});

iohook.addListener("mouseup", e=>{
    keyStates.set(-e.button, false);
});

export function isKeyDown(key:number):boolean {
    return keyStates.get(key) === true;
}
