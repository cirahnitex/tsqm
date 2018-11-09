import * as QM from "./index";

QM.addKeyDownListener(QM.KEY_A,()=>{console.log('pressed')});

QM.removeKeyListeners();

QM.addKeyDownListener(QM.KEY_A,()=>{console.log('pressed')});
