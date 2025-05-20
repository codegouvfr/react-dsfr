"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import { assert, type Equals } from "tsafe/assert";

export default function ArtworkWhiteLabel(props: {
    theme: "light" | "dark" | "system";
    sizePx?: number;
}) {
    const { theme, sizePx = 24 } = props;

    switch (theme) {
        case "light":
            return <LightMode sizePx={sizePx} />;
        case "dark":
            return <DarkMode sizePx={sizePx} />;
        case "system":
            return <AutoMode sizePx={sizePx} />;
        default:
            assert<Equals<typeof theme, never>>(false);
    }
}

function LightMode(props: { sizePx: number }) {
    const { sizePx } = props;

    const theme = useTheme();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={sizePx}
            viewBox={`0 0 24 ${sizePx}`}
            width={sizePx}
            fill={theme.palette.primary.main}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
        </svg>
    );
}

function AutoMode(props: { sizePx: number }) {
    const { sizePx } = props;

    const theme = useTheme();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={sizePx}
            viewBox={`"0 0 ${sizePx} ${sizePx}`}
            width={sizePx}
            fill={theme.palette.primary.main}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z" />
        </svg>
    );
}

function DarkMode(props: { sizePx: number }) {
    const { sizePx } = props;

    const theme = useTheme();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background={`new 0 0 ${sizePx} ${sizePx}`}
            height={sizePx}
            viewBox={`0 0 ${sizePx} ${sizePx}`}
            width={sizePx}
            fill={theme.palette.primary.main}
        >
            <rect fill="none" height={sizePx} width={sizePx} />
            <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
        </svg>
    );
}
