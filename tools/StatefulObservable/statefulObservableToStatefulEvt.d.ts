import type { StatefulEvt, Ctx } from "evt";
import type { StatefulObservable } from "./StatefulObservable";
export declare function statefulObservableToStatefulEvt<T>(params: {
    statefulObservable: StatefulObservable<T>;
    ctx?: Ctx;
}): StatefulEvt<T>;
