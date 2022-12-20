---
description: Like react-router or Next.js file system based route.
---

# 🔀 Integration with routing libs

Depending of the framwork/routing library you are using, links between pages are not handled the same way. &#x20;

Usually you'll have a `<Link />` component provided by your library or router of choice. You need to let `react-dsfr` knows about it so that whenever a link is needed in a DSFR component you can provide the correct props for you `<Link />` component.

{% tabs %}
{% tab title="react-router" %}
{% hint style="warning" %}
Warning: I do **not** recommend using [react-router](https://reactrouter.com/en/main) for any new project, consider using [type-route](https://zilch.dev/type-route), [TanStack Router](https://tanstack.com/router/v1) or any other type safe routing solution.&#x20;
{% endhint %}

<pre class="language-tsx"><code class="lang-tsx">import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr";
<strong>import { Link } from "react-router-dom";
</strong>startReactDsfr({ 
    defaultColorScheme: "system", 
<strong>    Link 
</strong>});

<strong>//Only in TypeScript projects
</strong><strong>declare module "@codegouvfr/react-dsfr" {
</strong><strong>    interface RegisterLink { 
</strong><strong>        Link: typeof Link;
</strong><strong>    }
</strong><strong>}
</strong>
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    &#x3C;React.StrictMode>
<strong>        &#x3C;DsfrLinkProvider>
</strong>            {/* ... */}
<strong>        &#x3C;/DsfrLinkProvider>
</strong>    &#x3C;/React.StrictMode>
);
</code></pre>

Example [here](https://github.com/codegouvfr/react-dsfr/blob/main/test/integration/vite/src/main.tsx).
{% endtab %}

{% tab title="Next.js" %}
{% hint style="info" %}
This is how you are instructed to set it up by default (no change from the [Initial setup](./#next.js) guide)
{% endhint %}

<pre class="language-tsx" data-title="pages/_app.tsx"><code class="lang-tsx">import type { AppProps } from "next/app";
import { fr } from "@codegouvfr/react-dsfr";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
<strong>import type { LinkProps as NextLinkProps } from "next/link";
</strong><strong>import Link from "next/link";
</strong>
<strong>// Only in TypeScript projects
</strong><strong>declare module "@codegouvfr/react-dsfr" {
</strong><strong>    interface RegisterLink { 
</strong><strong>        Link: typeof Link;
</strong><strong>    }
</strong><strong>}
</strong>
const { 
    withDsfr,
    dsfrDocumentApi
} = createNextDsfrIntegrationApi({
    defaultColorScheme: "system",
<strong>    Link
</strong>});

export { dsfrDocumentApi };

function App({ Component, pageProps }: AppProps) {
    return (
        &#x3C;DsfrLinkProvider>
            &#x3C;Component {...pageProps} />
        &#x3C;/DsfrLinkProvider>
    );
}

export default withDsfr(App);
</code></pre>

Example [here](https://github.com/codegouvfr/react-dsfr/blob/ae8b3319a15064160b909c68d311db3c2e825afb/test/integration/next/pages/\_app.tsx#L62-L64).
{% endtab %}

{% tab title="type-route" %}
[type-route](https://zilch.dev/type-route) unlike most routing library doesn't export a `<Link />` component `<a />` are used directly.

In consequence there isn't anything to setup.

Example [here](https://github.com/codegouvfr/react-dsfr/blob/e8b78dd5ad069a322fbcc34b34b25d4ac8214e34/test/integration/cra/src/index.tsx#L33).
{% endtab %}

{% tab title="other" %}
You should be able to infer what needs to be done refering to the `react-router` instructions.

If the library you are using dosen't export a `<Link />` (like `type-route` for example) component there isn't anything to do.&#x20;
{% endtab %}
{% endtabs %}
