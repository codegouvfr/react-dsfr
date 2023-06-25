"use client";
import { useEffect, useState } from "react";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
export function useIsModalOpen(modal) {
    const { id, isOpenedByDefault } = modal;
    const [isModalOpen, setIsModalOpen] = useState(isOpenedByDefault);
    useEffect(() => {
        const cleanups = [];
        const observeDialogHtmlElement = (element) => {
            const onConceal = () => setIsModalOpen(false);
            const onDisclose = () => setIsModalOpen(true);
            element.addEventListener("dsfr.conceal", onConceal);
            element.addEventListener("dsfr.disclose", onDisclose);
            const removeEventListeners = () => {
                element.removeEventListener("dsfr.conceal", onConceal);
                element.removeEventListener("dsfr.disclose", onDisclose);
            };
            cleanups.push(removeEventListeners);
            const observer = new MutationObserver(mutationsList => {
                const isDetached = mutationsList.find(mutation => Array.from(mutation.removedNodes).indexOf(element) !== -1) !== undefined;
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
        const observeMountAndObserveDialogHtmlElement = (params) => {
            const { isInitialCall } = params;
            if (isInitialCall) {
                assert(!isOpenedByDefault, [
                    `The ${id} modal isn't initially mounted,`,
                    `it's ok but in this case ${symToStr({
                        isOpenedByDefault
                    })} must be set to false.`,
                    "This limitation is to prevent inconsistent state in SSR setups."
                ].join(" "));
            }
            const observer = new MutationObserver((mutationsList, observer) => {
                // Filter the mutations list for nodes that match our criteria
                const matchedNode = mutationsList
                    .map(mutation => Array.from(mutation.addedNodes))
                    .reduce((acc, curr) => acc.concat(curr), [])
                    .find(node => node.nodeType === Node.ELEMENT_NODE &&
                    node.nodeName === "DIALOG" &&
                    node.id === id);
                if (matchedNode === undefined) {
                    return;
                }
                observer.disconnect();
                cleanups.splice(cleanups.indexOf(disconnectObserver), 1);
                observeDialogHtmlElement(matchedNode);
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
        }
        else {
            observeMountAndObserveDialogHtmlElement({ "isInitialCall": true });
        }
        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    }, [id]);
    return isModalOpen;
}
//# sourceMappingURL=useIsModalOpen.js.map