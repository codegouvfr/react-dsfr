import type { ColorScheme } from "./useIsDark";
type Params = {
    defaultColorScheme: ColorScheme | "system";
    verbose: boolean;
    eulerianAnalytics: EulerianAnalytics | undefined;
    nextParams: {
        doPersistDarkModePreferenceWithCookie: boolean;
        registerEffectAction: (effect: () => void) => void;
    } | undefined;
};
export declare function start(params: Params): Promise<void>;
export type EulerianAnalytics = {
    domain: string;
    /** default: false */
    enableRating?: boolean;
    page?: Partial<{
        path: string;
        referrer: string;
        id: string;
        title: string;
        name: string;
        author: string;
        date: string;
        labels: string[];
        tags: string[];
        template: string;
        group: string;
        segment: string;
        subtemplate: string;
        theme: string;
        subtheme: string;
        related: string;
        depth: number;
        isError: boolean;
        current: number;
        total: number;
        filters: string;
    }>;
    site?: Partial<{
        environment: "development" | "stage" | "production";
        entity: string;
        language: string;
        target: string;
        type: string;
        region: string;
        department: string;
    }>;
    user?: Partial<{
        connect: {
            uid: string;
            email: string;
            isNew: boolean;
        };
        profile: string;
        language: string;
        type: string;
    }>;
    search?: Partial<{
        engine: string;
        results: number;
        terms: string;
        category: string;
        theme: string;
        type: string;
        method: string;
    }>;
    funnel?: Partial<{
        id: string;
        type: string;
        name: string;
        step: string;
        current: number;
        total: number;
        objective: string;
        error: string;
    }>;
    cmp?: Partial<{
        id: string;
    }>;
};
export {};
