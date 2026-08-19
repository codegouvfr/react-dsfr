import { it, expect, describe } from "vitest";
import {
    generateDsfrCssCode,
    rewriteCssRelativeUrls,
    patchCoreCssCodeForCompatWithMui,
    getReferencedAssetRelativePaths
} from "../../../../src/bin/only-include-used-components";

describe("rewriteCssRelativeUrls", () => {
    it("rewrites urls relative to the css file into urls relative to the dsfr directory", () => {
        expect(
            rewriteCssRelativeUrls({
                "rawCssCode": `.fr-accordion__btn::after{-webkit-mask-image:url("../../icons/arrows/arrow-down-s-line.svg")}`,
                "cssFileRelativeDirPath": "component/accordion"
            })
        ).toBe(
            `.fr-accordion__btn::after{-webkit-mask-image:url("icons/arrows/arrow-down-s-line.svg")}`
        );

        expect(
            rewriteCssRelativeUrls({
                "rawCssCode": `@font-face{src:url("../fonts/Marianne-Regular.woff2") format("woff2")}`,
                "cssFileRelativeDirPath": "core"
            })
        ).toBe(`@font-face{src:url("fonts/Marianne-Regular.woff2") format("woff2")}`);
    });

    it("leaves data, http and absolute urls untouched", () => {
        for (const url of [
            "data:image/svg+xml;base64,abc",
            "https://example.com/a.svg",
            "/a.svg"
        ]) {
            const rawCssCode = `.foo{background-image:url("${url}")}`;

            expect(
                rewriteCssRelativeUrls({
                    rawCssCode,
                    "cssFileRelativeDirPath": "component/header"
                })
            ).toBe(rawCssCode);
        }
    });
});

describe("patchCoreCssCodeForCompatWithMui", () => {
    it("excludes Mui buttons from the DSFR hover and active rules", () => {
        expect(
            patchCoreCssCodeForCompatWithMui({
                "rawCssCode":
                    "@media (hover:hover) and (pointer:fine){a[href]:hover,button:not(:disabled):hover,input[type=button]:not(:disabled):hover{background-color:var(--hover-tint)}a[href]:active,button:not(:disabled):active{background-color:var(--active-tint)}}"
            })
        ).toBe(
            '@media (hover:hover) and (pointer:fine){a[href]:hover,button:not(:disabled):hover:not([class^="Mui"]),input[type=button]:not(:disabled):hover{background-color:var(--hover-tint)}a[href]:active,button:not(:disabled):active:not([class^="Mui"]){background-color:var(--active-tint)}}'
        );
    });
});

describe("generateDsfrCssCode", () => {
    const fakeDsfrFiles: Record<string, string> = {
        "core/core.main.min.css": '@charset "UTF-8";.core{--x:url("../fonts/f.woff2")}',
        "core/core.print.min.css": "@media print{.core-print{display:none}}",
        "scheme/scheme.min.css": ":root[data-fr-theme=dark]{--grey:#161616}",
        "component/button/button.main.min.css": ".fr-btn{color:red}",
        "component/button/button.print.min.css": "@media print{.fr-btn{color:black}}",
        "component/header/header.main.min.css": '.fr-header{background:url("../../icons/a.svg")}',
        "component/header/header.print.min.css": "@media print{.fr-header{display:none}}",
        // The download component only ships a non "main" variant.
        "component/download/download.min.css": ".fr-download{color:blue}"
    };

    const readDsfrFile = (fileRelativePath: string) => fakeDsfrFiles[fileRelativePath];

    it("always includes core and scheme, includes only requested components, preserves the cascade order", () => {
        const generated = generateDsfrCssCode({
            "dsfrComponents": ["header", "button", "download"],
            "isMinified": true,
            readDsfrFile
        });

        // Cascade order is button < download < header regardless of the requested order.
        const indexes = [
            ".core{",
            ":root[data-fr-theme=dark]",
            ".fr-btn{",
            ".fr-download{",
            ".fr-header{"
        ].map(marker => generated.indexOf(marker));

        expect(indexes.every(index => index !== -1)).toBe(true);
        expect([...indexes].sort((a, b) => a - b)).toStrictEqual(indexes);

        // Print styles come after every main style.
        expect(generated.indexOf(".core-print")).toBeGreaterThan(generated.indexOf(".fr-header{"));
        expect(generated.indexOf("@media print{.fr-btn")).toBeGreaterThan(
            generated.indexOf(".core-print")
        );
    });

    it("excludes the components that are not requested", () => {
        const generated = generateDsfrCssCode({
            "dsfrComponents": ["button"],
            "isMinified": true,
            readDsfrFile
        });

        expect(generated).toContain(".fr-btn{");
        expect(generated).not.toContain(".fr-header{");
        expect(generated).not.toContain(".fr-download{");
    });

    it("rewrites asset urls and strips @charset", () => {
        const generated = generateDsfrCssCode({
            "dsfrComponents": ["header"],
            "isMinified": true,
            readDsfrFile
        });

        expect(generated).toContain('url("fonts/f.woff2")');
        expect(generated).toContain('url("icons/a.svg")');
        expect(generated).not.toContain("@charset");
    });

    it("is deterministic, running it twice yields the same output", () => {
        const params = {
            "dsfrComponents": ["button", "header"],
            "isMinified": true,
            readDsfrFile
        };

        expect(generateDsfrCssCode(params)).toBe(generateDsfrCssCode(params));
    });
});

describe("getReferencedAssetRelativePaths", () => {
    it("collects the local assets referenced by the generated stylesheet", () => {
        expect(
            getReferencedAssetRelativePaths({
                "rawCssCode": [
                    `@font-face{src:url("fonts/Marianne-Regular.woff2") format("woff2")}`,
                    `.fr-header__menu{-webkit-mask-image:url(icons/system/menu-fill.svg)}`,
                    `.fr-btn--close{mask-image:url('icons/system/close-line.svg')}`
                ].join("")
            }).sort()
        ).toStrictEqual([
            "fonts/Marianne-Regular.woff2",
            "icons/system/close-line.svg",
            "icons/system/menu-fill.svg"
        ]);
    });

    it("deduplicates, strips query strings and skips data, http and absolute urls", () => {
        expect(
            getReferencedAssetRelativePaths({
                "rawCssCode": [
                    `.a{background-image:url("icons/a.svg?v=1")}`,
                    `.b{background-image:url("icons/a.svg")}`,
                    `.c{background-image:url("data:image/svg+xml;base64,abc")}`,
                    `.d{background-image:url("https://example.com/b.svg")}`,
                    `.e{background-image:url("/c.svg")}`
                ].join("")
            })
        ).toStrictEqual(["icons/a.svg"]);
    });
});
