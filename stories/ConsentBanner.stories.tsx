import React from "react";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { createGdprApi } from "../dist/gdpr";
import { localStorageKey } from "../dist/gdpr/createGdprApi";
import { Footer } from "../dist/Footer";
import { Button } from "../dist/Button";
import { fr } from "../dist/fr";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        "ConsentBanner": Story
    },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/gdpr)

Thorough documentation coming soon.
`,
    "disabledProps": ["containerWidth"],
    "doHideImportInstruction": true
});

const {
    ConsentBannerAndConsentManagement,
    FooterConsentManagementItem,
    FooterPersonalDataPolicyItem,
    useGdpr
} = createGdprApi({
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
                "deviceInfo": "Informations sur votre appareil",
                "traffic": "Informations sur votre navigation"
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
    const { finalityConsent } = useGdpr();

    return (
        <>
            {finalityConsent === undefined ? (
                <p>User hasn't given consent nor explicitly refused use of third party cookies.</p>
            ) : (
                <pre>{JSON.stringify({ finalityConsent }, null, 2)}</pre>
            )}
            <Button
                onClick={() => {
                    localStorage.removeItem(localStorageKey);

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
