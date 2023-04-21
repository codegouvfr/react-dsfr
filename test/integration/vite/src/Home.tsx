import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";

import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { useState } from "react";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { useGdprStore } from "@codegouvfr/react-dsfr/useGdprStore"
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup';
import { consentModalButtonProps } from '@codegouvfr/react-dsfr/ConsentBanner';

export function Home() {
    const { isDark, setIsDark } = useIsDark();
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
            <Form />
            <TableExample />
            <GdprStoreViewer />

        </>
    );
}

const { Form } = (() => {



    function Form() {


        return (
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
                <SelectDogOrCat />
                <SelectMeal />
                <Button>Submit</Button>
            </form>
        );

    }

    const { SelectDogOrCat } = (() => {

        const dogOrCatOptions = [
            {
                value: "dog",
                label: "Dog",
            },
            {
                value: "cat",
                label: "Cat",
            },
        ] as const;

        function SelectDogOrCat() {

            return (
                <Select label="Dog or cat person?"
                    options={[...dogOrCatOptions]}
                    placeholder="Select an option"
                    nativeSelectProps={{
                        name: "dog-or-cat",
                    }}
                />
            );

        }

        return { SelectDogOrCat }

    })();

    const { SelectMeal } = (() => {

        const meals = ["pizza", "fruit-salad", "raclette"] as const;

        type Meal = (typeof meals)[number];

        function SelectMeal() {

            const [favoriteMeal, setFavoriteMeal] = useState<Meal | undefined>(undefined);

            return (
                <>
                    <Select 
                        label="Favorite meal?"
                        options={meals.map(value => ({
                            value,
                            "label": (() => {
                                switch (value) {
                                    case "fruit-salad": return "Fruit salad";
                                    case "pizza": return "Pizza";
                                    case "raclette": return "Raclette";
                                }
                            })()

                        }))}
                        nativeSelectProps={{
                            "value": favoriteMeal,
                            "onChange": event => {
                                // ❤️ no "as Meal" needed here!
                                setFavoriteMeal(event.currentTarget.value);

                                // This next line will throw a type error
                                // setFavoriteMeal("not a meal");
                            }
                        }}
                    />
                    {
                        favoriteMeal !== undefined &&
                        <div className={fr.cx("fr-hint-text", "fr-mb-4w")}>Is {favoriteMeal} really your favorite meal?</div>
                    }
                </>
            );
        }

        return { SelectMeal };


    })();

    return { Form };


})();





function TableExample() {
    return (
        <Table
            caption = "Titre du tableau"
            colorVariant = "green-emeraude"
            headers = {["Titre", "Titre", "Titre", "Titre", "Titre"]}
            data = {[
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
            ]}
        />
    );
}


export const GdprStoreViewer = () => {
    const {consents, firstChoiceMade } = useGdprStore();

    return <>
        <ButtonsGroup inlineLayoutWhen='always' buttons={[
            {
                ...consentModalButtonProps,
                children: "Open Consent"
            },
            {
                children: "Reset Consent",
                priority: "secondary",
                onClick() {
                    localStorage.removeItem("dsfr-gdpr-consent");
                    location.reload();
                }
            }
        ]} />
        <pre>{JSON.stringify({consents, firstChoiceMade})}</pre>
    </>;
}
