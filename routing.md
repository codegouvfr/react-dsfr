---
description: Like react-router or Next.js file system based route.
---

# 🔀 Integration with routing libs

Depending on the framework or routing library you are using, links between pages are not handled the same way.

Usually, you'll have a `<Link />` component provided by your routing library of choice. You need to let `react-dsfr` know about it so that whenever a link is needed in a DSFR component, you can provide the correct props for your `<Link />` component.

When registering your Link component, its props type will propagate to the react-dsfr API.

{% tabs %}
{% tab title="react-router" %}
{% hint style="warning" %}
Warning: I do **not** recommend using [react-router](https://reactrouter.com/en/main) for any new project, consider using [type-route](https://type-route.zilch.dev/), [TanStack Router](https://tanstack.com/router/v1) or any other type safe routing library.
{% endhint %}

<pre class="language-tsx"><code class="lang-tsx">import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/cra";
<strong>import { Link } from "react-router-dom";
</strong>startReactDsfr({ 
    defaultColorScheme: "system", 
<strong>    Link 
</strong>});

<strong>//Only in TypeScript projects
</strong><strong>declare module "@codegouvfr/react-dsfr/spa" {
</strong><strong>    interface RegisterLink { 
</strong><strong>        Link: typeof Link;
</strong><strong>    }
</strong><strong>}
</strong>
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    &#x3C;React.StrictMode>
            {/* ... */}
    &#x3C;/React.StrictMode>
);
</code></pre>

Everywhere a DSFR component accepts a `xxxLinkProps` you are expected to provide an object with a `to` property because `react-router`'s`<Link />` component expects a `to` prop instead of the typical href.\
\
You can find an example [here](https://github.com/codegouvfr/react-dsfr/blob/main/test/integration/vite/src/main.tsx).

**Examples**

Client side routing

```tsx
import { Card } from "@codegouvfr/react-dsfr/Card";

<Card
  linkProps={{
    to: "/my-page"
  }}
/>
```

The `<Link />` component from react-router will be used.

**External links:**

```tsx

linkProps={{
  to: "https://example.com"
  target="_blank"
}}
```

When react-dsfr detects that the `to` points to an external website it will use a regular `<a/>` Instead of the `<Link />` component.

**Mailto links**

```tsx
linkProps={{
  to: "mailto:contact@code.gouv.fr"
}}
```

Same goes for the mailto links.

**Converting a link to a button**

```tsx
linkProps={{  
  to: "#"
  onClick: ()=> { /* ... */ }
}}
```

React-dsfr will automatically convert the underlying HTML element into a `<button />` that looks like a link for better Accessibility.
{% endtab %}

{% tab title="Next.js AppDir" %}
{% hint style="info" %}
This is how you are instructed to set it up by default (no change from the [Initial setup](./#next.js) guide)
{% endhint %}

<pre class="language-tsx" data-title="app/StartDsfr.tsx"><code class="lang-tsx">"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";

<strong>declare module "@codegouvfr/react-dsfr/next-appdir" {
</strong><strong>    interface RegisterLink { 
</strong><strong>        Link: typeof Link;
</strong><strong>    }
</strong><strong>}
</strong>
startReactDsfr({ 
	defaultColorScheme, 
<strong>	Link
</strong>});

export default function StartDsfr(){
        //Yes, leave null here.
	return null;
}
</code></pre>

**Examples**

Client side routing

```tsx
import { Card } from "@codegouvfr/react-dsfr/Card";

<Card
  linkProps={{
    to: "/my-page"
  }}
/>
```

The `<Link />` component from react-router will be used.

**External links:**

```tsx

linkProps={{
  href: "https://example.com"
  target="_blank"
}}
```

When react-dsfr detects that the `href` points to an external website it will use a regular `<a/>` instead of the `<Link />` component.

**Mailto links**

```tsx

linkProps={{
  href: "mailto:contact@code.gouv.fr"
}}
```

Same goes for the mailto links.

**Converting a link to a button**

```tsx
linkProps={{  
  href: "#"
  onClick: ()=> { /* ... */ }
}}
```

React-dsfr will automatically convert the underlying HTML element into a `<button />` that looks like a link for better Accessibility.
{% endtab %}

{% tab title="Next.js" %}
{% hint style="info" %}
This is how you are instructed to set it up by default (no change from the [Initial setup](./#next.js) guide)
{% endhint %}

<pre class="language-tsx" data-title="pages/_app.tsx"><code class="lang-tsx">import type { AppProps } from "next/app";
import { fr } from "@codegouvfr/react-dsfr";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
<strong>import Link from "next/link";
</strong>
<strong>// Only in TypeScript projects
</strong><strong>declare module "@codegouvfr/react-dsfr/next-pagesdir" {
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
    return &#x3C;Component {...pageProps} />;
}

export default withDsfr(App);
</code></pre>

Example [here](https://github.com/codegouvfr/react-dsfr/blob/main/test/integration/next-pagesdir/pages/\_app.tsx).

**Examples**

Client side routing

```tsx
import { Card } from "@codegouvfr/react-dsfr/Card";

<Card
  linkProps={{
    href: "/my-page"
  }}
/>
```

The `<Link />` component from react-router will be used.

**External links:**

```tsx

linkProps={{
  href: "https://example.com"
  target="_blank"
}}
```

When react-dsfr detects that the `href` points to an external website it will use a regular `<a/>` instead of the `<Link />` component.

**Mailto links**

```tsx

linkProps={{
  to: "mailto:contact@code.gouv.fr"
}}
```

Same goes for the mailto links.

**Converting a link to a button**

```tsx
linkProps={{  
  to: "#"
  onClick: ()=> { /* ... */ }
}}
```

React-dsfr will automatically convert the underlying HTML element into a `<button />` that looks like a link for better Accessibility.
{% endtab %}

{% tab title="type-route" %}
[type-route](https://type-route.zilch.dev/) unlike most routing library doesn't export a `<Link />` component, `<a />` are used directly.

In consequence there isn't anything to setup.

**Examples**

Client side routing

```tsx
import { Card } from "@codegouvfr/react-dsfr/Card";
import { routes } from "...";

<Card
  linkProps={routes.myPage().link}
/>
```

Example [here](https://github.com/codegouvfr/react-dsfr/blob/e8b78dd5ad069a322fbcc34b34b25d4ac8214e34/test/integration/cra/src/index.tsx#L33).
{% endtab %}

{% tab title="Other" %}
You should be able to infer what needs to be done refering to the `react-router` instructions.

If the library you are using doesn't export a `<Link />` (like `type-route` for example) component, there isn't anything to do.
{% endtab %}
{% endtabs %}

####
