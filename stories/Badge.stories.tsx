import { Badge, type BadgeProps } from "../dist/Badge";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
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
        "as": {
            "options": (() => {
                const options = ["p", "span", undefined] as const;

                assert<Equals<typeof options[number], BadgeProps["as"]>>();

                return options;
            })(),
            "control": { type: "select", labels: { null: "default p element" } },
            "description":
                "You can specify a 'span' element instead of default 'p' if the badge is inside a `<p>`."
        },
        "children": {
            "type": { "name": "string", "required": true },
            "description": "Label to display on the badge"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "severity": "success",
    "children": "Label badge"
});

export const BadgeWithoutSeverity = getStory(
    {
        "children": "Label"
    },
    {
        "description": "Medium info `Badge` with icon"
    }
);

export const InfoBadge = getStory(
    {
        "severity": "info",
        "children": "Label info"
    },
    {
        "description": "Medium info `Badge` with icon"
    }
);

export const WarningBadge = getStory(
    {
        "severity": "warning",
        "noIcon": false,
        "children": 'Label "warning"'
    },
    {
        "description": "Medium warning `Badge` with icon"
    }
);

export const SuccessBadge = getStory(
    {
        "severity": "success",
        "noIcon": true,
        "children": "Label success"
    },
    {
        "description": "Medium success `Badge` without icon"
    }
);

export const ErrorBadge = getStory(
    {
        "severity": "error",
        "noIcon": true,
        "children": "Label error"
    },
    {
        "description": "Medium error `Badge` without icon"
    }
);

export const NewBadge = getStory(
    {
        "severity": "new",
        "small": true,
        "children": "Label new"
    },
    {
        "description": "Small new `Badge` with icon"
    }
);

export const BadgeWithIconAndAccentColor = getStory(
    {
        "iconId": "fr-icon-checkbox-circle-line",
        "accentColor": "purple-glycine",
        "children": "Custom badge"
    },
    {
        "description": "`Badge` with custom icon and accent color"
    }
);
