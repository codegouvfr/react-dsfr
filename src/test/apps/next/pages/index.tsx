
import { useColorScheme } from "react_dsfr/lib/colorScheme";


if (typeof window !== "undefined") {


    (window as any).dsfr = {
        verbose: true,
        mode: 'manual'
    };

    // @ts-ignore
    import("@gouvfr/dsfr/dist/dsfr.module").then(() => {
        (window as any).dsfr.start();
    });
}

export default function Index() {


    const { colorScheme, setColorScheme } = useColorScheme();

    return (
        <>
            <h1>Hello World, colorScheme: {colorScheme}</h1>
            <button onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}>Toggle color scheme</button>
        </>
    );
}
