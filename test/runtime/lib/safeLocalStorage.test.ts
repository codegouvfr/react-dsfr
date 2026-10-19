import { describe, it, expect, afterEach } from "vitest";
import { safeLocalStorage } from "../../../src/tools/safeLocalStorage";

function installLocalStorage(storage: unknown) {
    Object.defineProperty(globalThis, "localStorage", {
        "configurable": true,
        "get": () => storage
    });
}

function installBlockedLocalStorage() {
    // Chromium behavior when storage is blocked: the *getter* of window.localStorage throws.
    Object.defineProperty(globalThis, "localStorage", {
        "configurable": true,
        "get": () => {
            throw new DOMException(
                "Failed to read the 'localStorage' property from 'Window': Access is denied for this document.",
                "SecurityError"
            );
        }
    });
}

function createInMemoryStorage() {
    const map = new Map<string, string>();
    return {
        "getItem": (key: string) => map.get(key) ?? null,
        "setItem": (key: string, value: string) => {
            map.set(key, value);
        },
        "removeItem": (key: string) => {
            map.delete(key);
        }
    };
}

describe("safeLocalStorage", () => {
    afterEach(() => {
        Reflect.deleteProperty(globalThis, "localStorage");
    });

    it("delegates to localStorage when it is available", () => {
        installLocalStorage(createInMemoryStorage());

        expect(safeLocalStorage.getItem("scheme")).toBe(null);
        safeLocalStorage.setItem("scheme", "dark");
        expect(safeLocalStorage.getItem("scheme")).toBe("dark");
        safeLocalStorage.removeItem("scheme");
        expect(safeLocalStorage.getItem("scheme")).toBe(null);
    });

    it("behaves as an empty storage when reading window.localStorage throws (storage blocked)", () => {
        installBlockedLocalStorage();

        expect(() => localStorage).toThrow("Access is denied");

        expect(safeLocalStorage.getItem("scheme")).toBe(null);
        expect(() => safeLocalStorage.setItem("scheme", "dark")).not.toThrow();
        expect(() => safeLocalStorage.removeItem("scheme")).not.toThrow();
    });

    it("swallows write errors (e.g. QuotaExceededError) but keeps reads working", () => {
        const storage = createInMemoryStorage();
        installLocalStorage({
            ...storage,
            "setItem": () => {
                throw new DOMException("The quota has been exceeded.", "QuotaExceededError");
            }
        });

        expect(() => safeLocalStorage.setItem("scheme", "dark")).not.toThrow();
        expect(safeLocalStorage.getItem("scheme")).toBe(null);
    });
});
