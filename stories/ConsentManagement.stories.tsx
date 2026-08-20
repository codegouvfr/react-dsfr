import React from "react";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { createConsentManagement } from "../dist/consentManagement";
import { defaultLocalStorageKeyPrefix } from "../dist/consentManagement/createConsentManagement";
import { Placeholder } from "../dist/consentManagement/Placeholder";
import { Footer } from "../dist/Footer";
import { Button } from "../dist/Button";
import { fr } from "../dist/fr";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        "consentManagement": Story
    },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/consentManagement)

\`src/consentManagement.tsx\` (This is a file you should create in your project)  

Refer to [this section of the Guides](https://react-dsfr.codegouv.studio/analytics) to see how to setup the the 
mandated solution for analytics in your project.  
  
You can find a complete example setup in [the Demo repo for Next.js App Router](https://github.com/garronej/react-dsfr-next-appdir-demo/blob/main/ui/consentManagement.tsx) 
which is live [here](https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx). You should be able to easily adapt it to other meta frameworks (Vite, Next Pages Router, CRA).
  
\`\`\`tsx
"use client";

import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";

export const { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem,
    useConsent
} = createConsentManagement({
    /* 
        Can be an object or a function that take the current language as argument.
        You should here describe the finalities of the cookies you use so that the user can choose to accept or not.
    */
    "finalityDescription": ({ lang }) => ({
        "advertising": {
            "title": "Publicité",
            "description": "Nous utilisons des cookies pour vous proposer des publicités adaptées à vos centres d’intérêts et mesurer leur efficacité."
        },
        "analytics": {
            "title": "Analyse",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
        },
        "personalization": {
            "title": "Personnalisation",
            "description": "Nous utilisons des cookies pour vous proposer des contenus adaptés à vos centres d’intérêts."
        },
        "instagram": {
            "title": "Instagram integration",
            "description": "We use cookies to display Instagram content."
        },
        "statistics": {
            "title": "Statistiques",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
            /* You can add subFinalities to a finality in order to let the user choose more precisely what he accepts.  */
            "subFinalities": {
                "deviceInfo": "Informations sur votre appareil",
                "traffic": "Informations sur votre navigation",
            }
        }
    }),
    /* 
    If you have a page that describe your personal data policy, you can link to it here. 
    Like any other *LinkProps you can turn it into a button by using { href: "#", onClick: ... } 
    (if you are using react-router it will be \`to\` instead of \`href\`).
    */
    "personalDataPolicyLinkProps": {
        "href": "/politique-de-confidentialite",
    },
    /* 
    This optional callback is called when the user take stance on what he accept and refuse. 
    It gives you the opportunity to perform asynchronous actions before the user can continue to navigate.

    */
    "consentCallback": async ({ finalityConsent, finalityConsent_prev })=> {

        /*
        Given the finalityDescription used in this example the Finality consent object will be of the form:  
        {
            advertising: boolean;
            analytics: boolean;
            personalization: boolean;
            instagram: boolean;
            statistics: {
                deviceInfo: boolean;
                traffic: boolean;
                isFullConsent: boolean;
            };
            isFullConsent: boolean;
        }

        The finalityConsent_prev represent the previous consent object.
        If the user is taking stance for the first time, finalityConsent_prev will be undefined.
        finalityConsent_prev is restored from the localStorage.
        */


        /*
        Example with Google Analytics:

        window.gtag("consent", "update", {
            analytics_storage: finalityConsent.statistics.isFullConsent ? "granted" : "denied"
        });

        */


        /*
        Example: Reload the page if the user refuse cookies.
        if( finalityConsent_prev === undefined && !finalityConsent.isFullConsent ){
            //Do something async
            location.reload();
        }
        */

    }
});
\`\`\`

\`app/layout.tsx\` (or any other file where you have your footer)  

\`\`\`tsx
import { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem 
} from "./consentManagement";


function RootLayout(){
    return (
        <html>
            <head></head>
            <body>
                {/* This component must be the first thing in the body of your app.
                If you're in Next App Router it should be wrapped within <DsfrProvider> */}
                <ConsentBannerAndConsentManagement /> 
                {/* ... */}
				<Footer
					bottomItems={[
						headerFooterDisplayItem,
						<FooterPersonalDataPolicyItem />,
						<FooterConsentManagementItem />
					]}
				/>
            </body>
        </html>
    );
}
\`\`\`

You are all set, now let's see some use cases.

Placeholders are also provided to help you display content conditionally based on the user consent.  

\`\`\`tsx
import { useConsent } from "./consentManagement";
import { Placeholder } from "@codegouvfr/react-dsfr/consentManagement/Placeholder";

export function MyComponent(){

    const { finalityConsent, g } = useConsent();

    return (
        !finalityConsent.instagram ?
            <Placeholder
                title="Instagram"
                description="We use cookies to display Instagram content."
                onGranted={()=> assumeConsent("instagram")}
            />
            :
            <InstagramEmbed url="https://www.instagram.com/p/COQwZ9XKZ1b/" />
    );


}
\`\`\`

You can also register a \`consentCallback\` in a component.  

\`\`\`tsx
import { useConsent } from "./consentManagement";
import { Placeholder } from "@codegouvfr/react-dsfr/consentManagement/Placeholder";

export function MyComponent(){

    useConsent({
        consentCallback: async ({ finalityConsent, finalityConsent_prev })=> {
            //Do something when user take stance
        }
    });

    return (
        //...
    );

}
\`\`\`
`,
    "disabledProps": ["containerWidth"],
    "doHideImportInstruction": true
});

