export declare class Deferred<T> {
    readonly pr: Promise<T>;
    /** NOTE: Does not need to be called bound to instance*/
    readonly resolve: (value: T) => void;
    readonly reject: (error: any) => void;
    constructor();
    readonly isPending: boolean;
}
export declare namespace Deferred {
    type Unpack<T extends Deferred<any>> = T extends Deferred<infer U> ? U : never;
}
export declare class VoidDeferred extends Deferred<undefined> {
    readonly resolve: () => void;
}
