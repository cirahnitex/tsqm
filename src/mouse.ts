import ffi from "ffi-napi";
import ref from "ref-napi";
import StructType from "ref-struct-napi";
const arch = require("os").arch();

import {getScreenSize} from "./screen";

const Input = StructType({
    "type": "int",

    // same as keyboard input, we need to insert a dummy int here
    "???": "int",

    "dx": "long",
    "dy": "long",
    "mouseData": "int",
    "dwFlags": "int",
    "time": "int",
    "dwExtraInfo": "int64"
});

const Point = StructType({
    "x": "long",
    "y": "long"
});

const PointPtr = ref.refType(Point);

const user32 = new ffi.Library("user32", {
    SendInput: ["int", ["int", Input, "int"]],
    GetCursorPos: ["bool", [PointPtr]]
});

const INPUT_MOUSE = 0;

const XBUTTON1 = 0x0001;
const XBUTTON2 = 0x0002;

const MOUSEEVENTF_ABSOLUTE = 0x8000;
const MOUSEEVENTF_HWHEEL = 0x01000;
const MOUSEEVENTF_MOVE = 0x0001;
const MOUSEEVENTF_MOVE_NOCOALESCE = 0x2000;
const MOUSEEVENTF_LEFTDOWN = 0x0002;
const MOUSEEVENTF_LEFTUP = 0x0004;
const MOUSEEVENTF_RIGHTDOWN = 0x0008;
const MOUSEEVENTF_RIGHTUP = 0x0010;
const MOUSEEVENTF_MIDDLEDOWN = 0x0020;
const MOUSEEVENTF_MIDDLEUP = 0x0040;
const MOUSEEVENTF_WHEEL = 0x0800;
const MOUSEEVENTF_XDOWN = 0x0080;
const MOUSEEVENTF_XUP = 0x0100;

const INPUT_NBYTES = arch === "x64" ? 40 : 28;

export function getMousePos():[number, number] {
    let point = new Point();
    user32.GetCursorPos(point.ref());
    return [point.x, point.y];
}

function sendMouseInput(dx:number, dy:number, mouseData: number, dwFlags:number) {
    let entry = new Input();
    entry.type = INPUT_MOUSE;
    entry.dx = dx;
    entry.dy = dy;
    entry.mouseData = mouseData;
    entry.dwFlags = dwFlags;
    entry.time = 0;
    entry.dwExtraInfo = 0;

    user32.SendInput(1, entry, INPUT_NBYTES);
}

export function mouseMoveRelative(dx:number, dy:number) {
    sendMouseInput(dx, dy, 0, MOUSEEVENTF_MOVE);
}

export function mouseMoveAbsolute(x:number, y:number) {
    const [width, height] = getScreenSize();
    sendMouseInput(Math.floor(x * 65535 / width), Math.floor(y * 65535 / height), 0, MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE);
}

export function mouseLeftDown() {
    sendMouseInput(0, 0, 0, MOUSEEVENTF_LEFTDOWN);
}

export function mouseLeftUp() {
    sendMouseInput(0, 0, 0, MOUSEEVENTF_LEFTUP);
}


export function mouseRightDown() {
    sendMouseInput(0, 0, 0, MOUSEEVENTF_RIGHTDOWN);
}

export function mouseRightUp() {
    sendMouseInput(0, 0, 0, MOUSEEVENTF_RIGHTUP);
}

export function mouseMiddleDown() {
    sendMouseInput(0, 0, 0, MOUSEEVENTF_MIDDLEDOWN);
}

export function mouseMiddleUp() {
    sendMouseInput(0, 0, 0, MOUSEEVENTF_MIDDLEUP);
}

export function mouseX1Down() {
    sendMouseInput(0, 0, XBUTTON1, MOUSEEVENTF_XDOWN);
}

export function mouseX1Up() {
    sendMouseInput(0, 0, XBUTTON1, MOUSEEVENTF_XUP);
}

export function mouseX2Down() {
    sendMouseInput(0, 0, XBUTTON2, MOUSEEVENTF_XDOWN);
}
export function mouseX2Up() {
    sendMouseInput(0, 0, XBUTTON2, MOUSEEVENTF_XUP);
}

export function mouseScroll(x:number, y:number) {
    if(x !== 0) {
        sendMouseInput(0, 0, x, MOUSEEVENTF_HWHEEL);
    }
    if(y != 0) {
        sendMouseInput(0, 0, y, MOUSEEVENTF_WHEEL);
    }
}