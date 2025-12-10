<p align="center">
    <img src="https://github.com/codegouvfr/react-dsfr/releases/download/assets/dsfr-react_repo-card.png">  
</p>
<p align="center">
    🇫🇷 <i><a href="https://www.systeme-de-design.gouv.fr/">French State Design System</a> React toolkit</i> 🇫🇷 
    <br>
    <br>
    <a href="https://github.com/codegouvfr/react-dsfr/actions">
      <img src="https://github.com/codegouvfr/react-dsfr/actions/workflows/ci.yaml/badge.svg">
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
  <a href="https://components.react-dsfr.codegouv.studio">Components documentation</a>
  -
  <a href="https://react-dsfr.codegouv.studio">Guides</a>
  -
  <a href="https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx">Playground</a>
</p>

👉 Version française du README [ici](https://github.com/codegouvfr/react-dsfr/blob/main/README.fr.md).

> WARNING: This Design System is only meant to be used for official French's public service websites.  
> Its main purpose is to make it easy to identify governmental websites for citizens. [See terms](https://www.systeme-de-design.gouv.fr/utilisation-et-organisation/perimetre-d-application).

This module is an advanced toolkit that leverages [@gouvfr/dsfr](https://github.com/GouvernementFR/dsfr), the vanilla JS/CSS implementation of the DSFR.

<a href="https://youtu.be/5q88JgXUAY4">
  <img width="1712" alt="image" src="https://user-images.githubusercontent.com/6702424/224423044-c1823249-eab6-4844-af43-d059c01416af.png">
</a>

> While this module is written in TypeScript, using TypeScript in your application is optional (but recommended as it comes with outstanding benefits to both you and your codebase).

-   [x] Fully TypeSafe, well documented API.
-   [x] Always in up to date with latest the DSFR evolutions.
        Code and Types generated from [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.
-   [x] Exactly the same look and feel than with [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr).
-   [x] No [white flash when reloading in SSR setup](https://github.com/codegouvfr/@codegouvfr/react-dsfr/issues/2#issuecomment-1257263480).
-   [x] Most components are server component ready. The others are labeled with `"use client";`
-   [x] [Perfect integration with all major React framework: Next.js (PagesDir and AppDir), Create React App, Vite](https://react-dsfr.codegouv.studio/).
-   [x] (Almost) All [the components](https://www.systeme-de-design.gouv.fr/elements-d-interface) are [implemented](https://components.react-dsfr.codegouv.studio/)
-   [x] Three shakable distribution, cherry pick the components you import. (It's not all in a big .js bundle)
-   [x] Optional integration with [MUI](https://mui.com/). If you use MUI components they will
        be automatically adapted to look like [DSFR components](https://www.systeme-de-design.gouv.fr/elements-d-interface). See [documentation](https://react-dsfr.codegouv.studio/mui-integration).
-   [x] Enable the usage of CSS in JS solutions. [Doc](https://react-dsfr.codegouv.studio/css-in-js).
-   [x] Opt-in i18n, built in text can be displayed in multiple languages and user can provide extra translations.
-   [x] [Support routing libraries](https://react-dsfr.codegouv.studio/routing) like react-router.

> 💡 Need ready to use, DSFR compliant login and register pages? Checkout [keycloak-theme-dsfr](https://github.com/codegouvfr/keycloak-theme-dsfr).

<p align="center">
  <a href="https://react-dsfr.codegouv.studio/">🚀 Get started 🚀 </a>
</p>

# Governance

This module is a product of [Etalab's Free and open source software pole](https://code.gouv.fr/en/mission/).

This project is co-maintained by public servants from various French administrations:

-   [Joseph Garrone](https://github.com/garronej) - Insee
-   [Julien Bouquillon](https://github.com/revolunet) - DNUM des ministères sociaux
-   [Dylan DECRULLE](https://github.com/ddecrulle) - Insee
-   [Enguerran Weiss](https://github.com/enguerranws) - Plateforme de l'Inclusion

## Development (for contributing to the project)

```bash
git clone https://github.com/codegouvfr/react-dsfr
cd react-dsfr
yarn

# Starting storybook
yarn storybook

# Starting test apps
yarn start-cra  # For testing in a Create React App setup
yarn start-vite # For testing in a Vite setup
yarn start-next-pagesdir # For testing in a Next.js 13 PagesDir setup (the default setup)
yarn start-next-appdir # For testing in a Next.js 13 AppDir setup

# Run all unit test (test/runtime):
yarn test
# Run only test/runtime/cssVariable.test.ts (for example)
npx vitest -t "Resolution of CSS variables"
```

### Want to contribute?

Thank you! See [the contribution guide](https://github.com/codegouvfr/react-dsfr/blob/main/CONTRIBUTING.md).

### How to publish a new version on NPM, how to release a beta version

This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the
documentation of this starter for understanding the lifecycle of this repo.

## Use-cases

A few projects that use `@codegouvfr/react-dsfr`.

-   https://adresse.data.gouv.fr
-   https://cartes.gouv.fr
-   https://code.gouv.fr/sill
-   https://diagoriente.beta.gouv.fr
-   https://egapro.travail.gouv.fr
-   https://github.com/BaseAdresseNationale/bal-admin
-   https://github.com/DISIC/monfranceconnect
-   https://github.com/EIG6-ArtificIA/predictia_front
-   https://github.com/EIG6-Geocommuns/geocommuns-core
-   https://github.com/EIG6-Geocommuns/lidarviz-front
-   https://github.com/inclusion-numerique/mediature
-   https://github.com/InseeFr/Lunatic-DSFR
-   https://github.com/SocialGouv/bpco-site
-   https://immersion-facile.beta.gouv.fr
-   https://maisondelautisme.gouv.fr/
-   https://observatoire.numerique.gouv.fr
-   https://potentiel.beta.gouv.fr
-   https://refugies.info
-   https://signal.conso.gouv.fr
-   https://territoiresentransitions.fr
-   https://www.mediateur-public.fr
