/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react";
import { assert, type Equals } from "tsafe/assert";

export type FinalityConsent<Finality extends string> = {
    [K in Finality as K extends `${infer _P}.${infer _C}` ? never : K]: boolean;
} & {
    [K in Finality as K extends `${infer P}.${infer _C}` ? P : never]: Record<
        K extends `${infer _P}.${infer C}` ? C : never,
        boolean
    > & { isFullConsent: boolean };
} & { isFullConsent: boolean };

{
    type Input =
        | "analytics"
        | "statistics.traffic"
        | "statistics.deviceType"
        | "statistics.browser"
        | "personalization"
        | "advertising";

    type ExpectedOutput = {
        analytics: boolean;
        personalization: boolean;
        advertising: boolean;
        statistics: {
            traffic: boolean;
            deviceType: boolean;
            browser: boolean;
        } & {
            isFullConsent: boolean;
        };
        isFullConsent: boolean;
    };

    type ActualOutput = FinalityConsent<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
}

export type ExtractFinalityFromFinalityDescription<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; subFinalities?: Record<string, ReactNode>; }
    >
> = {
    [K in keyof FinalityDescription]: K extends string
    ? FinalityDescription[K] extends { subFinalities: Record<string, any> }
    ? `${K}.${ExtractFinalityFromFinalityDescription.SubFinalities<FinalityDescription[K]>}`
    : K
    : never;
}[keyof FinalityDescription];

export  namespace ExtractFinalityFromFinalityDescription {

    export type SubFinalities<T> = T extends { subFinalities: infer U }
        ? U extends Record<string, any>
        ? keyof U
        : never
        : never;

}

{
    const input = {
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
        "statistics": {
            "title": "Statistiques",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
            "subFinalities": {
                "deviceInfo": "Informations sur votre appareil",
                "traffic": "Informations sur votre navigation",
            }
        }
    };

    type Input = typeof input;

    type Expected = "advertising" | "analytics" | "personalization" | "statistics.deviceInfo" | "statistics.traffic";

    type Got = ExtractFinalityFromFinalityDescription<Input>;

    assert<Equals<Got, Expected>>();

}

