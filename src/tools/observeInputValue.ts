import { assert } from "tsafe/assert";

// NOTE: The callback is called way too often, it can be called multiple times
// for the same input value. Futhermore the callback is not guaranteed to be called
// as soon as the input value changes.
export function observeInputValue(params: {
    inputElement: HTMLInputElement;
    callback: () => void;
}): { cleanup: () => void } {
    const { inputElement, callback: callback_params } = params;

    const cleanups: (() => void)[] = [];

    {
        const descriptorToRestore = Object.getOwnPropertyDescriptor(inputElement, "value");

        cleanups.push(() => {
            assert(descriptorToRestore !== undefined);
            Object.defineProperty(inputElement, "value", descriptorToRestore);
        });

        const inputElementPrototype = Object.getPrototypeOf(inputElement);
        const descriptor = Object.getOwnPropertyDescriptor(inputElementPrototype, "value");

        Object.defineProperty(inputElement, "value", {
            "get": function (...args) {
                // @ts-expect-error
                return descriptor.get.apply(this, args);
            },
            "set": function (...args) {
                // @ts-expect-error
                descriptor.set.apply(this, args);
                const newValue = this.value;

                callback_params();

                return newValue;
            }
        });
    }

    inputElement.addEventListener(
        "input",
        (() => {
            const callback = (): void => {
                callback_params();
            };

            cleanups.push(() => inputElement.removeEventListener("input", callback));

            return callback;
        })()
    );

    inputElement.addEventListener(
        "keydown",
        (() => {
            const callback = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    const timer = setTimeout(() => {
                        cleanups.splice(cleanups.indexOf(cleanup), 1);
                        callback_params();
                    }, 50);

                    const cleanup = () => {
                        clearTimeout(timer);
                    };

                    cleanups.push(cleanup);
                }
            };

            cleanups.push(() => inputElement.removeEventListener("keyup", callback));

            return callback;
        })()
    );

    function cleanup() {
        cleanups.forEach(cleanup => cleanup());
    }

    return { cleanup };
}
