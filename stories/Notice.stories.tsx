import { Notice, type NoticeProps } from "../dist/Notice";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";
import { Equals } from "tsafe/Equals";
import { assert } from "tsafe/assert";

const { meta, getStory } = getStoryFactory<NoticeProps>({
    sectionName,
    "wrappedComponent": { Notice },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Notice.tsx)`,
    "argTypes": {
        "title": {
            "description":
                'Required message to display, it should not relay a "classic" information, but an important and temporary information.'
        },
        "description": {
            "description": "Optional message to complete title"
        },
        "severity": {
            "description": 'Default : "info"',
            "options": (() => {
                const severities = [
                    "no-icon",
                    "info",
                    "warning",
                    "alert",
                    "weather-orange",
                    "weather-red",
                    "weather-purple",
                    "witness",
                    "kidnapping",
                    "attack",
                    "cyberattack"
                ] as const;

                assert<Equals<typeof severities[number] | undefined, NoticeProps["severity"]>>();

                return severities;
            })(),
            "control": { "type": "radio" }
        },
        "isClosable": {
            "description": "If the notice should have a close button"
        },
        "onClose": {
            "description": "Called when the user clicks the close button"
        },
        "isClosed": {
            "description": `If specified the \`<Notice />\` is in 
                [controlled mode](https://reactjs.org/docs/forms.html#controlled-components)
                this means that when the close button is clicked
                the \`onClose()\` callback will be called but you are responsible
                for setting \`isClosed\` to \`false\`, the \`<Notice />\` wont close itself.`,
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "title": "Service maintenance is scheduled today from 12:00 to 14:00.",
    "description": "All will be ok after 14:00.",
    "isClosable": true,
    "isClosed": undefined,
    "severity": "info",
    ...logCallbacks(["onClose"])
});

export const NonClosableNotice = getStory({
    "title": "This is the title",
    "description": "This is the description."
});

export const ClosableNotice = getStory({
    "title": "This is the title.",
    "description": "This is the description.",
    "isClosable": true
});

export const InfoNotice = getStory({
    "title": "This is a Info notice.",
    "description": "This is the description.",
    "severity": "info"
});

export const WarningNotice = getStory({
    "title": "This is a Warning notice.",
    "description": "This is the description.",
    "severity": "warning"
});

export const AlertNotice = getStory({
    "title": "This is an Alert notice.",
    "description": "This is the description.",
    "severity": "alert"
});

export const WeatherOrangeNotice = getStory({
    "title": "This is a WeatherOrange notice.",
    "description": "This is the description.",
    "severity": "weather-orange"
});

export const WeatherRedNotice = getStory({
    "title": "This is a WeatherRed notice.",
    "description": "This is the description.",
    "severity": "weather-red"
});

export const WeatherPurpleNotice = getStory({
    "title": "This is a WeatherPurple notice.",
    "description": "This is the description.",
    "severity": "weather-purple"
});

export const WitnessNotice = getStory({
    "title": "This is a Witness notice.",
    "description": "This is the description.",
    "severity": "witness"
});

export const KidnappingNotice = getStory({
    "title": "This is a Kidnapping notice.",
    "description": "This is the description.",
    "severity": "kidnapping"
});

export const AttackNotice = getStory({
    "title": "This is an Attack notice.",
    "description": "This is the description.",
    "severity": "attack"
});

export const CyberattackNotice = getStory({
    "title": "This is a Cyberattack notice.",
    "description": "This is the description.",
    "severity": "cyberattack"
});
