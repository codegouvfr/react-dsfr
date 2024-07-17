---
description: Setup @codegouvfr/react-dsfr in your project or start from a template
---

# 🔧 Initial setup

{% embed url="https://youtu.be/5q88JgXUAY4" %}

{% hint style="warning" %}
If you already had the DSFR installed in your project, let's start from scratch:

* Remove [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr) from your dependencies.
* Remove the import of`dsfr.css`, `dsfr.module.js`, the favicon and the fonts.
* Remove `the data-fr-scheme` (and `data-fr-theme` ) attribute from your `<html/>` tag
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

{% tab title="pnpm" %}
```bash
pnpm add @codegouvfr/react-dsfr
```

And add this file to the root of your project, to enable pre & post scripts with pnpm:

{% code title=".npmrc" %}
```properties
enable-pre-post-scripts=true
```
{% endcode %}
{% endtab %}

{% tab title="Yarn Berry (a.k.a Yarn 3 or Yarn modern)" %}
{% hint style="warning" %}
When we refer to Yarn we usually refer to Yarn 1.x as most dev teams (including me) haven't upgraded to the newest version (for good reasons).
{% endhint %}

If you want to use Yarn Berry you be aware that pre- post- scripts aren't supported.

So you must do something like `"dev": "copy-dsfr-to-public && next dev"` (same thing for `start`)

Also you must configure it so it uses `node_modules` (sorry)
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="Vite" %}
{% embed url="https://github.com/garronej/react-dsfr-vite-demo" %}
Demo setup in production here: [https://vite-demo.react-dsfr.fr/](https://vite-demo.react-dsfr.fr/)
{% endembed %}

Add these three scripts to your `package.json`:

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
<strong>    "postinstall": "copy-dsfr-to-public",
</strong><strong>    "predev": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>}
</code></pre>

For you information, scripts logs can be silenced using the argument `--silent`.

Trigger the execution of the postinstall script by running:

```bash
yarn # Or 'npm install' or 'pnpm install'
```

Add the following tags in the `<head />`

{% code title="index.html" %}
```html
<link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
```
{% endcode %}

<pre class="language-tsx" data-title="src/main.tsx"><code class="lang-tsx">import React from "react";
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

You're all set! Next step for you is to setup the integration with your routing library (react-router for example).

{% content-ref url="routing.md" %}
[routing.md](routing.md)
{% endcontent-ref %}
{% endtab %}

