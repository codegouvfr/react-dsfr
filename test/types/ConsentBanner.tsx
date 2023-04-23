/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ReactNode } from "react";
import { assert, type Equals } from "tsafe/assert";
import type {
    FinalitiesToConsent,
    FinalitiesToDescriptions,
    Description
} from "../../src/ConsentBannerNext/typesFunctions";

{
    type Input =
        | "analytics"
        | "statistics.traffic"
        | "statistics.deviceType"
        | "statistics.browser"
        | "personalization"
        | "advertising";

    type ExpectedOutput = Record<"analytics" | "personalization" | "advertising", boolean> & {
        statistics: Record<"traffic" | "deviceType" | "browser", boolean> & {
            isFullConsent: boolean;
        };
    };

    type ActualOutput = FinalitiesToConsent<Input>;

    assert<Equals<ActualOutput, ExpectedOutput>>();
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
