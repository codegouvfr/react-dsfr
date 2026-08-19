Here are the scripts exposed as utility to the user of `react-dsfr`

| Command                                       | Standalone bin                 | What it does                                                                       |
| --------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| `npx react-dsfr copy-static-assets`           | `copy-dsfr-to-public`          | Copies the DSFR assets into `public/dsfr` (SPA setups: Vite, CRA).                 |
| `npx react-dsfr update-icons`                 | `only-include-used-icons`      | Rebuilds `dsfr/utility/icons/icons.min.css` with only the icons you use.           |
| `npx react-dsfr only-include-used-components` | `only-include-used-components` | Rebuilds `dsfr/dsfr.css` and `dsfr/dsfr.min.css` with only the components you use. |

Every script accepts `--projectDir <path>` to point at the react project (monorepos),
defaulting to the current working directory. `update-icons` and
`only-include-used-components` also accept `--silent` to disable the `console.log`
(warnings are never silenced).

# `only-include-used-components`

Opt-in. `dsfr.min.css` weighs ~600 kB raw / ~76 kB gzip and is loaded render-blocking,
while most apps use a small subset of the DSFR components.

This script rebuilds `dsfr.css` and `dsfr.min.css` in `node_modules` (and
`public/dsfr/dsfr.min.css` in SPA setups) by concatenating the granular stylesheets
already shipped in the package (`dsfr/core/*`, `dsfr/scheme/*`, `dsfr/component/<name>/*`).
**Whole components are included or excluded, never individual rules**, so everything the
DSFR JavaScript toggles at runtime (`data-fr-js-*`, `fr-collapse--expanded`, ...) keeps
working — unlike a PurgeCSS style pass.

## Usage

```bash
npx react-dsfr only-include-used-components
```

Typically as a `prebuild`/`predev` step:

```jsonc
"scripts": {
    "predev": "react-dsfr update-icons && react-dsfr only-include-used-components",
    "prebuild": "react-dsfr update-icons && react-dsfr only-include-used-components"
}
```

## Ordering with `copy-static-assets`

In SPA setups (Vite, CRA), run `copy-static-assets` **before**
`only-include-used-components`, not after:

```jsonc
"prebuild": "react-dsfr copy-static-assets && react-dsfr update-icons && react-dsfr only-include-used-components"
```

`copy-static-assets` builds its keep list from the `url()` of the `dsfr.min.css` it finds
in `node_modules`, then early returns on every later run as long as
`public/dsfr/version.txt` matches the `@gouvfr/dsfr` version. Running it against an
already trimmed stylesheet freezes `public/dsfr` on that asset subset.
`only-include-used-components` copies the assets its own output references, so a component
added later still gets its icons — but keeping the order above avoids relying on it.

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
npx react-dsfr only-include-used-components --strict
```

Please [report](https://github.com/codegouvfr/react-dsfr/issues) any module that triggers
the fail-safe, the static tables need to be updated.

## Known limitations

-   Detection is textual: a dynamically composed import path or class name is not seen.
    That is what `additionalComponents` is for.
-   `utility/colors` and `utility/icons` are not part of `dsfr.css` upstream and are left
    untouched (icons are handled by `update-icons`).
