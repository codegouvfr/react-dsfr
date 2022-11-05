---
description: Create your own components
---

# 🖌 CSS in JS

I personally recomend using tss-react for creating custom components but you can use any CSS-in-JS sollution. &#x20;

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
