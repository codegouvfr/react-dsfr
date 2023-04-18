# recover

Modèles de pages de récupération de mot de passe

## Dépendances
```shell
recover
└─ core
└─ form
└─ alert
└─ input
└─ button
```

## Utilisation
Afin d’utiliser le composant `recover`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/form/form.min.css" rel="stylesheet">
    <link href="css/alert/alert.min.css" rel="stylesheet">
    <link href="css/input/input.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
  </body>
</html>
```