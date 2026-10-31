// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import * as fs from "fs";
import { join as pathJoin } from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

// Le module `start` est remplacé : le vrai démarre le moteur DSFR (import
// dynamique du bundle, écritures dans le DOM), hors sujet ici. Ce qui est
// testé est le contrat observable du provider : une action enregistrée via
// `registerEffectAction` avant l'hydratation n'est exécutée qu'une fois
// l'effet du provider déclenché, c'est-à-dire après hydratation.
// La fabrique ne référence que `globalThis` : `vi.mock` est hoisté en tête de
// module, une variable de ce module ne serait pas encore initialisée.
vi.mock("../../../src/start", () => ({
    "start": (params: any) => {
        (globalThis as any).__registerEffectAction = params.nextParams.registerEffectAction;
    }
}));

// Chaque test doit repartir d'un module neuf : `isAfterFirstEffect` et
// `actions` sont des variables de MODULE, un premier test les laisserait dans
// l'état « après hydratation » pour les suivants.
async function loadFreshProviderModule() {
    vi.resetModules();
    delete (globalThis as any).__registerEffectAction;
    return await import("../../../src/next-app-router/DsfrProvider");
}

function makeElement(
    DsfrProviderBase: any,
    children: React.ReactNode = React.createElement("p", null, "contenu")
) {
    return React.createElement(DsfrProviderBase, {
        "lang": "fr",
        "Link": (props: any) => React.createElement("a", props),
        "defaultColorScheme": "light",
        children
    });
}

async function hydrate(element: React.ReactElement) {
    const html = renderToString(element);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

    await act(async () => {
        hydrateRoot(container, element);
    });

    return container;
}

describe("DsfrProvider, effet d'hydratation", () => {
    it("exécute à l'hydratation les actions enregistrées avant elle", async () => {
        const { DsfrProviderBase } = await loadFreshProviderModule();

        const element = makeElement(DsfrProviderBase);

        // Le rendu serveur appelle `start()`, qui fournit
        // `registerEffectAction` ; aucun effet n'a encore tourné.
        renderToString(element);

        const registerEffectAction = (globalThis as any).__registerEffectAction;
        expect(typeof registerEffectAction).toBe("function");

        let callCount = 0;
        registerEffectAction(() => {
            callCount++;
        });

        // Avant hydratation, l'action est en attente, pas exécutée.
        expect(callCount).toBe(0);

        await hydrate(element);

        expect(callCount).toBe(1);
    });

    it("exécute immédiatement une action enregistrée après l'hydratation", async () => {
        const { DsfrProviderBase } = await loadFreshProviderModule();

        const element = makeElement(DsfrProviderBase);

        await hydrate(element);

        const registerEffectAction = (globalThis as any).__registerEffectAction;

        let hasRun = false;
        registerEffectAction(() => {
            hasRun = true;
        });

        expect(hasRun).toBe(true);
    });

    it("n'exécute les actions en attente qu'une fois, StartDsfrOnHydration monté en plus", async () => {
        const { DsfrProviderBase, StartDsfrOnHydration } = await loadFreshProviderModule();

        const element = makeElement(
            DsfrProviderBase,
            React.createElement(
                React.Fragment,
                null,
                React.createElement(StartDsfrOnHydration, { key: "start" }),
                React.createElement("p", { key: "content" }, "contenu")
            )
        );

        renderToString(element);

        let callCount = 0;
        (globalThis as any).__registerEffectAction(() => {
            callCount++;
        });

        await hydrate(element);

        // Les deux effets (celui du provider et celui de
        // StartDsfrOnHydration) appellent `dsfrEffect()` ; il est idempotent.
        expect(callCount).toBe(1);
    });

    it("garde StartDsfrOnHydration exporté et annoté @deprecated", async () => {
        const { StartDsfrOnHydration } = await loadFreshProviderModule();

        expect(typeof StartDsfrOnHydration).toBe("function");

        // L'annotation elle-même n'est pas observable au runtime : c'est un
        // contrat de documentation, vérifié sur la source.
        const source = fs.readFileSync(
            pathJoin(__dirname, "..", "..", "..", "src", "next-app-router", "DsfrProvider.tsx"),
            "utf8"
        );

        expect(source).toMatch(/@deprecated[\s\S]*?export function StartDsfrOnHydration\(\)/);
    });
});
