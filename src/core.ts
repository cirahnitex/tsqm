import * as robot from "robot-js";

export const MOUSE_LEFT = robot.BUTTON_LEFT as number;
export const MOUSE_RIGHT = robot.BUTTON_RIGHT as number;
export const MOUSE_MIDDLE = robot.BUTTON_MIDDLE as number;
export const MOUSE_X1 = robot.BUTTON_X1 as number;
export const MOUSE_X2 = robot.BUTTON_X2 as number;
const mouse = robot.Mouse(); mouse.autoDelay.min = 1; mouse.autoDelay.max = 2;
export function leftDown():void {mouse.press(MOUSE_LEFT)}
export function leftUp():void {mouse.release(MOUSE_LEFT)}
export function leftClick():void {mouse.click(MOUSE_LEFT)}

export function rightDown():void {mouse.press(MOUSE_RIGHT)}
export function rightUp():void {mouse.release(MOUSE_RIGHT)}
export function rightClick():void {mouse.click(MOUSE_RIGHT)}

export function middleDown():void {mouse.press(MOUSE_MIDDLE)}
export function middleUp():void {mouse.release(MOUSE_MIDDLE)}
export function middleClick():void {mouse.click(MOUSE_MIDDLE)}

export function scrollV(amount:number):void {mouse.scrollV(amount)}
export function scrollH(amount:number):void {mouse.scrollH(amount)}
export function scroll(amount:number):void  {mouse.scrollV(amount)}

export function getMousePos() {const t = robot.Mouse.getPos(); return [t.x, t.y]}
export function setMousePos(x:number, y:number) {return robot.Mouse.setPos(new robot.Point(x,y));}

