# consent

Le gestionnaire de consentement permet à l'utilisateur de définir ses préférences sur l'utilisation de ses données personnelles.

## Dépendances
```shell
consent
└─ core
└─ link
└─ form
└─ radio
└─ button
└─ transcription
└─ modal
```

## Utilisation
Afin d’utiliser le composant `consent`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
    <link href="css/core/core.min.css" rel="stylesheet">
    <link href="css/link/link.min.css" rel="stylesheet">
    <link href="css/button/button.min.css" rel="stylesheet">
    <link href="css/form/form.min.css" rel="stylesheet">
    <link href="css/radio/radio.min.css" rel="stylesheet">
    <link href="css/modal/modal.min.css" rel="stylesheet">
    <link href="css/transcription/transcription.min.css" rel="stylesheet">
    <link href="css/consent/consent.min.css" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript" nomodule href="js/legacy/legacy.nomodule.min.js" ></script>
    <script type="module" href="js/core/core.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/core/core.nomodule.min.js" ></script>
    <script type="module" href="js/modal/modal.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/modal/modal.nomodule.min.js" ></script>
  </body>
</html>
```

## Documentation

Consulter [la documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement) sur le module Gestionnaire de consentement