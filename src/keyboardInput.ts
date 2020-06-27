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
import * as K from "./keycodes"

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

const charToKeyCode:Record<string, ()=>void> = {
    "0": ()=>keyPress(K.KEY_0),
    "1": ()=>keyPress(K.KEY_1),
    "2": ()=>keyPress(K.KEY_2),
    "3": ()=>keyPress(K.KEY_3),
    "4": ()=>keyPress(K.KEY_4),
    "5": ()=>keyPress(K.KEY_5),
    "6": ()=>keyPress(K.KEY_6),
    "7": ()=>keyPress(K.KEY_7),
    "8": ()=>keyPress(K.KEY_8),
    "9": ()=>keyPress(K.KEY_9),
    "!":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_1);keyUp(K.KEY_LSHIFT);},
    "@":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_2);keyUp(K.KEY_LSHIFT);},
    "#":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_3);keyUp(K.KEY_LSHIFT);},
    "$":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_4);keyUp(K.KEY_LSHIFT);},
    "%":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_5);keyUp(K.KEY_LSHIFT);},
    "^":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_6);keyUp(K.KEY_LSHIFT);},
    "&":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_7);keyUp(K.KEY_LSHIFT);},
    "*":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_8);keyUp(K.KEY_LSHIFT);},
    "(":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_9);keyUp(K.KEY_LSHIFT);},
    ")":()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_0);keyUp(K.KEY_LSHIFT);},
    "a": ()=>keyPress(K.KEY_A),
    "b": ()=>keyPress(K.KEY_B),
    "c": ()=>keyPress(K.KEY_C),
    "d": ()=>keyPress(K.KEY_D),
    "e": ()=>keyPress(K.KEY_E),
    "f": ()=>keyPress(K.KEY_F),
    "g": ()=>keyPress(K.KEY_G),
    "h": ()=>keyPress(K.KEY_H),
    "i": ()=>keyPress(K.KEY_I),
    "j": ()=>keyPress(K.KEY_J),
    "k": ()=>keyPress(K.KEY_K),
    "l": ()=>keyPress(K.KEY_L),
    "m": ()=>keyPress(K.KEY_M),
    "n": ()=>keyPress(K.KEY_N),
    "o": ()=>keyPress(K.KEY_O),
    "p": ()=>keyPress(K.KEY_P),
    "q": ()=>keyPress(K.KEY_Q),
    "r": ()=>keyPress(K.KEY_R),
    "s": ()=>keyPress(K.KEY_S),
    "t": ()=>keyPress(K.KEY_T),
    "u": ()=>keyPress(K.KEY_U),
    "v": ()=>keyPress(K.KEY_V),
    "w": ()=>keyPress(K.KEY_W),
    "x": ()=>keyPress(K.KEY_X),
    "y": ()=>keyPress(K.KEY_Y),
    "z": ()=>keyPress(K.KEY_Z),
    "A": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_A);keyUp(K.KEY_LSHIFT);},
    "B": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_B);keyUp(K.KEY_LSHIFT);},
    "C": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_C);keyUp(K.KEY_LSHIFT);},
    "D": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_D);keyUp(K.KEY_LSHIFT);},
    "E": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_E);keyUp(K.KEY_LSHIFT);},
    "F": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_F);keyUp(K.KEY_LSHIFT);},
    "G": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_G);keyUp(K.KEY_LSHIFT);},
    "H": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_H);keyUp(K.KEY_LSHIFT);},
    "I": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_I);keyUp(K.KEY_LSHIFT);},
    "J": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_J);keyUp(K.KEY_LSHIFT);},
    "K": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_K);keyUp(K.KEY_LSHIFT);},
    "L": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_L);keyUp(K.KEY_LSHIFT);},
    "M": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_M);keyUp(K.KEY_LSHIFT);},
    "N": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_N);keyUp(K.KEY_LSHIFT);},
    "O": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_O);keyUp(K.KEY_LSHIFT);},
    "P": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_P);keyUp(K.KEY_LSHIFT);},
    "Q": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_Q);keyUp(K.KEY_LSHIFT);},
    "R": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_R);keyUp(K.KEY_LSHIFT);},
    "S": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_S);keyUp(K.KEY_LSHIFT);},
    "T": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_T);keyUp(K.KEY_LSHIFT);},
    "U": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_U);keyUp(K.KEY_LSHIFT);},
    "V": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_V);keyUp(K.KEY_LSHIFT);},
    "W": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_W);keyUp(K.KEY_LSHIFT);},
    "X": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_X);keyUp(K.KEY_LSHIFT);},
    "Y": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_Y);keyUp(K.KEY_LSHIFT);},
    "Z": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_Z);keyUp(K.KEY_LSHIFT);},
    "`": ()=>keyPress(K.KEY_GRAVE),
    "~": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_GRAVE);keyUp(K.KEY_LSHIFT);},
    "-": ()=>keyPress(K.KEY_MINUS),
    "_": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_MINUS);keyUp(K.KEY_LSHIFT);},
    "=": ()=>keyPress(K.KEY_EQUAL),
    "+": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_EQUAL);keyUp(K.KEY_LSHIFT);},
    "[": ()=>keyPress(K.KEY_LBRACKET),
    "{": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_LBRACKET);keyUp(K.KEY_LSHIFT);},
    "]": ()=>keyPress(K.KEY_RBRACKET),
    "}": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_RBRACKET);keyUp(K.KEY_LSHIFT);},
    "\\": ()=>keyPress(K.KEY_BACKSLASH),
    "|": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_BACKSLASH);keyUp(K.KEY_LSHIFT);},
    ";": ()=>keyPress(K.KEY_SEMICOLON),
    ":": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_SEMICOLON);keyUp(K.KEY_LSHIFT);},
    "'": ()=>keyPress(K.KEY_QUOTE),
    "\"": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_QUOTE);keyUp(K.KEY_LSHIFT);},
    ",": ()=>keyPress(K.KEY_COMMA),
    "<": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_COMMA);keyUp(K.KEY_LSHIFT);},
    ".": ()=>keyPress(K.KEY_PERIOD),
    ">": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_PERIOD);keyUp(K.KEY_LSHIFT);},
    "/": ()=>keyPress(K.KEY_SLASH),
    "?": ()=>{keyDown(K.KEY_LSHIFT);keyPress(K.KEY_SLASH);keyUp(K.KEY_LSHIFT);},

};

export function typeString(str: string) {
    for(const char of str) {
        const f = charToKeyCode[char];
        if(f) f();
    }
}