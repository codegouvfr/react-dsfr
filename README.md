---
description: Setup dsfr-react in your project
---

# 🔧 Initial setup

{% hint style="warning" %}
If you already had the DSFR installed in your project, let's start from scratch: &#x20;

* Remove [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr) from your dependencies.
* Remove all imports:`dsfr.css, dsfr.module.js the favicon and the fonts.`
* Remove `thedata-fr-scheme` (and `data-fr-theme` ) attribude from your `<html/>` tag
{% endhint %}

```bash
yarn add dsfr-react # Or: 'npm install --save dsfr-react'
```

{% tabs %}
{% tab title="Create React App" %}
#### package.json

```diff
 "scripts": {
+    "postinstall": "copy_dsfr_dist_to_public"
 }
```

`update_dsfr_static_resources` is a `bin` script of `dsfr-react` that copies `@gouvfr/dsfr/dist` into `public/dsfr`

#### .gitignore

```diff
+ /public/dsfr
```

#### public/index.html

Add the following code in the `<head />`&#x20;

```ejs
<link rel="apple-touch-icon" href="%PUBLIC_URL%/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="%PUBLIC_URL%/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<%
[
  //"Marianne-Light",
  //"Marianne-Light_Italic",
  "Marianne-Regular",
  //"Marianne-Regular_Italic",
  "Marianne-Medium",
  //"Marianne-Medium_Italic",
  "Marianne-Bold",
  //"Marianne-Bold_Italic",
  //"Spectral-Regular",
  //"Spectral-ExtraBold"
].forEach(function(name){ %>
  <link rel="preload" href="%PUBLIC_URL%/dsfr/fonts/<%=name%>.woff2" as="font" crossorigin="anonymous" />
<% }); %>

<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/dsfr.min.css" />
```

{% hint style="info" %}
Preloading fonts prevent from [FOUT](https://fonts.google.com/knowledge/glossary/fout).

Be eco friendly 🌱, only preload the fonts variant you actually use.

You can see in the network tab of your browser's dev tools what are the fonts variant used in the first print.
{% endhint %}

#### src/index.tsx

```diff
 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import App from './App';
+import { startDsfrReact } from "dsfr-react";
+startDsfrReact({ "defaultColorScheme": "system" });

 const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
 );
 root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
 );
```

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/cra).
{% endtab %}

{% tab title="Next.js" %}
#### next.config.js

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

#### pages/\_app.tsx

If you don't have an `_app.tsx` or an `_app.js` in your project, create one.

```tsx
import DefaultApp from "next/app";
import { withAppDsfr } from "dsfr-react/lib/nextJs";
import "dsfr-react/dsfr/dsfr.css";

export default withAppDsfr(
    DefaultApp, // Provide your custom App if you have one
    {
        "defaultColorScheme": "system",
        "preloadFonts": [
		//"Marianne-Light",
		//"Marianne-Light_Italic",
		"Marianne-Regular",
		//"Marianne-Regular_Italic",
		"Marianne-Medium",
		//"Marianne-Medium_Italic",
		"Marianne-Bold",
		//"Marianne-Bold_Italic",
		//"Spectral-Regular",
		//"Spectral-ExtraBold"
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

#### pages/\_document.tsx

This is optional, it enables to get rid of the [white flashes on pages reload](https://github.com/codegouvfr/dsfr-react/issues/2#issuecomment-1257263480). &#x20;

```tsx
import DefaultDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from "next/document";
import { getColorSchemeSsrUtils } from "dsfr-react/lib/nextJs";

const { 
  readColorSchemeFromCookie, 
  getColorSchemeHtmlAttributes 
} = getColorSchemeSsrUtils();

export default function Document() {
  return (
    <Html {...getColorSchemeHtmlAttributes()}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {

  const initialProps = await DefaultDocument.getInitialProps(ctx);

  readColorSchemeFromCookie(ctx);

  return { ...initialProps };

};
```

{% hint style="warning" %}
This feature [opte you out of Automatic Static Optimization](https://nextjs.org/docs/messages/opt-out-auto-static-optimization). It's not a bug, only the price to pay for ultimate UX. &#x20;
{% endhint %}

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/next).
{% endtab %}

{% tab title="Vite" %}
#### package.json

```diff
 "scripts": {
+    "postinstall": "copy_dsfr_dist_to_public"
 }
```

`update_dsfr_static_resources` is a `bin` script of `dsfr-react` that copies `@gouvfr/dsfr/dist` into `public/dsfr`

#### .gitignore

```diff
+ /public/dsfr
```

#### index.html

Add the following tags in the `<head />`&#x20;

```html
<link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<!--<link rel="preload" href="/dsfr/fonts/Marianne-Light.woff2" as="font" crossorigin="anonymous" />-->
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Light_Italic.woff2" as="font" crossorigin="anonymous" />-->
<link rel="preload" href="/dsfr/fonts/Marianne-Regular.woff2" as="font" crossorigin="anonymous" />
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Regular_Italic.woff2" as="font" crossorigin="anonymous" />-->
<link rel="preload" href="/dsfr/fonts/Marianne-Medium.woff2" as="font" crossorigin="anonymous" />
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Medium_Italic.woff2" as="font" crossorigin="anonymous" />-->
<link rel="preload" href="/dsfr/fonts/Marianne-Bold.woff2" as="font" crossorigin="anonymous" />
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Bold_Italic.woff2" as="font" crossorigin="anonymous" />-->
<!--<link rel="preload" href="/dsfr/fonts/Spectral-Regular.woff2" as="font" crossorigin="anonymous" />-->
<!--<link rel="preload" href="/dsfr/fonts/Spectral-ExtraBold.woff2" as="font" crossorigin="anonymous" />-->

<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
```

{% hint style="info" %}
Preloading fonts prevent from [FOUT](https://fonts.google.com/knowledge/glossary/fout).

Be eco friendly 🌱, only preload the fonts variant you actually use.

You can see in the network tab of your browser's dev tools what are the fonts variant used in the first print.
{% endhint %}

#### src/main.tsx

<pre class="language-diff"><code class="lang-diff"><strong> import React from "react";
</strong> import ReactDOM from "react-dom/client";
 import { App } from "./App";
+import { startDsfrReact } from "dsfr-react";
+startDsfrReact({ "defaultColorScheme": "system" });

 ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   &#x3C;React.StrictMode>
     &#x3C;App />
   &#x3C;/React.StrictMode>
 );
</code></pre>

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/vite).
{% endtab %}

{% tab title="Other" %}
There isn't specific instructions for your React setup but don't worry, you can figure out what needs to be done by reading the instructions for Vite.&#x20;

The gist of it is, there is a few things that, for performance reasons, react-dsfr dosen't automatically do for you and thus you have to do manually: &#x20;

* Loading `dsfr-react/dsfr/dsfr.min.css` (as soon as possilbe)
* Setting up the Favicon. &#x20;
* Preloading the relevent font variant to avoid [FOUT](https://fonts.google.com/knowledge/glossary/fout).&#x20;

Then, you must call `startDsfrReact()` as soon as posible, wherever in your code, just make sure you do so only once and, if you are in an SSR setup, only on the client side.

```typescript
import { startDsfrReact } from "dsfr-react";

const isBrowser = typeof window === "object" && typeof document === "object";

if( isBrowser ){
    startDsfrReact({ "defaultColorScheme": "system" });
}
```
{% endtab %}
{% endtabs %}

