/**
 * `localStorage` wrapper that never throws.
 *
 * Chromium raises a `SecurityError` as soon as `window.localStorage` is *read* when storage is
 * blocked for the document (third-party iframe with third-party cookies disabled, WebView with
 * storage disabled, enterprise policy…). Safari in private mode used to throw a
 * `QuotaExceededError` on `setItem`. In all those cases we behave as if the storage was empty:
 * `getItem` returns `null` and writes are silently dropped, so the caller falls back to its
 * defaults instead of crashing (https://github.com/codegouvfr/react-dsfr/issues/442).
 */
export const safeLocalStorage = {
    "getItem": (key: string): string | null => {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    "setItem": (key: string, value: string): void => {
        try {
            localStorage.setItem(key, value);
        } catch {
            // Storage unavailable: the preference simply won't be persisted.
        }
    },
    "removeItem": (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch {
            // Storage unavailable: nothing to remove.
        }
    }
};
