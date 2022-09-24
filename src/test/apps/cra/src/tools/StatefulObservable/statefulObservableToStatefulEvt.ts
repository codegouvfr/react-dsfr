import { Evt } from "evt";
import type { StatefulEvt, Ctx } from "evt";
import type { StatefulObservable } from "./StatefulObservable";

export function statefulObservableToStatefulEvt<T>(params: {
    statefulObservable: StatefulObservable<T>;
    ctx?: Ctx;
}): StatefulEvt<T> {
    const { statefulObservable, ctx = Evt.newCtx() } = params;

    const evt = Evt.create(statefulObservable.current);

    let doSkip = false;

    evt.attach(ctx, data => {
        doSkip = true;
        statefulObservable.current = data;
        doSkip = false;
    });

    const { unsubscribe } = statefulObservable.subscribe(data => {
        if (doSkip) {
            return;
        }
        evt.state = data;
    });

    ctx.evtDoneOrAborted.attach(() => unsubscribe());

    return evt;
}
