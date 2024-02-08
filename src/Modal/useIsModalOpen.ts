"use client";

import { useEffect, useState } from "react";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";

export function useIsModalOpen(
    modal: { isOpenedByDefault: boolean; id: string },
    callbacks?: {
        onConceal?: () => void;
        onDisclose?: () => void;
    }
): boolean {
    const { id, isOpenedByDefault } = modal;

    const [isModalOpen, setIsModalOpen] = useState(isOpenedByDefault);

    const getCurrentCallbacks = useConstCallback(() => callbacks);

    useEffect(() => {
        const cleanups: (() => void)[] = [];

        const observeDialogHtmlElement = (element: HTMLElement) => {
            const onConceal = () => {
                setIsModalOpen(false);
                getCurrentCallbacks()?.onConceal?.();
            };
            const onDisclose = () => {
                setIsModalOpen(true);
                getCurrentCallbacks()?.onDisclose?.();
            };

            element.addEventListener("dsfr.conceal", onConceal);
            element.addEventListener("dsfr.disclose", onDisclose);

            const removeEventListeners = () => {
                element.removeEventListener("dsfr.conceal", onConceal);
                element.removeEventListener("dsfr.disclose", onDisclose);
            };

            cleanups.push(removeEventListeners);

            const observer = new MutationObserver(mutationsList => {
                const isDetached =
                    mutationsList.find(
                        mutation => Array.from(mutation.removedNodes).indexOf(element) !== -1
                    ) !== undefined;

                if (!isDetached) {
                    return;
                }

                cleanups.splice(cleanups.indexOf(removeEventListeners), 1);

                observer.disconnect();

                cleanups.splice(cleanups.indexOf(disconnectObserver), 1);

                setIsModalOpen(false);

                observeMountAndObserveDialogHtmlElement({ "isInitialCall": false });
            });

            observer.observe(document, { childList: true, subtree: true });

            const disconnectObserver = () => observer.disconnect();

            cleanups.push(disconnectObserver);
        };

        const observeMountAndObserveDialogHtmlElement = (params: { isInitialCall: boolean }) => {
            const { isInitialCall } = params;

            if (isInitialCall) {
                assert(
                    !isOpenedByDefault,
                    [
                        `The ${id} modal isn't initially mounted,`,
                        `it's ok but in this case ${symToStr({
                            isOpenedByDefault
                        })} must be set to false.`,
                        "This limitation is to prevent inconsistent state in SSR setups."
                    ].join(" ")
                );
            }

            const observer = new MutationObserver((mutationsList, observer) => {
                // Filter the mutations list for nodes that match our criteria
                const matchedNode = mutationsList
                    .map(mutation => Array.from(mutation.addedNodes))
                    .reduce((acc, curr) => acc.concat(curr), [])
                    .find(
                        node =>
                            node.nodeType === Node.ELEMENT_NODE &&
                            node.nodeName === "DIALOG" &&
                            (node as HTMLElement).id === id
                    );

                if (matchedNode === undefined) {
                    return;
                }

                observer.disconnect();

                cleanups.splice(cleanups.indexOf(disconnectObserver), 1);

                observeDialogHtmlElement(matchedNode as HTMLElement);

                if (isOpenedByDefault) {
                    setIsModalOpen(true);
                }
            });

            observer.observe(document, { "childList": true, "subtree": true });

            const disconnectObserver = () => observer.disconnect();

            cleanups.push(disconnectObserver);
        };

        const element = document.getElementById(id);

        if (element !== null) {
            observeDialogHtmlElement(element);
        } else {
            observeMountAndObserveDialogHtmlElement({ "isInitialCall": true });
        }

        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    }, [id]);

    return isModalOpen;
}
