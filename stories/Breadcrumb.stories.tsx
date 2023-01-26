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
    "homeLinkProps": { "href": "/" },
    "segments": [
        {
            "label": "Segment 1",
            "linkProps": {
                "href": "/segment-1"
            }
        },
        {
            "label": "Segment 2",
            "linkProps": {
                "href": "/segment-1/segment-2"
            }
        },
        {
            "label": "Segment 3",
            "linkProps": {
                "href": "/segment-1/segment-2/segment-3"
            }
        },
        {
            "label": "Segment 4",
            "linkProps": {
                "href": "/segment-1/segment-2/segment-3/segment-4"
            }
        }
    ],
    "currentPageLabel": "Page Actuelle"
});
