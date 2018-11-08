import * as robot from 'robot-js';
import {Image} from "./Image";

if(!robot.Screen.synchronize()) {
    console.error('fail to synchronize screen');
}
export function getScreenSize() {
    const a = robot.Screen.getTotalBounds();
    return {width:a.w,height:a.h};
}
export function grabScreen(x:number, y:number, w:number, h:number):Image {
    const output:Image = robot.Image();
    robot.Screen.grabScreen (output, x, y, w, h);
    return output;
}
