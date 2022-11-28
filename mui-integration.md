---
description: Use MUI components in your App or DSFRify your website build with MUI.
---

# 🤝 MUI integration

{% hint style="warning" %}
If you are using Next.js, MUI needs extra steps to work with SSR. &#x20;

You can follow [the official MUI documentation](https://mui.com/material-ui/guides/server-rendering/#reference-implementations) but the easyest way to set it up is using the tss-react tooling: &#x20;

`yarn add @mui/material @emotion/react @emotion/styled tss-react`

and follow the instruction [here.  ](https://docs.tss-react.dev/ssr/next.js#single-emotion-cache)
{% endhint %}

react-dsfr features a DSFR theme for MUI. This enables you to use the [large library of MUI components](https://mui.com/) in your website, they will blend in nicely. &#x20;

First of all you'll have to remove all usage of `<ThemeProvider />` and `createTheme()` from your codebase (if any) then implement the following approach: &#x20;

```tsx
import { 
    createMuiDsfrThemeProvider, 
    noAugmentation 
} from "@codegouvfr/react-dsfr/mui";

const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider({
    // If and only if you have a type error here, unflold the following section
    "augmentMuiTheme": noAugmentation
});

function App() {

    return (
        <MuiDsfrThemeProvider>
            {/* your app ... */}
        </DsfrLangProvider>
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
        </DsfrLangProvider>
    );
}
```

</details>
