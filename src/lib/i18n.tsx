import React, { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { isBrowser } from "./tools/isBrowser";

let langIfNoProvider: undefined | string;

export function setLangToUseIfProviderNotUsed(lang: string) {
    langIfNoProvider = lang;
}

const langContext = createContext<string | undefined>(undefined);

export function useLang(): string | undefined {
    const lang = useContext(langContext);

    if (lang === undefined) {
        return langIfNoProvider ?? (!isBrowser ? undefined : navigator.language);
    }

    return lang;
}

type Props = {
    lang: string;
    children: ReactNode;
};

export function DsfrLangProvider(params: Props) {
    const { lang, children } = params;

    return <langContext.Provider value={lang}>{children}</langContext.Provider>;
}

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
    FrMessages extends Record<string, string | ((params: any) => string)>
> = {
    (messageKey: NonFunctionMessageKey<FrMessages>): string;
    <K extends FunctionMessageKey<FrMessages>>(
        messageKey: K,
        params: ExtractArgument<FrMessages[K]>
    ): string;
};

type ExtractArgument<Message extends string | ((params: any) => string)> = Message extends (
    params: any
) => string
    ? Parameters<Message>[0]
    : never;

type NonFunctionMessageKey<FrMessages extends Record<string, string | ((params: any) => string)>> =
    {
        [Key in keyof FrMessages]: FrMessages[Key] extends string ? Key : never;
    }[keyof FrMessages];

type FunctionMessageKey<FrMessages extends Record<string, string | ((params: any) => string)>> =
    Exclude<keyof FrMessages, NonFunctionMessageKey<FrMessages>>;

export function createComponentI18nApi<
    ComponentName extends string,
    FrMessages extends Record<string, string | ((params: any) => string)>
>(params: {
    componentName: ComponentName;
    frMessages: FrMessages;
}): {
    useTranslation: () => { t: FrMessagesToTranslationFunction<FrMessages> };
} & Record<
    `add${ComponentName}Translations`,
    (params: { lang: string; messages: Partial<FrMessages> }) => void
> {
    const { componentName, frMessages } = params;

    const messagesByLang = { "fr": frMessages };

    function useTranslation() {
        const lang = useLang();

        const bestMatchLang = useMemo(() => {
            if (lang === undefined) {
                return "fr";
            }

            const bestApproxLang = getLanguageBestApprox({
                "languages": Object.keys(messagesByLang),
                "languageLike": lang
            });

            return bestApproxLang ?? "fr";
        }, [lang]);

        function t(messageKey: keyof FrMessages, params?: any): string {
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
        [`add${componentName}Translations`]: addTranslations
    } as any;
}
