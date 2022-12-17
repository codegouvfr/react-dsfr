import { Badge } from "../dist/Badge";
import type { BadgeProps } from "../dist/Badge";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory<BadgeProps>({
    sectionName,
    "wrappedComponent": { Badge },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Badge.tsx)`,
    "argTypes": {
        "severity": {
            "options": (() => {
                const options = ["success", "warning", "info", "error", "new", undefined] as const;

                assert<Equals<typeof options[number], BadgeProps["severity"]>>();

                return options;
            })(),
            "control": { type: "select", labels: { null: "no severity" } }
        },
        "noIcon": {
            "type": { "name": "boolean" },
            "description": "Remove badge icon when true"
        },
        "small": {
            "type": { "name": "boolean" },
            "description": "Set small badge size (`sm`) when true"
        },
        "label": {
            "type": { "name": "string", "required": true },
            "description": "Label to display on the badge"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "severity": "success",
    "label": "Label badge"
});

export const BadgeWithoutSeverity = getStory(
    {
        "label": "Label"
    },
    {
        "description": "Medium info `Badge` with icon"
    }
);

export const InfoBadge = getStory(
    {
        "severity": "info",
        "label": "Label info"
    },
    {
        "description": "Medium info `Badge` with icon"
    }
);

export const WarningBadge = getStory(
    {
        "severity": "warning",
        "noIcon": false,
        "label": 'Label "warning"'
    },
    {
        "description": "Medium warning `Badge` with icon"
    }
);

export const SuccessBadge = getStory(
    {
        "severity": "success",
        "noIcon": true,
        "label": "Label success"
    },
    {
        "description": "Medium success `Badge` without icon"
    }
);

export const ErrorBadge = getStory(
    {
        "severity": "error",
        "noIcon": true,
        "label": "Label error"
    },
    {
        "description": "Medium error `Badge` without icon"
    }
);

export const NewBadge = getStory(
    {
        "severity": "new",
        "small": true,
        "label": "Label new"
    },
    {
        "description": "Small new `Badge` with icon"
    }
);
