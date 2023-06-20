/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react";

//See: test/types/gdpr.ts to understand theses types

export type FinalityConsent<Finality extends string> = {
    [K in Finality as K extends `${infer _P}.${infer _C}` ? never : K]: boolean;
} & {
    [K in Finality as K extends `${infer P}.${infer _C}` ? P : never]: Record<
        K extends `${infer _P}.${infer C}` ? C : never,
        boolean
    > & { isFullConsent: boolean };
} & { isFullConsent: boolean };

export type ExtractFinalityFromFinalityDescription<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
> = {
    [K in keyof FinalityDescription]: K extends string
        ? FinalityDescription[K] extends { subFinalities: Record<string, any> }
            ? `${K}.${ExtractFinalityFromFinalityDescription.SubFinalities<FinalityDescription[K]>}`
            : K
        : never;
}[keyof FinalityDescription];

export namespace ExtractFinalityFromFinalityDescription {
    export type SubFinalities<T> = T extends { subFinalities: infer U }
        ? U extends Record<string, any>
            ? keyof U
            : never
        : never;
}
