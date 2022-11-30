---
description: Setup @codegouvfr/react-dsfr in your project
---

# 🔧 Initial setup

{% hint style="warning" %}
If you already had the DSFR installed in your project, let's start from scratch: &#x20;

* Remove [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr) from your dependencies.
* Remove all imports:`dsfr.css, dsfr.module.js the favicon and the fonts.`
* Remove `thedata-fr-scheme` (and `data-fr-theme` ) attribude from your `<html/>` tag
{% endhint %}

```bash
yarn add @codegouvfr/react-dsfr 
# Or: 'npm install --save @codegouvfr/react-dsfr'
```

{% tabs %}
{% tab title="yarn" %}
```bash
yarn add @codegouvfr/react-dsfr
```
{% endtab %}

{% tab title="npm" %}
```bash
npm install --save @codegouvfr/react-dsfr
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="Create React App" %}
Add theses three scipts to your `package.json`:

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
    ...
<strong>    "postinstall": "copy-dsfr-to-public"
</strong><strong>    "prestart": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

Add the following entry to your `.gitignore`:

{% code title=".gitignore" %}
```gitignore
/public/dsfr
```
{% endcode %}

Add the following code in the `<head />`&#x20;

{% code title="public/index.html" %}
```ejs
<link rel="apple-touch-icon" href="%PUBLIC_URL%/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="%PUBLIC_URL%/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/dsfr.min.css" />
<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/utility/icons/icons.min.css" />
```
{% endcode %}

<pre class="language-tsx" data-title="src/index.tsx"><code class="lang-tsx">import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<strong>import { startDsfrReact } from "@codegouvfr/react-dsfr";
</strong><strong>import type { HTMLAnchorProps } from "@codegouvfr/react-dsfr";
</strong><strong>startDsfrReact({ "defaultColorScheme": "system" });
</strong>
//Only for TypeScript users
<strong>declare module "@codegouvfr/react-dsfr" {
</strong><strong>    // eslint-disable-next-line @typescript-eslint/no-empty-interface
</strong><strong>    export interface LinkProps extends HTMLAnchorProps { }
</strong><strong>}
</strong>
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  &#x3C;React.StrictMode>
    &#x3C;App />
  &#x3C;/React.StrictMode>
);
</code></pre>

{% content-ref url="integration-with-routing-libraries.md" %}
[integration-with-routing-libraries.md](integration-with-routing-libraries.md)
{% endcontent-ref %}

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/cra).
{% endtab %}

{% tab title="Next.js" %}
<pre class="language-bash"><code class="lang-bash"><strong>yarn add --dev next-transpile-modules # Or: 'npm install --save-dev next-transpile-modules'
</strong></code></pre>

{% code title="next.config.js" %}
```diff
+const withTM = require('next-transpile-modules')(['@codegouvfr/react-dsfr']);
 
-module.exports = {
+module.exports = withTM({
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
-}
+});
```
{% endcode %}

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
<strong>    "predev": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

If you don't have an `_app.tsx` or an `_app.js` in your project, create one.

{% code title="pages/_app.tsx" %}
```tsx
import DefaultApp from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
import type { LinkProps as NextLinkProps } from "next/link";

// Only for TypeScript users.
declare module "@codegouvfr/react-dsfr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LinkProps extends NextLinkProps { }
}

const { 
    withDsfr
} = createNextDsfrIntegrationApi({
    defaultColorScheme: "system"
});

export default withDsfr(DefaultApp);
```
{% endcode %}

{% content-ref url="integration-with-routing-libraries.md" %}
[integration-with-routing-libraries.md](integration-with-routing-libraries.md)
{% endcontent-ref %}

You can find an example setup [here](https://github.com/codegouvfr/react-dsfr/tree/main/test/integration/next).

#### Getting rid of white flashes

The following instructions are optional and enable to performe SSR in the preferred color scheme of the user. This completely eradicate "white flashes" (on subsequent reloads) but also come at the cost of [opting out from Automatic Static Optimization](https://nextjs.org/docs/messages/opt-out-auto-static-optimization).

<figure><img src=".gitbook/assets/dark_mode_ssr_explaination.gif" alt=""><figcaption><p>Example of "white flash" it hapens when the page is initially rendered in light mode before being switched to dark mode. </p></figcaption></figure>

<pre class="language-tsx" data-title="pages/_app.tsx"><code class="lang-tsx">import DefaultApp from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";

const { 
    withDsfr,
<strong>    dsfrDocumentApi
</strong> } = createNextDsfrIntegrationApi({
    defaultColorScheme: "system",
<strong>    doPersistDarkModePreferenceWithCookie: true
</strong>});
 
<strong>export { dsfrDocumentApi };
</strong>
export default withDsfr(DefaultApp);
</code></pre>

{% code title="pages/_document.tsx" %}
```tsx
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { dsfrDocumentApi } from "./_app";

const { 
  getColorSchemeHtmlAttributes, 
  augmentDocumentByReadingColorSchemeFromCookie 
} = dsfrDocumentApi;

