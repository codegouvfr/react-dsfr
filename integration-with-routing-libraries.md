---
description: Like react-router or Next.js file system based route.
---

# 🔀 Integration with Routing libraries

Depending of the framwork/routing library you are using link between pages are not handled the same way. &#x20;

Usually you'll have a `<Link />` component provided by your library or router of choice. You need to let react-dsfr knows about it so that whenever a link is needed in a DSFR component you can provide the correct props for you `<Link />` component.

{% tabs %}
{% tab title="No routing library" %}
{% hint style="info" %}
If you're not using TypeScript you have nothing to do.&#x20;
{% endhint %}

By default react-dsfr will use a `<a />` element. You just need to implement theme augmentation. This is usually done in the index.tsx but you can do it anywhere. &#x20;

{% code title="index.tsx" overflow="wrap" %}
```tsx
import type { HTMLAnchorProps } from "@codegouvfr/react-dsfr";

declare module "@codegouvfr/react-dsfr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LinkProps extends TypeRouteLink { }
}
```
{% endcode %}
{% endtab %}

{% tab title="Next.js" %}
In a Next.js react-dsfr will use the `<Link />` component from `"next/link"`.

<pre class="language-tsx" data-title="pages/_app.tsx"><code class="lang-tsx">import DefaultApp from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
<strong>import type { LinkProps as NextLinkProps } from "next/link";
</strong>
<strong>// Only for TypeScript users.
</strong><strong>declare module "@codegouvfr/react-dsfr" {
</strong><strong>    // eslint-disable-next-line @typescript-eslint/no-empty-interface
</strong><strong>    export interface LinkProps extends NextLinkProps { }
</strong><strong>}
</strong>
const { 
    withDsfr
} = createNextDsfrIntegrationApi({
    defaultColorScheme: "system"
});

export default withDsfr(DefaultApp);
</code></pre>

Example [here](https://github.com/codegouvfr/react-dsfr/blob/ae8b3319a15064160b909c68d311db3c2e825afb/test/integration/next/pages/\_app.tsx#L62-L64).
{% endtab %}

{% tab title="react-router" %}
{% hint style="warning" %}
Warning: I do not recommend using [react-router](https://reactrouter.com/en/main) for any new project, consider using [type-route](https://zilch.dev/type-route), [tanStack Router](https://tanstack.com/router/v1) or other type safe routing library.&#x20;
{% endhint %}

<pre class="language-tsx"><code class="lang-tsx">import React from "react";
import ReactDOM from "react-dom/client";
import { startDsfrReact, createDsfrLinkProvider } from "@codegouvfr/react-dsfr";
<strong>import { Link } from "react-router-dom";
</strong><strong>import type { LinkProps as ReactRouterLinkProps } from "react-router-dom";
</strong><strong>startDsfrReact({ "defaultColorScheme": "system" });
</strong>
<strong>declare module "@codegouvfr/react-dsfr" {
</strong><strong>    // eslint-disable-next-line @typescript-eslint/no-empty-interface
</strong><strong>    export interface LinkProps extends ReactRouterLinkProps { }
</strong><strong>}
</strong>
<strong>const { DsfrLinkProvider } = createDsfrLinkProvider({ Link })
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
{% endtabs %}
