import { describe, it, expect } from "vitest";
import {
    createFullDenyFinalityConsent,
    updateFinalityConsent,
    readFinalityConsent,
    getFinalitiesFromFinalityDescription
} from "../../../src/gdpr/zz_internal/utils";

describe("Testing gdpr utils", () => {
    it("createFullDenyFinalityConsent", () => {
        const got = createFullDenyFinalityConsent([
            "analytics",
            "statistics.traffic",
            "statistics.deviceType",
            "statistics.browser",
            "personalization",
            "advertising"
        ]);

        const expected = {
            "analytics": false,
            "statistics": {
                "traffic": false,
                "deviceType": false,
                "browser": false,
                "isFullConsent": false
            },
            "personalization": false,
            "advertising": false
        };

        expect(got).toBe(expected);
    });

    it("updateFinalityConsent 1", () => {
        const got = updateFinalityConsent({
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
                "advertising": false
            } as any,
            "isConsentGiven": true
        });

        const expected = {
            "analytics": false,
            "statistics": {
                "traffic": true,
                "deviceType": false,
                "browser": false,
                "isFullConsent": false
            },
            "personalization": false,
            "advertising": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 2", () => {
        const got = updateFinalityConsent({
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
                "advertising": false
            } as any,
            "isConsentGiven": true
        });

        const expected = {
            "analytics": false,
            "statistics": {
                "traffic": true,
                "deviceType": true,
                "browser": true,
                "isFullConsent": true
            },
            "personalization": false,
            "advertising": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 3", () => {
        const got = updateFinalityConsent({
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
                "advertising": false
            } as any,
            "isConsentGiven": false
        });

        const expected = {
            "analytics": false,
            "statistics": {
                "traffic": false,
                "deviceType": true,
                "browser": true,
                "isFullConsent": false
            },
            "personalization": false,
            "advertising": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("updateFinalityConsent 4", () => {
        const got = updateFinalityConsent({
            "finality": "personalization",
            "finalityConsent": {
                "analytics": false,
                "personalization": false,
                "advertising": false
            } as any,
            "isConsentGiven": true
        });

        const expected = {
            "analytics": false,
            "personalization": true,
            "advertising": false
        };

        expect(got).toStrictEqual(expected);
    });

    it("readFinalityConsent 1", () => {
        const got = readFinalityConsent({
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": false,
                    "deviceType": false,
                    "browser": false,
                    "isFullConsent": false
                } as any,
                "personalization": false,
                "advertising": false
            },
            "finality": "statistics.traffic"
        });

        const expected = false;

        expect(got).toStrictEqual(expected);
    });

    it("readFinalityConsent 2", () => {
        const got = readFinalityConsent({
            "finalityConsent": {
                "analytics": false,
                "statistics": {
                    "traffic": false,
                    "deviceType": false,
                    "browser": false,
                    "isFullConsent": false
                } as any,
                "personalization": true,
                "advertising": false
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
                    "titleBySubFinality": {
                        "deviceInfo": "Informations sur votre appareil",
                        "traffic": "Informations sur votre navigation"
                    }
                } as any
            }
        });

        const expected = [
            "analytics",
            "statistics.traffic",
            "statistics.deviceType",
            "statistics.browser",
            "personalization",
            "advertising"
        ];

        expect(got).toStrictEqual(expected);
    });
});
