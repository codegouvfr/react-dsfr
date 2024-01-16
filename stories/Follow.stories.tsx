import { Follow, type FollowProps } from "../dist/Follow";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { action } from "@storybook/addon-actions";
import React from "react";

const { meta, getStory } = getStoryFactory<FollowProps>({
    sectionName,
    wrappedComponent: { Follow },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/lettre-d-information-et-reseaux-sociaux)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/follow/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Follow.tsx)`,
    argTypes: {
        classes: {
            control: { type: null },
            description:
                'Add custom classes for various inner elements. Possible keys are "root", "container", "row", "newsletter-col", "newsletter", "newsletter-title", "newsletter-desc", "newsletter-form-wrapper", "newsletter-form-hint", "social-col", "social", "social-title", "social-buttons", "social-buttons-each"'
        }
    },
    disabledProps: ["lang"]
});

export default meta;

const defaultSocialButtons: [FollowProps.SocialButton, ...FollowProps.SocialButton[]] = [
    {
        type: "facebook",
        linkProps: {
            href: "#facebook"
        }
    },
    {
        type: "twitter-x",
        linkProps: {
            href: "#twitter"
        }
    },
    {
        type: "linkedin",
        linkProps: {
            href: "#linkedin"
        }
    },
    {
        type: "instagram",
        linkProps: {
            href: "#instagram"
        }
    },
    {
        type: "youtube",
        linkProps: {
            href: "#youtube"
        }
    }
];

export const Default = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("Default onClick")
        },
        form: {
            formComponent: ({ children }) => <form action="#">{children}</form>,
            inputProps: {
                label: undefined
            },
            success: false
        }
    },
    social: {
        buttons: defaultSocialButtons
    }
});

export const SocialOnly = getStory({
    social: {
        buttons: defaultSocialButtons
    }
});

export const NewsletterOnly = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("NewsletterOnly onClick")
        }
    }
});

export const NewsletterOnlyButtonAsLink = getStory({
    newsletter: {
        buttonProps: {
            linkProps: {
                href: "#"
            }
        }
    }
});

export const NewsletterOnlyWithDescription = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("NewsletterOnlyWithDescription onClick")
        },
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et."
    }
});

export const NewsletterOnlyWithForm = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("NewsletterOnlyWithForm onClick")
        },
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
        form: {
            formComponent: ({ children }) => <form action="#">{children}</form>,
            success: false
        }
    }
});

export const SocialAndNewsletter = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("SocialAndNewsletter onClick")
        },
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et."
    },
    social: {
        buttons: defaultSocialButtons
    }
});

export const SocialAndNewsletterWithForm = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("SocialAndNewsletterWithForm onClick")
        },
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
        form: {
            formComponent: ({ children }) => <form action="#">{children}</form>,
            success: false
        }
    },
    social: {
        buttons: defaultSocialButtons
    }
});

export const SocialAndNewsletterWithFormSuccess = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("SocialAndNewsletterWithFormSuccess onClick")
        },
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
        form: {
            formComponent: ({ children }) => <form action="#">{children}</form>,
            success: true
        }
    },
    social: {
        buttons: defaultSocialButtons
    }
});

export const SocialAndNewsletterWithFormError = getStory({
    newsletter: {
        buttonProps: {
            onClick: action("SocialAndNewsletterWithFormError onClick")
        },
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
        form: {
            formComponent: ({ children }) => <form action="#">{children}</form>,
            success: false,
            inputProps: {
                state: "error",
                stateRelatedMessage:
                    "Le format de l’adresse electronique saisie n’est pas valide. Le format attendu est : nom@exemple.org"
            }
        }
    },
    social: {
        buttons: defaultSocialButtons
    }
});
