// @vitest-environment node
import { describe, it, expect } from "vitest";
import type { DOMWindow } from "jsdom";
import { loadEngine, nextFrames } from "./loadDsfrEngine";

// What createModal() renders: a control button, outside the dialog, whose
// data-fr-opened carries isOpenedByDefault.
const modalMarkup = (id: string, params: { isOpenedByDefault: boolean }) => `
<button class="fr-btn" aria-controls="${id}" data-fr-opened="${params.isOpenedByDefault}">Open</button>
<dialog class="fr-modal" id="${id}" aria-labelledby="${id}-title">
  <div class="fr-container"><div class="fr-modal__body">
    <div class="fr-modal__header"><button class="fr-btn--close fr-btn" aria-controls="${id}" type="button">Close</button></div>
    <div class="fr-modal__content"><h1 id="${id}-title">Title</h1></div>
  </div></div>
</dialog>
`;

const isOpened = (window: DOMWindow, id: string) =>
    window.document.getElementById(id)!.classList.contains("fr-modal--opened");

const append = (window: DOMWindow, markup: string) => {
    const container = window.document.createElement("div");
    container.innerHTML = markup;
    window.document.body.appendChild(container);
};

// Primary buttons are elected on a later frame than the modal instance.
const settle = async () => {
    await nextFrames();
    await nextFrames();
};

describe("@gouvfr/dsfr engine, modal opened by default", () => {
    it("opens it when it is present at start (unchanged behavior)", async () => {
        const { window } = await loadEngine({
            markup: modalMarkup("a", { isOpenedByDefault: true })
        });
        await settle();

        expect(isOpened(window, "a")).toBe(true);

        window.close();
    });

    it("opens it when it arrives after the other modals (streaming)", async () => {
        const { window } = await loadEngine({
            markup: modalMarkup("a", { isOpenedByDefault: false })
        });
        await settle();

        append(window, modalMarkup("b", { isOpenedByDefault: true }));
        await settle();

        expect(isOpened(window, "b")).toBe(true);
        expect(isOpened(window, "a")).toBe(false);

        window.close();
    });

    it("opens it when its gate is released after the other modals", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `
                ${modalMarkup("a", { isOpenedByDefault: false })}
                <div data-fr-hydrating="g">${modalMarkup("b", { isOpenedByDefault: true })}</div>
            `
        });
        await settle();

        expect(isOpened(window, "b")).toBe(false);

        dsfr.hydrated("g");
        await settle();

        expect(isOpened(window, "b")).toBe(true);

        window.close();
    });

    it("keeps the modal already open when a late one is opened by default", async () => {
        const { window } = await loadEngine({
            markup: modalMarkup("a", { isOpenedByDefault: true })
        });
        await settle();

        append(window, modalMarkup("b", { isOpenedByDefault: true }));
        await settle();

        expect(isOpened(window, "a")).toBe(true);
        expect(isOpened(window, "b")).toBe(false);

        window.close();
    });

    it("does not reopen a modal the user closed when another modal arrives", async () => {
        const { window, dsfr } = await loadEngine({
            markup: modalMarkup("a", { isOpenedByDefault: true })
        });
        await settle();

        dsfr(window.document.getElementById("a")).modal.conceal();
        await settle();

        append(window, modalMarkup("c", { isOpenedByDefault: false }));
        await settle();

        expect(isOpened(window, "a")).toBe(false);
        expect(isOpened(window, "c")).toBe(false);

        window.close();
    });
});
