// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Accordion } from "../../../src/Accordion";
import { Table } from "../../../src/Table";

// The real module starts the DSFR engine. Only the promise HydrationRelease
// waits on matters here.
vi.mock("../../../src/start", () => ({ "prDsfrLoaded": Promise.resolve() }));

const cases = [
    {
        name: "Accordion (Client Component)",
        element: React.createElement(Accordion, { label: "Title" }, "Content"),
        rootSelector: ".fr-accordion"
    },
    {
        name: "Table (usable as a Server Component)",
        element: React.createElement(Table, { data: [["a1"]] }),
        rootSelector: ".fr-table"
    }
];

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    (window as any).dsfr = { "hydrated": vi.fn() };
    document.body.innerHTML = "";
});

describe.each(cases)("$name", ({ element, rootSelector }) => {
    it("renders a gate carrying an id on the server", () => {
        const container = document.createElement("div");
        container.innerHTML = renderToString(element);

        const id = container.querySelector(rootSelector)!.getAttribute("data-fr-hydrating");

        expect(id).toMatch(/\S/);
        expect(id).not.toBe("true");
    });

    it("releases that id once hydrated", async () => {
        const container = document.createElement("div");
        container.innerHTML = renderToString(element);
        document.body.appendChild(container);

        const id = container.querySelector(rootSelector)!.getAttribute("data-fr-hydrating");

        expect((window as any).dsfr.hydrated).not.toHaveBeenCalled();

        await act(async () => {
            hydrateRoot(container, element);
        });
        await flushPromises();

        expect((window as any).dsfr.hydrated).toHaveBeenCalledWith(id);
    });

    it("releases its id when mounted on the client without hydration", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);

        await act(async () => {
            createRoot(container).render(element);
        });
        await flushPromises();

        const id = container.querySelector(rootSelector)!.getAttribute("data-fr-hydrating");

        expect((window as any).dsfr.hydrated).toHaveBeenCalledWith(id);
    });
});
