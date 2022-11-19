import { it, expect } from "vitest";
import { getPatchedRawCssCodeForCompatWithRemixIcon } from "../../../../src/scripts/cssToTs/icons";

it("Successfully generates patched css for remixicon support", () => {
    const rawCssCode = `
[target=_blank]::after {
  flex: 0 0 auto;
}

[target=_blank][class^=fr-icon-]::after,
[target=_blank][class*=" fr-icon-"]::after,
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

.fr-icon--xs::before,
.fr-icon--xs::after {
  --icon-size: 0.75rem;
}

.fr-btns-group--sm .fr-btn:not([class^=fr-icon-]):not([class*=" fr-icon-"]):not([class^=fr-fi-]):not([class*=" fr-fi-"]) {
  font-size: 0.875rem;
  line-height: 1.5rem;
  min-height: 2rem;
  padding: 0.25rem 0.75rem;
}

.fr-follow__social .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg) .fr-btn:not([class^=fr-icon-]):not([class*=" fr-icon-"]):not([class^=fr-fi-]):not([class*=" fr-fi-"]) {
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
  .fr-enlarge-link [href] {
    text-decoration: none;
  }

  [href],
  .fr-reset-link {
    text-decoration: underline;
  }


  [class^=fr-icon-]::before,
  [class*=" fr-icon-"]::before,
  [class^=fr-fi-]::before,
  [class*=" fr-fi-"]::before {
    background-color: transparent;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1.5rem;
    height: 1.5rem;
  }

  .fr-icon--xs::before {
    width: 0.75rem;
    height: 0.75rem;
  }

}

@media (min-width: 36em) { }

@media (min-width: 48em) { }

@media (min-width: 62em) { }

@media (min-width: 78em) { }
`;

    const expected = `
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
  -webkit-mask-image: url("../../icons/system/external-link-line.svg");
  mask-image: url("../../icons/system/external-link-line.svg");
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

    const got = getPatchedRawCssCodeForCompatWithRemixIcon({ rawCssCode });

    expect(got).toEqual(expected);
});
