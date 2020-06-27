import {captureScreen, getScreenSize} from "./screen";
import {getMousePos} from "./mouse";
import {keyPress, typeString} from "./keyboardInput";
import {KEY_A} from "./keycodes";
import {addKeyDownListener} from "./keyboardEvent";
import {addActiveWindowChangeListener, removeActiveWindowChangeListener} from "./activeWindowEvent";

function handleWindowChange(r:any) {
    console.log(r.title);
}

addActiveWindowChangeListener(handleWindowChange);

setTimeout(()=>{
    removeActiveWindowChangeListener(handleWindowChange);
}, 1000);