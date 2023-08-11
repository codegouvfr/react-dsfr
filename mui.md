---
description: Use MUI components in your App or DSFRify your website build with MUI.
---

# 🤝 MUI integration

{% embed url="https://youtu.be/FDRsx3N0OmY" %}

react-dsfr features a DSFR theme for MUI. This enables you to use the [large library of MUI components](https://mui.com/) in your website, they will blend in nicely.

First of all you'll have to remove all usage of `<ThemeProvider />` and `createTheme()` from your codebase (if any) then implement the following approach:

```tsx
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";

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

If you have [custom variables](https://mui.com/material-ui/customization/theming/#custom-variables) in your MUI theme implement the following approach.

In this example we have augmented the MUI theme so it was possible to call `theme.custom.isDarkModeEnabled`.

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

The demo setups for Vite, Next ans create-react-app all commes with MUI already setup.  \
\
You can find aditional informations about this tool here: &#x20;

{% embed url="https://dsfr-connect.rame.fr/main/?path=/docs/dsfr-connect-utilisation-mui-v5--docs" %}

### Next.js: Improving first print

In Next.js setup, on initial page load you may experience a few frames where MUI components aren't aware that the dark mode is enabled.

<figure><img src=".gitbook/assets/image (7).png" alt=""><figcaption><p>Mui thinks we are in light mode</p></figcaption></figure>

<figure><img src=".gitbook/assets/image (8).png" alt=""><figcaption><p>After idratation it switches to dark mode</p></figcaption></figure>

You can eradicate these few frames on subsequent page load by telling Next.js to perform SSR in the correct color scheme for the user:

<pre class="language-tsx" data-title="_app.tsx"><code class="lang-tsx">const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: 'system',
<strong>  doPersistDarkModePreferenceWithCookie: true
</strong>});
</code></pre>

**Be aware**: this will opt you out[ from Automatic Static Optimization](https://nextjs.org/docs/messages/opt-out-auto-static-optimization), every hit of your website will trigger a complete render on the backend, so **it probably isn't worth it** unless you have already opted out from static optimization.

### Setting up Next.js + MUI + react-dsfr

{% hint style="warning" %}
Be aware that the API have changed since this video was recorded.
{% endhint %}

{% embed url="https://youtu.be/0n0S6PcyG28" %}

All demo setup are preconfigured with MUI installed.  \
\
