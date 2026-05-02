<!--@nrg.languages=en,fr-->
<!--@nrg.defaultLanguage=en-->
<!--@nrg.fileNamePattern.fr=README.fr.md-->

<p align="center">
    <img src="https://github.com/codegouvfr/react-dsfr/releases/download/assets/dsfr-react_repo-card.png">  
</p>
<p align="center">
    🇫🇷 <i><a href="https://www.systeme-de-design.gouv.fr/">French State Design System</a> React toolkit</i> 🇫🇷 <!--en-->
    🇫🇷 <i>React intégration pour le <a href="https://www.systeme-de-design.gouv.fr/">System de design du gouvernement français (alias DSFR)</a></i> 🇫🇷 <!--fr-->
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
  <a href="https://components.react-dsfr.codegouv.studio">Components documentation</a><!--en-->
  <a href="https://components.react-dsfr.codegouv.studio">Documentation des composants</a><!--fr-->
  -
  <a href="https://react-dsfr.codegouv.studio">Guides</a><!--en-->
  <a href="https://react-dsfr.codegouv.studio">guides</a><!--fr-->
  -
  <a href="https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx">Playground</a><!--en-->
  <a href="https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx">essai immédiat</a><!--fr-->
</p>

👉 Version française du README [ici](https://github.com/codegouvfr/react-dsfr/blob/main/README.fr.md).<!--en-->
> AVERTISSEMENT : Ce système de conception est uniquement destiné à être utilisé pour les sites web officiels des services publics français.  <!--fr-->
<!--en-->
> Son objectif principal est de faciliter l'identification des sites gouvernementaux par les citoyens. [Voir les conditions](https://www.systeme-de-design.gouv.fr/utilisation-et-organisation/perimetre-d-application).<!--fr-->
> WARNING: This Design System is only meant to be used for official French's public service websites.  <!--en-->
<!--fr-->
> Its main purpose is to make it easy to identify governmental websites for citizens. [See terms](https://www.systeme-de-design.gouv.fr/utilisation-et-organisation/perimetre-d-application).<!--en-->
Ce module est une boîte à outils avancée qui tire parti de [@gouvfr/dsfr](https://github.com/GouvernementFR/dsfr), l'implémentation en JS/CSS vanilla du DSFR.<!--fr-->

This module is an advanced toolkit that leverages [@gouvfr/dsfr](https://github.com/GouvernementFR/dsfr), the vanilla JS/CSS implementation of the DSFR.<!--en-->
<a href="https://youtu.be/5q88JgXUAY4"><!--fr-->
<!--en-->
  <img width="1712" alt="image" src="https://user-images.githubusercontent.com/6702424/224423044-c1823249-eab6-4844-af43-d059c01416af.png"><!--fr-->
<a href="https://youtu.be/5q88JgXUAY4"><!--en-->
</a><!--fr-->
  <img width="1712" alt="image" src="https://user-images.githubusercontent.com/6702424/224423044-c1823249-eab6-4844-af43-d059c01416af.png"><!--en-->
<!--fr-->
</a><!--en-->
> Bien que ce module soit écrit en TypeScript, l'utilisation de TypeScript dans votre application est optionnelle (mais recommandée car elle apporte des avantages exceptionnels à la fois pour vous et votre base de code).<!--fr-->

> While this module is written in TypeScript, using TypeScript in your application is optional (but recommended as it comes with outstanding benefits to both you and your codebase).<!--en-->
-   [x] API entièrement TypeSafe, bien documentée.<!--fr-->
<!--en-->
-   [x] Toujours à jour avec les dernières évolutions du DSFR.<!--fr-->
-   [x] Fully TypeSafe, well documented API.<!--en-->
        Code et Types générés à partir de [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.<!--fr-->
-   [x] Always in up to date with latest the DSFR evolutions.<!--en-->
-   [x] Exactement le même aspect et ressenti qu'avec [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr).<!--fr-->
        Code and Types generated from [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.<!--en-->
-   [x] Pas de [flash blanc lors du rechargement dans la configuration SSR](https://github.com/codegouvfr/@codegouvfr/react-dsfr/issues/2#issuecomment-1257263480).<!--fr-->
-   [x] Exactly the same look and feel than with [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr).<!--en-->
-   [x] La plupart des composants sont prêts pour les composants serveur. Les autres sont étiquetés avec `"use client";`<!--fr-->
-   [x] No [white flash when reloading in SSR setup](https://github.com/codegouvfr/@codegouvfr/react-dsfr/issues/2#issuecomment-1257263480).<!--en-->
-   [x] [Intégration parfaite avec tous les principaux frameworks React : Next.js (PagesDir et AppDir), Create React App, Vite](https://react-dsfr.codegouv.studio/).<!--fr-->
-   [x] Most components are server component ready. The others are labeled with `"use client";`<!--en-->
-   [x] (Presque) Tous [les composants](https://www.systeme-de-design.gouv.fr/elements-d-interface) sont [implémentés](https://components.react-dsfr.codegouv.studio/)<!--fr-->
-   [x] [Perfect integration with all major React framework: Next.js (PagesDir and AppDir), Create React App, Vite](https://react-dsfr.codegouv.studio/).<!--en-->
-   [x] Trois distributions modulables, choisissez les composants que vous importez. (Ce n'est pas tout dans un gros bundle .js)<!--fr-->
-   [x] (Almost) All [the components](https://www.systeme-de-design.gouv.fr/elements-d-interface) are [implemented](https://components.react-dsfr.codegouv.studio/)<!--en-->
-   [x] Intégration optionnelle avec [MUI](https://mui.com/). Si vous utilisez des composants MUI, ils seront<!--fr-->
-   [x] Three shakable distribution, cherry pick the components you import. (It's not all in a big .js bundle)<!--en-->
        automatiquement adaptés pour ressembler aux [composants DSFR](https://www.systeme-de-design.gouv.fr/elements-d-interface). Voir [documentation](https://react-dsfr.codegouv.studio/mui-integration).<!--fr-->
-   [x] Optional integration with [MUI](https://mui.com/). If you use MUI components they will<!--en-->
-   [x] Permet le CSS in JS. [Documentation](https://react-dsfr.codegouv.studio/css-in-js)<!--fr-->
        be automatically adapted to look like [DSFR components](https://www.systeme-de-design.gouv.fr/elements-d-interface). See [documentation](https://react-dsfr.codegouv.studio/mui-integration).<!--en-->
-   [x] i18n en option, les textes intégrés peuvent être affichés en plusieurs langues et l'utilisateur peut fournir des traductions supplémentaires.<!--fr-->
-   [x] Enable the usage of CSS in JS solutions. [Doc](https://react-dsfr.codegouv.studio/css-in-js).<!--en-->
-   [x] [Support des bibliothèques de routage](https://react-dsfr.codegouv.studio/routing) comme react-router.<!--fr-->
-   [x] Opt-in i18n, built in text can be displayed in multiple languages and user can provide extra translations.<!--en-->
<!--fr-->
-   [x] [Support routing libraries](https://react-dsfr.codegouv.studio/routing) like react-router.<!--en-->
> 💡 Besoin de pages de connexion et d'inscription prêtes à l'emploi et conformes au DSFR ? Consultez [keycloak-theme-dsfr](https://github.com/codegouvfr/keycloak-theme-dsfr).<!--fr-->

> 💡 Need ready to use, DSFR compliant login and register pages? Checkout [keycloak-theme-dsfr](https://github.com/codegouvfr/keycloak-theme-dsfr).<!--en-->
<p align="center"><!--fr-->
<!--en-->
  <a href="https://react-dsfr.codegouv.studio/">🚀 Commencez ici 🚀 </a><!--fr-->
<p align="center"><!--en-->
</p><!--fr-->
  <a href="https://react-dsfr.codegouv.studio/">🚀 Get started 🚀 </a><!--en-->
<!--fr-->
</p><!--en-->
# Gouvernance<!--fr-->

# Governance<!--en-->
Ce module est un produit du pôle Logiciel libre et open source d'[Etalab](https://code.gouv.fr/en/mission/).<!--fr-->

This module is a product of [Etalab's Free and open source software pole](https://code.gouv.fr/en/mission/).<!--en-->
Ce projet est co-maintenu par des fonctionnaires de diverses administrations françaises :<!--fr-->

This project is co-maintained by public servants from various French administrations:<!--en-->
-   [Joseph Garrone](https://github.com/garronej) - Insee<!--fr-->
<!--en-->
-   [Julien Bouquillon](https://github.com/revolunet) - DNUM des ministères sociaux<!--fr-->
-   [Joseph Garrone](https://github.com/garronej) - Insee<!--en-->
-   [Dylan DECRULLE](https://github.com/ddecrulle) - Insee<!--fr-->
-   [Julien Bouquillon](https://github.com/revolunet) - DNUM des ministères sociaux<!--en-->
-   [Enguerran Weiss](https://github.com/enguerranws) - Plateforme de l'Inclusion<!--fr-->
-   [Dylan DECRULLE](https://github.com/ddecrulle) - Insee<!--en-->
<!--fr-->
-   [Enguerran Weiss](https://github.com/enguerranws) - Plateforme de l'Inclusion<!--en-->
## Développement<!--fr-->

## Development - for contributing to the project<!--en-->
```bash<!--fr-->
<!--en-->
git clone https://github.com/codegouvfr/react-dsfr<!--fr-->
```bash<!--en-->
cd react-dsfr<!--fr-->
git clone https://github.com/codegouvfr/react-dsfr<!--en-->
yarn<!--fr-->
cd react-dsfr<!--en-->
<!--fr-->
yarn<!--en-->
# Démarrer storybook<!--fr-->
<!--en-->
yarn storybook<!--fr-->
# Starting storybook<!--en-->
<!--fr-->
yarn storybook<!--en-->
# Démarrer les applications de test<!--fr-->
<!--en-->
yarn start-cra  # Pour tester dans une configuration Create React App<!--fr-->
# Starting test apps<!--en-->
yarn start-vite # Pour tester dans une configuration Vite<!--fr-->
yarn start-cra  # For testing in a Create React App setup<!--en-->
yarn start-next-pagesdir # Pour tester dans une configuration Next.js 13 PagesDir (la configuration par défaut)<!--fr-->
yarn start-vite # For testing in a Vite setup<!--en-->
yarn start-next-appdir # Pour tester dans une configuration Next.js 13 AppDir<!--fr-->
yarn start-next-pagesdir # For testing in a Next.js 13 PagesDir setup (the default setup)<!--en-->
<!--fr-->
yarn start-next-appdir # For testing in a Next.js 13 AppDir setup<!--en-->
# Exécuter tous les tests unitaires (test/runtime):<!--fr-->
<!--en-->
yarn test<!--fr-->
# Run all unit test (test/runtime):<!--en-->
# Exécuter uniquement test/runtime/cssVariable.test.ts (par exemple)<!--fr-->
yarn test<!--en-->
npx vitest -t "Resolution of CSS variables"<!--fr-->
# Run only test/runtime/cssVariable.test.ts (for example)<!--en-->
```<!--fr-->
npx vitest -t "Resolution of CSS variables"<!--en-->
<!--fr-->
```<!--en-->
### Vous voulez contribuer ?<!--fr-->

### Want to contribute?<!--en-->
Merci ! Voir [le guide de contribution](https://github.com/codegouvfr/react-dsfr/blob/main/CONTRIBUTING.md).<!--fr-->

Thank you! See [the contribution guide](https://github.com/codegouvfr/react-dsfr/blob/main/CONTRIBUTING.md).<!--en-->
### Comment publier une nouvelle version sur NPM, comment sortir une version bêta<!--fr-->

### How to publish a new version on NPM, how to release a beta version<!--en-->
Ce dépôt a été initialisé à partir de [garronej/ts-ci](https://github.com/garronej/ts-ci), consultez la<!--fr-->
<!--en-->
documentation de ce starter pour comprendre le cycle de vie de ce dépôt.<!--fr-->
This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the<!--en-->
<!--fr-->
documentation of this starter for understanding the lifecycle of this repo.<!--en-->
## Cas d'utilisation<!--fr-->

## Use-cases<!--en-->
Quelques projets qui utilisent `@codegouvfr/react-dsfr`.<!--fr-->

A few projects that use `@codegouvfr/react-dsfr`.<!--en-->
-   https://adresse.data.gouv.fr<!--fr-->
<!--en-->
-   https://cartes.gouv.fr<!--fr-->
-   https://adresse.data.gouv.fr<!--en-->
-   https://code.gouv.fr/sill<!--fr-->
-   https://cartes.gouv.fr<!--en-->
-   https://diagoriente.beta.gouv.fr<!--fr-->
-   https://code.gouv.fr/sill<!--en-->
-   https://egapro.travail.gouv.fr<!--fr-->
-   https://diagoriente.beta.gouv.fr<!--en-->
-   https://github.com/BaseAdresseNationale/bal-admin<!--fr-->
-   https://egapro.travail.gouv.fr<!--en-->
-   https://github.com/DISIC/monfranceconnect<!--fr-->
-   https://github.com/BaseAdresseNationale/bal-admin<!--en-->
-   https://github.com/EIG6-ArtificIA/predictia_front<!--fr-->
-   https://github.com/DISIC/monfranceconnect<!--en-->
-   https://github.com/EIG6-Geocommuns/geocommuns-core<!--fr-->
-   https://github.com/EIG6-ArtificIA/predictia_front<!--en-->
-   https://github.com/EIG6-Geocommuns/lidarviz-front<!--fr-->
-   https://github.com/EIG6-Geocommuns/geocommuns-core<!--en-->
-   https://github.com/inclusion-numerique/mediature<!--fr-->
-   https://github.com/EIG6-Geocommuns/lidarviz-front<!--en-->
-   https://github.com/InseeFr/Lunatic-DSFR<!--fr-->
-   https://github.com/inclusion-numerique/mediature<!--en-->
-   https://github.com/SocialGouv/bpco-site<!--fr-->
-   https://github.com/InseeFr/Lunatic-DSFR<!--en-->
-   https://immersion-facile.beta.gouv.fr<!--fr-->
-   https://github.com/SocialGouv/bpco-site<!--en-->
-   https://maisondelautisme.gouv.fr/<!--fr-->
-   https://immersion-facile.beta.gouv.fr<!--en-->
-   https://observatoire.numerique.gouv.fr<!--fr-->
-   https://maisondelautisme.gouv.fr/<!--en-->
-   https://potentiel.beta.gouv.fr<!--fr-->
-   https://observatoire.numerique.gouv.fr<!--en-->
-   https://refugies.info<!--fr-->
-   https://potentiel.beta.gouv.fr<!--en-->
-   https://signal.conso.gouv.fr<!--fr-->
-   https://refugies.info<!--en-->
-   https://territoiresentransitions.fr<!--fr-->
-   https://signal.conso.gouv.fr<!--en-->
-   https://www.mediateur-public.fr<!--fr-->
-   https://territoiresentransitions.fr<!--en-->
-   https://www.mediateur-public.fr<!--en-->
-   https://suiteterritoriale.anct.gouv.fr<!--en-->
