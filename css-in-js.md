---
description: >-
  react-dsfr enables you to use CSS in JS solution like styled-component emotion
  or TSS.
---

# 💅 CSS in JS

```bash
yarn add tss-react @emotion/react
```

Example of custom component: &#x20;

```tsx
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

export type Props = {
    className?: string;
};

export function MyComponent(props: Props){

    const { className } = props;

    const { classes, cx } = useStyles();

    return (
	<div className={cx(classes.root, className)}>
	    <span className={cx(fr.cx("fr-p-1v"), classes.innerText)} >Hello World</span>
	</div>
    );

}

const useStyles = makeStyles({ "name": { MyComponent } })(colors => ({
    "root": {
        "padding": fr.spacing("10v"),
	"backgroundColor": colors.decisions.background.alt.blueFrance.active,
	[fr.breakpoints.up("sm")]: {
	    "backgroundColor": colors.decisions.background.alt.beigeGrisGalet.active,
	},
	[fr.breakpoints.up("md")]: {
	    "backgroundColor": colors.decisions.background.alt.blueCumulus.active,
	},
	[fr.breakpoints.up("lg")]: {
	    "backgroundColor": colors.decisions.background.alt.blueEcume.active,
	},
	[fr.breakpoints.up("xl")]: {
	    "backgroundColor": colors.decisions.background.alt.brownCafeCreme.active,
	},
    },
    "innerText": {
	...fr.spacing("margin", { "topBottom": "3v" })
    }
}));
```

<figure><img src=".gitbook/assets/custom_dsfr.gif" alt=""><figcaption><p>The above comonent, in dark mode, then in light mode</p></figcaption></figure>

### Setup tss-react

{% tabs %}
{% tab title="SPAs (CRA Vite ect...)" %}
```bash
yarn add tss-react @emotion/react
# or 'npm install --save tss-react @emotion/react'
```
{% endtab %}
{% endtabs %}

### spacing

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

<figure><img src=".gitbook/assets/image (6).png" alt=""><figcaption><p>You can read the returned value in em just by hovering the spacing function call</p></figcaption></figure>

### breakpoints



```tsx
import { useStyles } from "tss-react/dsfr";
import { fr, useColors } from "@codegouvfr/react-dsfr";

function MyComponent() {

    const { css } = useStyles();
    
    const colors= useColors();
    
    return (
        <div
            className={css({
                width: 100px;
                height: 100px;
                backgroundColor: colors.decisions.background.flat.info.default,
                [fr.breakpoints.up("md")]: {
                    backgroundColor: colors.decisions.background.alt.blueFrance.default
                }
            })}
        />
    );

}
```

On screen larger than MD the background color will be `colors.decisions.background.alt.blueFrance.default`.

### colors

```tsx
import { useColors } from "@codegouvfr/react-dsfr";

function MyComponent(){

    const colors = useColor();
    
    //"#518fff" in darlk mode, "#0063cb" in light mode
    console.log(colors.decisions.background.flat.info.default);
    
    // "#313178" in darkMode, "#cacafb" in light mode
    console.log(colors.options.blueFrance._850_200.default);
    
    console.log(colors.isDark ? "App in dark mode": "App in light mode");

}
```

### useIsDark()

```tsx
import { usIsDark } from "@codegouvfr/react-dsfr";

function MyComponent(){

    const { isDark, setIsDark } = useIsDark();
    
    //isDark is a boolean that is true if the App is currently in dark mode.
    
    //Calling setIsDark(true) will swith the app in dark mode. 
    //calling setIsDark("system") will set to whatever mode is signaled as prefered
    //by the user browser


}
```

#### $isDark

Is dark is an observable that enables you to monitor and change the mode outside react. &#x20;

```tsx
import { $isDark } from "@codegouvfr/react-dsfr";

$isDark.current //boolean that represent the current state of isDark.  

// By calling:  
$isDark.current = true;  
//We set the app in dark mode, yes this assignation has side effects,
//it will triger the re-render of the component using the useIsDark() hook.

const unsubscribe = $isDark.subscribe(isDark=> {
    //This callback gets called whenever the app mode changes,
});

//By calling unsubscribe() we make sure that the callback won't be called
//anymore in future changes.  
```

