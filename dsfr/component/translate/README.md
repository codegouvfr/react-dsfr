# translate

Le sélecteur de langue permet à l’utilisateur de choisir la langue dans laquelle est affichée le contenu du site, si celui-ci est disponible en plusieurs langues.

## Dépendances
```shell
translate
└─ core
└─ button
└─ navigation
```

## Utilisation
Afin d’utiliser le composant `translate`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/navigation/navigation.min.css" rel="stylesheet">
    <link href="css/translate/translate.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule src="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" src="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/core/core.nomodule.min.js" ></script>
    <script type="module" src="js/navigation/navigation.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/navigation/navigation.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/selecteur-de-langue) sur le module Sélecteur de langue