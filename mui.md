---
description: Use MUI components in your App or DSFRify your website build with MUI.
---

# 🤝 MUI integration

{% embed url="https://youtu.be/FDRsx3N0OmY" %}

react-dsfr features a DSFR theme for MUI. This enables you to use the [large library of MUI components](https://mui.com/) in your website, they will blend in nicely. &#x20;

First of all you'll have to remove all usage of `<ThemeProvider />` and `createTheme()` from your codebase (if any) then implement the following approach: &#x20;

```tsx
import { createMuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";

const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider();

function App() {

    return (
        <MuiDsfrThemeProvider>
            {/* your app ... */}
        </MuiDsfrThemeProvider>
    );
}
```

<details>

<summary>Custom variable in MUI theme</summary>

If you have [custom variables](https://mui.com/material-ui/customization/theming/#custom-variables) in your MUI theme implement the following approach. &#x20;

In this example we have augmented the MUI theme so it was possible to call `theme.custom.isDarkModeEnabled`. &#x20;

```tsx
import { createMuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {

    interface Theme {
        custom: {
            isDarkModeEnabled: boolean;
        }
    }
}

const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider({
    "augmentMuiTheme": ({ nonAugmentedMuiTheme, frColorTheme }) => ({
        ...nonAugmentedMuiTheme,
        "custom": {
            "isDarkModeEnabled": frColorTheme.isDark
        }
    })
});

function App() {

    return (
        <MuiDsfrThemeProvider>
            {/* your app ... */}
        </MuiDsfrThemeProvider>
    );
}
```

</details>

### Next.js: Improving first print&#x20;

In Next.js setup, on initial page load you may experience a few frames where MUI components aren't aware that the dark mode is enabled. &#x20;

<figure><img src=".gitbook/assets/image (7).png" alt=""><figcaption><p>Mui thinks we are in light mode</p></figcaption></figure>

<figure><img src=".gitbook/assets/image (8).png" alt=""><figcaption><p>After idratation it switches to dark mode</p></figcaption></figure>

You can eradicate theses few frames on subsequent page load by telling Next.js to perform SSR in the correct color scheme for the user: &#x20;

<pre class="language-tsx" data-title="_app.tsx"><code class="lang-tsx">const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: 'system',
<strong>  doPersistDarkModePreferenceWithCookie: true
</strong>});
</code></pre>

**Be aware**: this will opt you out[ from Automatic Static Optimization](https://nextjs.org/docs/messages/opt-out-auto-static-optimization), every hit of your website will trigger a complete render on the backend, so **it probably isn't worth it** unless you have already oped out from static optimization. &#x20;

### Setting up Next.js + MUI + react-dsfr

{% embed url="https://youtu.be/0n0S6PcyG28" %}
