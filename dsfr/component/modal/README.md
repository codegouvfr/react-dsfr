# modal

La modale permet de concentrer l’attention de l’utilisateur exclusivement sur une tâche ou un élément d’information, sans perdre le contexte de la page en cours. Ce composant nécessite une action de l’utilisateur afin d'être clôturé ou ouverte.

## Dépendances
```shell
modal
└─ core
└─ button
```

## Utilisation
Afin d’utiliser le composant `modal`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/modal/modal.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule src="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" src="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/core/core.nomodule.min.js" ></script>
    <script type="module" src="js/modal/modal.module.min.js" ></script>
    <script type="text/javascript" nomodule src="js/modal/modal.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/modale) sur le module Modale