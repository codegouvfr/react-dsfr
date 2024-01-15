# range

Les curseurs sont des entrées numériques qui permettent de voir graphiquement une sélection par rapport a une valeur minimale et maximale. Ils servent à montrer en temps réelle les options choisies et éclairer la prise de décision.

## Dépendances
```shell
range
└─ core
└─ scheme
```

## Utilisation
Afin d’utiliser le composant `range`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/range/range.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
    <script type="module" href="js/scheme/scheme.module.min.js" ></script>
    <script type="module" href="js/range/range.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/range/range.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/curseur) sur le module Curseur