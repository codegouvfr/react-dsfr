# navigation

La navigation principale est l'élément central de la navigation au sein du site, il oriente l’utilisateur à travers les grandes sections du site et sur éventuellement plusieurs niveaux de profondeur.

## Dépendances
```shell
navigation
└─ core
└─ button
```

## Utilisation
Afin d’utiliser le composant `navigation`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/navigation/navigation.min.css" rel="stylesheet">
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

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/navigation-principale) sur le module Navigation principale