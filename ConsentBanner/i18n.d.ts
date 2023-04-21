import React from "react";
import { type RegisteredLinkProps } from "../link";
export declare const useTranslation: () => {
    t: {
        (messageKey: "accept" | "all services pref" | "personal data cookies" | "accept all" | "accept all - title" | "refuse all" | "refuse all - title" | "refuse" | "confirm choices" | "customize cookies" | "customize cookies - title" | "consent modal title"): string;
        <K extends "about cookies" | "welcome message">(messageKey: K, params: {
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
        }[K] extends infer T ? T extends {
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
        }[K] ? T extends (params: any) => number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | ((params: any) => NonNullable<React.ReactNode>) ? Parameters<T>[0] : never : never : never): string;
    };
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
