import robot from 'robotjs';
import {RGB} from "./RGB";

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

export function getScreenSize():[number, number] {
    const {width, height} = robot.getScreenSize();
    return [width, height];
}

export function captureScreen(x:number, y:number, w:number, h:number):Bitmap {
    return new Bitmap(robot.screen.capture(x, y, w, h));
}
