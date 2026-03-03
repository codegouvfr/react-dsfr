import { TableOfContentsCustom, TocType } from "../TableOfContents";
import { ThemeProvider, ThemeVars, ensure as ensureTheme } from "storybook/theming";
import { DocsPageWrapper } from "./DocsPageWrapper";
import {
    DocsContainerProps,
    DocsContext,
    SourceContainer,
    Unstyled
} from "@storybook/addon-docs/blocks";
import React, { PropsWithChildren, useEffect } from "react";

// From @storybook/addon-docs/blocks/DocsContainer.tsx

const { document, window: globalWindow } = globalThis;
export const BaseContainer = ({
    context,
    theme,
    children
}: PropsWithChildren<DocsContainerProps>) => {
    let toc: TocType | undefined;
    try {
        const meta = context.resolveOf("meta", ["meta"]);
        toc = meta.preparedMeta.parameters?.docs?.toc;
    } catch (err) {
        // No meta, falling back to project annotations
        toc = context?.projectAnnotations?.parameters?.docs?.toc;
    }

    useEffect(() => {
        let url: URL;
        try {
            url = new URL(globalWindow.parent.location.toString());
            if (url.hash) {
                const element = document.getElementById(decodeURIComponent(url.hash.substring(1)));
                if (element) {
                    // Introducing a delay to ensure scrolling works when it's a full refresh.
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                    }, 200);
                }
            }
        } catch {
            // pass
        }
    });

    return (
        <DocsContext.Provider value={context}>
            <SourceContainer channel={context.channel}>
                <ThemeProvider theme={ensureTheme(theme as ThemeVars)}>
                    <DocsPageWrapper
                        toc={
                            toc ? (
                                <Unstyled>
                                    {toc && <TableOfContentsCustom channel={context.channel} />}
                                </Unstyled>
                            ) : null
                        }
                    >
                        {children}
                    </DocsPageWrapper>
                </ThemeProvider>
            </SourceContainer>
        </DocsContext.Provider>
    );
};
