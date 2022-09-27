<p align="center">
    <img src="https://github.com/codegouvfr/dsfr-react/releases/download/assets/dsfr-react_repo-card.png">  
</p>
<p align="center">
    🇫🇷 <i><a href="https://www.systeme-de-design.gouv.fr/">French State Design System</a> React component library</i> 🇫🇷 
    <br>
    <br>
    <a href="https://github.com/codegouvfr/dsfr-react/actions">
      <img src="https://github.com/codegouvfr/dsfr-react/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://www.npmjs.com/package/dsfr-react">
      <img src="https://img.shields.io/npm/v/dsfr-react?logo=npm">
    </a>
    <a href="https://bundlephobia.com/package/dsfr-react">
      <img src="https://img.shields.io/bundlephobia/minzip/dsfr-react">
    </a>
    <a href="https://github.com/codegouvfr/dsfr-react/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/dsfr-react">
    </a>
</p>
<p align="center">
  <a href="https://etalab-2.gitbook.io/dsfr-react/">Documentation</a>
</p>

This module is a wrapper/compatibility layer for [@gouvfr/dsfr](https://github.com/GouvernementFR/dsfr), the vanilla JS/CSS implementation of the DSFR.

-   [x] Fully TypeSafe, well documented API.
-   [ ] Always in up to date with latest the DSFR evolutions.
        Code and Types generated from [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.
-   [x] Exactly the same look and feel than with [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr).
-   [x] No [white flash when reloading in SSR setup](https://github.com/codegouvfr/dsfr-react/issues/2#issuecomment-1257263480).
-   [x] No [flash of unstyled text](https://fonts.google.com/knowledge/glossary/fout).
-   [x] [Perfect integration with all major React framework: Next.js, Create React App, Vue](https://etalab-2.gitbook.io/dsfr-react/).
-   [ ] All [the components](https://www.systeme-de-design.gouv.fr/elements-d-interface) are implemented (0/42)
-   [x] Three shakable distribution, cherry pick the components you import. (It's not all in a big .js bundle)
-   [ ] Optional integration with [MUI](https://mui.com/). If you use MUI components they will
        be automatically adapted to look like [DSFR components](https://www.systeme-de-design.gouv.fr/elements-d-interface).
-   [ ] Enable CSS in JS by providing a `useTheme()` hooks that exposes the correct colors options and decision
        for the currently enabled color scheme.

This module is a product of [Etalab's Free and open source software pole](https://communs.numerique.gouv.fr/a-propos/).
[I](https://github.com/garronej)'m working full time on this project. You can expect rapid development. 🚀

<p align="center">
  <a href="https://etalab-2.gitbook.io/dsfr-react/">Get started</a>
</p>

# Development

Here are instructions for contributing, if you are looking to **use** `dsfr-react` heads over to the [documentation page](https://etalab-2.gitbook.io/dsfr-react/).

```bash
yarn
yarn build
npx tsc -w
npx tsc -p src/bin -w & npx tsc -p src -w
# Open another Terminal
yarn start_cra  # For testing in in a Create React App setup
yarn start_next # For testing in a Next.js setup
yarn start_vite # For testing in a Vite setup

# Debugging while unit testing

yarn build:test
npx tsc -p src/test -w
# Open a new terminal
node dist_test/test/bin/main.js
```

> When you want to import assets from the `./dsfr/` directory
> you must assume it's located in `./src/dsfr` because it's where
> it's going to be relative to the transpiled JS files.

## How to publish a new version on NPM, how to release a beta version

This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the
documentation of this starter for understanding the lifecycle of this repo.
