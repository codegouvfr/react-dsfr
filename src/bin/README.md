Here are the scripts exposed as utility to the user of `react-dsfr`

| Command                             | Standalone bin            | What it does                                                              |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------------------- |
| `npx react-dsfr copy-static-assets` | `copy-dsfr-to-public`     | Copies the DSFR assets into `public/dsfr` (SPA setups: Vite, CRA).        |
| `npx react-dsfr optimize-css`       | —                         | Rebuilds the DSFR stylesheets with only the icons and components you use. |
| `npx react-dsfr update-icons`       | `only-include-used-icons` | Deprecated. Rebuilds the icon stylesheet with only the icons you use.     |

Every script accepts `--projectDir <path>` to point at the react project (monorepos),
defaulting to the current working directory. `optimize-css` and the deprecated
`update-icons` also accept `--silent` to disable `console.log` (warnings are never
silenced). `optimize-css` additionally accepts `--strict`, as described below.

# `optimize-css`

Opt-in. `dsfr.min.css` weighs ~600 kB raw / ~76 kB gzip and is loaded render-blocking,
while most apps use a small subset of the DSFR components.

This command first rebuilds `dsfr/utility/icons/icons.min.css` with only the icons used by
the project. It then rebuilds `dsfr.css` and `dsfr.min.css` in `node_modules` (and
`public/dsfr/dsfr.min.css` in SPA setups) by concatenating the granular stylesheets already
shipped in the package (`dsfr/core/*`, `dsfr/scheme/*`, `dsfr/component/<name>/*`). **Whole
components are included or excluded, never individual rules**, so everything the DSFR
JavaScript toggles at runtime (`data-fr-js-*`, `fr-collapse--expanded`, ...) keeps working
— unlike a PurgeCSS style pass.

## Usage

```bash
npx react-dsfr optimize-css
```

Typically as a `prebuild`/`predev` step:

```jsonc
"scripts": {
    "predev": "react-dsfr optimize-css",
    "prebuild": "react-dsfr optimize-css"
}
```

## Ordering with `copy-static-assets`

In SPA setups (Vite, CRA), run `copy-static-assets` **before**
`optimize-css`, not after:

```jsonc
"prebuild": "react-dsfr copy-static-assets && react-dsfr optimize-css"
```

`copy-static-assets` builds its keep list from the `url()` of the `dsfr.min.css` it finds
in `node_modules`, then early returns on every later run as long as
`public/dsfr/version.txt` matches the `@gouvfr/dsfr` version. Running it against an
already trimmed stylesheet freezes `public/dsfr` on that asset subset. `optimize-css`
copies the assets its own output references, so a component added later still gets its
icons — but keeping the order above avoids relying on it.

## Detection of used components

1.  **Imports** of `@codegouvfr/react-dsfr/<Module>` in your sources
    (`.ts`, `.tsx`, `.js`, `.jsx`, `.mdx`, `.html`, `.svelte`, `.vue`), resolved through a
    static table that includes transitive dependencies (a `Header` renders a navigation, a
    search bar and a modal).
2.  **Raw class names**, e.g. `fr.cx("fr-table")` or a plain `class="fr-table"`, for when
    you use DSFR classes without the React component.

Stylesheets (`.css`, `.scss`, ...) are **not** scanned: class name detection is substring
based, so a single compiled bundle would mark every component as used. Use
`additionalComponents` below for the components you only reference from a stylesheet.

## `additionalComponents`, the escape hatch

For anything the detection cannot see (class names built dynamically, CMS content,
components only referenced from a `@import`ed stylesheet), in your **`package.json`**:

```jsonc
{
    "react-dsfr": {
        "additionalComponents": ["table", "Range"]
    }
}
```

Values are DSFR CSS component names (the `dsfr/component/<name>` directories) or
react-dsfr component names. An unknown value is a hard warning, not a silent no-op.

## Fail-safe and `--strict`

If anything can't be resolved — typically a react-dsfr module added in a newer release that
this script does not know about — the script **warns and includes every component**. The
output is then equivalent to the original bundle: never a broken page, but no trimming
either, and the run still exits `0`.

Because nobody reads warnings in CI, add `--strict` there to turn that fallback into a
failure:

```bash
npx react-dsfr optimize-css --strict
```

Please [report](https://github.com/codegouvfr/react-dsfr/issues) any module that triggers
the fail-safe, the static tables need to be updated.

## `--trim-spacing-utilities`, going further

With component trimming in place, the floor of the stylesheet is the core, and more than
40% of the core is the exhaustive spacing utility grid (`fr-m*-*` / `fr-p*-*`, ~2500
classes, ~78 kB raw / ~11.5 kB gzip) of which most apps use a handful. Unlike component
CSS these classes are never toggled by the DSFR JavaScript, so they can be trimmed per
rule with reasonable guarantees. It is still a different risk profile than whole-file
concatenation, hence a separate opt-in:

```bash
npx react-dsfr optimize-css --trim-spacing-utilities
```

How it stays safe:

-   The rule level surgery is validated at **react-dsfr build time** against a real CSS
    parser, and the validated core stylesheets are fingerprinted in a generated manifest
    (`dsfr/core/spacing-utilities.json`, which also carries the utilities react-dsfr's own
    components render). At run time, trimming only happens if the core file's hash matches:
    on any mismatch the stylesheet ships untrimmed, with a warning.
-   Used utilities are detected as literal class names in the same crawled sources as the
    component detection. A mention in a comment or an url counts as a usage (over-including
    only costs bytes).
-   **Dynamically constructed class names** are detected, and every utility their static
    prefix could produce is kept, with a warning. Exactly two forms are recognized:
    template literal interpolation (`` `fr-mt-${x}w` ``) and string concatenation with `+`
    (`"fr-m" + side`). Anything else — `.concat()`, an array `join`, a class built from its
    suffix (`` `${side}-2v` ``) — is not seen and needs `additionalSpacingUtilities` below.
    `` `fr-icon-${name}` `` does not trigger anything (no spacing class starts with that),
    `` `fr-m${x}` `` keeps all the margins but still trims the paddings, and a bare
    `` `fr-${x}` `` keeps the whole grid.

### `additionalSpacingUtilities`, the escape hatch

For utilities only referenced from a stylesheet or built in ways the detection cannot see,
in your **`package.json`**:

```jsonc
{
    "react-dsfr": {
        "additionalSpacingUtilities": ["fr-mt-2w", "fr-mb-*"]
    }
}
```

A `*` suffix declares a prefix: every utility starting with it is kept, and the dynamic
construction warning it covers is silenced (this is also how you make `--strict` pass when
the dynamic construction is intended). An unknown value is a hard warning and disables
spacing trimming for the run.

Under `--strict`, a missing manifest, an unacknowledged dynamic construction or a core
file mismatch exits non zero instead of silently shipping the untrimmed grid.

## Known limitations

-   Detection is textual: a dynamically composed import path or class name is not seen.
    That is what `additionalComponents` is for.
-   `utility/colors` and `utility/icons` are not part of `dsfr.css` upstream. Colors are
    left untouched; icons are optimized by the first stage of `optimize-css`.

## Deprecated `update-icons` command

`npx react-dsfr update-icons` remains available for compatibility, but emits a deprecation
warning. Use `npx react-dsfr optimize-css`, which performs the icon optimization followed
by the component CSS optimization.
