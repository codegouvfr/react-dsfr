import type { ColorScheme } from "../sharedTypes";
import { capitalize } from "tsafe/capitalize";
import { id } from "tsafe/id";

/*
This type doesn't exist
type ColorOptions = {
	blueFrance: {
		_975_75: {
			default: string;
			hover: string;
			active: string;
		}
	}

};

*/

/** Generated */
export function getColorOptions(colorScheme: ColorScheme) {
    const isDark: boolean = (() => {
        switch (colorScheme) {
            case "dark":
                return true;
            case "light":
                return false;
        }
    })();

    return {
        "blueFrance": {
            "_975_75": {
                "default": isDark ? "#44033" : "#303022",
                "hover": isDark ? "#433033" : "#33300",
                "active": isDark ? "#334343" : "#30333"
            }
        }
    } as const;
}

/*
https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-identite-de-l-etat/couleurs-palette
*/

export type Variant = "main" | "sun" | "moon";

export const states = ["hover", "active"] as const;

export type State = typeof states[number];

export type BrightnessIndex = {
    value: number;
    variant: Variant | undefined;
};

export type ParsedColorOptionName =
    | ParsedColorOptionName.Invariant
    | ParsedColorOptionName.Variadic;

export declare namespace ParsedColorOptionName {
    type Common = {
        colorName: string;
        state: State | undefined;
    };

    /** Same value in dark and light mode */
    export type Invariant = Common & {
        brightness: {
            isInvariant: true;
        } & BrightnessIndex;
    };

    /** The color varies depending of the color scheme */
    export type Variadic = Common & {
        brightness: {
            isInvariant: false;
        } & Record<ColorScheme, BrightnessIndex>;
    };
}

