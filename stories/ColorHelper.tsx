import React, { useState } from "react";
import { SearchBar } from "../dist/SearchBar";
import { CallOut } from "../dist/CallOut";
import { colorDecisionAndCorrespondingOption } from "../dist/fr/generatedFromCss/colorDecisionAndCorrespondingOptions";
import type { ColorDecisionAndCorrespondingOption } from "../src/scripts/build/cssToTs/colorDecisionAndCorrespondingOptions";
import { useColors } from "../dist/useColors";
import { fr } from "../dist/fr";
import { createUseDebounce } from "powerhooks/useDebounce";
import { Fzf } from "fzf";
import { createMakeAndWithStyles } from "tss-react";
import { MuiDsfrThemeProvider } from "../dist/mui";
import Tooltip from "@mui/material/Tooltip";

const { useStyles } = createMakeAndWithStyles({ "useTheme": useColors });

const { useDebounce } = createUseDebounce({ "delay": 400 });

const fzf = new Fzf<readonly ColorDecisionAndCorrespondingOption[]>(
    colorDecisionAndCorrespondingOption,
    {
        "selector": ({
            colorDecisionName,
            themePath,
            colorOption: { colorOptionName, themePath: optionThemePath, color }
        }) =>
            `${colorDecisionName} ${["theme", "decisions", ...themePath].join(
                "."
            )} ${colorOptionName} ${["theme", "options", ...optionThemePath].join(".")} ${
                typeof color === "string" ? color : `${color.light} ${color.dark}`
            }`
    }
);

export function ColorHelper() {
    const [search, setSearch] = useState("");

    const [
        filteredColorDecisionAndCorrespondingOption,
        setFilteredColorDecisionAndCorrespondingOption
    ] = useState<readonly ColorDecisionAndCorrespondingOption[]>(
        colorDecisionAndCorrespondingOption
    );

    useDebounce({
        "query": search,
        "onDebounced": () =>
            setFilteredColorDecisionAndCorrespondingOption(
                fzf
                    .find(search)
                    .map(
                        ({ item: colorDecisionAndCorrespondingOption }) =>
                            colorDecisionAndCorrespondingOption
                    )
            )
    });

    const { css } = useStyles();

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
    const [searchBarElement, setSearchBarElement] = useState<HTMLDivElement | null>(null);

    return (
        <MuiDsfrThemeProvider>
            <div>
                <CallOut
                    className={css({
                        "marginBottom": 0
                    })}
                    title="Color Helper tool"
                    iconId="ri-palette-line"
                    buttonProps={{
                        "onClick": () => {
                            inputElement?.focus();
                            searchBarElement?.scrollIntoView({
                                "behavior": "smooth",
                                "block": "start"
                            });
                        },
                        "children": "Start searching"
                    }}
                >
                    This tool help you find the perfect DSFR color decision for your usecase.
                    <br />
                    <br />
                    If you have the hex code (e.g. <code>#c9191e</code>) of a color that you know
                    belong to the DSFR palette you can use the filter to find to witch decision it
                    correspond.
                </CallOut>
                <SearchBar
                    className={css({ "paddingTop": fr.spacing("6v") })}
                    ref={searchBarElement => setSearchBarElement(searchBarElement)}
                    label="Filter by color code (e.g. #c9191e), CSS variable name (e.g. --text-active-red-marianne) or something else (e.g. marianne)..."
                    nativeInputProps={{
                        "ref": inputElement => setInputElement(inputElement),
                        "value": search,
                        "onChange": event => setSearch(event.target.value)
                    }}
                />
                <h3
                    style={{
                        "marginTop": fr.spacing("6v")
                    }}
                >
                    {search === ""
                        ? `${colorDecisionAndCorrespondingOption.length} color decisions`
                        : `Found ${filteredColorDecisionAndCorrespondingOption.length} decisions matching your query`}
                </h3>
                {filteredColorDecisionAndCorrespondingOption.map((entry, i) => (
                    <ColorDecisionShowcase
                        {...entry}
                        key={i}
                        className={css({
                            "marginTop": fr.spacing("4v")
                        })}
                    />
                ))}
            </div>
        </MuiDsfrThemeProvider>
    );
}

function ColorDecisionShowcase(
    props: { className?: string } & ColorDecisionAndCorrespondingOption
) {
    const { className, colorDecisionName, themePath, colorOption } = props;

    const theme = useColors();

    const { cx, css } = useStyles();

    return (
        <div
            className={cx(
                css({
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": theme.decisions.border.default.grey.default,
                    "boxShadow": "0px 6px 10px 0px rgba(0,0,0,0.07)",
                    "padding": fr.spacing("4v")
                }),
                className
            )}
        >
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable:{" "}
                </span>
                &nbsp;{colorDecisionName}
            </p>
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    Decision path{" "}
                    <Tooltip
                        title={
                            <a
                                href="https://react-dsfr.etalab.studio/css-in-js#colors"
                                target="_blank"
                            >
                                How to access the <code>theme</code> object
                            </a>
                        }
                        placement="top"
                        arrow
                    >
                        <i className={fr.cx("ri-information-line")} />
                    </Tooltip>{" "}
                    :
                </span>{" "}
                <code>
                    theme.decisions.<strong>{themePath.join(".")}</strong>
                </code>
            </p>
            <h6>Corresponding color option:</h6>
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable:{" "}
                </span>
                : {colorOption.colorOptionName}
            </p>
            <p
                style={{
                    "marginBottom": 12
                }}
            >
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    Option path:{" "}
                </span>{" "}
                <code>
                    theme.options.<strong>{colorOption.themePath.join(".")}</strong>
                </code>
            </p>

            {typeof colorOption.color === "string" ? (
                <>
                    <span>Colors: </span>: <ColoredSquare hexColorCode={colorOption.color} />
                </>
            ) : (
                <>
                    <span
                        style={{
                            "color": theme.decisions.text.mention.grey.default
                        }}
                    >
                        Dark mode:{" "}
                    </span>
                    <ColoredSquare hexColorCode={colorOption.color.light} />
                    &nbsp; &nbsp;
                    <span
                        style={{
                            "color": theme.decisions.text.mention.grey.default
                        }}
                    >
                        Light mode:{" "}
                    </span>
                    <ColoredSquare hexColorCode={colorOption.color.dark} />
                </>
            )}
        </div>
    );
}

function ColoredSquare(props: { hexColorCode: string }) {
    const { hexColorCode } = props;

    const theme = useColors();

    return (
        <div
            style={{
                display: "inline"
            }}
        >
            <code>{hexColorCode}</code>
            &nbsp;
            <div
                style={{
                    "display": "inline-block",
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": theme.decisions.border.default.grey.default,
                    "width": 30,
                    "height": 30,
                    "backgroundColor": hexColorCode,
                    "position": "relative",
                    "top": 8
                }}
            />
        </div>
    );
}
