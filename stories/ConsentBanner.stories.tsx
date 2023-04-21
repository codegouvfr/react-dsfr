import * as React from "react";
import { ConsentBanner, ConsentBannerProps, consentModalButtonProps } from "../dist/ConsentBanner";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { symToStr } from "tsafe/symToStr";
import { ConsentBannerContent } from "../dist/ConsentBanner/ConsentBannerContent";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        [symToStr({ ConsentBanner })]: Story
    },
    "description": `

    WARNING: This is [a temporary implementation](https://github.com/codegouvfr/react-dsfr/pull/107#issuecomment-1517538228).

Manage cookies and consent with a banner and a dedicated modal.  

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ConsentBanner/index.tsx)

Optionally, you can also use \`import { useGdprStore } from "@codegouvfr/react-dsfr/gdpr"\` to manually monitor and controls 
the consent state.

## Usage example 

\`\`\`tsx
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { ConsentBanner, consentModalButtonProps } from "@codegouvfr/react-dsfr/ConsentBanner";

// You can augment the service registry to have autocomplete when using useGdprStore
declare module "@codegouvfr/react-dsfr/gdpr" {
    interface RegisterGdprServices {
        // the value can be anything (or never), but you can set true
        // as a reminder that this service is mandatory
        mandatory-cookie-consumer: true;
        cookie-consumer: never;
    }
}

function App(){

    return (
        <>
            {/* must be on root level */}
            <ConsentBanner
                {/* depending on your registered Link */}
                gdprLinkProps={{href: "#"}}
                services={[
                    {
                        name: "mandatory-cookie-consumer",
                        title: "Any service consuming 🍪",
                        description: "As a mandatory service, user cannot disable it.",
                        mandatory: true
                    },
                    {
                        name: "cookie-consumer",
                        title: "Any service consuming 🍪",
                        description: "Here you can describe why this service use cookies."
                    }
                ]}
                siteName={siteName}
            />
            {/* ... Header ...*/}
            {/* ... your app ...*/}
            <Footer
                // other Footer props...
                cookiesManagementButtonProps={consentModalButtonProps}
            />
        <>
    );

}
\`\`\`
`,
    argTypes: {
        gdprLinkProps: {
            description: "Usually the same as FooterProps.personalDataLinkProps"
        },
        siteName: {
            description: "Current website name"
        }
    },
    "disabledProps": ["containerWidth"]
});

export default meta;

const siteName = "Nom de l’entité (ministère, secrétariat d‘état, gouvernement)";

function Story(props: ConsentBannerProps) {
    return (
        <>
            <ConsentBanner {...props} />
            <style>{`
                .fr-consent-banner {
                    position: static;
                }
            `}</style>
            <ConsentBannerContent {...props} consentModalButtonProps={consentModalButtonProps} />
        </>
    );
}

export const Default = getStory({
    gdprLinkProps: { href: "#" },
    services: [
        {
            name: "mandatory-cookie-consumer",
            title: "Any service consuming 🍪",
            description: "As a mandatory service, user cannot disable it.",
            mandatory: true
        },
        {
            name: "cookie-consumer",
            title: "Any service consuming 🍪",
            description: "Here you can describe why this service use cookies."
        }
    ],
    siteName
});
