---
description: Like react-router or Next.js file system based route.
---

# 🔀 Integration with Routing libraries

Depending of the framwork/routing library you are using link between pages are not handled the same way. &#x20;

Usually you'll have a `<Link />` component provided by your library or router of choice. You need to let react-dsfr knows about it so that whenever a link is needed in a DSFR component you can provide the correct props for you `<Link />` component.

{% tabs %}
{% tab title="Vanilla" %}
By default react-dsfr will use a `<a />` element. You just need to implement theme augmentation. This is usually done in the index.tsx but you can do it anywhere. &#x20;

{% hint style="success" %}
If you're not using TypeScript you have nothing to do.&#x20;
{% endhint %}

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

{% endtab %}
{% endtabs %}