{% tab title="Next.js App Router" %}
{% hint style="info" %}
This documentation is for [Next projects using the App router](https://nextjs.org/docs/app/building-your-application/routing).

You are in this case if you have a `app/` directory at the root of your project.
{% endhint %}

{% embed url="https://github.com/garronej/react-dsfr-next-appdir-demo" %}
Starter project in prod here: [https://next-demo.react-dsfr.fr/](https://next-demo.react-dsfr.fr/)
{% endembed %}

Despite the setup process not being as streamlined as one might hope due to certain Next specific limitations, the library is fully compatible with Next.js App Router ([see demo](https://next-demo.react-dsfr.fr/)). Most component featured in this toolkit are [RSC ready](https://nextjs.org/docs/getting-started/react-essentials#server-components), those that are not are labeled using [the `"use client"` directive](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive).

{% hint style="info" %}
You may experience white flashes in dev mode but not in production. 👍
{% endhint %}

```bash
yarn add --dev sass
# If you plan to use MUI:  
yarn add @mui/material @emotion/react @emotion/server @emotion/styled @mui/material @emotion/react
```

<pre class="language-javascript" data-title="next.config.js"><code class="lang-javascript">/** @type {import('next').NextConfig} */
const nextConfig = {
<strong>  webpack: config => {
</strong><strong>    config.module.rules.push({
</strong><strong>      test: /\.woff2$/,
</strong><strong>      type: "asset/resource"
</strong><strong>    });
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

export function StartDsfr(){
  //Yes, leave null here.
  return null;
}
```
{% endcode %}

{% code title="app/layout.tsx" %}
```tsx
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";

export default function RootLayout({ children }: { children: JSX.Element; }) {
  //NOTE: The lang parameter is optional and defaults to "fr"
  const lang = "fr";
  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })} >
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} />
      </head>
      <body>
        <DsfrProvider lang={lang}>
          {children}
        </DsfrProvider>
      </body>
    </html>
  );
}
```
{% endcode %}

{% hint style="success" %}
Yes MUI is supported in AppDir thanks to TSS. [See instructions](https://docs.tss-react.dev/ssr/next.js#app-dir).
{% endhint %}
{% endtab %}

{% tab title="Next.js Pages Router" %}
{% hint style="info" %}
This documentation is for [Next projects using the Page Router](https://nextjs.org/docs/pages/building-your-application/routing) (aka the legacy next setup).

You are in this case if you have a `pages/` directory at the root of your project.
{% endhint %}

{% embed url="https://github.com/garronej/react-dsfr-next-demo" %}
Starter project in prod here: [https://next-pages-router.react-dsfr.fr/](https://next-pages-router.react-dsfr.fr/)
{% endembed %}

```bash
# If you plan to use MUI:  
yarn add @mui/material @emotion/react @emotion/server @emotion/styled @mui/material @emotion/react
```

<pre class="language-javascript" data-title="next.config.js"><code class="lang-javascript">/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
<strong>  webpack: config => {
</strong><strong>    config.module.rules.push({
</strong><strong>      test: /\.woff2$/,
</strong><strong>      type: "asset/resource"
</strong><strong>    });
</strong><strong>    return config;
</strong><strong>  },
</strong><strong>  //This option requires Next 13.1 or newer, if you can't update you can use this plugin instead: https://github.com/martpie/next-transpile-modules
</strong><strong>  transpilePackages: [
</strong><strong>      "@codegouvfr/react-dsfr", 
</strong><strong>      "tss-react" // This is for MUI or if you use htts://tss-react.dev
</strong><strong>  ]
</strong>};

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
{% endtab %}

{% tab title="Create React App" %}
{% hint style="warning" %}
The create-react-app project is no longer being maintained. If you are starting a new project you'll probably be beter off with Vite.
{% endhint %}

{% embed url="https://github.com/garronej/react-dsfr-cra-demo" %}
See demo setup in production here: [https://cra-demo.react-dsfr.fr/](https://cra-demo.react-dsfr.fr/)
{% endembed %}

Add these three scripts to your `package.json`:

<pre class="language-json" data-title="package.json"><code class="lang-json">"scripts": {
    ...
<strong>    "postinstall": "copy-dsfr-to-public"
</strong><strong>    "prestart": "only-include-used-icons",
</strong><strong>    "prebuild": "only-include-used-icons"
</strong>},
...
"jest": {
    "transformIgnorePatterns": [
<strong>      "node_modules/(?!@codegouvfr/react-dsfr)"
</strong>    ]
}
</code></pre>

Trigger the execution of the postinstall script by running:

```bash
yarn # Or 'npm install' or 'pnpm install'
```

Add the following code in the `<head />`

{% code title="public/index.html" %}
```ejs
<link rel="apple-touch-icon" href="%PUBLIC_URL%/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="%PUBLIC_URL%/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/utility/icons/icons.min.css" />
<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/dsfr.min.css" />
```
{% endcode %}

<pre class="language-tsx" data-title="src/index.tsx"><code class="lang-tsx">import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<strong>import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
</strong><strong>startReactDsfr({ defaultColorScheme: "system" });
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

You're all set! Next step for you is to setup de integration with your routing library (react-router for example)

{% content-ref url="routing.md" %}
[routing.md](routing.md)
{% endcontent-ref %}
{% endtab %}

{% tab title="Other" %}
Your framework isn't supported? Let's [get in touch](https://github.com/codegouvfr/dsfr-react)!
{% endtab %}
{% endtabs %}

### Avoiding or flash of unstyled text (FOUT)

You can avoid having a flash of unstyled text by preloading the font variant used on your homepage (look in the network tab of your browser dev tools what are the font downloaded initially).

{% tabs %}
{% tab title="Vite" %}
Add the following tags in the `<head />`

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

{% tab title="Next.js App Router" %}
<pre class="language-tsx" data-title="app/layout.tsx"><code class="lang-tsx">import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import StartDsfr from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";

export default function RootLayout({ children }: { children: JSX.Element; }) {

  return (
    &#x3C;html {...getHtmlAttributes({ defaultColorScheme })} >
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

{% tab title="Next.js Pages Router" %}
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

{% tab title="Create React App" %}
Add the following code in the `<head />`

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
{% endtabs %}
