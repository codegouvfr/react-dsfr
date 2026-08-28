import React from "react";
import { action } from "@storybook/addon-actions";
import { Share, type ShareProps } from "../dist/Share";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<ShareProps>({
    sectionName,
    wrappedComponent: { Share },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/partage)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/share/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Share.tsx)

The component renders a DSFR share block with social/email links and optional custom actions.
`,
    argTypes: {
        classes: {
            control: { type: null },
            description:
                'Add custom classes for inner elements. Possible keys are "root", "title", "text", "buttons-group", "buttons-group-item", "button".'
        }
    },
    disabledProps: ["lang"]
});

export default meta;

const defaultButtons: [ShareProps.Button, ...ShareProps.Button[]] = [
    {
        type: "facebook",
        linkProps: {
            href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
            target: "_blank",
            rel: "noopener noreferrer"
        }
    },
    {
        type: "twitter-x",
        linkProps: {
            href: "https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
            target: "_blank",
            rel: "noopener noreferrer"
        }
    },
    {
        type: "linkedin",
        linkProps: {
            href: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
            target: "_blank",
            rel: "noopener noreferrer"
        }
    },
    {
        type: "mail",
        linkProps: {
            href: "mailto:?subject=DSFR&body=Decouvrez%20le%20DSFR%20https%3A%2F%2Fwww.systeme-de-design.gouv.fr"
        }
    },
    {
        type: "copy",
        buttonProps: {
            type: "button",
            onClick: action("copy-click")
        }
    }
];

export const Default = getStory({
    buttons: defaultButtons
});

export const InactiveSocialButtons = getStory({
    text: (
        <>
            Veuillez <a href="#consent">autoriser le depot de cookies</a> pour partager sur
            Facebook, X et LinkedIn.
        </>
    ),
    buttons: [
        {
            type: "facebook",
            disabled: true,
            linkProps: {
                href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
                target: "_blank",
                rel: "noopener external"
            }
        },
        {
            type: "twitter-x",
            disabled: true,
            linkProps: {
                href: "https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
                target: "_blank",
                rel: "noopener external"
            }
        },
        {
            type: "linkedin",
            disabled: true,
            linkProps: {
                href: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
                target: "_blank",
                rel: "noopener external"
            }
        },
        {
            type: "mail",
            linkProps: {
                href: "mailto:?subject=Partage&body=Regardez%20cette%20page%20https%3A%2F%2Fwww.systeme-de-design.gouv.fr",
                target: "_blank",
                rel: "noopener external"
            }
        },
        {
            type: "copy",
            buttonProps: {
                type: "button",
                onClick: action("copy-click")
            }
        }
    ]
});

export const CustomTitle = getStory({
    title: "Partager cet article",
    buttons: defaultButtons
});
