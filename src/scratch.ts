import * as QM from "./index";
import {addKeyDownListener, addKeyUpListener} from "./hook";
console.log(QM.captureScreen(15,9,1,2).colorAt(0,1));
addKeyDownListener(QM.KEY_A, ()=>{
    console.log('a');
});