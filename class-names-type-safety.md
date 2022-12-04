# Class names type safety

It's like [clsx](https://www.npmjs.com/package/clsx) but you can only pass it classes that are from the dsfr. &#x20;

<figure><img src=".gitbook/assets/frcx.gif" alt=""><figcaption></figcaption></figure>

You can't apply your custom classes using fr.cx(), you'll get type error, but you can combinate a regular `cx()` or `clsx()` function and `fr.cx()`. Example: &#x20;

```tsx
import { makeStyles } from "tss-react/dsfr";
import { cx } from "@codegouvfr/react-dsfr";  

type Params = {
    className?: string;
};

export function MyComponent(params: Params){

   const { classNames } = params;  
   
   return (
       <div className={cx(fr.cx("fr-p-10v"),className)}>
           //...
       </div>
   );

}
```
