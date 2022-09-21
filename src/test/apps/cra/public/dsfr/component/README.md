# component

## Dépendances
```shell
component
└─ core
└─ scheme
```

## Utilisation
Afin d’utiliser le composant `component`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/component/component.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
    <script type="module" href="js/scheme/scheme.module.min.js" ></script>
    <script type="module" href="js/component/component.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/component/component.nomodule.min.js" ></script>
  </body>
</html>
```