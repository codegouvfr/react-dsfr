---
description: Add security to you application
---

# 🔒 Content-Security-Policy

`react-dsfr` supports strict Content-Security-Policy headers.

### Nonce

{% embed url="https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/nonce" %}

{% tabs %}
{% tab title="Vite" %}
Add your Content-Security-Policy either by configuring your server, or with the meta tag.\
Remember that a nonce **MUST be generated per requests**.\
\
Add the nonce to `react-dsfr`

<pre class="language-tsx" data-title="src/main.tsx" data-overflow="wrap"><code class="lang-tsx">import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";

<strong>const nonce = "123456789"; // you have to inject it on render
</strong><strong>startReactDsfr({ defaultColorScheme: "system", nonce });
</strong>
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  &#x3C;React.StrictMode>
    &#x3C;App />
  &#x3C;/React.StrictMode>
);
</code></pre>

To get the nonce, you have to enable SSR with Vite and either inject the value in `process.env` or in a additional custom meta tag in your `index.html`. You can also infer it by using the content of the Content-Security-Policy meta tag if you configured the header this way.\
For more information about SSR in Vite see the following page.

{% embed url="https://vitejs.dev/guide/ssr.html" %}
Vite SSR
{% endembed %}
{% endtab %}

{% tab title="Next.js App Router" %}
{% hint style="info" %}
This documentation is for [Next projects using the App router](https://nextjs.org/docs/app/building-your-application/routing).

You are in this case if you have a `app/` directory at the root of your project.
{% endhint %}

The following assumes that you configured your CSP accordingly [to the Next.js recommendation](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy).

First configure the nonce in the `<DsfrHead />` tag in your root layout:

<pre class="language-tsx" data-title="app/layout.tsx"><code class="lang-tsx">import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
<strong>import { headers } from "next/headers";
</strong>
export default function RootLayout({ children }: { children: JSX.Element; }) {
<strong>  const nonce = headers().get("x-nonce") ?? undefined;
</strong>  //NOTE: The lang parameter is optional and defaults to "fr"
  const lang = "fr";
  return (
    &#x3C;html {...getHtmlAttributes({ defaultColorScheme, lang })} >
      &#x3C;head>
        &#x3C;StartDsfr />
<strong>        &#x3C;DsfrHead Link={Link} nonce={nonce} />
</strong>      &#x3C;/head>
      &#x3C;body>
        &#x3C;DsfrProvider lang={lang}>
          {children}
        &#x3C;/DsfrProvider>
      &#x3C;/body>
    &#x3C;/html>
  );
}
</code></pre>

The `X-Nonce` header is forwarded by the `middleware.ts` as suggested by Next.js.

{% hint style="warning" %}
It important to remember that reading headers in the root layout **turns all pages to dynamic rendering opt-in**. This is mandatory for nonce.
{% endhint %}

If you use the `NextAppDirEmotionCacheProvider`, don't forget to add the nonce to it accordingly to what Emotion and MUI needs: `<NextAppDirEmotionCacheProvider options={{ "key": "css", nonce, prepend: true }}>`

Then you have to tell `react-dsfr` to read and forward the nonce injected to all other scripts and styles by adding `doCheckNonce: true;` to the `startReactDsfr()` function:

<pre class="language-typescript" data-title="app/StartDsfr.tsx"><code class="lang-typescript">"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink { 
    Link: typeof Link;
  }
}

<strong>startReactDsfr({ defaultColorScheme, Link, doCheckNonce: true });
</strong>
export function StartDsfr(){
  //Yes, leave null here.
  return null;
}
</code></pre>
{% endtab %}

{% tab title="Next.js Pages Router" %}
Next.js with old Pages Router is not supported. As per Next.js suggests, we recommended migrating to App Router.

{% embed url="https://nextjs.org/docs/getting-started/installation#the-app-directory" %}
App Router Migration
{% endembed %}
{% endtab %}

{% tab title="Create React App" %}
{% hint style="warning" %}
`Create React App` by itself is a way to build **static sites** which by definition cannot handle dynamic headers (like CSP) per request as no server will serve the pages.\
Before getting into nonce configuration, you have ponder whether or not you need that level of security within your static app, and if so, choosing a solution to generate and inject the nonce into your app.
{% endhint %}

Once your injected the nonce into your app, add the following code:

<pre class="language-tsx"><code class="lang-tsx">import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";

<strong>const nonce = "123456789" // have to be dynamic and injected
</strong><strong>startReactDsfr({ defaultColorScheme: "system", nonce });
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
{% endtab %}

{% tab title="Other" %}
Your framework isn't supported? Let's [get in touch](https://github.com/codegouvfr/dsfr-react)!
{% endtab %}
{% endtabs %}

### Trusted Types Policy

{% embed url="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types" %}

Trusted Types are supported out-of-the box.

When configuring your CSP you only have to add our policy names to your list:

<pre data-title="header configuration"><code>Content-Security-Policy:
    require-trusted-types-for 'script';
<strong>    trusted-types react-dsfr react-dsfr-asap;
</strong></code></pre>

We register two policies with only the `createHTML` hook. Policy names are `react-dsfr` and `react-dsfr-asap`

#### Custom policy name

You can configure a custom policy name if you need to by adding the `trustedTypesPolicyName` options to the `startReactDsfr()` function.

{% hint style="info" %}
In Next.js App Router, `trustedTypesPolicyName` must also be set to the `<DsfrHead />` component.
{% endhint %}

When a custom name is set, the suffix `-asap` is used for the second policy. Don't forget to add both to your header configuration.

**Example:**

If you set `trustedTypesPolicyName: "my-app"`

You header must be configured like so: `trusted-types my-app my-app-asap;`
