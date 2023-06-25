import { describe, it, expect } from "vitest";
import {
    createFullDenyFinalityConsent,
    updateFinalityConsent,
    readFinalityConsent,
    finalityConsentToChanges
} from "../../../src/gdpr/processConsentChanges";
import { getFinalitiesFromFinalityDescription } from "../../../src/gdpr/createGdprApi";
import type { FinalityConsent } from "../../../src/gdpr/types";

describe("Testing gdpr utils", () => {
    it("createFullDenyFinalityConsent", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = createFullDenyFinalityConsent<Finality>([
            "analytics",
            "statistics.traffic",
            "statistics.deviceType",
            "statistics.browser",
            "personalization",
            "advertising"
        ]);

        const expected: FinalityConsent<Finality> = {
            "analytics": false,
            "statistics": {
                "traffic": false,
                "deviceType": false,
                "browser": false,
                "isFullConsent": false
            },
            "personalization": false,
            "advertising": false,
            "isFullConsent": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 1", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = updateFinalityConsent<Finality>({
            "finality": "statistics.traffic",
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": false,
                    "deviceType": false,
                    "browser": false,
                    "isFullConsent": false
                },
                "personalization": false,
                "advertising": false,
                "isFullConsent": false
            },
            "isConsentGiven": true
        });

        const expected: FinalityConsent<Finality> = {
            "analytics": false,
            "statistics": {
                "traffic": true,
                "deviceType": false,
                "browser": false,
                "isFullConsent": false
            },
            "personalization": false,
            "advertising": false,
            "isFullConsent": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 2", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = updateFinalityConsent<Finality>({
            "finality": "statistics.traffic",
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": false,
                    "deviceType": true,
                    "browser": true,
                    "isFullConsent": false
                },
                "personalization": false,
                "advertising": false,
                "isFullConsent": false
            },
            "isConsentGiven": true
        });

        const expected: FinalityConsent<Finality> = {
            "analytics": false,
            "statistics": {
                "traffic": true,
                "deviceType": true,
                "browser": true,
                "isFullConsent": true
            },
            "personalization": false,
            "advertising": false,
            "isFullConsent": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 3", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = updateFinalityConsent<Finality>({
            "finality": "statistics.traffic",
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": true,
                    "deviceType": true,
                    "browser": true,
                    "isFullConsent": true
                },
                "personalization": false,
                "advertising": false,
                "isFullConsent": false
            },
            "isConsentGiven": false
        });

        const expected: FinalityConsent<Finality> = {
            "analytics": false,
            "statistics": {
                "traffic": false,
                "deviceType": true,
                "browser": true,
                "isFullConsent": false
            },
            "personalization": false,
            "advertising": false,
            "isFullConsent": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 4", () => {
        type Finality = "analytics" | "personalization" | "advertising";

        const got = updateFinalityConsent<Finality>({
            "finality": "personalization",
            "finalityConsent": {
                "analytics": false,
                "personalization": false,
                "advertising": false,
                "isFullConsent": false
            },
            "isConsentGiven": true
        });

        const expected: FinalityConsent<Finality> = {
            "analytics": false,
            "personalization": true,
            "advertising": false,
            "isFullConsent": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 5", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = updateFinalityConsent<Finality>({
            "finality": "statistics.traffic",
            "finalityConsent": {
                "analytics": true,
                "statistics": {
                    "traffic": false,
                    "deviceType": true,
                    "browser": true,
                    "isFullConsent": false
                },
                "personalization": true,
                "advertising": true,
                "isFullConsent": false
            },
            "isConsentGiven": true
        });

        const expected: FinalityConsent<Finality> = {
            "analytics": true,
            "statistics": {
                "traffic": true,
                "deviceType": true,
                "browser": true,
                "isFullConsent": true
            },
            "personalization": true,
            "advertising": true,
            "isFullConsent": true
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 6", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = updateFinalityConsent<Finality>({
            "finality": "statistics.traffic",
            "finalityConsent": {
                "analytics": true,
                "statistics": {
                    "traffic": true,
                    "deviceType": true,
                    "browser": true,
                    "isFullConsent": true
                },
                "personalization": true,
                "advertising": true,
                "isFullConsent": true
            },
            "isConsentGiven": false
        });

        const expected: FinalityConsent<Finality> = {
            "analytics": true,
            "statistics": {
                "traffic": false,
                "deviceType": true,
                "browser": true,
                "isFullConsent": false
            },
            "personalization": true,
            "advertising": true,
            "isFullConsent": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("readFinalityConsent 1", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = readFinalityConsent<Finality>({
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": false,
                    "deviceType": false,
                    "browser": false,
                    "isFullConsent": false
                },
                "personalization": false,
                "advertising": false,
                "isFullConsent": false
            },
            "finality": "statistics.traffic"
        });

        const expected = false;

        expect(got).toStrictEqual(expected);
    });

    it("readFinalityConsent 2", () => {
        type Finality =
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising";

        const got = readFinalityConsent<Finality>({
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": false,
                    "deviceType": false,
                    "browser": false,
                    "isFullConsent": false
                },
                "personalization": true,
                "advertising": false,
                "isFullConsent": false
            },
            "finality": "personalization"
        });

        const expected = true;

        expect(got).toStrictEqual(expected);
    });

    it("getFinalitiesFromFinalityDescription", () => {
        const got = getFinalitiesFromFinalityDescription({
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
            }
        });

        const expected = [
            "analytics",
            "statistics.traffic",
            "statistics.deviceInfo",
            "personalization",
            "advertising"
        ];

        expect([...got].sort()).toStrictEqual([...expected].sort());
    });

    it("finalityConsentToChanges", () => {
        const got = finalityConsentToChanges<
            | "analytics"
            | "statistics.traffic"
            | "statistics.deviceType"
            | "statistics.browser"
            | "personalization"
            | "advertising"
        >({
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": true,
                    "deviceType": true,
                    "browser": false,
                    "isFullConsent": false
                },
                "personalization": true,
                "advertising": false,
                "isFullConsent": false
            }
        });

        const expected = [
            {
                "finality": "analytics",
                "isConsentGiven": false
            },
            {
                "finality": "statistics.traffic",
                "isConsentGiven": true
            },
            {
                "finality": "statistics.deviceType",
                "isConsentGiven": true
            },
            {
                "finality": "statistics.browser",
                "isConsentGiven": false
            },
            {
                "finality": "personalization",
                "isConsentGiven": true
            },
            {
                "finality": "advertising",
                "isConsentGiven": false
            }
        ];

        expect(got).toStrictEqual(expected);
    });
});
