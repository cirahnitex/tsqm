
export interface RGB {
    r:number, g:number, b:number
}

export function toHSB(color:RGB);
export function toHSB(red:number, green:number, blue:number);

export function toHSB(red:number|RGB, green:number=0, blue:number=0){
    if(typeof(red) !== 'number') {
        return toHSB(red.r, red.g, red.b);
    }

    let hue:number, saturation:number, brightness:number;
    const max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    const delta = max - min;
    brightness = max / 255;
    saturation = (max != 0) ? delta / max : 0;
    if (saturation == 0){
        hue = 0;
    } else {
        const rr = (max - red) / delta;
        const gr = (max - green) / delta;
        const br = (max - blue) / delta;
        if (red == max) hue = br - gr;
        else if (green == max) hue = 2 + rr - br;
        else hue = 4 + gr - rr;
        hue /= 6;
        if (hue < 0) hue++;
    }
    return {h:Math.round(hue * 360), s:saturation, b:brightness};
}