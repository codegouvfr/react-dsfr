import { SideMenu } from "../dist/SideMenu";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { SideMenu },
    "defaultContainerWidth": 300,
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/menu-lateral)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/sidemenu/)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/Sidemenu.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    title: "Titre de rubrique",
    items: [
        {
            text: "Accès direct",
            linkProps: { href: "#" }
        },
        {
            text: "Accès direct",
            linkProps: { href: "#" }
        },
        {
            text: "Accès direct",
            linkProps: { href: "#" }
        }
    ]
});
