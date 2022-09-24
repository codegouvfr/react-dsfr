# 🔧 Initial setup

{% tabs %}
{% tab title="Next.js" %}
```bash
yarn add dsfr-react
```

`next.config.js`:

```diff
 module.exports = {
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
 }
```

Create a [`pages/_app.tsx` (or `pages/_app.js`)](https://nextjs.org/docs/advanced-features/custom-app) file:

```tsx
import DefaultApp from "next/app";
import { withDsfr } from "dsfr-react/lib/nextJs";
import "dsfr-react/dsfr/dsfr.css";

export default withDsfr(
    DefaultApp, // You can, of course, provide your custom App if you have one
    {
        "defaultColorScheme": "system",
        "preloadFonts": ["Marianne-Bold", "Marianne-Regular", "Marianne-Medium"]
    }
);
```

{% hint style="info" %}
Preloading fonts prevent from [FOUT](https://fonts.google.com/knowledge/glossary/fout).

Be eco friendly, only preload the fonts variant you actually use.

You can see in the network tab of your browser's dev tools what are the fonts variant used in the first print.
{% endhint %}
{% endtab %}

{% tab title="Create React App" %}
```bash
yarn add react_dsfr
```

`package.json`

```diff
 "scripts": {
+    "postinstall": "update_dsfr_static_resources"
 }
```

`.gitignore`:

```diff
+ /public/dsfr
```

{% hint style="info" %}
`update_dsfr_static_resources` is a `bin` script of `react_dsfr` that copies `@gouvfr/dsfr/dist` to `public/dsfr`
{% endhint %}
{% endtab %}
{% endtabs %}
