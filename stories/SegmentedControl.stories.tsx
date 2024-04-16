import { SegmentedControl, type SegmentedControlProps } from "../dist/SegmentedControl";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    wrappedComponent: { SegmentedControl },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/controle-segmente/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SegmentedControl.tsx)`,
    argTypes: {
        small: {
            control: { type: "boolean" }
        },
        hideLegend: {
            control: { type: "boolean" }
        },
        inlineLegend: {
            control: { type: "boolean" }
        },
        segments: {
            control: { type: null }
        }
    },
    disabledProps: ["lang"]
});

export default meta;

const defaultProps: SegmentedControlProps = {
    legend: "Légende",
    segments: [
        {
            label: "Libellé"
        },
        {
            label: "Libellé"
        },
        {
            label: "Libellé"
        }
    ]
};

export const Default = getStory({
    ...defaultProps
});

export const Small = getStory({
    ...defaultProps,
    small: true
});

export const InlineLegend = getStory({
    ...defaultProps,
    inlineLegend: true
});

export const HintText = getStory({
    ...defaultProps,
    hintText: "Texte d’aide"
});

export const InlineLegendWithHintText = getStory({
    ...defaultProps,
    inlineLegend: true,
    hintText: "Texte d’aide"
});

export const WithIcons = getStory({
    ...defaultProps,
    segments: [
        {
            label: "Libellé",
            iconId: "fr-icon-road-map-line"
        },
        {
            label: "Libellé",
            iconId: "fr-icon-road-map-line"
        },
        {
            label: "Libellé",
            iconId: "fr-icon-road-map-line"
        }
    ]
});

export const HiddenLegend = getStory({
    ...defaultProps,
    hideLegend: true
});

export const PartiallyDisabled = getStory({
    ...defaultProps,
    segments: [
        {
            label: "Libellé"
        },
        {
            label: "Libellé"
        },
        {
            label: "Libellé",
            nativeInputProps: {
                disabled: true
            }
        }
    ]
});

export const Maximum = getStory(
    {
        ...defaultProps,
        segments: [
            {
                label: "label long",
                iconId: "fr-icon-star-line"
            },
            {
                label: "label trop long",
                iconId: "fr-icon-time-line"
            },
            {
                label: "Libellé",
                iconId: "fr-icon-road-map-line"
            },
            {
                label: "Libellé",
                iconId: "fr-icon-road-map-line"
            },
            {
                label: "Libellé",
                iconId: "fr-icon-road-map-line"
            }
        ]
    },
    {
        description: "DEPRECATED (resize to see automatic vertical orientation)"
    }
);
