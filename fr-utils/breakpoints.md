# 📲 breakpoints

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
