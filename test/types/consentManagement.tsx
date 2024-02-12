/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { assert, type Equals } from "tsafe/assert";
import type {
    ExtractFinalityFromFinalityDescription,
    FinalityConsent
} from "../../src/consentManagement/types";
import { Placeholder } from "../../src/consentManagement/Placeholder";

{
    type Input =
        | "analytics"
        | "statistics.traffic"
        | "statistics.deviceType"
        | "statistics.browser"
        | "personalization"
        | "advertising";

    type ExpectedOutput = {
        readonly analytics: boolean;
        readonly personalization: boolean;
        readonly advertising: boolean;
        readonly statistics: {
            readonly traffic: boolean;
            readonly deviceType: boolean;
            readonly browser: boolean;
        } & {
            readonly isFullConsent: boolean;
        };
        readonly isFullConsent: boolean;
    };

    type ActualOutput = FinalityConsent<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
}

{
    const input = {
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
    };

    type Input = typeof input;

    type Expected =
        | "advertising"
        | "analytics"
        | "personalization"
        | "statistics.deviceInfo"
        | "statistics.traffic";

    type Got = ExtractFinalityFromFinalityDescription<Input>;

    assert<Equals<Got, Expected>>();
}

{
    <Placeholder
        title="Instagram"
        description="We use cookies to display Instagram content."
        onGranted={() => console.log("clicked on enable button")}
    />;
}

{
    <Placeholder
        title="Instagram"
        description="We use cookies to display Instagram content."
        onGranted={() => console.log("clicked on enable button")}
        titleAs="h2"
    />;
}
