import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select, type SelectProps } from "@codegouvfr/react-dsfr/Select";

import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { useState } from "react";


const exampleOptions1: SelectProps.Option<"dog" | "cat">[] = [
    {
        value: "dog",
        label: "Dog",
    },
    {
        value: "cat",
        label: "Cat",
    },
];
type Meal = "pizza" | "fruit-salad" | "raclette" | "";
const exampleOptions2: SelectProps.Option<Meal>[] = [
    {
        value: "pizza",
        label: "Pizza",
    },
    {
        value: "fruit-salad",
        label: "Fruit salad",
    },
    {
        value: "raclette",
        label: "Raclette",
    },
];

export function Home() {
    const { isDark, setIsDark } = useIsDark();
    const [favoriteMeal, setFavoriteMeal] = useState<Meal>("");
    return (
        <>
            
            <div className={fr.cx("fr-my-4w")}>
                <Alert
                    closable
                    severity="success"
                    title="Success: This is the title"
                    description="This is the description"
                />
            </div>
            <div className={fr.cx("fr-my-4w")}>
                <span className={fr.cx("fr-icon-ancient-gate-fill")} aria-hidden="true"></span>
                <i className={fr.cx("fr-icon-ancient-gate-fill")} aria-hidden="true" />
            </div>
            
            <div className={fr.cx("fr-my-4w")}>
                <Button
                    type="button"
                    iconId="ri-24-hours-fill"
                >
                    Download
                </Button>
            </div>

            <h1>Color Scheme: {isDark ? "dark" : "light"}</h1>

            <div className={fr.cx("fr-my-4w")}>
                <ButtonsGroup
                    inlineLayoutWhen="lg and up"
                    buttons={[
                        {
                            children: "Set color scheme to dark",
                            onClick: () => setIsDark(true),
                            type: "button",
                        },
                        {
                            children: "Set color scheme to light",
                            onClick: () => setIsDark(false),
                            priority: "secondary",
                            type: "button",
                        },
                        {
                            children: "Set color scheme to system",
                            onClick: () => setIsDark("system"),
                            priority: "tertiary",
                            type: "button",
                        },
                    ]}
                
                />
            </div>
            <form action="#" onSubmit={(event) => {
                event.preventDefault();
                alert("Submitted form with data " + JSON.stringify(Object.fromEntries(new FormData(event.target as HTMLFormElement).entries()), null, 2))
            }}>
                <Input label="Firstname" nativeInputProps={{
                    name: "firstname",
                }} />
                <Input label="Lastname" nativeInputProps={{
                    name: "lastname",
                }} />
                <Select label="Dog or cat person?" 
                    options={exampleOptions1}
                    placeholder="Select an option"
                    nativeSelectProps={{
                        name: "dog-or-cat",
                    }} 
                />
                <Select label="Favorite meal?" 
                    options={exampleOptions2}
                    placeholder="Select an option"
                    nativeSelectProps={{
                        name: "favorite-meal",
                        onChange: (event) => {
                            // ❤️ no "as Meal" needed here!
                            setFavoriteMeal(event.currentTarget.value);

                            // This next line will throw a type error
                            // setFavoriteMeal("not a meal");
                        }
                    }} 
                />
                {
                    favoriteMeal &&
                    <div className={fr.cx("fr-hint-text", "fr-mb-4w")}>Is {favoriteMeal} really your favorite meal?</div>

                }
                
                <Button>Submit</Button>
            </form>

        </>
    );
}
