// @vitest-environment node
import { describe, it, expect } from "vitest";
import type { DOMWindow } from "jsdom";
import { loadEngine, nextFrames } from "./loadDsfrEngine";

const accordionMarkup = (id: string) => `
<section class="fr-accordion" id="${id}">
  <h3 class="fr-accordion__title">
    <button class="fr-accordion__btn" aria-expanded="false" aria-controls="${id}-collapse">Title</button>
  </h3>
  <div class="fr-collapse" id="${id}-collapse">Content</div>
</section>
`;

const isInstrumented = (window: DOMWindow, id: string) =>
    window.document.getElementById(id)!.hasAttribute("data-fr-js-accordion");

describe("@gouvfr/dsfr engine, data-fr-hydrating gate", () => {
    it("instruments a subtree that carries no gate (unchanged behavior)", async () => {
        const { window } = await loadEngine({ markup: accordionMarkup("acc") });

        expect(isInstrumented(window, "acc")).toBe(true);

        window.close();
    });

    it("does not instrument a subtree gated at start", async () => {
        const { window } = await loadEngine({
            markup: `<div data-fr-hydrating="true">${accordionMarkup("acc")}</div>`
        });

        expect(isInstrumented(window, "acc")).toBe(false);
        expect(window.document.getElementById("acc-collapse")!.getAttributeNames()).not.toContain(
            "data-fr-js-collapse"
        );

        window.close();
    });

    it("gates the element carrying the attribute itself", async () => {
        const { window } = await loadEngine({
            markup: accordionMarkup("acc").replace(
                `class="fr-accordion"`,
                `class="fr-accordion" data-fr-hydrating="true"`
            )
        });

        expect(isInstrumented(window, "acc")).toBe(false);

        window.close();
    });

    it("instruments the whole subtree once the gate is removed", async () => {
        const { window } = await loadEngine({
            markup: `<div id="gate" data-fr-hydrating="true">${accordionMarkup("acc")}</div>`
        });

        window.document.getElementById("gate")!.removeAttribute("data-fr-hydrating");
        await nextFrames();

        expect(isInstrumented(window, "acc")).toBe(true);
        expect(window.document.getElementById("acc-collapse")!.getAttributeNames()).toContain(
            "data-fr-js-collapse"
        );

        window.close();
    });

    it("does not instrument gated nodes inserted after start (streaming)", async () => {
        const { window } = await loadEngine({ markup: "" });

        const streamed = window.document.createElement("div");
        streamed.innerHTML = `
            <div data-fr-hydrating="true">${accordionMarkup("gated")}</div>
            ${accordionMarkup("plain")}
        `;
        window.document.body.appendChild(streamed);
        await nextFrames();

        expect(isInstrumented(window, "gated")).toBe(false);
        expect(isInstrumented(window, "plain")).toBe(true);

        window.close();
    });

    it("keeps a nested gate closed when its ancestor gate opens", async () => {
        const { window } = await loadEngine({
            markup: `
                <div id="outer" data-fr-hydrating="true">
                    ${accordionMarkup("outer-acc")}
                    <div id="inner" data-fr-hydrating="true">${accordionMarkup("inner-acc")}</div>
                </div>
            `
        });

        window.document.getElementById("outer")!.removeAttribute("data-fr-hydrating");
        await nextFrames();

        expect(isInstrumented(window, "outer-acc")).toBe(true);
        expect(isInstrumented(window, "inner-acc")).toBe(false);

        window.document.getElementById("inner")!.removeAttribute("data-fr-hydrating");
        await nextFrames();

        expect(isInstrumented(window, "inner-acc")).toBe(true);

        window.close();
    });
});

describe("@gouvfr/dsfr engine, dsfr.hydrated(id)", () => {
    it("keeps a gate carrying an id closed until it is released", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `<div data-fr-hydrating="g1">${accordionMarkup("acc")}</div>`
        });

        expect(isInstrumented(window, "acc")).toBe(false);

        dsfr.hydrated("g1");
        await nextFrames();

        expect(isInstrumented(window, "acc")).toBe(true);

        window.close();
    });

    it("leaves the gate attribute in the DOM", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `<div id="gate" data-fr-hydrating="g1">${accordionMarkup("acc")}</div>`
        });

        dsfr.hydrated("g1");
        await nextFrames();

        expect(window.document.getElementById("gate")!.getAttribute("data-fr-hydrating")).toBe(
            "g1"
        );

        window.close();
    });

    it("only releases the gate carrying that id", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `
                <div data-fr-hydrating="g1">${accordionMarkup("acc-1")}</div>
                <div data-fr-hydrating="g2">${accordionMarkup("acc-2")}</div>
            `
        });

        dsfr.hydrated("g1");
        await nextFrames();

        expect(isInstrumented(window, "acc-1")).toBe(true);
        expect(isInstrumented(window, "acc-2")).toBe(false);

        window.close();
    });

    it("applies a release made before the engine starts", async () => {
        const { window } = await loadEngine({
            markup: `<div data-fr-hydrating="g1">${accordionMarkup("acc")}</div>`,
            beforeStart: dsfr => dsfr.hydrated("g1")
        });

        expect(isInstrumented(window, "acc")).toBe(true);

        window.close();
    });

    it("instruments nodes added later under a released gate", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `<div id="gate" data-fr-hydrating="g1"></div>`
        });

        dsfr.hydrated("g1");

        const added = window.document.createElement("div");
        added.innerHTML = accordionMarkup("acc");
        window.document.getElementById("gate")!.appendChild(added);
        await nextFrames();

        expect(isInstrumented(window, "acc")).toBe(true);

        window.close();
    });

    it("keeps a nested gate closed until its own release", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `
                <div data-fr-hydrating="outer">
                    ${accordionMarkup("outer-acc")}
                    <div data-fr-hydrating="inner">${accordionMarkup("inner-acc")}</div>
                </div>
            `
        });

        dsfr.hydrated("outer");
        await nextFrames();

        expect(isInstrumented(window, "outer-acc")).toBe(true);
        expect(isInstrumented(window, "inner-acc")).toBe(false);

        dsfr.hydrated("inner");
        await nextFrames();

        expect(isInstrumented(window, "inner-acc")).toBe(true);

        window.close();
    });

    it("keeps an inner gate closed while its enclosing gate is not released", async () => {
        const { window, dsfr } = await loadEngine({
            markup: `
                <div data-fr-hydrating="outer">
                    <div data-fr-hydrating="inner">${accordionMarkup("inner-acc")}</div>
                </div>
            `
        });

        dsfr.hydrated("inner");
        await nextFrames();

        expect(isInstrumented(window, "inner-acc")).toBe(false);

        dsfr.hydrated("outer");
        await nextFrames();

        expect(isInstrumented(window, "inner-acc")).toBe(true);

        window.close();
    });
});
