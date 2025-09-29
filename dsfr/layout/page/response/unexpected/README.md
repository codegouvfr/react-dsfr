# unexpected

## Dépendances
```shell
unexpected
└─ core
└─ button
```

## Utilisation
Afin d’utiliser le composant `unexpected`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule src="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" src="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/core/core.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/version-courante/fr/modeles/pages-types/page-d-erreurs) sur le module Modèle de page erreur inattendue