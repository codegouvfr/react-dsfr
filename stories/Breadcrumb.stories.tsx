import { Breadcrumb } from "../dist/Breadcrumb";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Breadcrumb },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/fil-d-ariane)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Breadcrumb.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    label: "io"
    // links: [
    //     { label: "Accueil", href = "/" },
    //     { label: "Articles", href: "/articles" },
    //     { label: "Le premier", href: "/articles/first" }
    // ]
    //...logCallbacks(["onClick"])
});

export const BreadcrumbSecondary = getStory({
    //"priority": "secondary",
    "label": "Simple button - secondary"
    // ...logCallbacks(["onClick"])
});

// export const ButtonTertiary = getStory({
//     "priority": "tertiary",
//     "label": "Simple button - tertiary",
//     ...logCallbacks(["onClick"])
// });

// export const ButtonDisabled = getStory({
//     "label": "Simple button - disabled",
//     "disabled": true,
//     ...logCallbacks(["onClick"])
// });

// export const ButtonWithIconDefault = getStory({
//     "label": "Simple button with icon",
//     "icon": {
//         iconId: "fr-icon-account-circle-fill"
//     },
//     ...logCallbacks(["onClick"])
// });

// export const ButtonWithIconLeft = getStory({
//     "label": "Simple button with icon",
//     "icon": {
//         "iconId": "fr-icon-account-circle-fill",
//         "position": "left"
//     },
//     ...logCallbacks(["onClick"])
// });

// export const ButtonWithIconRight = getStory({
//     "label": "Simple button with icon",
//     "icon": {
//         "iconId": "fr-icon-account-circle-fill",
//         "position": "right"
//     },
//     ...logCallbacks(["onClick"])
// });

// export const DefaultAnchorButton = getStory({
//     "label": "Simple button - with href (anchor)",
//     "linkProps": {
//         "href": "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton",
//         "target": "_blank"
//     }
// });

// export const DefaultAnchorButtonWithTargetBlank = getStory({
//     "label": "Simple button - with href (anchor) and target _blank",
//     "linkProps": {
//         "target": "_blank",
//         "href": "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton"
//     }
// });
