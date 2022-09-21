# scheme

scheme permet la définition de couleurs principales et du darkmode pour le Design System de l'Etat.

## Dépendances
```shell
scheme
└─ core
```

## Utilisation
Afin d’utiliser le composant `scheme`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/scheme/scheme.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
    <script type="module" href="js/scheme/scheme.module.min.js" ></script>
  </body>
</html>
```