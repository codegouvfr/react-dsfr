---
description: Use MUI components in your App or DSFRify your website build with MUI.
---

# 🤝 MUI integration

react-dsfr features a DSFR theme for MUI. This enables you to use the [large library of MUI components](https://mui.com/) in your website, they will blend in nicely. &#x20;

First of all you'll have to remove all usage of `<ThemeProvider />` and `createTheme()` from your codebase (if any) then implement the following approach: &#x20;

```tsx
import { createMuiDsfrThemeProvider, no } from "@codegouvfr/react-dsfr/mui";

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

&#x20;



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
