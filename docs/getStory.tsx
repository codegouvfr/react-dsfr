import React, { useEffect } from "react";
import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { symToStr } from "tsafe/symToStr";
import { id } from "tsafe/id";
import "../dist/dsfr/dsfr.css";
import { startDsfrReact, useIsDark } from "../dist";

startDsfrReact({ "defaultColorScheme": "system" });

export function getStoryFactory<Props extends Record<string, any>>(params: {
    sectionName: string;
    description?: string;
    wrappedComponent: Record<string, (props: Props) => JSX.Element | null>;
    /** https://storybook.js.org/docs/react/essentials/controls */
    argTypes?: Partial<Record<keyof Props, ArgType>>;
    defaultContainerWidth?: number;
}) {
    const {
        sectionName,
        wrappedComponent,
        description,
        argTypes = {},
        defaultContainerWidth
    } = params;

    const Component: any = Object.entries(wrappedComponent).map(([, component]) => component)[0];

    const Template: Story<
        Props & {
            darkMode: boolean;
            containerWidth: number;
            isFirstStory: boolean;
        }
    > = ({ darkMode, containerWidth, isFirstStory, ...props }) => {
        const { setIsDark } = useIsDark();

        useEffect(() => {
            if (!isFirstStory) {
                return;
            }

            setIsDark(darkMode);
        }, [darkMode]);

        return containerWidth === 0 ? (
            <Component {...props} />
        ) : (
            <div className="container" style={{ "width": containerWidth }}>
                <Component {...props} />
            </div>
        );
    };

    let isFirstStory = true;

    function getStory(props: Props, params?: { description?: string }): typeof Template {
        const { description } = params ?? {};

        const out = Template.bind({});

        out.args = {
            "darkMode": window.matchMedia("(prefers-color-scheme: dark)").matches,
            "containerWidth": defaultContainerWidth ?? 0,
            isFirstStory,
            ...props
        };

        isFirstStory = false;

        out.parameters = {
            "docs": {
                "description": {
                    "story": description
                }
            }
        };

        return out;
    }

    return {
        "meta": id<Meta>({
            "title": `${sectionName}/${symToStr(wrappedComponent)}`,
            "component": Component,
            "parameters": {
                "docs": {
                    "description": {
                        "component": description
                    }
                }
            },
            "argTypes": {
                "containerWidth": {
                    "control": {
                        "type": "range",
                        "min": 0,
                        "max": 1920,
                        "step": 10
                    }
                },
                "isFirstStory": {
                    "table": {
                        "disable": true
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
