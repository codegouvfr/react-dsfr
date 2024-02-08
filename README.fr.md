<p align="center">
    <img src="https://github.com/codegouvfr/react-dsfr/releases/download/assets/dsfr-react_repo-card.png">  
</p>
<p align="center">
    🇫🇷 <i>React intégration pour le <a href="https://www.systeme-de-design.gouv.fr/">System de design du gouvernement français (alias DSFR)</a></i> 🇫🇷 
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
  <a href="https://components.react-dsfr.codegouv.studio">Documentation des composants</a>
  -
  <a href="https://react-dsfr.codegouv.studio">guides</a>
  -
  <a href="https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx">essai immédiat</a>
</p>

> AVERTISSEMENT : Ce système de conception est uniquement destiné à être utilisé pour les sites web officiels des services publics français.  
> Son objectif principal est de faciliter l'identification des sites gouvernementaux par les citoyens. [Voir les conditions](https://www.systeme-de-design.gouv.fr/utilisation-et-organisation/perimetre-d-application).

Ce module est une boîte à outils avancée qui tire parti de [@gouvfr/dsfr](https://github.com/GouvernementFR/dsfr), l'implémentation en JS/CSS vanilla du DSFR.

<a href="https://youtu.be/5q88JgXUAY4">
  <img width="1712" alt="image" src="https://user-images.githubusercontent.com/6702424/224423044-c1823249-eab6-4844-af43-d059c01416af.png">
</a>

> Bien que ce module soit écrit en TypeScript, l'utilisation de TypeScript dans votre application est optionnelle (mais recommandée car elle apporte des avantages exceptionnels à la fois pour vous et votre base de code).

-   [x] API entièrement TypeSafe, bien documentée.
-   [x] Toujours à jour avec les dernières évolutions du DSFR.
        Code et Types générés à partir de [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.
-   [x] Exactement le même aspect et ressenti qu'avec [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr).
-   [x] Pas de [flash blanc lors du rechargement dans la configuration SSR](https://github.com/codegouvfr/@codegouvfr/react-dsfr/issues/2#issuecomment-1257263480).
-   [x] La plupart des composants sont prêts pour les composants serveur. Les autres sont étiquetés avec `"use client";`
-   [x] [Intégration parfaite avec tous les principaux frameworks React : Next.js (PagesDir et AppDir), Create React App, Vite](https://react-dsfr.codegouv.studio/).
-   [x] (Presque) Tous [les composants](https://www.systeme-de-design.gouv.fr/elements-d-interface) sont [implémentés](https://components.react-dsfr.codegouv.studio/)
-   [x] Trois distributions modulables, choisissez les composants que vous importez. (Ce n'est pas tout dans un gros bundle .js)
-   [x] Intégration optionnelle avec [MUI](https://mui.com/). Si vous utilisez des composants MUI, ils seront
        automatiquement adaptés pour ressembler aux [composants DSFR](https://www.systeme-de-design.gouv.fr/elements-d-interface). Voir [documentation](https://react-dsfr.codegouv.studio/mui-integration).
-   [x] Activez CSS in JS en fournissant un hook `useColors()` qui expose les bonnes options de couleurs et décisions
        pour le schéma de couleurs actuellement activé.
-   [x] i18n en option, les textes intégrés peuvent être affichés en plusieurs langues et l'utilisateur peut fournir des traductions supplémentaires.
-   [x] [Support des bibliothèques de routage](https://react-dsfr.codegouv.studio/routing) comme react-router.

> 💡 Besoin de pages de connexion et d'inscription prêtes à l'emploi et conformes au DSFR ? Consultez [keycloak-theme-dsfr](https://github.com/codegouvfr/keycloak-theme-dsfr).

<p align="center">
  <a href="https://react-dsfr.codegouv.studio/">🚀 Commencez ici 🚀 </a>
</p>

# Gouvernance

Ce module est un produit du pôle Logiciel libre et open source d'[Etalab](https://code.gouv.fr/en/mission/).

Ce projet est co-maintenu par des fonctionnaires de diverses administrations françaises :

-   [Julien Bouquillon](https://github.com/revolunet) - DNUM des ministères sociaux
-   [Dylan DECRULLE](https://github.com/ddecrulle) - Insee
-   [Enguerran Weiss](https://github.com/enguerranws) - Plateforme de l'Inclusion

Il est également co-maintenu par [Joseph Garrone](https://github.com/garronej), l'auteur original.

## Développement

```bash
git clone https://github.com/codegouvfr/react-dsfr
cd react-dsfr
yarn

# Démarrer storybook
yarn storybook

# Démarrer les applications de test
yarn start-cra  # Pour tester dans une configuration Create React App
yarn start-vite # Pour tester dans une configuration Vite
yarn start-next-pagesdir # Pour tester dans une configuration Next.js 13 PagesDir (la configuration par défaut)
yarn start-next-appdir # Pour tester dans une configuration Next.js 13 AppDir

# Exécuter tous les tests unitaires (test/runtime):
yarn test
# Exécuter uniquement test/runtime/cssVariable.test.ts (par exemple)
npx vitest -t "Resolution of CSS variables"
```

### Vous voulez contribuer ?

Merci ! Voir [le guide de contribution](https://github.com/codegouvfr/react-dsfr/blob/main/CONTRIBUTING.md).

### Comment publier une nouvelle version sur NPM, comment sortir une version bêta

Ce dépôt a été initialisé à partir de [garronej/ts-ci](https://github.com/garronej/ts-ci), consultez la
documentation de ce starter pour comprendre le cycle de vie de ce dépôt.

## Cas d'utilisation

Quelques projets qui utilisent `@codegouvfr/react-dsfr`.

-   [https://code.gouv.fr/sill](https://sill-preprod.lab.sspcloud.fr/)
-   https://cartes.gouv.fr
-   https://immersion-facile.beta.gouv.fr/
-   https://egapro.travail.gouv.fr/
-   https://maisondelautisme.gouv.fr/
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
-   https://territoiresentransitions.fr (peut-être)
-   https://potentiel.beta.gouv.fr
-   https://diagoriente.beta.gouv.fr