/** Exported only for tests */
export function parseColorOptionName(colorOptionName: `--${string}`): ParsedColorOptionName {
    const parsedColorOptionName: ParsedColorOptionName.Variadic = {
        "colorName": "",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": NaN,
                "variant": undefined
            },
            "dark": {
                "value": NaN,
                "variant": undefined
            }
        },
        "state": undefined
    };

    const getReturnValue = (): ParsedColorOptionName =>
        isNaN(parsedColorOptionName.brightness.dark.value)
            ? id<ParsedColorOptionName.Invariant>({
                  "colorName": parsedColorOptionName.colorName,
                  "brightness": {
                      "isInvariant": true,
                      ...parsedColorOptionName.brightness.light
                  },
                  "state": parsedColorOptionName.state
              })
            : parsedColorOptionName;

    /*
	--name1-name2-111
	--name1-name2-111-hover
	--name1-name2-sun-111
	--name1-name2-sun-111-hover
	--name1-name2-111-222
	--name1-name2-111-222-hover
	--name1-name2-sun-111-222
	--name1-name2-sun-111-222-hover
	--name1-name2-111-moon-222
	--name1-name2-111-moon-222-hover
	--name1-name2-sun-111-moon-222
	--name1-name2-sun-111-moon-222-hover
	*/

    let revArr = colorOptionName.replace(/^--/, "").split("-").reverse();

    /*
	revArr=
	["111","name2","name1"]
	["hover","111","name2","name1"]
	["111","sun","name2","name1"]
	["hover","111","sun","name2","name1"]
	["222","111","name2","name1"]
	["hover","222","111","name2","name1"]
	["222","111","sun","name2","name1"]
	["hover","222","111","sun","name2","name1"]
	["222","moon","111","name2","name1"]
	["hover","222","moon","111","name2","name1"]
	["222","moon","111","sun","name2","name1"]
	["hover","222","moon","111","sun","name2","name1"]
	*/

    parse_state: {
        const [word, ...rest] = revArr;

        if (word !== "hover" && word !== "active") {
            break parse_state;
        }

        revArr = rest;

        parsedColorOptionName.state = word;
    }

    /*
	revArr=
	["111","name2","name1"]
	["111","sun","name2","name1"]
	["222","111","name2","name1"]
	["222","111","sun","name2","name1"]
	["222","moon","111","name2","name1"]
	["222","moon","111","sun","name2","name1"]
	*/

    let brightnessIndex: number;

    {
        const [word, ...rest] = revArr;

        revArr = rest;

        brightnessIndex = parseInt(word);
    }

    /*
	revArr=
	["name2","name1"]
	["sun","name2","name1"]
	["111","name2","name1"]
	["111","sun","name2","name1"]
	["moon","111","name2","name1"]
	["moon","111","sun","name2","name1"]
	*/

    {
        const [word, ...rest] = revArr;

        revArr = rest;

        const n = parseInt(word);

        if (!isNaN(n)) {
            /*
			revArr=
			["name2","name1"]
			["sun","name2","name1"]
			*/

            parsedColorOptionName.brightness.dark.value = brightnessIndex;
            parsedColorOptionName.brightness.light.value = n;

            {
                const [word, ...rest] = revArr;

                revArr = rest;

                if (word === "main" || word === "sun" || word === "moon") {
                    /*
					revArr=
					["name2","name1"]
					*/

                    parsedColorOptionName.brightness.light.variant = word;

                    parsedColorOptionName.colorName = rest
                        .reverse()
                        .map((word, i) => (i === 0 ? word : capitalize(word)))
                        .join("");

                    return getReturnValue();
                }

                /*
				revArr=
				["name1"]
				*/

                parsedColorOptionName.colorName = [...rest.reverse(), word]
                    .map((word, i) => (i === 0 ? word : capitalize(word)))
                    .join("");

                return getReturnValue();
            }
        }

        if (word === "main" || word === "sun" || word === "moon") {
            /*
			revArr=
			["name2","name1"]
			["111","name2","name1"]
			["111","sun","name2","name1"]
			*/

            const variant: Variant = word;

            {
                const [word, ...rest] = revArr;

                revArr = rest;

                const n = parseInt(word);

                if (!isNaN(n)) {
                    /*
					revArr=
					["name2","name1"]
					["sun","name2","name1"]
					*/

                    parsedColorOptionName.brightness.dark.value = brightnessIndex;
                    parsedColorOptionName.brightness.dark.variant = variant;
                    parsedColorOptionName.brightness.light.value = n;

                    {
                        const [word, ...rest] = revArr;

                        revArr = rest;

                        if (word === "main" || word === "sun" || word === "moon") {
                            /*
							revArr=
							["name2","name1"]
							*/

                            parsedColorOptionName.brightness.light.variant = word;

                            parsedColorOptionName.colorName = rest
                                .reverse()
                                .map((word, i) => (i === 0 ? word : capitalize(word)))
                                .join("");

                            return getReturnValue();
                        }

                        /*
						revArr=
						["name1"]
						*/

                        parsedColorOptionName.colorName = [...rest.reverse(), word]
                            .map((word, i) => (i === 0 ? word : capitalize(word)))
                            .join("");

                        return getReturnValue();
                    }
                }

                /*
				revArr=
				["name1"]
				*/

                parsedColorOptionName.brightness.light.variant = variant;
                parsedColorOptionName.brightness.light.value = brightnessIndex;

                parsedColorOptionName.colorName = [...rest.reverse(), word]
                    .map((word, i) => (i === 0 ? word : capitalize(word)))
                    .join("");

                return getReturnValue();
            }
        }

        /*
		revArr=
		["name1"]
		*/

        parsedColorOptionName.brightness.light.value = brightnessIndex;

        parsedColorOptionName.colorName = [...rest.reverse(), word]
            .map((word, i) => (i === 0 ? word : capitalize(word)))
            .join("");

        return getReturnValue();
    }
}

// YAGNI
//export declare function stringifyColorOptionName(parsedColorOptionName: ParsedColorOptionName): `--${string}`

/**
 * getThemePath(parseColorOptionName("--pink-macaron-sun-406-moon-833-hover"))
 * ->
 * ["pinkMacaron", "_sun_406_moon_833", "hover"]
 */
export function getThemePath(parsedColorOptionName: ParsedColorOptionName): string[] {
    const o = parsedColorOptionName;

    return [
        o.colorName,
        o.brightness.isInvariant
            ? `${o.brightness.variant ?? "_"}${o.brightness.value}`
            : `${o.brightness.light.variant ?? "_"}${o.brightness.light.value}${
                  o.brightness.dark.variant ?? "_"
              }${o.brightness.dark.value}`,
        o.state ?? "default"
    ];
}

export type ParsedColorOption = {
    parsedColorOptionName: ParsedColorOptionName;
    lightValue: `#${string}`;
    darkValue: `#${string}` | undefined;
};

export declare function parseColorOptions(rawCssCode: string): ParsedColorOption[];
