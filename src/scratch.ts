import {captureScreen, getScreenSize} from "./screen";
import {getMousePos} from "./mouse";
import {keyPress} from "./keyboardInput";
import {KEY_A} from "./keycodes";

const start = Date.now();
console.log(getScreenSize());
const end = Date.now();
console.log('time elapsed: ', end - start);