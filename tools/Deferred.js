import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";
export class Deferred {
    constructor() {
        this.isPending = true;
        let resolve;
        let reject;
        this.pr = new Promise((resolve_, reject_) => {
            resolve = value => {
                overwriteReadonlyProp(this, "isPending", false);
                resolve_(value);
            };
            reject = error => {
                overwriteReadonlyProp(this, "isPending", false);
                reject_(error);
            };
        });
        this.resolve = resolve;
        this.reject = reject;
    }
}
export class VoidDeferred extends Deferred {
}
//# sourceMappingURL=Deferred.js.map