const {
    ConsentBannerAndConsentManagement,
    FooterConsentManagementItem,
    FooterPersonalDataPolicyItem,
    useConsent
} = createConsentManagement({
    "finalityDescription": {
        "advertising": {
            "title": "Publicité",
            "description":
                "Nous utilisons des cookies pour vous proposer des publicités adaptées à vos centres d’intérêts et mesurer leur efficacité."
        },
        "analytics": {
            "title": "Analyse",
            "description":
                "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
        },
        "personalization": {
            "title": "Personnalisation",
            "description":
                "Nous utilisons des cookies pour vous proposer des contenus adaptés à vos centres d’intérêts."
        },
        "statistics": {
            "title": "Statistiques",
            "description":
                "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
            "subFinalities": {
                "deviceInfo": {
                    "title": "Informations sur votre appareil",
                    "description":
                        "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
                },
                "traffic": {
                    "title": "Informations sur votre navigation",
                    "description":
                        "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
                }
            }
        }
    },
    "personalDataPolicyLinkProps": {
        "href": "#",
        "onClick": () => alert("Navigate to the page where you explain your personal data policy")
    },
    "consentCallback": ({ finalityConsent, finalityConsent_prev }) =>
        alert(
            [
                "Opportunity to do an async operation here.",
                "",
                "Previously the finalityConsent object was:",
                "",
                finalityConsent_prev === undefined
                    ? "undefined (the user hadn't took stance yet)"
                    : JSON.stringify(finalityConsent_prev, null, 2),
                "",
                "The new finalityConsentObject is:",
                "",
                JSON.stringify(finalityConsent, null, 2)
            ].join("\n")
        )
});

function Story() {
    const { finalityConsent, assumeConsent } = useConsent();

    return (
        <>
            {finalityConsent === undefined ? (
                <p>User hasn't given consent nor explicitly refused use of third party cookies.</p>
            ) : (
                <pre>{JSON.stringify({ finalityConsent }, null, 2)}</pre>
            )}
            {finalityConsent && finalityConsent.analytics === false && (
                <Placeholder
                    title="Analytics are not enabled"
                    description="We use cookies to measure the audience of our site and improve its content."
                    onGranted={() => assumeConsent("analytics")}
                    titleAs="span"
                />
            )}
            <Button
                onClick={() => {
                    Object.keys(localStorage)
                        .filter(key => key.startsWith(defaultLocalStorageKeyPrefix))
                        .forEach(key => localStorage.removeItem(key));

                    location.reload();
                }}
                className={fr.cx("fr-mb-10v", "fr-mt-10v")}
            >
                Clear localStorage and reload.
            </Button>

            <ConsentBannerAndConsentManagement />
            <Footer
                accessibility="fully compliant"
                contentDescription={`
                Ce message est à remplacer par les informations de votre site.

                Comme exemple de contenu, vous pouvez indiquer les informations 
                suivantes : Le site officiel d’information administrative pour les entreprises.
                Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
                à la gestion et au développement de votre entreprise.
            `}
                brandTop={
                    <>
                        INTITULE
                        <br />
                        OFFICIEL
                    </>
                }
                homeLinkProps={{
                    "href": "/",
                    "title":
                        "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                }}
                bottomItems={[<FooterPersonalDataPolicyItem />, <FooterConsentManagementItem />]}
            />
        </>
    );
}

export default meta;

export const Default = getStory({});
