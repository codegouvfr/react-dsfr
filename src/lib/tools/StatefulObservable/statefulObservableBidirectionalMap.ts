import type { StatefulObservable } from "./StatefulObservable";
import { createStatefulObservable } from "./StatefulObservable";

export function statefulObservableBidirectionalMap<T, U>(params: {
    statefulObservable: StatefulObservable<T>;
    trInToOut: (data: T) => U;
    trOutToIn: (data: U) => T;
}): StatefulObservable<U> {
    const { statefulObservable, trInToOut, trOutToIn } = params;

    const outStatefulObservable = createStatefulObservable(() =>
        trInToOut(statefulObservable.current)
    );

    let doSkip = false;

    outStatefulObservable.subscribe(data => {
        doSkip = true;
        statefulObservable.current = trOutToIn(data);
        doSkip = false;
    });

    statefulObservable.subscribe(data => {
        if (doSkip) {
            return;
        }
        outStatefulObservable.current = trInToOut(data);
    });

    return outStatefulObservable;
}
