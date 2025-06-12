import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";

import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { useState } from "react";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { Book, Money, Police, Sun, LocationFrance } from '@codegouvfr/react-dsfr/picto';
import CityHall from './assets/city-hall.svg';

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

            <div className={fr.cx("fr-my-4w")} style={{fontSize: 48}}>
                <Police />
                <Book />
                <Money />
                <Sun />
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
            <TileExample />
            <TableExample />
            <ControlledAccordion />
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

function TileExample() {
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}>
            <Tile
            enlargeLinkOrButton
            title="Titre de la tuile"
            titleAs="h3"
            orientation="horizontal"
            linkProps={{
                href: "#"
            }}
            pictogram={ <LocationFrance /> }
            desc="Cette tuile utilise un picogramme natif"
            />
            <Tile
            enlargeLinkOrButton
            title="Titre de la tuile"
            titleAs="h3"
            orientation="vertical"
            buttonProps={{
                onClick: () => alert("Tile clicked!"),
            }}
            imageUrl={CityHall}
            imageSvg
            desc="Cette tuile utilise une image"
            />
        </div>
    )
}

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

function ControlledAccordion() {

    const [ expanded, setExpanded ] = useState(false)

    return (
        <Accordion 
            label="Name of the Accordion" 
            onExpandedChange={(value,) => setExpanded(!value)} 
            expanded={expanded}
        >
            Content of the Accordion
        </Accordion>
    );
}
