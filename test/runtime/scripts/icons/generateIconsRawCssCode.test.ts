import { it, expect } from "vitest";
import { generateIconsRawCssCode } from "../../../../src/bin/only-include-used-icons";

it("Successfully css with only used icons", () => {
    const patchedRawCssCodeForCompatWithRemixIcon = `
[target=_blank][class^=ri-]::after,
[target=_blank][class*=" ri-"]::after,
[target=_blank][class^=fr-fi-]::after,
[target=_blank][class*=" fr-fi-"]::after {
  flex: 0 0 auto;
  display: inline-block;
  vertical-align: calc((0.75em - var(--icon-size)) * 0.5);
  background-color: currentColor;
  width: var(--icon-size);
  height: var(--icon-size);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  --icon-size: 1rem;
  -webkit-mask-image: url("icons/system/external-link-line.svg");
  mask-image: url("icons/system/external-link-line.svg");
  content: var(--external-link-content);
  margin-left: 0.25rem;
}

.fr-btns-group--sm .fr-btn:not([class^=ri-]):not([class*=" ri-"]):not([class^=fr-fi-]):not([class*=" fr-fi-"]) {
  font-size: 0.875rem;
  line-height: 1.5rem;
  min-height: 2rem;
  padding: 0.25rem 0.75rem;
}

.fr-follow__social .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg) .fr-btn:not([class^=ri-]):not([class*=" ri-"]):not([class^=fr-fi-]):not([class*=" fr-fi-"]) {
  font-size: 1rem;
  line-height: 1.5rem;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  overflow: hidden;
  white-space: nowrap;
  max-width: 2.5rem;
  max-height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  [class^=ri-]::before,
  [class*=" ri-"]::before,
  [class^=fr-fi-]::before,
  [class*=" fr-fi-"]::before {
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1.5rem;
    height: 1.5rem;
  }
}`.replace(/^\n/, "");

    const expected = `
.fr-icon-ancient-gate-fill::before,
.fr-icon-ancient-gate-fill::after {
    -webkit-mask-image: url("../../icons/buildings/ancient-gate-fill.svg");
    mask-image: url("../../icons/buildings/ancient-gate-fill.svg");
}

.fr-icon-archive-fill::before,
.fr-icon-archive-fill::after {
    -webkit-mask-image: url("../../icons/business/archive-fill.svg");
    mask-image: url("../../icons/business/archive-fill.svg");
}

.ri-base-station-fill::before,
.ri-base-station-fill::after {
    -webkit-mask-image: url("../../icons/remixicon/base-station-fill.svg");
    mask-image: url("../../icons/remixicon/base-station-fill.svg");
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .fr-icon-ancient-gate-fill::before,
    .fr-icon-ancient-gate-fill::after {
        background-image: url("../../icons/buildings/ancient-gate-fill.svg");
    }
    
    .fr-icon-archive-fill::before,
    .fr-icon-archive-fill::after {
        background-image: url("../../icons/business/archive-fill.svg");
    }
    
    .ri-base-station-fill::before,
    .ri-base-station-fill::after {
        background-image: url("../../icons/remixicon/base-station-fill.svg");
    }
    
}

[target=_blank][class^=ri-]::after,
[target=_blank][class*=" ri-"]::after,
[target=_blank][class^=fr-fi-]::after,
[target=_blank][class*=" fr-fi-"]::after {
  flex: 0 0 auto;
  display: inline-block;
  vertical-align: calc((0.75em - var(--icon-size)) * 0.5);
  background-color: currentColor;
  width: var(--icon-size);
  height: var(--icon-size);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  --icon-size: 1rem;
  -webkit-mask-image: url("icons/system/external-link-line.svg");
  mask-image: url("icons/system/external-link-line.svg");
  content: var(--external-link-content);
  margin-left: 0.25rem;
}

.fr-btns-group--sm .fr-btn:not([class^=ri-]):not([class*=" ri-"]):not([class^=fr-fi-]):not([class*=" fr-fi-"]) {
  font-size: 0.875rem;
  line-height: 1.5rem;
  min-height: 2rem;
  padding: 0.25rem 0.75rem;
}

.fr-follow__social .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg) .fr-btn:not([class^=ri-]):not([class*=" ri-"]):not([class^=fr-fi-]):not([class*=" fr-fi-"]) {
  font-size: 1rem;
  line-height: 1.5rem;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  overflow: hidden;
  white-space: nowrap;
  max-width: 2.5rem;
  max-height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  [class^=ri-]::before,
  [class*=" ri-"]::before,
  [class^=fr-fi-]::before,
  [class*=" fr-fi-"]::before {
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1.5rem;
    height: 1.5rem;
  }
}`.replace(/^\n/, "");

    const got = generateIconsRawCssCode({
        patchedRawCssCodeForCompatWithRemixIcon,
        "usedIcons": [
            {
                "prefix": "fr-icon-",
                "iconId": "ancient-gate-fill",
                "svgRelativePath": "../../icons/buildings/ancient-gate-fill.svg"
            },
            {
                "prefix": "fr-icon-",
                "iconId": "archive-fill",
                "svgRelativePath": "../../icons/business/archive-fill.svg"
            },
            {
                "prefix": "ri-",
                "iconId": "base-station-fill"
            }
        ]
    });

    expect(got).toEqual(expected);
});
