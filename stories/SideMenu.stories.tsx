import { SideMenu } from "../dist/SideMenu";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { SideMenu },
    "defaultContainerWidth": 300,
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/menu-lateral)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/sidemenu/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Sidemenu.tsx)`,
    "disabledProps": ["lang"],
    "argTypes": {
        "title": {
            "description": "Title displayed above the menu"
        },
        "items": {
            "control": "object",
            "type": { "name": "string", "required": true },
            "description": "Items used to populate the menu"
        },
        "burgerMenuButtonText": {
            "type": { "name": "string", "required": true },
            "description": "Label to display next to the burger menu button"
        },
        "sticky": {
            "defaultValue": false,
            "control": { "type": "radio" },
            "description": "Make the menu sticky",
            "options": [false, true, "full-height"]
        },
        "align": {
            "defaultValue": "left",
            "options": ["left", "right"],
            "control": { type: "radio" },
            "description": "Align the menu on the left or the right of the page"
        }
    }
});

export default meta;

export const Default = getStory({
    "title": "Titre de rubrique",
    "burgerMenuButtonText": "Dans cette rubrique",
    "items": [
        {
            "isActive": true,
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        }
    ]
});

export const SideMenuWith2Levels = getStory({
    "title": "Titre de rubrique",
    "burgerMenuButtonText": "Dans cette rubrique",
    "items": [
        {
            "text": "Niveau 1",
            "items": [
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                }
            ]
        },
        {
            "isActive": true,
            "text": "Entrée menu active",
            "items": [
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "isActive": true,
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                }
            ]
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Niveau 1",
            "items": [
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                }
            ]
        }
    ]
});

export const SideMenuWith3Levels = getStory({
    "title": "Titre de rubrique",
    "burgerMenuButtonText": "Dans cette rubrique",
    "items": [
        {
            "text": "Niveau 1",
            "items": [
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                }
            ]
        },
        {
            "isActive": true,
            "text": "Entrée menu active",
            "items": [
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "isActive": true,
                    "text": "Entrée menu active niveau 2",
                    "items": [
                        {
                            "text": "Accès direct niveau 3",
                            "linkProps": { "href": "#" }
                        },
                        {
                            "isActive": true,
                            "text": "Accès direct niveau 3",
                            "linkProps": { "href": "#" }
                        },
                        {
                            "text": "Accès direct niveau 3",
                            "linkProps": { "href": "#" }
                        },
                        {
                            "text": "Accès direct niveau 3",
                            "linkProps": { "href": "#" }
                        }
                    ]
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                }
            ]
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Accès direct",
            "linkProps": { "href": "#" }
        },
        {
            "text": "Niveau 1",
            "items": [
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                },
                {
                    "text": "Accès direct niveau 2",
                    "linkProps": { "href": "#" }
                }
            ]
        }
    ]
});
