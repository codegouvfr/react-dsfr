# display

Le pattern paramètre d'affichage permet de définir ses préférences de thème

## Dépendances
```shell
display
└─ core
└─ form
└─ radio
└─ scheme
└─ modal
```

## Utilisation
Afin d’utiliser le composant `display`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/form/form.min.css" rel="stylesheet">
    <link href="css/link/link.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/radio/radio.min.css" rel="stylesheet">
    <link href="css/modal/modal.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
    <script type="module" href="js/scheme/scheme.module.min.js" ></script>
    <script type="module" href="js/modal/modal.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/modal/modal.nomodule.min.js" ></script>
    <script type="module" href="js/display/display.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/display/display.nomodule.min.js" ></script>
  </body>
</html>
```