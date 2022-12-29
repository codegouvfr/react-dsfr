"use client";

import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { createStatefulObservable, useRerenderOnChange } from "../tools/StatefulObservable";

const langContext = createContext<string | undefined>(undefined);

const $browserLanguageDifferentFromFrAfterFirstEffect = createStatefulObservable<
    string | undefined
>(() => undefined);

export function useLang(): string {
    useRerenderOnChange($browserLanguageDifferentFromFrAfterFirstEffect);

    let lang = useContext(langContext);

    if (lang === undefined) {
        lang = $browserLanguageDifferentFromFrAfterFirstEffect.current ?? "fr";
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

export function startI18nLogic(params: { registerEffectAction: (action: () => void) => void }) {
    const { registerEffectAction } = params;

    registerEffectAction(() => {
        if ((window as any).IS_STORYBOOK) {
            return;
        }

        const lang = navigator.language;

        if (lang === "fr") {
            return;
        }

        $browserLanguageDifferentFromFrAfterFirstEffect.current = lang;
    });
}
