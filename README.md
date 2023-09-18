<p align="center">
    <img src="https://github.com/codegouvfr/react-dsfr/releases/download/assets/dsfr-react_repo-card.png">  
</p>
<p align="center">
    🇫🇷 <i><a href="https://www.systeme-de-design.gouv.fr/">French State Design System</a> React toolkit</i> 🇫🇷 
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
-   [x] [Perfect integration with all major React framework: Next.js (PagesDir and AppDir), Create React App, Vue](https://guides.react-dsfr.fr/).
-   [x] (Almost) All [the components](https://www.systeme-de-design.gouv.fr/elements-d-interface) are [implemented](https://components.react-dsfr.codegouv.studio/)
-   [x] Three shakable distribution, cherry pick the components you import. (It's not all in a big .js bundle)
-   [x] Optional integration with [MUI](https://mui.com/). If you use MUI components they will
        be automatically adapted to look like [DSFR components](https://www.systeme-de-design.gouv.fr/elements-d-interface). See [documentation](https://guides.react-dsfr.fr/mui-integration).
-   [x] Enable CSS in JS by providing a `useColors()` hooks that exposes the correct colors options and decision
        for the currently enabled color scheme.
-   [x] Opt-in i18n, built in text can be displayed in multiple languages and user can provide extra translations.
-   [x] [Support routing libraries](https://guides.react-dsfr.fr/routing) like react-router.

> 💡 Need ready to use, DSFR compliant login and register pages? Checkout [keycloak-theme-dsfr](https://github.com/codegouvfr/keycloak-theme-dsfr).

<p align="center">
  <a href="https://guides.react-dsfr.fr/">🚀 Get started 🚀 </a>
</p>

# Governance

This module is a product of [Etalab's Free and open source software pole](https://communs.numerique.gouv.fr/a-propos/).

This project is co-maintained by public servants from various French administrations.

-   [Joseph Garrone](@garronej)
-   [Julien Bouquillon](@revolunet) - DNUM des ministères sociaux
-   [Dylan DECRULLE](@ddecrulle) - Insee

## Development

```bash
git clone https://github.com/codegouvfr/react-dsfr
cd react-dsfr
bun install -y

# Starting storybook
bun run storybook

# Starting test apps
bun run start-cra  # For testing in in a Create React App setup
bun run start-vite # For testing in a Vite setup
bun run start-next-pagesdir # For testing in a Next.js 13 PagesDir setup (the default setup)
bun run start-next-appdir # For testing in a Next.js 13 AppDir setup

# Run all unit test (test/runtime):
bun run test
# Run only test/runtime/cssVariable.test.ts (for example)
bunx vitest -t "Resolution of CSS variables"

# Debugging while unit testing
```

### Want to contribute?

Thank you! See [the contribution guide](https://github.com/codegouvfr/react-dsfr/blob/main/CONTRIBUTING.md).

### How to publish a new version on NPM, how to release a beta version

This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the
documentation of this starter for understanding the lifecycle of this repo.

## Use-cases

A few projects that use `@codegouvfr/react-dsfr`.

-   https://code.gouv.fr/sill
-   https://immersion-facile.beta.gouv.fr/
-   https://refugies.info/fr
-   https://www.mediateur-public.fr/
-   https://signal.conso.gouv.fr/
-   https://observatoire.numerique.gouv.fr/
-   https://github.com/BaseAdresseNationale/adresse.data.gouv.fr
-   https://github.com/DISIC/observatoire.numerique.gouv.fr
-   https://github.com/DISIC/monfranceconnect
-   https://github.com/InseeFr/Lunatic-DSFR
-   https://github.com/EIG6-Geocommuns/lidarviz-front
-   https://github.com/EIG6-Geocommuns/geocommuns-core
-   https://github.com/SocialGouv/bpco-site
-   https://github.com/EIG6-ArtificIA/predictia_front
-   https://github.com/BaseAdresseNationale/bal-admin
-   https://github.com/etalab/sill-web
-   https://github.com/inclusion-numerique/mediature
-   https://territoiresentransitions.fr (maybe)

Keep in mind that the project has been released recently so it's only natural
that there is only a few projects in production using it.
