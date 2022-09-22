<p align="center">
    <i>React implementation of the <a href="https://www.systeme-de-design.gouv.fr/">DSFR</a></i>
</p>

WIP

# Install

```bash
yarn add react_dsfr
```

`package.json` (Optional if you are using Next.js):

```diff
 "scripts": {
+    "postinstall": "update_dsfr_static_resources"
 }
```

> `update_dsfr_static_resources` is a `bin` script of `react_dsfr` that copies `@gouvfr/dsfr/dist` to `public/dsfr`

`.gitignore`:

```diff
+ /public/dsfr
```

## Single page applications

If you are using [Create React App](https://create-react-app.dev/) or [Vite](https://vitejs.dev/) or a similar SPA framework.

`public/index.html` ( or `/index.html` depending of your Framework )

```diff
 <!DOCTYPE html>
 <html>
 <head>
+    <!-- For preventing https://fonts.google.com/knowledge/glossary/fout, only preload what you are using -->
+    <link rel="preload" href="/dsfr/fonts/Marianne-Light.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Light_Italic.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Regular.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Regular_Italic.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Medium.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Medium_Italic.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Bold.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Marianne-Bold_Italic.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Spectral-Regular.woff2" as="font" crossorigin="anonymous" />
+    <link rel="preload" href="/dsfr/fonts/Spectral-ExtraBold.woff2" as="font" crossorigin="anonymous" />

+    <link rel="stylesheet" href="/dsfr/dsfr.min.css"/>
 </head>
```

> NOTE: If you are using CRA and if you are hosting your app under a subpath (`package.json` -> `"homepage": "https://my-site.gouv/a/sub/path"`) you need to include
> `%PUBLIC_URL%` [like so](https://github.com/codegouvfr/react_dsfr/blob/c13d1066b188a509d5808aa6c87722bedc35f21f/src/test/apps/cra/public/index.html#L10-L21) in the URL.

`src/index.tsx`

```diff
+import { startReactDsfr } from "react_dsfr";
+startReactDsfr({ "defaultColorScheme": "system" });
```

## Next.js

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

Create a [`_app.tsx` (or `_app.js`)](https://nextjs.org/docs/advanced-features/custom-app) file:

```tsx
import { withDsfr } from "react_dsfr/lib/nextJs";
import DefaultApp from "next/app";
import "react_dsfr/dsfr/dsfr.css";

export default withDsfr(
    DefaultApp, // You can, of course, provide your custom App in place of the default if you have one
    {
        "defaultColorScheme": "system",
        // (Optional) Pick the fonts variant you want to preload, if undefined, everything is preloaded.
        "preloadFonts": ["Marianne-Bold", "Marianne-Regular", "Marianne-Medium"]
    }
);
```

# Importing assets

Let's say, [in the DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage), you come
across the following HTML code.

```html
<!-- Official documentation code, don't copy paste that -->
<svg>
    <use xlink:href="../../../dist/artwork/dark.svg#artwork-minor" />
</svg>
```

Because the `update_dsfr_static_resources` copied all the assets into `public/dsfr/` you
can always translate the above HTML code into:

```tsx
// ❌ DON'T
<svg>
    <use xlinkHref="/dsfr/artwork/dark.svg#artwork-minor#artwork-minor" />
</svg>
```

It will work but don't do that, it's not the maintainable nor the more efficient way.
Write this instead:

```tsx
// ✅ DO
import artworkDarkSvgUrl from "react_dsfr/dsfr/artwork/dark.svg";

<svg>
    <use xlinkHref={`${artworkDarkSvgUrl}#artwork-minor`} />
</svg>;
```

Depending of your webpack config the way you import assets may vary.  
For example, by default in a Next.js project, you'll get the SVG url
this way:

```diff
-import artworkDarkSvgUrl from "react_dsfr/dsfr/artwork/dark.svg";
+import artworkDarkSvg from "react_dsfr/dsfr/artwork/dark.svg";

 <svg>
-    <use xlinkHref={`${artworkDarkSvgUrl}#artwork-minor`} />
+    <use xlinkHref={`${artworkDarkSvg.src}#artwork-minor`} />
 </svg>;
```

If you are getting TypeScript error create a global declaration file:

`/src/global.d.ts` (or `/global.d.ts` in Next.js):

```typescript
declare module "*.svg" {
    declare const url: string;
    export default url;
}
//OR just 'declare module "*.svg";' if you don't know/want to write the actual type.
```

# Development

```bash
yarn
yarn build
npx tsc -w
npx tsc -p src/bin -w & npx tsc -p src -w

# Open another Terminal

yarn start_cra  # For testing in in a Create React App setup
yarn start_next # For testing in a Next.js setup
```

## How to publish a new version on NPM, how to release a beta version

This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the
documentation of this starter for understanding the lifecycle of this repo.
