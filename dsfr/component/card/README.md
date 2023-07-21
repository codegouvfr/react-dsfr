# card

La carte donne des aperçus cliquables d’une page de contenu à l’utilisateur. Elle fait généralement partie d'une collection ou liste d’aperçus de contenu similaires. La carte n’est jamais présentée de manière isolée.

## Dépendances
```shell
card
└─ core
└─ link
└─ badge
└─ button
└─ tag
```

## Utilisation
Afin d’utiliser le composant `card`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/link/link.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/badge/badge.min.css" rel="stylesheet">
    <link href="css/tag/tag.min.css" rel="stylesheet">
    <link href="css/card/card.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
    <script type="module" href="js/card/card.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/card/card.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte) sur le module Carte