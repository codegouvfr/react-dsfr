# header

L’en-tête permet aux utilisateurs d’identifier sur quel site ils se trouvent. Il peut donner accès à la recherche et à certaines pages ou fonctionnalités clés.

## Dépendances
```shell
header
└─ core
└─ link
└─ logo
└─ button
└─ search
└─ translate
└─ navigation
└─ modal
```

## Utilisation
Afin d’utiliser le composant `header`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/link/link.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/logo/logo.min.css" rel="stylesheet">
    <link href="css/form/form.min.css" rel="stylesheet">
    <link href="css/navigation/navigation.min.css" rel="stylesheet">
    <link href="css/modal/modal.min.css" rel="stylesheet">
    <link href="css/input/input.min.css" rel="stylesheet">
    <link href="css/search/search.min.css" rel="stylesheet">
    <link href="css/translate/translate.min.css" rel="stylesheet">
    <link href="css/header/header.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule src="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" src="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/core/core.nomodule.min.js" ></script>
    <script type="module" src="js/navigation/navigation.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/navigation/navigation.nomodule.min.js" ></script>
    <script type="module" src="js/modal/modal.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/modal/modal.nomodule.min.js" ></script>
    <script type="module" src="js/header/header.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/header/header.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/en-tete) sur le module En-tête