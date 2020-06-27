import activeWin from "active-win";

let lastID = 0;

setInterval(()=>{
    const r = activeWin.sync();
    if(!r) return;
    if(r.id === lastID) return;
    lastID = r.id;
    process.send!(r);
}, 50);