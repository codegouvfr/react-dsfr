import { Notice } from "../dist/Notice";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

const { meta, getStory } = getStoryFactory({
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
    ...logCallbacks(["onClose"])
});

export const NonClosableNotice = getStory({
    "title": "This is the title"
});

export const ClosableNotice = getStory({
    "title": "This is the title",
    "isClosable": true
});
