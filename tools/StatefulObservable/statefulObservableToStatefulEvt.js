import { Evt } from "evt";
export function statefulObservableToStatefulEvt(params) {
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
//# sourceMappingURL=statefulObservableToStatefulEvt.js.map