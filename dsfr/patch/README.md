# patch

## Utilisation
Afin d’utiliser le composant `patch`, il est nécessaire d’ajouter les fichiers de styles et de scripts présents dans le dossier dist dans l'ordre suivant :\n
```html
<html>
  <head>
  </head>
  <body>
    <script type="module" href="js/patch/patch.module.min.js" ></script>
    <script type="text/javascript" nomodule href="js/patch/patch.nomodule.min.js" ></script>
  </body>
</html>
```