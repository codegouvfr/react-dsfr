/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react";
import { assert, type Equals } from "tsafe/assert";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterConsentBannerFinality {}

export type Finality = RegisterConsentBannerFinality extends {
    finality: string;
}
    ? RegisterConsentBannerFinality["finality"]
    : string;

export type FinalityConsent = FinalityToFinalityConsent<Finality>;
export type FinalityDescription = FinalityToFinalityDescription<Finality>;

type FinalityToFinalityConsent<Finality extends string> = {
    [K in Finality as K extends `${infer _P}.${infer _C}` ? never : K]: boolean;
} & {
    [K in Finality as K extends `${infer P}.${infer _C}` ? P : never]: Record<
        K extends `${infer _P}.${infer C}` ? C : never,
        boolean
    > & { isFullConsent: boolean };
};

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
        statistics: Record<"traffic" | "deviceType" | "browser", boolean> & {
            isFullConsent: boolean;
        };
    };

    type ActualOutput = FinalityToFinalityConsent<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
}

type FinalityToFinalityDescription<Finality extends string> = {
    [K in Finality as K extends `${infer _P}.${infer _C}`
        ? never
        : K]: FinalityToFinalityDescription.Description;
} & {
    [K in Finality as K extends `${infer P}.${infer _C}`
        ? P
        : never]: FinalityToFinalityDescription.Description & {
        titleBySubFinality: Record<K extends `${infer _P}.${infer C}` ? C : never, ReactNode>;
    };
};

namespace FinalityToFinalityDescription {
    export type Description = {
        title: ReactNode;
        description: ReactNode;
        descriptionDetails?: ReactNode;
    };
}

{
    type Input =
        | "analytics"
        | "statistics.traffic"
        | "statistics.deviceType"
        | "statistics.browser"
        | "personalization"
        | "advertising";

    type ExpectedOutput = {
        analytics: FinalityToFinalityDescription.Description;
        personalization: FinalityToFinalityDescription.Description;
        advertising: FinalityToFinalityDescription.Description;
        statistics: FinalityToFinalityDescription.Description & {
            titleBySubFinality: Record<"traffic" | "deviceType" | "browser", ReactNode>;
        };
    };

    type ActualOutput = FinalityToFinalityDescription<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
}
