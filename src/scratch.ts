import * as QM from "./index";
QM.addKeyDownListener(QM.KEY_A, ()=>{
    QM.keyPress(QM.KEY_B);
});
QM.addKeyDownListener(QM.MOUSE_LEFT, ()=>{
    console.log('mouse left pressed');
});
QM.addKeyDownListener(QM.MOUSE_RIGHT, ()=>{
    console.log('mouse right pressed');
});
QM.addKeyDownListener(QM.MOUSE_MIDDLE, ()=>{
    console.log('mouse middle pressed');
});
QM.addKeyDownListener(QM.MOUSE_X1, ()=>{
    console.log('mouse x1 pressed');
});
QM.addKeyDownListener(QM.MOUSE_X2, ()=>{
    console.log('mouse x2 pressed');
});
