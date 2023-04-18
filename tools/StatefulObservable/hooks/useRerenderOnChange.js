import { useObservable } from "./useObservable";
import { useState } from "react";
/**
 * Equivalent of https://docs.evt.land/api/react-hooks
 * */
export function useRerenderOnChange($) {
    //NOTE: We use function in case the state is a function
    const [, setCurrent] = useState(() => $.current);
    useObservable(({ registerSubscription }) => {
        const subscription = $.subscribe(current => setCurrent(() => current));
        registerSubscription(subscription);
    }, [$]);
}
//# sourceMappingURL=useRerenderOnChange.js.map