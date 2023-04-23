/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ReactNode } from "react";
import { assert, type Equals } from "tsafe/assert";

export type FinalitiesToConsent<Finalities extends string> = {
    [K in Finalities as K extends `${infer _P}.${infer _C}` ? never : K]: boolean;
} & {
    [K in Finalities as K extends `${infer P}.${infer _C}` ? P : never]: Record<
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

    type ActualOutput = FinalitiesToConsent<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
}

export type Description = {
    title: ReactNode;
    description: ReactNode;
    descriptionDetails?: ReactNode;
};

export type FinalitiesToDescriptions<FinalityNames extends string> = {
    [K in FinalityNames as K extends `${infer _P}.${infer _C}` ? never : K]: Description;
} & {
    [K in FinalityNames as K extends `${infer P}.${infer _C}` ? P : never]: Description & {
        titleBySubFinality: Record<K extends `${infer _P}.${infer C}` ? C : never, ReactNode>;
    };
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
        analytics: Description;
        personalization: Description;
        advertising: Description;
        statistics: Description & {
            titleBySubFinality: Record<"traffic" | "deviceType" | "browser", ReactNode>;
        };
    };

    type ActualOutput = FinalitiesToDescriptions<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
}
