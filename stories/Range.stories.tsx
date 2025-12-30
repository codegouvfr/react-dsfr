import { Range, type RangeProps } from "../dist/Range";

import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    wrappedComponent: { Range },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/curseur-range)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Range.tsx)`,
    argTypes: {
        label: {
            control: { type: "text" }
        },
        disabled: {
            control: { type: "boolean" }
        },
        state: {
            options: (() => {
                const options = ["default", "success", "error"] as const;

                assert<Equals<typeof options[number] | undefined, RangeProps["state"]>>();

                return options;
            })(),
            control: { type: "radio" }
        },
        stateRelatedMessage: {
            description: `This message is only displayed when \`state\` is \`success\` or \`error\`.  
                If state is \`success\` or \`error\` this message is mandatory.`
        },
        nativeInputProps: {
            description: `An object or an tuple of two objects that is forwarded as props to te underlying native \`<input />\` element(s).  
                This is where you pass the \`name\` prop or \`onChange\` for example.`,
            control: false
        },
        small: {
            control: { type: "boolean" }
        },
        double: {
            control: { type: "boolean" }
        },
        hideMinMax: {
            control: { type: "boolean" }
        },
        step: {
            control: { type: "number" }
        },
        max: {
            control: { type: "number" }
        },
        min: {
            control: { type: "number" }
        }
    },
    disabledProps: ["lang"]
});

export default { ...meta, title: "components/Range" };

const defaultProps = {
    label: "Label",
    hintText: "Texte de description additionnel, valeur de 0 à 100.",
    min: 0,
    max: 100
} as const;

export const Default = getStory(defaultProps);

export const Small = getStory({
    ...defaultProps,
    small: true
});

export const HideMinMax = getStory({
    ...defaultProps,
    hideMinMax: true
});

export const WithStep = getStory({ ...defaultProps, step: 10 });

export const SmallWithStep = getStory({ ...defaultProps, small: true, step: 10 });

export const Double = getStory({ ...defaultProps, double: true });

export const SmallDouble = getStory({ ...defaultProps, small: true, double: true });

export const SmallDoubleWithStep = getStory({
    ...defaultProps,
    small: true,
    double: true,
    step: 10
});

export const PrefixSuffix = getStory({
    ...defaultProps,
    prefix: "~",
    suffix: "%"
});

export const Disabled = getStory({
    ...defaultProps,
    disabled: true
});

export const Error = getStory({
    ...defaultProps,
    state: "error",
    stateRelatedMessage: "Valeur sélectionnée impossible"
});

export const Success = getStory({
    ...defaultProps,
    state: "success",
    stateRelatedMessage: "Valeur sélectionnée possible"
});
