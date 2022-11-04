# 🌗 useIsDark

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

### $isDark

Is dark is an observable that enables you to monitor and change the mode outside react. &#x20;

```tsx
import { $isDark } from "@codegouvfr/react-dsfr";

$isDark.current //boolean that represent the current app of the App.  

// By calling:  
$isDark.current = true;  
//We set the app in dark mode, yes this assignation has side effects.  

const unsubscribe = $isDark.subscribe(isDark=> {
    //This callback gets called whenever the app mode changes,
});

//By calling unsubscribe() we make sure that the callback won't be called
//anymore in future changes.  
```
