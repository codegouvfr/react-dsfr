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
  <a href="https://components.react-dsfr.fr">Documentation des composants</a>
  -
  <a href="https://react-dsfr.codegouv.studio">guides</a>
  -
  <a href="https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx">essai immédiat</a>
</p>

> ATTENTION: Ce design système a uniquement vocation à être utilisé pour des sites officiels de l'état.  
> Son but est de rendre la parole de l'état clairement identifiable. [Consulter le CGU](https://www.systeme-de-design.gouv.fr/cgu/)

> 🗣️ L'enregistrement de l'atelier de présentation de la librairie est disponible [ici](https://bbb-dinum-scalelite.visio.education.fr/playback/presentation/2.3/22298bc9d93b53540248207bc3f9e31260f3b4f1-1670578779094).

Ce module NPM est une surcouche de compatibilité React pour [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr), l'implémentation officielle de référence du
DSFR en pur JavaScript/CSS.

<a href="https://youtu.be/5q88JgXUAY4">
  <img width="1712" alt="image" src="https://user-images.githubusercontent.com/6702424/224423044-c1823249-eab6-4844-af43-d059c01416af.png">
</a>

> Bien que cette bibliothèque soit écrite en TypeScript, l'utilisation de TypeScript dans votre application est facultative (mais recommandée car elle présente des avantages exceptionnels pour vous et votre base de code).

-   [x] une interface de programmation strictement typée et bien documentée.
-   [x] Garantie d'être toujours à jour avec les [dernières évolutions du DSFR](https://www.systeme-de-design.gouv.fr/).
        Une grande partie du code et du typage est généré procéduralement à partir de la feuille de style de référence: [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr)`/dist/dsfr.css`.
-   [x] exactement le même aspect et ressenti qu'avec [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr), il s'agit d'une couche de compatibilité et non pas d'une implémentation alternative.
-   [x] pas de [flash d'écran blanc lors du basculement automatique du thème clair vers le thème sombre](https://github.com/codegouvfr/@codegouvfr/react-dsfr/issues/2#issuecomment-1257263480).
-   [x] la plupart des composants peuvent être rendus directement sur le serveur (voir [RSC](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)). Les autres sont étiquetés `"use client";`.
-   [x] [Intégration clef en main pour les différents frameworks de développement: vite, Next.js, y compris la version beta de Next 13 (configuration AppDir) et Create React App](https://guides.react-dsfr.fr/) si votre
        framework n'est pas supporté, il suffit de demander notre **il manque un mot là** , nous avons pour but de couvrir tous les cas d'usage effectifs.
-   [x] (Presque) tout [les composants de référence](https://www.systeme-de-design.gouv.fr/elements-d-interface) sont [implémenté](https://components.react-dsfr.fr/).
-   [x] seulement le code des composants que vous utilisez effectivement sera inclus dans votre projet final.
-   [x] Intégration facultative avec [MUI](https://mui.com/). Si vous utilisez des composants MUI ils seront automatiquement adaptés pour ressembler à des composants DSFR.  
         Voir la [documentation](https://guides.react-dsfr.fr/mui-integration).
-   [x] permet de développer à l'aide d'outil de CSS-in-JS comme [Styled component](https://styled-components.com/), [Emotion](https://emotion.sh/docs/introduction) ou [TSS](https://www.tss-react.dev/).
-   [x] prévoit un système de traduction pour les textes présents dans les composants (i18n).
-   [x] [s'intègre avec les librairies de routing](https://guides.react-dsfr.fr/routing) comme [React Router](https://reactrouter.com/en/main), [TanStack Router](https://tanstack.com/router/v1) ou encore [Type route](https://type-route.zilch.dev/).

Ce travail est un produit de [CodeGouvFr](https://communs.numerique.gouv.fr/), la mission logiciel libre de [la direction interministérielle du numérique](https://www.numerique.gouv.fr/dinum/) (DINUM).

<p align="center">
  <a href="https://guides.react-dsfr.fr/">🚀 Commencer maintenant 🚀 </a>
</p>

# Gouvernance du projet

Ce projet est co-maintenu par des agents de différentes administrations françaises.

-   [Joseph Garrone](@garronej)
-   [Julien Bouquillon](@revolunet) - DNUM des ministeres sociaux
-   [Dylan DECRULLE](@ddecrulle) - Insee

## Migration depuis [`@dataesr/react-dsfr`](https://github.com/dataesr/react-dsfr)?

Si votre projet utilise [`@dataesr/react-dsfr`](https://github.com/dataesr/react-dsfr) et que vous n'êtes pas enclin a migrer ver `@codegouvfr/react-dsfr` vous pouvez tout de même profiter de plusieurs fonctionalités de ce dernier:

-   Profitez de [l'auto complétion des classes en `fr-*`](https://guides.react-dsfr.fr/class-names-type-safety).
-   Utilisez [le système de couleur strictement typer](https://guides.react-dsfr.fr/css-in-js#colors).
-   Utilisez le thème MUI.
-   Utilisez [le système d'espacement](https://guides.react-dsfr.fr/css-in-js#fr.spacing) et de
    [point de rupture](https://guides.react-dsfr.fr/css-in-js#fr.breakpoints).

[Voici un bac à sable pour expérimenter](https://stackblitz.com/edit/react-ts-fph9bh?file=App.tsx).

## Development

```bash
git clone https://github.com/codegouvfr/react-dsfr
cd react-dsfr
yarn

# Démarrer Storybook
yarn storybook

# Démarrer les applications de test
yarn start-cra
yarn start-vite
yarn start-next-pagesdir
yarn start-next-appdir

# Executer tout les tests unitaires (test/runtime):
yarn test
# Executer, par exemple, uniquement le test test/runtime/cssVariable.test.ts
npx vitest -t "Resolution of CSS variables"
```

### Vous cherchez comment contribuer?

Tout d'abord, merci ! Voici [le guide de contribution](https://github.com/codegouvfr/react-dsfr/blob/main/CONTRIBUTING.md).

### Comment publier une nouvelle version sur NPM

Ce dépôt a été mis en place avec [garronej/ts-ci](https://github.com/garronej/ts-ci).
Vous pouvez vous référer à la documentation de TS-CI pour comprendre le cycle de vie de ce projet.
