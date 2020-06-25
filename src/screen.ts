import robot from 'robotjs';
import {RGB} from "./RGB";
import ffi from "ffi";

const user32 = new ffi.Library("user32", {
    GetSystemMetrics: ["int", ["int"]],
});

const SM_CXSCREEN = 0;
const SM_CYSCREEN = 1;


export class Bitmap {
    bitmap: robot.Bitmap;

    constructor(bitmap: robot.Bitmap) {
        this.bitmap = bitmap;
    }

    width():number {
        return this.bitmap.width;
    }

    height():number {
        return this.bitmap.height;
    }

    bytesPerPixel():number {
        return this.bitmap.bytesPerPixel;
    }

    buffer():Buffer {
        return this.bitmap.image;
    }

    colorAt(x:number, y:number):RGB {
        const byteOffset = this.bytesPerPixel() * (this.width()*y + x);
        const buffer:Buffer = this.bitmap.image;
        const b:number = buffer.readUInt8(byteOffset);
        const g:number = buffer.readUInt8(byteOffset + 1);
        const r:number = buffer.readUInt8(byteOffset + 2);
        return {r, g, b};
    }
}

let _screensizeRet: [number, number]|null;
export function getScreenSize():[number, number] {
    if(_screensizeRet) return _screensizeRet;
    const width = user32.GetSystemMetrics(SM_CXSCREEN);
    const height = user32.GetSystemMetrics(SM_CYSCREEN);
    _screensizeRet = [width, height];
    return _screensizeRet;
}

export function captureScreen(x:number, y:number, w:number, h:number):Bitmap {
    return new Bitmap(robot.screen.capture(x, y, w, h));
}
