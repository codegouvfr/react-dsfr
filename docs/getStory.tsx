import React, { useEffect } from "react";
import type { Meta, Story } from "@storybook/react";
import type { ArgType } from "@storybook/addons";
import { symToStr } from "tsafe/symToStr";
import { id } from "tsafe/id";
import "../dist/dsfr/dsfr.css";
import "../dist/dsfr/utility/icons/icons.min.css";
import { startDsfrReact, useIsDark, DsfrLangProvider } from "../dist";

startDsfrReact({
    "defaultColorScheme": "system",
    "defaultLang": "fr"
});

export function getStoryFactory<Props extends Record<string, any>>(params: {
    sectionName: string;
    description?: string;
    wrappedComponent: Record<string, (props: Props) => JSX.Element | null>;
    /** https://storybook.js.org/docs/react/essentials/controls */
    argTypes?: Partial<Record<keyof Props, ArgType>>;
    defaultContainerWidth?: number;
    disabledProps?: ("containerWidth" | "lang" | "darkMode")[];
}) {
    const {
        sectionName,
        wrappedComponent,
        description,
        argTypes = {},
        defaultContainerWidth,
        disabledProps = []
    } = params;

    const Component: any = Object.entries(wrappedComponent).map(([, component]) => component)[0];

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

    function getStory(props: Props, params?: { description?: string }): typeof Template {
        const { description } = params ?? {};

        const out = Template.bind({});

        out.args = {
            "darkMode": window.matchMedia("(prefers-color-scheme: dark)").matches,
            "containerWidth": defaultContainerWidth ?? 0,
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
                            `\`import { ${componentName} } from "@codegouvfr/react-dsfr/${componentName}"\``,
                            ...(description === undefined ? [] : [description])
                        ].join("  \n")
                    }
                }
            },
            "argTypes": {
                "darkMode": {
                    "table": {
                        "disable": disabledProps.includes("darkMode")
                    }
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
                    }
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
