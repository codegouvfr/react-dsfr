# 📦 Publishing a NPM modules that depends on react-dsfr

You want to publish your own library of components that depends on react-dsfr? &#x20;

Here is an example: &#x20;

{% embed url="https://github.com/EIG6-Geocommuns/geocommuns-core" %}
A module that depend on react-dsfr and MUI
{% endembed %}

I recommend starting from ts-ci for any project meant to be published on NPM

{% embed url="https://github.com/garronej/ts-ci" %}

The main takeway: &#x20;

* [@codegouv/react-dsfr must be a peer dependency of your project](https://github.com/EIG6-Geocommuns/geocommuns-core/blob/55e015a453a681a12bfa84624ccfd243ce8a6150/package.json#L48). Any app that would use your library would need to explicitely install react-dsfr.  [For devloppement purpose, you want to add @codegouvfr/react-dsfr as devDependencies of your project](https://github.com/EIG6-Geocommuns/geocommuns-core/blob/55e015a453a681a12bfa84624ccfd243ce8a6150/package.json#L56). &#x20;
* Do not add `"postinstall": "copy-dsfr-to-public"` in your library's package.json. It's the responsability of the host app to do so. &#x20;
* If you rely on MUI, `@mui/material` `@emotion/styled` and `@emotion/react` should be peer dependencies as well.  You should add those modules as devDependencies.
* If you use TSS: react-dsfr dosen't need to be a peerDependencies but @emotion/react does, you do not configure the emotion cache in your lib, that's the the responsability of the host app. &#x20;
