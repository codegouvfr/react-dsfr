# 💐 colors

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
