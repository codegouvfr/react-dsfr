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
    links: [
        { text: "Accueil", linkProps: { href: "/" } },
        { text: "Page 1", linkProps: { href: "/page1" } }
    ]
});

export const ActiveBreadcrumb = getStory({
    links: [
        { text: "Accueil", linkProps: { href: "/" } },
        { text: "Page 1", linkProps: { href: "/page1" }, isActive: true }
    ]
});

export const LongBreadcrumb = getStory({
    links: [
        { text: "Accueil", linkProps: { href: "/" } },
        { text: "Page de démo 1", linkProps: { href: "/page1" } },
        { text: "Page de démo 2", linkProps: { href: "/page2" } },
        { text: "Page de démo 3", linkProps: { href: "/page3" } },
        { text: "Page de démo 4", linkProps: { href: "/page4" } },
        { text: "Page de démo 5", linkProps: { href: "/page5" } },
        { text: "Page de démo 6", linkProps: { href: "/page6" } },
        { text: "Page de démo 7", linkProps: { href: "/page7" }, isActive: true }
    ]
});
