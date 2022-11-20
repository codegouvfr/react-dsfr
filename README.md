<p align="center">
    <img src="https://github.com/codegouvfr/react-dsfr/releases/download/assets/dsfr-react_repo-card.png">  
</p>
<p align="center">
    🇫🇷 <i><a href="https://www.systeme-de-design.gouv.fr/">French State Design System</a> React integration</i> 🇫🇷 
    <br>
    <br>
    <a href="https://github.com/codegouvfr/react-dsfr/actions">
      <img src="https://github.com/codegouvfr/react-dsfr/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://www.npmjs.com/package/@codegouvfr/react-dsfr">
      <img src="https://img.shields.io/npm/v/@codegouvfr/react-dsfr?logo=npm">
    </a>
    <a href="https://bundlephobia.com/package/@codegouvfr/react-dsfr">
      <img src="https://img.shields.io/bundlephobia/minzip/@codegouvfr/react-dsfr">
    </a>
    <a href="https://github.com/codegouvfr/react-dsfr/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@codegouvfr/react-dsfr">
    </a>
</p>
<p align="center">
  <a href="https://etalab-2.gitbook.io/dsfr-react/">Documentation</a>
</p>

This module is a wrapper/compatibility layer for [@gouvfr/dsfr](https://github.com/GouvernementFR/dsfr), the vanilla JS/CSS implementation of the DSFR.

> For TypeScript and JavaScript projects.   

-   [x] Fully TypeSafe, well documented API.
-   [x] Always in up to date with latest the DSFR evolutions.
        Code and Types generated from [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.
-   [x] Exactly the same look and feel than with [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr).
-   [x] No [white flash when reloading in SSR setup](https://github.com/codegouvfr/@codegouvfr/react-dsfr/issues/2#issuecomment-1257263480).
-   [x] [Perfect integration with all major React framework: Next.js, Create React App, Vue](https://etalab-2.gitbook.io/dsfr-react/).
-   [ ] All [the components](https://www.systeme-de-design.gouv.fr/elements-d-interface) are implemented (2/42)
-   [x] Three shakable distribution, cherry pick the components you import. (It's not all in a big .js bundle)
-   [ ] Optional integration with [MUI](https://mui.com/). If you use MUI components they will
        be automatically adapted to look like [DSFR components](https://www.systeme-de-design.gouv.fr/elements-d-interface).
-   [x] Enable CSS in JS by providing a `useTheme()` hooks that exposes the correct colors options and decision
        for the currently enabled color scheme.
-   [x] Opt-in i18n, built in text can be displayed in multiple languages and user can provide extra translations.

This module is a product of [Etalab's Free and open source software pole](https://communs.numerique.gouv.fr/a-propos/).
[I](https://github.com/garronej)'m working full time on this project. You can expect rapid development. 🚀

<p align="center">
  <a href="https://etalab-2.gitbook.io/dsfr-react/">Get started</a>
</p>

# Development

Here are instructions for contributing, if you are looking to **use** `@codegouvfr/react-dsfr` heads over to the [documentation page](https://etalab-2.gitbook.io/dsfr-react/).

```bash
git clone https://github.com/codegouvfr/react-dsfr
cd react-dsfr
yarn
yarn start-cra  # For testing in in a Create React App setup
yarn start-next # For testing in a Next.js setup
yarn start-vite # For testing in a Vite setup

# Run all unit test (test/runtime):
yarn test
# Run only test/runtime/cssVariable.test.ts (for example)
npx vitest -t "Resolution of CSS variables"

# Debugging while unit testing
```

## How to publish a new version on NPM, how to release a beta version

This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the
documentation of this starter for understanding the lifecycle of this repo.
