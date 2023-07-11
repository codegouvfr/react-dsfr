import { prDsfrLoaded } from "./start";

export type EulerianAnalyticsParams = {
    domain: string;
    /** default: false */
    enableRating?: boolean;
    page?: Partial<{
        path: string; // path for page tracking
        referrer: string; // referrer for virtual pages (not for real page, eulerian automatically collects document.referrer)
        id: string; // unique page id (string)
        title: string; // page title for virtual pages
        name: string; // equivalent to title if not defined
        author: string; // page author name
        date: string; // page creation date
        labels: string[];
        tags: string[]; // no tags limit
        template: string; // page template
        group: string; // page group. if not defined, fallback to template value
        segment: string; // site segment. if not defined, fallback to template value
        subtemplate: string; // page subtemplate
        theme: string; // page theme
        subtheme: string; // page subtheme
        related: string; // related page id
        depth: number; // page depth
        isError: boolean; // is this an error page (404, 500, 503...)
        current: number; // In case of pagination, current page number
        total: number; // In case of pagination, total pages number
        filters: string; // array of filters that were applied on the page (strings)
    }>;
    site?: Partial<{
        environment: "development" | "stage" | "production"; // by default development ['development', 'stage', 'production']
        entity: string; // Entity responsible for website
        language: string; // language of the website (ISO 639-1). default to html lang
        target: string; // site target
        type: string; // site type
        region: string; // region of the website (ISO 3166-2:FR)
        department: string; // department of the website (ISO 3166-2:FR)
    }>;
    user?: Partial<{
        connect: {
            uid: string; // user id - required when connected
            email: string; // encoded user email - required when connected
            isNew: boolean; // user just registered
        };
        profile: string; // user profile
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
        step: string; // step name
        current: number; // step number
        total: number; // total number of steps
        objective: string; // form objective
        error: string; // form's error type
    }>;
    cmp?: Partial<{
        id: string;
    }>;
};

export async function startEulerianAnalytics(params: EulerianAnalyticsParams) {
    await prDsfrLoaded;

    // @ts-expect-error
    window.dsfr.analytics = params;

    // @ts-expect-error
    await import("./dsfr/analytics/analytics.module.min");

    return {
        // @ts-expect-error
        "enable": () => {
            window.dsfr.analytics.opt.enable();
        },
        // @ts-expect-error
        "disable": () => {
            window.dsfr.analytics.opt.disable();
        }
    };
}
