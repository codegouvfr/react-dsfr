import React, { useState } from "react";
import { SearchBar } from "../dist/SearchBar";
import { colorDecisionAndCorrespondingOption } from "../dist/fr/generatedFromCss/colorDecisionAndCorrespondingOptions";
import type { ColorDecisionAndCorrespondingOption } from "../src/scripts/build/cssToTs/colorDecisionAndCorrespondingOptions";
import { useColors } from "../dist/useColors";
import { fr } from "../dist/fr";
import { createUseDebounce } from "powerhooks/useDebounce";
import { Fzf } from "fzf";

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

    return (
        <div>
            <SearchBar
                label="Filter by color code (e.g. #c9191e), CSS variable name (e.g. --text-active-red-marianne) or something else (e.g. marianne)..."
                nativeInputProps={{
                    "value": search,
                    "onChange": event => setSearch(event.target.value)
                }}
            />
            <h3
                style={{
                    "marginTop": fr.spacing("5v")
                }}
            >
                {search === ""
                    ? `${colorDecisionAndCorrespondingOption.length} color decisions`
                    : `Found ${filteredColorDecisionAndCorrespondingOption.length} decisions matching your query`}
            </h3>
            {filteredColorDecisionAndCorrespondingOption.map((entry, i) => (
                <ColorDecisionShowcase {...entry} key={i} />
            ))}
        </div>
    );
}

function ColorDecisionShowcase(props: ColorDecisionAndCorrespondingOption) {
    const { colorDecisionName, themePath, colorOption } = props;

    const theme = useColors();

    return (
        <div
            style={{
                "borderWidth": 2,
                "borderStyle": "solid",
                "borderColor": theme.decisions.border.default.grey.default,
                "boxShadow": "0px 6px 10px 0px rgba(0,0,0,0.07)",
                "padding": fr.spacing("4v"),
                "marginTop": fr.spacing("4v")
            }}
        >
            <h5>Color decision:</h5>
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
                    Decision path:{" "}
                </span>{" "}
                <code>
                    theme.decisions.<strong>{themePath.join(".")}</strong>
                </code>
            </p>
            <h5>Corresponding color option:</h5>
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
