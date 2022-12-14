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
        { label: "Accueil", href: "/" },
        { label: "Page 1", href: "/page1" }
    ]
});

export const LongBreadcrumb = getStory({
    links: [
        { label: "Accueil", href: "/" },
        { label: "Page 1", href: "/page1" },
        { label: "Article avec un titre très très long", href: "/article1" }
    ]
});
