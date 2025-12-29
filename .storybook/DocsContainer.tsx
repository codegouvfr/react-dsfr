import React, { PropsWithChildren, useEffect } from "react";
import {
    DocsContainer as BaseContainer,
    DocsContainerProps,
    Unstyled
} from "@storybook/addon-docs/blocks";
import { useDarkMode } from "@vueless/storybook-dark-mode";
import { darkTheme, lightTheme } from "./customTheme";
import "../dist/dsfr/utility/icons/icons.min.css";
import "../dist/dsfr/dsfr.css";
import { useIsDark } from "../dist/useIsDark";
import { startReactDsfr } from "../dist/spa";
import { fr } from "../dist/fr";
import { MuiDsfrThemeProvider } from "../dist/mui";

startReactDsfr({
    "defaultColorScheme": "system",
    "useLang": () => "fr"
});

export const DocsContainer = ({ children, ...rest }: PropsWithChildren<DocsContainerProps>) => {
    const isStorybookUiDark = useDarkMode();
    const { setIsDark } = useIsDark();

    useEffect(() => {
        setIsDark(isStorybookUiDark);
    }, [isStorybookUiDark]);

    const backgroundColor = fr.colors.decisions.background.default.grey.default;

    return (
        <>
            <style>{`
                body {
                    padding: 0 !important;
                    background-color: ${backgroundColor};
                }

                .docs-story {
                    background-color: ${backgroundColor};
                }
                [id^=story--] .container {
                    border: 1px dashed #e8e8e8;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(3) {
                    visibility: collapse;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(2) p {
                    font-size: 13px;
                }

            `}</style>
            <BaseContainer {...rest} theme={isStorybookUiDark ? darkTheme : lightTheme}>
                <MuiDsfrThemeProvider>
                    <Unstyled>{children}</Unstyled>
                </MuiDsfrThemeProvider>
            </BaseContainer>
        </>
    );
};
