import { type RegisteredLinkProps } from "../link";
export declare const useTranslation: () => {
    t: (<K extends "accept" | "all services pref" | "personal data cookies" | "accept all" | "accept all - title" | "refuse all" | "refuse all - title" | "refuse" | "confirm choices" | "customize cookies" | "customize cookies - title" | "consent modal title">(messageKey: K) => {
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }[K] extends (params: any) => infer R ? R : {
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }[K]) & (<K_1 extends "about cookies" | "welcome message">(messageKey: K_1, params: {
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }[K_1] extends infer T ? T extends {
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }[K_1] ? T extends (params: any) => any ? Parameters<T>[0] : never : never : never) => {
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }[K_1] extends (params: any) => infer R_1 ? R_1 : {
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }[K_1]);
}, addConsentBannerTranslations: (params: {
    lang: string;
    messages: Partial<{
        "all services pref": string;
        "personal data cookies": string;
        "accept all": string;
        "accept all - title": string;
        "refuse all": string;
        "refuse all - title": string;
        accept: string;
        refuse: string;
        "confirm choices": string;
        "about cookies": (p: {
            siteName: string;
        }) => string;
        "welcome message": (p: {
            gdprLinkProps: RegisteredLinkProps;
        }) => JSX.Element;
        "customize cookies": string;
        "customize cookies - title": string;
        "consent modal title": string;
    }>;
}) => void;
