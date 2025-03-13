`StatefulObservable` is a construct that allow to avoid having to depend on [EVT](https://evt.land).

A `StatefulObservable` can be used to implement a signal: Wire a non react-land function to a react component.
Example:

```tsx
import { createStatefulObservable, useRerenderOnChange } from "tools/StatefulObservable";

const $counter = createStatefulObservable(() => 0);

export function incrementCounter() {
    $counter.current++;
}

export function Counter() {
    useRerenderOnChange($counter);

    const counter = $counter.current;

    return <span>Counter: {counter}</span>;
}
```

WARNING: Unlike `StatefulEvt`, `StatefulObservable` do not post when we first attach.
If the current value was not yet evaluated `next()` is called on the initial value returned by the function that
returns it.
