import React, { useEffect } from "react";
import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { symToStr } from "tsafe/symToStr";
import { id } from "tsafe/id";
import { GlobalStyles } from "tss-react";
import "../dist/dsfr/dsfr.css";
import { startDsfrReact, useIsDark, useColors } from "../dist";

startDsfrReact({ "defaultColorScheme": "system" });

export function getStoryFactory<Props extends Record<string, any>>(params: {
    sectionName: string;
    wrappedComponent: Record<string, (props: Props) => JSX.Element | null>;
    /** https://storybook.js.org/docs/react/essentials/controls */
    argTypes?: Partial<Record<keyof Props, ArgType>>;
    defaultWidth?: number;
}) {
    const { sectionName, wrappedComponent, argTypes = {}, defaultWidth } = params;

    const Component: any = Object.entries(wrappedComponent).map(([, component]) => component)[0];

    const Template: Story<
        Props & {
            darkMode: boolean;
            width: number;
        }
    > = ({ darkMode, width, ...props }) => {
        const { setIsDark } = useIsDark();

        useEffect(() => {
            setIsDark(darkMode);
        }, [darkMode]);

        const backgroundColor = useColors().decisions.background.default.grey.default;

        return (
            <>
                <GlobalStyles
                    styles={{
                        "html": {
                            "fontSize": "100% !important"
                        },
                        "body": {
                            "padding": `0 !important`,
                            backgroundColor
                        },
                        ".docs-story": {
                            backgroundColor
                        }
                    }}
                />
                <div
                    style={{
                        "width": width || undefined,
                        "border": "1px dashed #e8e8e8",
                        "display": "inline-block"
                    }}
                >
                    <Component {...props} />
                </div>
            </>
        );
    };

    function getStory(props: Props): typeof Template {
        const out = Template.bind({});

        out.args = {
            "darkMode": window.matchMedia("(prefers-color-scheme: dark)").matches,
            "width": defaultWidth ?? 0,
            ...props
        };

        return out;
    }

    return {
        "meta": id<Meta>({
            "title": `${sectionName}/${symToStr(wrappedComponent)}`,
            "component": Component,
            "argTypes": {
                "width": {
                    "control": {
                        "type": "range",
                        "min": 0,
                        "max": 1920,
                        "step": 1
                    }
                },
                ...argTypes
            }
        }),
        getStory
    };
}

export function logCallbacks<T extends string>(propertyNames: readonly T[]): Record<T, () => void> {
    const out: Record<T, () => void> = id<Record<string, never>>({});

    propertyNames.forEach(
        propertyName => (out[propertyName] = console.log.bind(console, propertyName))
    );

    return out;
}
