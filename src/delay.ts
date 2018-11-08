export function delay(ms:number):Promise<void> {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

export class CancelableDelayer {
    _cancelers = new Map<ReturnType<typeof setTimeout>, (e:Error)=>any>();
    delay(ms:number):Promise<void> {
        return new Promise((resolve, reject)=>{
            const timer = setTimeout(()=>{
                this._cancelers.delete(timer);
                resolve();
            }, ms);
            this._cancelers.set(timer, reject);
        });
    }
    clearAll() {
        for(const [timer, reject] of this._cancelers) {
            clearTimeout(timer);
            reject(new Error("DELAY_CANCELED"));
        }
        this._cancelers.clear();
    }
}