import { useMemo } from "react";
import { capitalize } from "tsafe/capitalize";

type ReactNode = string | JSX.Element | null;

function getLanguageBestApprox<Language extends string>(params: {
    languages: readonly Language[];
    languageLike: string;
}): Language | undefined {
    const { languages, languageLike } = params;

    scope: {
        const lang = languages.find(lang => lang.toLowerCase() === languageLike.toLowerCase());

        if (lang === undefined) {
            break scope;
        }

        return lang;
    }

    scope: {
        const iso2LanguageLike = languageLike.split("-")[0].toLowerCase();

        const lang = languages.find(lang => lang.toLowerCase().includes(iso2LanguageLike));

        if (lang === undefined) {
            break scope;
        }

        return lang;
    }

    return undefined;
}

type FrMessagesToTranslationFunction<
    FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>
> = {
    <K extends NonFunctionMessageKey<FrMessages>>(messageKey: K): FrMessages[K] extends (
        params: any
    ) => infer R
        ? R
        : FrMessages[K];
} & {
    <K extends FunctionMessageKey<FrMessages>>(
        messageKey: K,
        params: ExtractArgument<FrMessages[K]>
    ): FrMessages[K] extends (params: any) => infer R ? R : FrMessages[K];
};

type ExtractArgument<Message extends ReactNode | ((params: any) => ReactNode)> = Message extends (
    params: any
) => any
    ? Parameters<Message>[0]
    : never;

type NonFunctionMessageKey<
    FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>
> = {
    [Key in keyof FrMessages]: FrMessages[Key] extends (params: any) => any ? never : Key;
    //[Key in keyof FrMessages]: FrMessages[Key] extends "accept all" ? "accept all" : never;
}[keyof FrMessages];

type FunctionMessageKey<
    FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>
> = Exclude<keyof FrMessages, NonFunctionMessageKey<FrMessages>>;

let useLang_glob = () => "fr";

export function setUseLang(params: { useLang: () => string }) {
    useLang_glob = params.useLang;
}

export function useLang() {
    return useLang_glob();
}

export function createComponentI18nApi<
    ComponentName extends string,
    FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>
>(params: {
    componentName: ComponentName;
    frMessages: FrMessages;
}): {
    useTranslation: () => { t: FrMessagesToTranslationFunction<FrMessages> };
} & Record<
    `add${Capitalize<ComponentName>}Translations`,
    (params: { lang: string; messages: Partial<FrMessages> }) => void
> {
    const { componentName, frMessages } = params;

    const messagesByLang = { "fr": frMessages };

    function useTranslation() {
        const lang = useLang();

        const bestMatchLang = useMemo(() => {
            const bestApproxLang = getLanguageBestApprox({
                "languages": Object.keys(messagesByLang),
                "languageLike": lang
            });

            return bestApproxLang ?? "fr";
        }, [lang]);

        function t(messageKey: keyof FrMessages, params?: any): ReactNode {
            const messageOrFn =
                (messagesByLang as any)[bestMatchLang][messageKey] ??
                (messagesByLang["fr"] as any)[messageKey];

            return params === undefined ? messageOrFn : messageOrFn(params);
        }

        return { t };
    }

    function addTranslations(params: { lang: string; messages: Partial<FrMessages> }) {
        const { lang, messages } = params;

        Object.entries(messages)
            .filter(([, value]) => value !== undefined)
            .forEach(([key, value]) => (((messagesByLang as any)[lang] ??= {})[key] = value));
    }

    return {
        useTranslation,
        [`add${capitalize(componentName)}Translations`]: addTranslations
    } as any;
}