export default function Document(props: DocumentProps) {
  return (
    <Html {...getColorSchemeHtmlAttributes(props)}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

augmentDocumentByReadingColorSchemeFromCookie(Document);
```
{% endcode %}
{% endtab %}

{% tab title="Vite" %}
Add theses three scipts to your `package.json`:

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
<strong>    "postinstall": "copy-dsfr-to-public",
</strong><strong>    "predev": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

Add the following entry to your `.gitignore`:

{% code title=".gitignore" %}
```gitignore
/public/dsfr
```
{% endcode %}

Add the following tags in the `<head />`&#x20;

{% code title="index.html" %}
```html
<link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
```
{% endcode %}

#### src/main.tsx

<pre class="language-tsx"><code class="lang-tsx">import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
<strong>import { startDsfrReact } from "@codegouvfr/react-dsfr";
</strong><strong>startDsfrReact({ defaultColorScheme: "system" });
</strong>
<strong>// Only for TypeScript users.
</strong><strong>declare module "@codegouvfr/react-dsfr" {
</strong><strong>    // eslint-disable-next-line @typescript-eslint/no-empty-interface
</strong><strong>    export interface LinkProps extends NextLinkProps { }
</strong><strong>}
</strong>
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  &#x3C;React.StrictMode>
    &#x3C;App />
  &#x3C;/React.StrictMode>
);
</code></pre>

{% content-ref url="integration-with-routing-libraries.md" %}
[integration-with-routing-libraries.md](integration-with-routing-libraries.md)
{% endcontent-ref %}

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/vite).
{% endtab %}

{% tab title="Other" %}
There isn't specific instructions for your React setup but don't worry, you can figure out what needs to be done by reading the instructions for Vite.&#x20;

The gist of it is, there is a few things that, for performance reasons, react-dsfr dosen't automatically do for you and thus you have to do manually: &#x20;

* Loading `@codegouvfr/react-dsfr/dsfr/dsfr.min.css` (as soon as possilbe)
* Loading `@codegouvfr/react-dsfr/dsfr/utility/icons/icons.min.css` and calling `npx only-include-used-icons` for patching it. If you don't all hundreds icons from the dsfr will be included and remixicons wont work.
* Setting up the Favicon. &#x20;
* ~~Preloading the relevent font variant to avoid~~ [~~FOUT~~](https://fonts.google.com/knowledge/glossary/fout)~~.~~&#x20;

Then, you must call `startDsfrReact()` as soon as posible, wherever in your code, just make sure you do so only once and, if you are in an SSR setup, only on the client side.

```typescript
import { startDsfrReact } from "@codegouvfr/react-dsfr";

const isBrowser = typeof window === "object" && typeof document === "object";

if( isBrowser ){
    startDsfrReact({ defaultColorScheme: "system" });
}
```

If you are in an SSR setup and want to avoit white flashes on reload let's [get in touch](https://github.com/codegouvfr/dsfr-react).
{% endtab %}
{% endtabs %}



### Avoiding or flash of unstyled text (FOUT) &#x20;

{% hint style="danger" %}
The official recommendation from the DSFR team is to cope with [the Flash of Unstiled text](https://user-images.githubusercontent.com/6702424/193168884-703a3c95-45be-47ad-823d-15bb6b8e620d.gif) because preloading fonts **significantly delays the First Contentfull Paint (FCP) for users with slow internet connection and slow devices**.

Measures have been taken in the JS code to mitigate discomfort induced by the FOUT.
{% endhint %}

If you chose, despite the recommendation agaist it, to preload the fonts, at least make sure you only preload the ones immediately used on your page (look in the network tab of your browser dev tool). &#x20;

{% tabs %}
{% tab title="Create React App" %}
Add the following code in the `<head />`&#x20;

{% code title="public/index.html" lineNumbers="true" %}
```ejs
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
```
{% endcode %}
{% endtab %}

{% tab title="Next.js" %}
<pre class="language-tsx" data-title="pages/_app.tsx" data-line-numbers><code class="lang-tsx"> import DefaultApp from "next/app";
 import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";

 const { 
     withDsfr,
     dsfrDocumentApi
 } = createNextDsfrIntegrationApi({
     defaultColorScheme: "system",
     doPersistDarkModePreferenceWithCookie: true
<strong>     preloadFonts: [
</strong><strong>  	//"Marianne-Light",
</strong><strong>        //"Marianne-Light_Italic",
</strong><strong>	"Marianne-Regular",
</strong><strong>	//"Marianne-Regular_Italic",
</strong><strong>	"Marianne-Medium",
</strong><strong>	//"Marianne-Medium_Italic",
</strong><strong>	"Marianne-Bold",
</strong><strong>	//"Marianne-Bold_Italic",
</strong><strong>	//"Spectral-Regular",
</strong><strong>	//"Spectral-ExtraBold"
</strong><strong>     ]
</strong> });
 
 export { dsfrDocumentApi };

 export default withDsfr(DefaultApp);
</code></pre>
{% endtab %}

{% tab title="Vite" %}
Add the following tags in the `<head />`&#x20;

{% code title="index.html" %}
```html
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
```
{% endcode %}
{% endtab %}
{% endtabs %}