export const KEY_SPACE = robot.KEY_SPACE as number;
export const KEY_ESCAPE = robot.KEY_ESCAPE as number;
export const KEY_TAB = robot.KEY_TAB as number;
export const KEY_ALT = robot.KEY_ALT as number;
export const KEY_CONTROL = robot.KEY_CONTROL as number;
export const KEY_LALT = robot.KEY_LALT as number;
export const KEY_LCONTROL = robot.KEY_LCONTROL as number;
export const KEY_RALT = robot.KEY_RALT as number;
export const KEY_RCONTROL = robot.KEY_RCONTROL as number;
export const KEY_SHIFT = robot.KEY_SHIFT as number;
export const KEY_SYSTEM = robot.KEY_SYSTEM as number;
export const KEY_LSHIFT = robot.KEY_LSHIFT as number;
export const KEY_LSYSTEM = robot.KEY_LSYSTEM as number;
export const KEY_RSHIFT = robot.KEY_RSHIFT as number;
export const KEY_RSYSTEM = robot.KEY_RSYSTEM as number;
export const KEY_F1 = robot.KEY_F1 as number;
export const KEY_F2 = robot.KEY_F2 as number;
export const KEY_F3 = robot.KEY_F3 as number;
export const KEY_F4 = robot.KEY_F4 as number;
export const KEY_F5 = robot.KEY_F5 as number;
export const KEY_F6 = robot.KEY_F6 as number;
export const KEY_F7 = robot.KEY_F7 as number;
export const KEY_F8 = robot.KEY_F8 as number;
export const KEY_F9 = robot.KEY_F9 as number;
export const KEY_F10 = robot.KEY_F10 as number;
export const KEY_F11 = robot.KEY_F11 as number;
export const KEY_F12 = robot.KEY_F12 as number;
export const KEY_0 = robot.KEY_0 as number;
export const KEY_1 = robot.KEY_1 as number;
export const KEY_2 = robot.KEY_2 as number;
export const KEY_3 = robot.KEY_3 as number;
export const KEY_4 = robot.KEY_4 as number;
export const KEY_5 = robot.KEY_5 as number;
export const KEY_6 = robot.KEY_6 as number;
export const KEY_7 = robot.KEY_7 as number;
export const KEY_8 = robot.KEY_8 as number;
export const KEY_9 = robot.KEY_9 as number;
export const KEY_A = robot.KEY_A as number;
export const KEY_B = robot.KEY_B as number;
export const KEY_C = robot.KEY_C as number;
export const KEY_D = robot.KEY_D as number;
export const KEY_E = robot.KEY_E as number;
export const KEY_F = robot.KEY_F as number;
export const KEY_G = robot.KEY_G as number;
export const KEY_H = robot.KEY_H as number;
export const KEY_I = robot.KEY_I as number;
export const KEY_J = robot.KEY_J as number;
export const KEY_K = robot.KEY_K as number;
export const KEY_L = robot.KEY_L as number;
export const KEY_M = robot.KEY_M as number;
export const KEY_N = robot.KEY_N as number;
export const KEY_O = robot.KEY_O as number;
export const KEY_P = robot.KEY_P as number;
export const KEY_Q = robot.KEY_Q as number;
export const KEY_R = robot.KEY_R as number;
export const KEY_S = robot.KEY_S as number;
export const KEY_T = robot.KEY_T as number;
export const KEY_U = robot.KEY_U as number;
export const KEY_V = robot.KEY_V as number;
export const KEY_W = robot.KEY_W as number;
export const KEY_X = robot.KEY_X as number;
export const KEY_Y = robot.KEY_Y as number;
export const KEY_Z = robot.KEY_Z as number;
export const KEY_GRAVE = robot.KEY_GRAVE as number;
export const KEY_MINUS = robot.KEY_MINUS as number;
export const KEY_EQUAL = robot.KEY_EQUAL as number;
export const KEY_BACKSPACE = robot.KEY_BACKSPACE as number;
export const KEY_LBRACKET = robot.KEY_LBRACKET as number;
export const KEY_RBRACKET = robot.KEY_RBRACKET as number;
export const KEY_BACKSLASH = robot.KEY_BACKSLASH as number;
export const KEY_SEMICOLON = robot.KEY_SEMICOLON as number;
export const KEY_QUOTE = robot.KEY_QUOTE as number;
export const KEY_RETURN = robot.KEY_RETURN as number;
export const KEY_COMMA = robot.KEY_COMMA as number;
export const KEY_PERIOD = robot.KEY_PERIOD as number;
export const KEY_SLASH = robot.KEY_SLASH as number;
export const KEY_LEFT = robot.KEY_LEFT as number;
export const KEY_UP = robot.KEY_UP as number;
export const KEY_RIGHT = robot.KEY_RIGHT as number;
export const KEY_DOWN = robot.KEY_DOWN as number;
export const KEY_PRINT = robot.KEY_PRINT as number;
export const KEY_PAUSE = robot.KEY_PAUSE as number;
export const KEY_INSERT = robot.KEY_INSERT as number;
export const KEY_DELETE = robot.KEY_DELETE as number;
export const KEY_HOME = robot.KEY_HOME as number;
export const KEY_END = robot.KEY_END as number;
export const KEY_PAGE_UP = robot.KEY_PAGE_UP as number;
export const KEY_PAGE_DOWN = robot.KEY_PAGE_DOWN as number;
export const KEY_ADD = robot.KEY_ADD as number;
export const KEY_SUBTRACT = robot.KEY_SUBTRACT as number;
export const KEY_MULTIPLY = robot.KEY_MULTIPLY as number;
export const KEY_DIVIDE = robot.KEY_DIVIDE as number;
export const KEY_DECIMAL = robot.KEY_DECIMAL as number;
export const KEY_ENTER = robot.KEY_ENTER as number;
export const KEY_NUM_0 = robot.KEY_NUM_0 as number;
export const KEY_NUM_1 = robot.KEY_NUM_1 as number;
export const KEY_NUM_2 = robot.KEY_NUM_2 as number;
export const KEY_NUM_3 = robot.KEY_NUM_3 as number;
export const KEY_NUM_4 = robot.KEY_NUM_4 as number;
export const KEY_NUM_5 = robot.KEY_NUM_5 as number;
export const KEY_NUM_6 = robot.KEY_NUM_6 as number;
export const KEY_NUM_7 = robot.KEY_NUM_7 as number;
export const KEY_NUM_8 = robot.KEY_NUM_8 as number;
export const KEY_NUM_9 = robot.KEY_NUM_9 as number;
export const KEY_CAPS_LOCK = robot.KEY_CAPS_LOCK as number;
export const KEY_SCROLL_LOCK = robot.KEY_SCROLL_LOCK as number;
export const KEY_NUM_LOCK = robot.KEY_NUM_LOCK as number;

function isMouseButton(key:number):boolean {
    return key === MOUSE_LEFT || key === MOUSE_MIDDLE || key === MOUSE_RIGHT || key === MOUSE_X1 || key === MOUSE_X2;
}

const keyboard = robot.Keyboard(); keyboard.autoDelay.min = 1; keyboard.autoDelay.max = 2;

export function keyPress(key: number):void {
    if(isMouseButton(key)) mouse.click(key);
    else keyboard.click(key);
}
export function keyDown(key: number):void {
    if(isMouseButton(key)) mouse.press(key);
    else keyboard.press(key);
}
export function keyUp(key: number):void {
    if(isMouseButton(key)) mouse.release(key);
    else keyboard.release(key);
}
export function isKeyDown(key: number):boolean {
    if(isMouseButton(key)) {
        robot.Mouse.getState();
        return robot.Mouse.getState()[key];
    }
    else {
        robot.Keyboard.getState();
        return robot.Keyboard.getState()[key];
    }
}
export function isMultipleKeysDown(keys: number[]) {
    robot.Keyboard.getState();
    robot.Mouse.getState();
    const s = {...robot.Keyboard.getState(),...robot.Mouse.getState()};
    for(const key of keys) {
        if(!s[key]) return false;
    }
    return true;
}
export function typeString(str: string):void {return keyboard.click(str)}
