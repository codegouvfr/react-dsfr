import { getStoryFactory } from "./getStory";
import { BackToTop, BackToTopProps, BTT_Placement } from "../src/BackToTop";

const storyDescription = `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/retour-en-haut-de-page)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/BackToTop/BackToTop.tsx)`;

const { meta, getStory } = getStoryFactory<BackToTopProps>({
    sectionName: "Components",
    wrappedComponent: { BackToTop },
    description: storyDescription,
    argTypes: {
        id: { control: "text", description: "ID de l'élément" },
        className: { control: "text", description: "Classes CSS supplémentaires" },
        value: { control: "text", description: "Texte du lien" }
    },
    disabledProps: ["lang", "containerWidth"]
});

export default meta;

export const Default = getStory({
    id: "back-to-top-default"
});

export const Center = getStory({
    id: "back-to-top-center",
    placement: BTT_Placement.CENTER
});

export const Right = getStory({
    id: "back-to-top-center",
    placement: BTT_Placement.RIGHT
});

export const CustomText = getStory({
    id: "back-to-top-custom",
    value: "Vers l'infini et au-delà 🚀"
});

export const NotAnimated = getStory({
    id: "back-to-top-no-animation",
    animated: false
});
