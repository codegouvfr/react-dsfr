import { CallOut, type CallOutProps } from "../dist/CallOut";

import { getStoryFactory, logCallbacks } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { CallOut },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-avant)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/CallOut.tsx)`,
    "disabledProps": ["lang"],
    "argTypes": {
        "title": {
            "description": "Optional"
        },
        "children": {
            "description": "Optional",
            "control": { "type": "text" }
        },
        "colorVariant": {
            "options": (() => {
                const options = [
                    "green-tilleul-verveine",
                    "green-bourgeon",
                    "green-emeraude",
                    "green-menthe",
                    "green-archipel",
                    "blue-ecume",
                    "blue-cumulus",
                    "purple-glycine",
                    "pink-macaron",
                    "pink-tuile",
                    "brown-cafe-creme",
                    "brown-caramel",
                    "brown-opera",
                    "orange-terre-battue",
                    "yellow-moutarde",
                    "yellow-tournesol",
                    "beige-gris-galet",
                    undefined
                ] as const;

                assert<Equals<typeof options[number], CallOutProps["colorVariant"]>>();

                return options;
            })(),
            "control": { type: "select", labels: { null: "no color variant" } }
        },
        "iconId": {
            "options": (() => {
                const options = [
                    "ri-information-line",
                    "fr-icon-checkbox-circle-line",
                    "ri-ancient-gate-fill",
                    undefined
                ] as const;

                assert<typeof options[number] extends CallOutProps["iconId"] ? true : false>();

                return options;
            })(),
            "description": "Optional",
            "control": { "type": "radio" }
        },
        "buttonProps": {
            "description":
                "The same props you would pass to a `<Button />`, `undefined` if you don't want any button",
            "control": false
        }
    }
});

export default { ...meta, title: "components/CallOut" };

export const Default = getStory({
    "title": "Titre mise en avant",
    "iconId": "ri-information-line",
    "children": `Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à 
    accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires 
    qui remplissent les conditions.`,
    "colorVariant": undefined,
    "buttonProps": {
        "children": "Label bouton MD",
        ...logCallbacks(["onClick"])
    }
});

export const NoTitle = getStory({
    "iconId": "ri-information-line",
    "children": `Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à 
    accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires 
    qui remplissent les conditions.`,
    "colorVariant": undefined,
    "buttonProps": {
        "children": "Label bouton MD",
        ...logCallbacks(["onClick"])
    }
});

export const NoIcon = getStory({
    "title": "Titre mise en avant",
    "children": `Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à 
    accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires 
    qui remplissent les conditions.`,
    "colorVariant": undefined,
    "buttonProps": {
        "children": "Label bouton MD",
        ...logCallbacks(["onClick"])
    }
});

export const NoButton = getStory({
    "title": "Titre mise en avant",
    "iconId": "ri-information-line",
    "children": `Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à 
    accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires 
    qui remplissent les conditions.`
});

export const BodyWithList = getStory({
    "title": "Titre mise en avant avec liste dans le body",
    "iconId": "ri-information-line",
    "children": (
        <>
            Une mise en avant peut contenir une liste :
            <ul>
                <li>Un élément de liste</li>
                <li>Un autre élément de liste</li>
            </ul>
        </>
    ),
    "bodyAs": "div"
});
