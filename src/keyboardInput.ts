import ffi from "ffi";
import ref from "ref";
import StructType from "ref-struct";
import {MOUSE_LEFT, MOUSE_MIDDLE, MOUSE_RIGHT, MOUSE_X1, MOUSE_X2} from "./keycodes";
import {
    mouseLeftDown,
    mouseLeftUp,
    mouseMiddleDown, mouseMiddleUp,
    mouseRightDown,
    mouseRightUp,
    mouseX1Down, mouseX1Up,
    mouseX2Down, mouseX2Up
} from "./mouse";
const arch = require("os").arch();

const Input = StructType({
    "type": "int",

    // For some reason, the wScan value is only recognized as the wScan value when we add this filler slot.
    // It might be because it's expecting the values after this to be inside a "wrapper" substructure, as seen here:
    //     https://msdn.microsoft.com/en-us/library/windows/desktop/ms646270(v=vs.85).aspx
    "???": "int",

    "wVK": "short",
    "wScan": "short",
    "dwFlags": "int",
    "time": "int",
    "dwExtraInfo": "int64"
});

const user32 = new ffi.Library("user32", {
    SendInput: ["int", ["int", Input, "int"]],
    //MapVirtualKeyEx: ["uint", ["uint", "uint", intPtr]],
});

function ConvertKeyCodeToScanCode(keyCode: number) {
    let keys = "**1234567890-=**qwertyuiop[]**asdfghjkl;'`*\\zxcvbnm,./".split("");
    return keys.indexOf(String.fromCharCode(keyCode).toLowerCase());
}

const INPUT_KEYBOARD = 1;

const KEYEVENTF_EXTENDEDKEY = 0x0001;
const KEYEVENTF_KEYUP       = 0x0002;
const KEYEVENTF_UNICODE     = 0x0004;
const KEYEVENTF_SCANCODE    = 0x0008;

const MAPVK_VK_TO_VSC = 0;

const KEY_DOWN = 0;
const KEY_UP = KEYEVENTF_KEYUP;

function keyToggle(keyCode: number, type: number) {
    let entry = new Input();
    entry.type = INPUT_KEYBOARD;
    entry.time = 0;
    entry.dwExtraInfo = 0;

    entry.dwFlags = type;
    entry.wVK = keyCode;
    entry.wScan = 0;

    user32.SendInput(1, entry, arch === "x64" ? 40 : 28);
}

export function keyDown(keyCode: number) {
    if(keyCode === MOUSE_LEFT) mouseLeftDown();
    else if(keyCode === MOUSE_RIGHT) mouseRightDown();
    else if(keyCode === MOUSE_MIDDLE) mouseMiddleDown();
    else if(keyCode === MOUSE_X1) mouseX1Down();
    else if(keyCode === MOUSE_X2) mouseX2Down();
    else keyToggle(keyCode, KEY_DOWN);
}

export function keyUp(keyCode: number) {
    if(keyCode === MOUSE_LEFT) mouseLeftUp();
    else if(keyCode === MOUSE_RIGHT) mouseRightUp();
    else if(keyCode === MOUSE_MIDDLE) mouseMiddleUp();
    else if(keyCode === MOUSE_X1) mouseX1Up();
    else if(keyCode === MOUSE_X2) mouseX2Up();
    else keyToggle(keyCode, KEY_UP);
}

export function keyPress(keyCode: number) {
    keyDown(keyCode);
    keyUp(keyCode);
}