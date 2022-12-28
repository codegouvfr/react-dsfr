import React, { useEffect } from "react";
import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { symToStr } from "tsafe/symToStr";
import { id } from "tsafe/id";
import { useIsDark } from "../dist/useIsDark";
import { DsfrLangProvider } from "../dist/i18n";

export function getStoryFactory<Props extends Record<string, any>>(params: {
    sectionName: string;
    description?: string;
    wrappedComponent: Record<string, (props: Props) => JSX.Element | null>;
    /** https://storybook.js.org/docs/react/essentials/controls */
    argTypes?: Partial<Record<keyof Props, ArgType>>;
    defaultContainerWidth?: number;
    disabledProps?: ("containerWidth" | "lang" | "darkMode")[];
    /** Default false */
    doHideImportInstruction?: boolean;
}) {
    const {
        sectionName,
        wrappedComponent,
        description,
        argTypes = {},
        defaultContainerWidth,
        disabledProps = [],
        doHideImportInstruction = false
    } = params;

    const Component: any = Object.entries(wrappedComponent).map(([, component]) => component)[0];

    document.documentElement.style.overflowY = "scroll";

    const Template: Story<
        Props & {
            darkMode: boolean;
            containerWidth: number;
            isFirstStory: boolean;
            lang: "fr" | "en" | "en" | "de";
        }
    > = ({ darkMode, containerWidth, isFirstStory, lang, ...props }) => {
        const { setIsDark } = useIsDark();

        useEffect(() => {
            if (disabledProps.includes("darkMode")) {
                return;
            }
            if (!isFirstStory) {
                return;
            }

            setIsDark(darkMode);
        }, [darkMode]);

        if (containerWidth !== 0 && lang === "fr") {
            return (
                <div className="container" style={{ "width": containerWidth }}>
                    <Component {...props} />
                </div>
            );
        }

        if (containerWidth !== 0 && lang !== "fr") {
            return (
                <DsfrLangProvider lang={lang}>
                    <div className="container" style={{ "width": containerWidth }}>
                        <Component {...props} />
                    </div>
                </DsfrLangProvider>
            );
        }

        if (containerWidth !== 0 && lang !== "fr") {
            return (
                <DsfrLangProvider lang={lang}>
                    <div className="container" style={{ "width": containerWidth }}>
                        <Component {...props} />
                    </div>
                </DsfrLangProvider>
            );
        }

        if (containerWidth === 0 && lang !== "fr") {
            return (
                <DsfrLangProvider lang={lang}>
                    <Component {...props} />
                </DsfrLangProvider>
            );
        }

        return <Component {...props} />;
    };

    let isFirstStory = true;

    function getStory(
        props: Props,
        params?: { defaultContainerWidth?: number; description?: string }
    ): typeof Template {
        const { defaultContainerWidth: defaultContainerWidthStoryLevel, description } =
            params ?? {};

        const out = Template.bind({});

        out.args = {
            "darkMode": window.matchMedia("(prefers-color-scheme: dark)").matches,
            "containerWidth": defaultContainerWidthStoryLevel ?? defaultContainerWidth ?? 0,
            "lang": "fr",
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

    const componentName = symToStr(wrappedComponent);

    return {
        "meta": id<Meta>({
            "title": `${sectionName}/${componentName}`,
            "component": Component,
            "parameters": {
                "docs": {
                    "description": {
                        "component": [
                            ...(doHideImportInstruction
                                ? []
                                : [
                                      `\`import { ${componentName} } from "@codegouvfr/react-dsfr/${componentName}"\``
                                  ]),
                            ...(description === undefined ? [] : [description])
                        ].join("  \n")
                    }
                },
                "viewMode": "docs"
            },
            "argTypes": {
                "darkMode": {
                    "table": {
                        "disable": disabledProps.includes("darkMode")
                    },
                    "description": "Global color scheme enabled, light or dark"
                },
                "containerWidth": {
                    "control": {
                        "type": "range",
                        "min": 0,
                        "max": 1920,
                        "step": 10
                    },
                    "table": {
                        "disable": disabledProps.includes("containerWidth")
                    },
                    "description": `Play with the width of the parent component. Note that this isn't meant for testing the 
                    responsiveness of the components. For that you have [the viewports](https://youtu.be/psLbgPfEzZY).`
                },
                "lang": {
                    "options": ["fr", "en", "es", "de"],
                    "control": {
                        "type": "select"
                    },
                    "table": {
                        "disable": disabledProps.includes("lang")
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
