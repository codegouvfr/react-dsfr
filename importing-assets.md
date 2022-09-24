---
description: How to import images, SVGs and other static resources from @gouvfr/dsfr
---

# 🌅 Importing assets

Let's say, [in the DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage), you come across the following HTML code.

```html
<!-- Official documentation code, it's don't copy paste that -->
<svg>
    <use xlink:href="../../../dist/artwork/dark.svg#artwork-minor" />
</svg>
```

Let's see how we would translate this into React.

### Using hardcoded links

{% hint style="danger" %}
This is not the recomended aproach since it isn't the more efficient not the more maintainable way.
{% endhint %}

Fisrt sure you have this script in your `package.json`

```diff
 "scripts": {
+    "postinstall": "copy_dsfr_dist_to_public"
 }
```

Now can simply write the following and it will work: &#x20;

<pre class="language-tsx"><code class="lang-tsx"><strong>&#x3C;svg>
</strong>    &#x3C;use xlinkHref="/dsfr/artwork/dark.svg#artwork-minor#artwork-minor" />
&#x3C;/svg></code></pre>

### Rely on your bundler



```tsx
import artworkDarkSvgUrl from "dsfr-react/dsfr/artwork/dark.svg";

<svg>
    <use xlinkHref={`${artworkDarkSvgUrl}#artwork-minor`} />
</svg>;
```

Depending of your webpack config the way you import assets may vary.\
For example, by default in a Next.js project, you'll get the `.svg` url this way (Same thing for `.png`, `.ico` and other image format):

```diff
-import artworkDarkSvgUrl from "dsfr-react/dsfr/artwork/dark.svg";
+import artworkDarkSvg from "dsfr-react/dsfr/artwork/dark.svg";

 <svg>
-    <use xlinkHref={`${artworkDarkSvgUrl}#artwork-minor`} />
+    <use xlinkHref={`${artworkDarkSvg.src}#artwork-minor`} />
 </svg>;
```

If you are getting TypeScript error while trying to import assets:

Create a `/src/global.d.ts` (or `/global.d.ts` in Next.js):

```typescript
declare module "*.svg" {
    declare const url: string;
    export default url;
    /* In Next.js it will be instead
    declare const _default: { src: string; height: number; width: number; };
    export default _default;
    */
}
//OR just 'declare module "*.svg";' if you don't know/want to write the actual type.
```
