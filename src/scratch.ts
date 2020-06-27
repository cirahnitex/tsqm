import {captureScreen, getScreenSize} from "./screen";
import {getMousePos} from "./mouse";
import {keyPress, typeString} from "./keyboardInput";
import {KEY_A} from "./keycodes";
import {addKeyDownListener} from "./keyboardEvent";

addKeyDownListener(KEY_A, ()=>{
    typeString("Hello, World!")
});