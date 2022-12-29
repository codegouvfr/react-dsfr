"use client";

import React from "react";
import type { RegisteredLinkProps } from "../link";
import { Summary as SummarySc } from "./ServerComponent";
import { useLang } from "../i18n/useLang";

export type SummaryProps = {
    className?: string;
    links: {
        text: string;
        linkProps: RegisteredLinkProps;
    }[];
    title?: string;
    /** Default: "p" */
    as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
    classes?: Partial<Record<"root" | "title" | "link", string>>;
};

export function Summary(props: SummaryProps) {
    return <SummarySc {...props} lang={useLang()} />;
}

export default Summary;
