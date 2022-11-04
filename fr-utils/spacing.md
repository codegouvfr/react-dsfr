# 📏 spacing

```tsx
import { fr } from "@codegouvfr/react-dsfr";

function MyComponent() {

    return (
        <div 
            style={{ 
                marginTop: fr.spacing("2v"),
                ...fr.spacing("padding", { topBottom: "5w", left: 5 })
            }}
        />
    );

}
```

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

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption><p>You can read the returned value in em just by hovering the spacing function call</p></figcaption></figure>
