import Color from "./Color";

export interface Image {
    getPixel(ax:number, ay:number):Color;
}
