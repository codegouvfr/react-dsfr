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
This is not the recomended aproach since it isn't the more efficient not the more maintainable way. You should [rely on your bundler](importing-assets.md#rely-on-your-bundler) instead.
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

{% hint style="success" %}
This is the preferred approach.
{% endhint %}

{% tabs %}
{% tab title="Create React App / Vite / Others" %}
Most JS bundlers, by default, emits a separate file and exports the URL when comming across an import of a image or video file format. &#x20;

```tsx
import artworkDarkSvgUrl from "dsfr-react/dsfr/artwork/dark.svg";

<svg>
    <use xlinkHref={`${artworkDarkSvgUrl}#artwork-minor`} />
</svg>
```
{% endtab %}

{% tab title="Second Tab" %}
In modern next, if not explicitely disabled, image files (including SVGs) are imported using [next/image](https://nextjs.org/docs/upgrading#nextconfigjs-customization-to-import-images). &#x20;

You'll get a valid url by accessing the src property of the react component.

```tsx
import ArtworkDarkSvg from "dsfr-react/dsfr/artwork/dark.svg";

<svg>
    <use xlinkHref={`${ArtworkDarkSvg.src}#artwork-minor`} />
</svg>;
```
{% endtab %}
{% endtabs %}
