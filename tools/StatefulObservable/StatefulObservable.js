import { assert, is } from "tsafe/assert";
export function createStatefulObservable(getInitialValue) {
    const nextFunctions = [];
    const { get, set } = (() => {
        let wrappedState = undefined;
        function set(data) {
            wrappedState = [data];
            nextFunctions.forEach(next => next(data));
        }
        return {
            "get": () => {
                if (wrappedState === undefined) {
                    set(getInitialValue());
                    assert(!is(wrappedState));
                }
                return wrappedState[0];
            },
            set
        };
    })();
    return Object.defineProperty({
        "current": null,
        "subscribe": (next) => {
            nextFunctions.push(next);
            return {
                "unsubscribe": () => nextFunctions.splice(nextFunctions.indexOf(next), 1)
            };
        }
    }, "current", {
        "enumerable": true,
        get,
        set
    });
}
//# sourceMappingURL=StatefulObservable.js.map