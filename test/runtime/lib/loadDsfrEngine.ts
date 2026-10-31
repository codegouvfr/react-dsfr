import { JSDOM, type DOMWindow } from "jsdom";
import * as fs from "fs";
import { join as pathJoin } from "path";

// The engine as patched by patch-package (prepare script), i.e. the one the
// build copies into dist/dsfr/.
const ENGINE_PATH = pathJoin(
    __dirname,
    "..",
    "..",
    "..",
    "node_modules",
    "@gouvfr",
    "dsfr",
    "dist",
    "dsfr.module.js"
);

/** Loads the DSFR engine in a fresh jsdom window, in react mode, and starts it. */
export async function loadEngine(params: {
    markup: string;
    /** Called once the markup is in place, before the engine starts. */
    beforeStart?: (dsfr: any) => void;
}) {
    const { markup, beforeStart } = params;

    const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`, {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url: "https://example.test/"
    });

    const window = dom.window as DOMWindow;

    /* eslint-disable @typescript-eslint/no-empty-function */
    class ObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }

    (window as any).ResizeObserver = ObserverStub;
    (window as any).IntersectionObserver = ObserverStub;
    (window as any).matchMedia = (query: string) => ({
        matches: false,
        media: query,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {}
    });
    // Called by the engine when a modal opens; not implemented by jsdom.
    (window as any).scrollTo = () => {};
    /* eslint-enable @typescript-eslint/no-empty-function */

    (window as any).dsfr = { verbose: false, mode: "react" };

    (window as any).eval(fs.readFileSync(ENGINE_PATH, "utf8"));

    // Stop the engine first, so that its pending frames and observers do not
    // run against a torn down document.
    const close = window.close.bind(window);
    window.close = () => {
        (window as any).dsfr.stop();
        close();
    };

    window.document.body.innerHTML = markup;
    beforeStart?.((window as any).dsfr);
    (window as any).dsfr.start();
    await nextFrames();

    return { window, dsfr: (window as any).dsfr };
}

// Mutations and deferred work are replayed by the engine on the next
// animation frames.
export const nextFrames = () => new Promise(resolve => setTimeout(resolve, 50));
