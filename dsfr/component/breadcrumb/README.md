# breadcrumb

Le fil d’Ariane est un système de navigation secondaire qui permet à l’utilisateur de se situer sur le site qu’il consulte.

## Dépendances
```shell
breadcrumb
└─ core
```

## Utilisation
Afin d’utiliser le composant `breadcrumb`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/breadcrumb/breadcrumb.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule src="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" src="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/core/core.nomodule.min.js" ></script>
    <script type="module" src="js/breadcrumb/breadcrumb.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/breadcrumb/breadcrumb.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/fil-d-ariane) sur le module Fil d'Ariane