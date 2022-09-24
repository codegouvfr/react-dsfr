---
description: Setup dsfr-react in your project
---

# 🔧 Initial setup

If you already had the DSFR installed in your project, let's start from scratch: &#x20;

* Remove [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr) from your dependencies.
* Remove the favicon import
* Remove the imports of the `dsfr.css` and `dsfr.module.js`

{% tabs %}
{% tab title="Next.js" %}
```bash
yarn add dsfr-react
```

`next.config.js`:

```diff
 module.exports = {
   reactStrictMode: true,
+  webpack: config => {
+
+   config.module.rules.push({
+      test: /\.(woff2|webmanifest)$/,
+      type: "asset/resource"
+    });
+
+    return config;
+  }
 }
```

Create a [`pages/_app.tsx` (or `pages/_app.js`)](https://nextjs.org/docs/advanced-features/custom-app) file:

```tsx
import DefaultApp from "next/app";
import { withDsfr } from "dsfr-react/lib/nextJs";
import "dsfr-react/dsfr/dsfr.css";

export default withDsfr(
    DefaultApp, // You can, of course, provide your custom App if you have one
    {
        "defaultColorScheme": "system",
        "preloadFonts": [
            "Marianne-Bold", 
            "Marianne-Regular", 
            "Marianne-Medium"
        ]
    }
);
```

{% hint style="info" %}
Preloading fonts prevent from [FOUT](https://fonts.google.com/knowledge/glossary/fout).

Be eco friendly 🌱, only preload the fonts variant you actually use.

You can see in the network tab of your browser's dev tools what are the fonts variant used in the first print.

Preloading of font variants is only enabled in the production build (not when you run `yarn dev`)
{% endhint %}
{% endtab %}

{% tab title="Create React App" %}
```bash
yarn add dsfr-react
```

`package.json`

```diff
 "scripts": {
+    "postinstall": "update_dsfr_static_resources"
 }
```

`.gitignore`:

```diff
+ /public/dsfr
```

{% hint style="info" %}
`update_dsfr_static_resources` is a `bin` script of `dsfr-react` that copies `@gouvfr/dsfr/dist` into `public/dsfr`
{% endhint %}

Add the following code in the `<head />` of your `public/index.html`:

```ejs
<link rel="apple-touch-icon" href="%PUBLIC_URL%/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="%PUBLIC_URL%/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<%
[
  "Marianne-Light",
  "Marianne-Light_Italic",
  "Marianne-Regular",
  "Marianne-Regular_Italic",
  "Marianne-Medium",
  "Marianne-Medium_Italic",
  "Marianne-Bold",
  "Marianne-Bold_Italic",
  "Spectral-Regular",
  "Spectral-ExtraBold"
].forEach(function(name){ %>
  <link rel="preload" href="%PUBLIC_URL%/dsfr/fonts/<%=name%>.woff2" as="font" crossorigin="anonymous" />
<% }); %>

<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/dsfr.min.css" />
```

{% hint style="info" %}
Preloading fonts prevent from [FOUT](https://fonts.google.com/knowledge/glossary/fout).

Be eco friendly 🌱, only preload the fonts variant you actually use.

You can see in the network tab of your browser's dev tools what are the fonts variant used in the first print.

Preloading of font variants is only enabled in the production build (not when you run `yarn dev`)
{% endhint %}
{% endtab %}
{% endtabs %}
