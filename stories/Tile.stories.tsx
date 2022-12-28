import { Tile } from "../dist/Tile";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Tile },
    "defaultContainerWidth": 300,
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/tile/)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/Tile.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "linkProps": { "href": "#" },
    "title": "Titre de la tuile",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dol",
    "enlargeLink": true,
    "horizontal": false
});

export const TileWithoutEnlargeLink = getStory({
    "linkProps": { href: "#" },
    "title": "Titre de la tuile",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dol",
    "enlargeLink": false
});

export const TileWithImage = getStory({
    "linkProps": { "href": "#" },
    "title": "Titre de la tuile",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dol",
    "enlargeLink": false,
    "imageUrl": "//www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png"
});

export const TileWithImageGrey = getStory({
    "linkProps": { "href": "#" },
    "title": "Titre de la tuile",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dol",
    "enlargeLink": false,
    "imageUrl": "//www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png",
    "grey": true
});

export const TileHorizontalWithImage = getStory(
    {
        "linkProps": { "href": "#" },
        "horizontal": true,
        "title": "Titre de la tuile",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dol",
        "enlargeLink": true,
        "imageUrl": "//www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png"
    },
    { "defaultContainerWidth": "100%" }
);
