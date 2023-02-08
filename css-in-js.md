---
description: Compatibility with solutions like styled-components, emotion and TSS.
---

# 💅 CSS in JS

At build time `react-dsfr` parses the official [dsfr.css](https://unpkg.com/browse/@gouvfr/dsfr/dist/dsfr/dsfr.css) files and spits out a typed JavaScript representation of the DSFR. In particular it's colors [options](https://unpkg.com/browse/@codegouvfr/react-dsfr@0.24.0/src/fr/generatedFromCss/getColorOptions.ts) and [decision](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/getColorDecisions.ts), the [spacing stystem](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/spacing.ts) and  the [breakpoints values](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/breakpoints.ts). &#x20;

This enables, to write DSFR compliant CSS in JS code since we are able to expose function that are the equivalent of the DSFR utility classes. &#x20;

{% tabs %}
{% tab title="Native" %}
You can use the style props on native react components but you won't be able to use the fr.spacing utility that enable to write responsive code.  &#x20;

```tsx
import { fr } from "@codegouvfr/react-dsfr";
import { useColors } from "@codegouvfr/react-dsfr/useColors";

export type Props = {
    className?: string;
};

export const MyComponent =(props: Props) => {

    const { className } = props;
    
    const theme = useColors();

    return (
	<div 
	    className={className}
	    style={{
	        "padding": fr.spacing("10v"),
	        "backgroundColor": theme.decisions.background.alt.blueFrance.active,
	    }}
	>
	    <span 
	        className={fr.cx("fr-p-1v")}
	        style={{
	            ...fr.spacing("margin", { "topBottom": "3v" })
	        }}
	    >
	        Hello World
	    </span>
	</div>
    );

};

MyComponent.displayName = "MyComponent";
```
{% endtab %}

{% tab title="TSS" %}
{% embed url="https://tss-react.dev" %}

```bash
yarn add tss-react @emotion/react
```

```tsx
import { makeStyles } from "tss-react/dsfr";

export type Props = {
    className?: string;
};

export const MyComponent =(props: Props) => {

    const { className } = props;

    const { classes, cx } = useStyles();

    return (
	<div className={cx(classes.root, className)}>
	    <span className={cx(fr.cx("fr-p-1v"), classes.innerText)} >
	        Hello World
	    </span>
	</div>
    );

};

MyComponent.displayName = "MyComponent";

const useStyles = makeStyles({ "name": MyComponent.displayName })(theme => ({
    "root": {
        "padding": fr.spacing("10v"),
	"backgroundColor": theme.decisions.background.alt.blueFrance.active,
	[fr.breakpoints.up("md")]: {
	    "backgroundColor": theme.decisions.background.alt.blueCumulus.active
	}
    },
    "innerText": {
	...fr.spacing("margin", { "topBottom": "3v" })
    }
});
```

{% hint style="info" %}
Avantages of tss-react over others CSS in JS solutions

* It features a native integration with react-dsfr, I'm the author of TSS so I can[ export from TSS an helper](https://github.com/garronej/tss-react/blob/main/src/dsfr.ts) dedicated to this lib.
* I made tss-react in coordination the MUI team. (TSS is documented in the MUI documentation [here](https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react) and [here](https://mui.com/material-ui/guides/interoperability/#jss-tss)) so it works very well with it. Beside, getting MUI to correctly SSR in a Next.js setup is complicated ([see the reference repo](https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript)). With the help of TSS, [it's much easier](https://docs.tss-react.dev/ssr/next.js#single-emotion-cache).   &#x20;
{% endhint %}  

{% endtab %}

{% tab title="styled" %}
{% embed url="https://styled-components.com/" %}

{% hint style="info" %}
[styled-component](https://styled-components.com/) and [@emotion/styled](https://emotion.sh/docs/styled) are equivalent API wise.&#x20;
{% endhint %}

{% code title="index.tsx" %}
```tsx
import { ThemeProvider } from '@emotion/react'
import { useColors } from "@codegouvfr/react-dsfr";

function Root(){

    const colors = useColors();

    return (
        <ThemeProvider theme={colors}>
            <App />
        </ThemeProvider>
    );

}

```
{% endcode %}

```tsx
import styled from '@emotion/styled'
import { fr } from "@codegouvfr/react-dsfr";

export type Props = {
    className?: string;
};

export function MyComponentNotStyled(props: Props){

    const { className } = props;

    return (
	<div className={className}>
	    <span className={fr.cx("fr-p-1v")}>Hello World</span>
	</div>
    );

}

export const MyComponent = MyComponentNotStyled`
  padding: ${fr.spacing("10v")};
  background-color: ${({ theme })=> theme.decisions.background.alt.blueFrance.active};
  ${fr.breakpoints.up("md")}: {
    background-color: ${({ theme })=> theme.decisions.background.alt.beigeGrisGalet.active};
  }
  & > span {
    margin-top: ${fr.spacing("3v")};
    margin-bottom: ${fr.spacing("3v")};
  }
`;

MyComponent.displayName = "MyComponent";
```
{% endtab %}
{% endtabs %}

### spacing

For ensuring the spacing between elements is consistent through out the website. &#x20;

{% hint style="info" %}
This tool is build using [this file](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/spacing.ts) that is automatically generated from [dsfr.css](https://unpkg.com/browse/@gouvfr/dsfr/dist/dsfr/dsfr.css)
{% endhint %}

<pre class="language-tsx"><code class="lang-tsx"><strong>import { fr } from "@codegouvfr/react-dsfr";
</strong>
function MyComponent() {

    return (
        &#x3C;div 
            style={{ 
                marginTop: fr.spacing("2v"),
                ...fr.spacing("padding", { topBottom: "5w", left: 5 })
            }}
        />
    );

}
</code></pre>

The above code is equivalent to: &#x20;

```tsx
import { fr } from "@codegouvfr/react-dsfr";

function MyComponent() {

    return (
        <div 
            style={{ 
                marginTop: fr.spacing("2v"),
                paddingTop: fr.spacing("5w"),
                paddingBottom: fr.spacing("5w"),
                paddingLeft: 5
            }}
        />
    );

}
```

Which is in turn equivalent to: &#x20;

```tsx
import { fr } from "@codegouvfr/react-dsfr";

function MyComponent() {

    return (
        <div 
            style={{ 
                marginTop: "0.5rem",
                paddingTop: "2.5rem",
                paddingBottom: "2.5rem",
                paddingLeft: 5
            }}
        />
    );

}
```

<figure><img src=".gitbook/assets/image (6) (1).png" alt=""><figcaption><p>You can read the returned value in em just by hovering the spacing function call</p></figcaption></figure>

### breakpoints

For writing responsive UIs with media query (`@media`).   &#x20;

{% hint style="info" %}
This tool is build using [this file](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/breakpoints.ts) that is automatically generated from [dsfr.css](https://unpkg.com/browse/@gouvfr/dsfr/dist/dsfr/dsfr.css)
{% endhint %}

```tsx
import { useStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

function MyComponent() {

    const { css, theme } = useStyles();
    
    return (
        <div
            className={css({
                width: "100px",
                height: "100px"
                backgroundColor: theme.decisions.background.flat.info.default,
                // On screen larger than MD the background color 
                // will be colors.decisions.background.alt.blueFrance.default.
                [fr.breakpoints.up("md")]: {
                    backgroundColor: theme.decisions.background.alt.blueFrance.default
                }
            })}
        />
    );

}
```

<figure><img src=".gitbook/assets/image (4).png" alt=""><figcaption><p>This tools generates @media query for you that matches the DSFR breakpoints</p></figcaption></figure>

### colors

Using the `theme` object that holds the colors decisions and options.

{% hint style="info" %}
This is made possible by [options.ts](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/getColorOptions.ts) and [decisions.ts](https://unpkg.com/browse/@codegouvfr/react-dsfr/src/fr/generatedFromCss/getColorDecisions.ts) files autmatically generated from [dsfr.css](https://unpkg.com/browse/@gouvfr/dsfr/dist/dsfr/dsfr.css)
{% endhint %}

{% hint style="success" %}
The is [a tool](https://react-dsfr-components.etalab.studio/?path=/docs/%25F0%259F%258E%25A8-color-resolver--page) at your disposal to help you pick your colors.
{% endhint %}

The React agnostic way:&#x20;

```typescript
import { fr } from "@codegouvfr/react-dsfr";

const isDark = false;

const theme = fr.getColors(isDark);

theme.decisions.background.flat.info.default // #0063cb
theme.options.blueFrance._850_200.default // #cacafb
theme.isDark // false
```

Whith a hook that returns the `theme` object for the color scheme (light/dark) that is currently active: &#x20;

```tsx
import { useColors } from "@codegouvfr/react-dsfr/useColors";

function MyComponent(){

    const theme = useColors();
    
    //"#518fff" in darlk mode, "#0063cb" in light mode
    console.log(theme.decisions.background.flat.info.default);
    
    // "#313178" in darkMode, "#cacafb" in light mode
    console.log(theme.options.blueFrance._850_200.default);
    
    console.log(theme.isDark ? "App in dark mode": "App in light mode");

}
```

You can also access the theme object using the preconfigured `tss-react` adapter: &#x20;

<pre class="language-typescript"><code class="lang-typescript">import { useStyles } from "tss-react/dsfr";

function MyComponent(){

<strong>    const { theme } = useStyles();
</strong>    
    // ...
    
}
</code></pre>

And with `makeStyles` (recomended approach):&#x20;

<pre class="language-tsx"><code class="lang-tsx"><strong>import { makeStyles } from "tss-react/dsfr";
</strong>
type Props = {
    calssName?: string;
};

function MyComponent(props){

    const { className }= props;

    const { classes, cx } = useStyles();
    
    return (
        &#x3C;div classes={cx(classes.root, className)}>
            // ...
        &#x3C;/div>
    );
    
}

<strong>const useStyles = makeStyles()(theme => ({
</strong>    root: {
<strong>        backgroundColor: theme.decisions.background.flat.info.default
</strong>    }
}));
</code></pre>

### useIsDark()

You can access the active mode (isDark: true/false) in the `theme` object  however, if you want to manually switch the mode you can use `setIsDark(true/false)`  .

{% hint style="info" %}
Consider using the [\<Display />](https://react-dsfr-components.etalab.studio/?path=/docs/components-display--default) component instead of trying to manually manage the active mode.
{% endhint %}

```tsx
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";

function MyComponent(){

    const { isDark, setIsDark } = useIsDark();
    
    //isDark is a boolean that is true if the App is currently in dark mode.
    
    //Calling setIsDark(true) will swith the app in dark mode. 
    //calling setIsDark("system") will set to whatever mode is signaled as prefered
    //by the user browser


}
```

