---
description: Setup @codegouvfr/react-dsfr in your project
---

# 🔧 Initial setup

{% hint style="warning" %}
If you already had the DSFR installed in your project, let's start from scratch: &#x20;

* Remove [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr) from your dependencies.
* Remove the import of`dsfr.css, dsfr.module.js the favicon and the fonts.`
* Remove `the data-fr-scheme` (and `data-fr-theme` ) attribude from your `<html/>` tag
{% endhint %}

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
<strong>import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
</strong><strong>startDsfrReact({ defaultColorScheme: "system" });
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

{% content-ref url="routing.md" %}
[routing.md](routing.md)
{% endcontent-ref %}

You can find an example setup [here](https://github.com/codegouvfr/react-dsfr/tree/main/test/integration/cra).
{% endtab %}

{% tab title="Next.js" %}
{% hint style="info" %}
These are the instruction for [Next.js current stable mode](https://nextjs.org/docs). This is the mode you get when you [`yarn create next-app`](https://nextjs.org/docs/api-reference/create-next-app#interactive).&#x20;

Now, if you are feeling adventurous and want to experiment with Next 13 beta features such as server components head over to [the next tab](./#next.js-appdir).
{% endhint %}

<pre class="language-bash"><code class="lang-bash"><strong>yarn add --dev next-transpile-modules # Or: 'npm install --save-dev next-transpile-modules'
</strong></code></pre>

<pre class="language-javascript" data-title="next.config.js"><code class="lang-javascript"><strong>const withTM = require('next-transpile-modules')(['@codegouvfr/react-dsfr']);
</strong>
/** @type {import('next').NextConfig} */
<strong>const nextConfig = withTM({
</strong>  reactStrictMode: true,
  swcMinify: true,
<strong>  webpack: config => {
</strong><strong>
</strong><strong>    config.module.rules.push({
</strong><strong>      test: /\.woff2$/,
</strong><strong>      type: "asset/resource"
</strong><strong>    });
</strong><strong>
</strong><strong>    return config;
</strong><strong>  }
</strong>});

module.exports = nextConfig
</code></pre>

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
<strong>    "predev": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

{% code title="pages/_app.tsx" %}
```tsx
import type { AppProps } from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import Link from "next/link";

// Only in TypeScript projects
declare module "@codegouvfr/react-dsfr/next-pagesdir" {
    interface RegisterLink { 
        Link: typeof Link;
    }
}

const { 
    withDsfr,
    dsfrDocumentApi
} = createNextDsfrIntegrationApi({
    defaultColorScheme: "system",
    Link
});

export { dsfrDocumentApi };

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default withDsfr(App);
```
{% endcode %}

{% code title="pages/_document.tsx" %}
```tsx
import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import { dsfrDocumentApi } from "./_app";

const { 
  getColorSchemeHtmlAttributes, 
  augmentDocumentForDsfr 
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

augmentDocumentForDsfr(Document);
```
{% endcode %}

You can find an example setup [here](https://github.com/codegouvfr/react-dsfr/tree/main/test/integration/next-pagesdir).
{% endtab %}

{% tab title="Next.js AppDir" %}
{% hint style="info" %}
This is the documentation for [Next 13 app directory mode ](https://beta.nextjs.org/docs)which is still in beta. If you're looking for the path of least resistance follow [the instructions in the previous tab](./#next.js).
{% endhint %}

<pre class="language-javascript" data-title="next.config.js"><code class="lang-javascript">/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
<strong>  webpack: config => {
</strong><strong>
</strong><strong>    config.module.rules.push({
</strong><strong>      test: /\.woff2$/,
</strong><strong>      type: "asset/resource"
</strong><strong>    });
</strong><strong>
</strong><strong>    return config;
</strong><strong>  }
</strong>};

module.exports = nextConfig;
</code></pre>

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
<strong>    "predev": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

{% code title="app/defaultColorScheme.ts" %}
```typescript
import type { DefaultColorScheme } from "@codegouvfr/react-dsfr/next-appdir";

export const defaultColorScheme: DefaultColorScheme = "system";
```
{% endcode %}

{% code title="app/StartDsfr.tsx" %}
```tsx
"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink { 
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme, Link });

export default function StartDsfr(){
  //Yes, leave null here.
  return null;
}
```
{% endcode %}

{% code title="app/layout.tsx" %}
```tsx
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getColorSchemeHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getColorSchemeHtmlAttributes";
import StartDsfr from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";

export default function RootLayout({ children }: { children: JSX.Element; }) {

  return (
    <html {...getColorSchemeHtmlAttributes({ defaultColorScheme })} >
      <head>
        <StartDsfr />
        <DsfrHead defaultColorScheme={defaultColorScheme} />
      </head>
      <body>
        <DsfrProvider defaultColorScheme={defaultColorScheme}>
          {children}
        </DsfrProvider>
      </body>
    </html>
  );
}
```
{% endcode %}

Find a demo setup [here](https://github.com/codegouvfr/react-dsfr/tree/main/test/integration/next-appdir).

{% hint style="success" %}
Yes MUI is supported in AppDir thanks to TSS. [See instructions](https://docs.tss-react.dev/ssr/next.js#app-dir).
{% endhint %}

{% hint style="info" %}
You may experience white flashes in dev mode but not in production. 👍&#x20;
{% endhint %}
{% endtab %}

{% tab title="Vite" %}
Add theses three scipts to your `package.json`:

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
<strong>    "postinstall": "copy-dsfr-to-public",
</strong><strong>    "predev": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

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
<strong>import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
</strong><strong>startReactDsfr({ defaultColorScheme: "system" });
</strong>
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  &#x3C;React.StrictMode>
    &#x3C;App />
  &#x3C;/React.StrictMode>
);
</code></pre>

{% content-ref url="routing.md" %}
[routing.md](routing.md)
{% endcontent-ref %}

You can find an example setup [here](https://github.com/codegouvfr/react-dsfr/tree/main/test/integration/vite).
{% endtab %}

{% tab title="Other" %}
Your framwork isn't supported? let's [get in touch](https://github.com/codegouvfr/dsfr-react)!
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

{% code title="public/index.html" %}
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
<pre class="language-tsx" data-title="pages/_app.tsx"><code class="lang-tsx">import type { AppProps } from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import Link from "next/link";

// Only in TypeScript projects
declare module "@codegouvfr/react-dsfr/next-pagesdir" {
    interface RegisterLink { 
        Link: typeof Link;
    }
}

const { 
    withDsfr,
    dsfrDocumentApi
} = createNextDsfrIntegrationApi({
    defaultColorScheme: "system",
    Link,
<strong>    preloadFonts: [
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
</strong><strong>    ]
</strong>});

export { dsfrDocumentApi };

function App({ Component, pageProps }: AppProps) {
    return &#x3C;Component {...pageProps} />;
}

export default withDsfr(App);
</code></pre>
{% endtab %}

{% tab title="Next.js AppDir" %}
<pre class="language-tsx" data-title="app/layout.tsx"><code class="lang-tsx">import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getColorSchemeHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getColorSchemeHtmlAttributes";
import StartDsfr from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";

export default function RootLayout({ children }: { children: JSX.Element; }) {

  return (
    &#x3C;html {...getColorSchemeHtmlAttributes({ defaultColorScheme })} >
      &#x3C;head>
        &#x3C;StartDsfr />
        &#x3C;DsfrHead 
          defaultColorScheme={defaultColorScheme} 
<strong>          preloadFonts={[
</strong><strong>	    //"Marianne-Light",
</strong><strong>            //"Marianne-Light_Italic",
</strong><strong>	    "Marianne-Regular",
</strong><strong>	    //"Marianne-Regular_Italic",
</strong><strong>	    "Marianne-Medium",
</strong><strong>	    //"Marianne-Medium_Italic",
</strong><strong>	    "Marianne-Bold"
</strong><strong>	    //"Marianne-Bold_Italic",
</strong><strong>	    //"Spectral-Regular",
</strong><strong>	    //"Spectral-ExtraBold"
</strong><strong>	  ]}
</strong>        />
      &#x3C;/head>
      &#x3C;body>
        &#x3C;DsfrProvider defaultColorScheme={defaultColorScheme}>
          {children}
        &#x3C;/DsfrProvider>
      &#x3C;/body>
    &#x3C;/html>
  );
}
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
