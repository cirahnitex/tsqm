import robot from "robotjs";
import * as K from "./keycodes";
import {robotejsKeystrings} from "./robotjsKeystrings";


export function scrollMouse(x:number, y:number) {
    robot.scrollMouse(x, y);
}

export function getMousePos() {
    const {x,y} = robot.getMousePos();
    return [x, y];
}
export function setMousePos(x:number, y:number) {
    robot.moveMouse(x, y);
}

export function keyPress(key: number):void {
    if(key === K.MOUSE_LEFT) robot.mouseClick("left");
    else if(key === K.MOUSE_RIGHT) robot.mouseClick("right");
    else if(key === K.MOUSE_MIDDLE) robot.mouseClick("middle");
    else {
        const keyString = robotejsKeystrings.get(key);
        if(keyString == null) throw new Error(`[tsqm] provided key is not supported for input`);
        robot.keyTap(keyString);
    }
}

export function keyDown(key: number):void {
    if(key === K.MOUSE_LEFT) robot.mouseToggle("down","left");
    else if(key === K.MOUSE_RIGHT) robot.mouseToggle("down","right");
    else if(key === K.MOUSE_MIDDLE) robot.mouseToggle("down","middle");
    else {
        const keyString = robotejsKeystrings.get(key);
        if(keyString == null) throw new Error(`[tsqm] provided key is not supported for input`);
        robot.keyToggle(keyString, "down");
    }
}

export function keyUp(key: number):void {
    if(key === K.MOUSE_LEFT) robot.mouseToggle("up","left");
    else if(key === K.MOUSE_RIGHT) robot.mouseToggle("up","right");
    else if(key === K.MOUSE_MIDDLE) robot.mouseToggle("up","middle");
    else {
        const keyString = robotejsKeystrings.get(key);
        if(keyString == null) throw new Error(`[tsqm] provided key is not supported for input`);
        robot.keyToggle(keyString, "up");
    }
}


export function typeString(str: string):void {return robot.typeString(str);}
