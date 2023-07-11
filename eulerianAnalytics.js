import { prDsfrLoaded } from "./start";
export async function startEulerianAnalytics(params) {
    await prDsfrLoaded;
    // @ts-expect-error
    window.dsfr.analytics = params;
    // @ts-expect-error
    await import("./dsfr/analytics/analytics.module.min");
    //@ts-expect-error
    await dsfr.analytics.readiness;
    return {
        "enable": () => {
            // @ts-expect-error
            window.dsfr.analytics.opt.enable();
        },
        "disable": () => {
            // @ts-expect-error
            window.dsfr.analytics.opt.disable();
        }
    };
}
//# sourceMappingURL=eulerianAnalytics.js.map