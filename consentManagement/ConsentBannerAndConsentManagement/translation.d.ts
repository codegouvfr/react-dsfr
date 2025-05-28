/// <reference types="react" />
import { type RegisteredLinkProps } from "../../link";
export declare const useTranslation: () => {
    t: (<K extends "accept" | "cookies management" | "all services pref" | "personal data cookies" | "accept all" | "accept all - title" | "refuse all" | "refuse all - title" | "refuse" | "confirm choices" | "customize" | "customize cookies - title" | "consent modal title" | "personal data" | "see more details" | "hide details" | "mandatory cookies" | "mandatory cookies - description" | "confirm my choices">(messageKey: K) => {
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }[K] extends (params: any) => infer R ? R : {
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }[K]) & (<K_1 extends "about cookies" | "welcome message" | "preferences for all services">(messageKey: K_1, params: {
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }[K_1] extends infer T ? T extends {
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }[K_1] ? T extends (params: any) => any ? Parameters<T>[0] : never : never : never) => {
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }[K_1] extends (params: any) => infer R_1 ? R_1 : {
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }[K_1]);
}, addConsentManagementTranslations: (params: {
    lang: string;
    messages: Partial<{
        /** cspell: disable */
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
            hostname: string;
        }) => string;
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        customize: string;
        "customize cookies - title": string;
        "consent modal title": string;
        "cookies management": string;
        "personal data": string;
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => JSX.Element;
        "see more details": string;
        "hide details": string;
        "mandatory cookies": string;
        "mandatory cookies - description": string;
        "confirm my choices": string;
    }>;
}) => void;
