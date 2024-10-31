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
    "title": "Service maintenance is scheduled today from 12:00 to 14:00",
    "isClosable": true,
    "isClosed": undefined,
    "severity": "info",
    ...logCallbacks(["onClose"])
});

export const NonClosableNotice = getStory({
    "title": "This is the title"
});

export const ClosableNotice = getStory({
    "title": "This is the title",
    "isClosable": true
});

export const NoIconNotice = getStory({
    "title": "This is a No Icon notice",
    "severity": "no-icon"
});

export const InfoNotice = getStory({
    "title": "This is a Info notice",
    "severity": "info"
});

export const WarningNotice = getStory({
    "title": "This is a Warning notice",
    "severity": "warning"
});

export const AlertNotice = getStory({
    "title": "This is an Alert notice",
    "severity": "alert"
});

export const WeatherOrangeNotice = getStory({
    "title": "This is a WeatherOrange notice",
    "severity": "weather-orange"
});

export const WeatherRedNotice = getStory({
    "title": "This is a WeatherRed notice",
    "severity": "weather-red"
});

export const WeatherPurpleNotice = getStory({
    "title": "This is a WeatherPurple notice",
    "severity": "weather-purple"
});

export const WitnessNotice = getStory({
    "title": "This is a Witness notice",
    "severity": "witness"
});

export const KidnappingNotice = getStory({
    "title": "This is a Kidnapping notice",
    "severity": "kidnapping"
});

export const AttackNotice = getStory({
    "title": "This is an Attack notice",
    "severity": "attack"
});

export const CyberattackNotice = getStory({
    "title": "This is a Cyberattack notice",
    "severity": "cyberattack"
});
