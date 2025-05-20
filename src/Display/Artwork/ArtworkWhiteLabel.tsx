"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import { assert, type Equals } from "tsafe/assert";

export default function ArtworkWhiteLabel(props: {
    theme: "light" | "dark" | "system";
    sizePx: number;
}) {
    const { theme: theme_mode, sizePx } = props;

    const theme = useTheme();

    const fillColor = theme.palette.text.primary;

    const style = { height: sizePx, width: sizePx };

    switch (theme_mode) {
        case "light":
            return (
                <svg
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill={fillColor}
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                </svg>
            );
        case "dark":
            return (
                <svg
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill={fillColor}
                >
                    <rect fill="none" />
                    <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
                </svg>
            );
        case "system":
            return (
                <svg
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill={fillColor}
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z" />
                </svg>
            );
        default:
            assert<Equals<typeof theme_mode, never>>(false);
    }
}
