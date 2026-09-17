import { describe, it, expect } from "vitest";
import { getScriptToRunAsap } from "../../../src/useIsDark/scriptToRunAsap";
import { data_fr_scheme, data_fr_theme } from "../../../src/useIsDark/constants";

const noop = () => undefined;

/**
 * Runs the generated inline script against a minimal fake DOM, with the given `localStorage`
 * shadowing the global one, and returns the attributes set on <html>.
 */
function runScript(params: {
    localStorage: unknown;
    defaultColorScheme: "light" | "dark" | "system";
}) {
    const htmlAttributes = new Map<string, string>();

    const documentElement = {
        "setAttribute": (name: string, value: string) => {
            htmlAttributes.set(name, value);
        },
        "hasAttribute": (name: string) => htmlAttributes.has(name)
    };

    const document = {
        documentElement,
        "getElementById": () => null,
        "querySelector": () => null,
        "createElement": () => ({ "setAttribute": noop }),
        "head": { "appendChild": noop }
    };

    const window = { "matchMedia": undefined };

    class MutationObserver {
        observe = noop;
        disconnect = noop;
    }

    const script = getScriptToRunAsap({
        "defaultColorScheme": params.defaultColorScheme,
        "nonce": undefined,
        "trustedTypesPolicyName": "react-dsfr"
    });

    new Function("window", "document", "localStorage", "MutationObserver", script)(
        window,
        document,
        params.localStorage,
        MutationObserver
    );

    return htmlAttributes;
}

const blockedLocalStorage = new Proxy(
    {},
    {
        "get": () => {
            throw new DOMException(
                "Failed to read the 'localStorage' property from 'Window': Access is denied for this document.",
                "SecurityError"
            );
        }
    }
);

describe("getScriptToRunAsap", () => {
    it("applies the persisted color scheme when localStorage works", () => {
        const map = new Map<string, string>([
            ["scheme", "dark"],
            ["scheme-website-config-default", "light"]
        ]);
        const localStorage = {
            "getItem": (key: string) => map.get(key) ?? null,
            "setItem": (key: string, value: string) => {
                map.set(key, value);
            },
            "removeItem": (key: string) => {
                map.delete(key);
            }
        };

        const attributes = runScript({ localStorage, "defaultColorScheme": "light" });

        expect(attributes.get(data_fr_theme)).toBe("dark");
        expect(attributes.get(data_fr_scheme)).toBe("dark");
    });

    it("still applies the default color scheme when localStorage access throws (storage blocked)", () => {
        const attributes = runScript({
            "localStorage": blockedLocalStorage,
            "defaultColorScheme": "dark"
        });

        expect(attributes.get(data_fr_theme)).toBe("dark");
        expect(attributes.get(data_fr_scheme)).toBe("dark");
    });

    it("falls back to light when nothing is persisted, storage is blocked and matchMedia is unavailable", () => {
        const attributes = runScript({
            "localStorage": blockedLocalStorage,
            "defaultColorScheme": "system"
        });

        expect(attributes.get(data_fr_theme)).toBe("light");
        expect(attributes.get(data_fr_scheme)).toBe("system");
    });
});
