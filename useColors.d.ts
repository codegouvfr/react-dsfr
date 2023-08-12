/** @deprecated: A hook is no longer required to get the colors.
 *
 *  Before you would do:
 * ```ts
 * import { useColors } from "@codegouvfr/react-dsfr/useColors";
 * // ...
 * const theme = useColors();
 * // ...
 * theme.decisions.background.default.grey.default
 * ```
 * Now you should do:
 * ```ts
 * import { fr } from "@codegouvfr/react-dsfr";
 * // ...
 * fr.colors.decisions.background.default.grey.default
 * ```
 * We don't need a hook anymore as the the colors are expressed as CSS variables and thus don't need to be
 * switched at runtime when the user changes the dark mode.
 *
 * If however you need the colors in the HEX format you can do:
 *
 * ```ts
 * import { fr } from "@codegouvfr/react-dsfr";
 * import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
 * // ...
 * const { isDark } = useIsDark();
 * const theme = fr.colors.getHex({ isDark });
 * // ...
 * theme.decisions.background.default.grey.default
 * ```
 **/
export declare function useColors(): {
    isDark: boolean;
    options: {
        readonly grey: {
            readonly _1000_50: {
                readonly default: "var(--grey-1000-50)";
                readonly hover: "var(--grey-1000-50-hover)";
                readonly active: "var(--grey-1000-50-active)";
            };
            readonly _975_75: {
                readonly default: "var(--grey-975-75)";
                readonly hover: "var(--grey-975-75-hover)";
                readonly active: "var(--grey-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--grey-950-100)";
                readonly hover: "var(--grey-950-100-hover)";
                readonly active: "var(--grey-950-100-active)";
            };
            readonly _200_850: {
                readonly default: "var(--grey-200-850)";
            };
            readonly _925_125: {
                readonly default: "var(--grey-925-125)";
            };
            readonly _1000_75: {
                readonly default: "var(--grey-1000-75)";
                readonly hover: "var(--grey-1000-75-hover)";
                readonly active: "var(--grey-1000-75-active)";
            };
            readonly _1000_100: {
                readonly default: "var(--grey-1000-100)";
                readonly hover: "var(--grey-1000-100-hover)";
                readonly active: "var(--grey-1000-100-active)";
            };
            readonly _975_100: {
                readonly default: "var(--grey-975-100)";
                readonly hover: "var(--grey-975-100-hover)";
                readonly active: "var(--grey-975-100-active)";
            };
            readonly _975_125: {
                readonly default: "var(--grey-975-125)";
                readonly hover: "var(--grey-975-125-hover)";
                readonly active: "var(--grey-975-125-active)";
            };
            readonly _950_125: {
                readonly default: "var(--grey-950-125)";
                readonly hover: "var(--grey-950-125-hover)";
                readonly active: "var(--grey-950-125-active)";
            };
            readonly _950_150: {
                readonly default: "var(--grey-950-150)";
                readonly hover: "var(--grey-950-150-hover)";
                readonly active: "var(--grey-950-150-active)";
            };
            readonly _50_1000: {
                readonly default: "var(--grey-50-1000)";
            };
            readonly _425_625: {
                readonly default: "var(--grey-425-625)";
            };
            readonly _625_425: {
                readonly default: "var(--grey-625-425)";
            };
            readonly _900_175: {
                readonly default: "var(--grey-900-175)";
            };
        };
        readonly blueFrance: {
            readonly _975_75: {
                readonly default: "var(--blue-france-975-75)";
                readonly hover: "var(--blue-france-975-75-hover)";
                readonly active: "var(--blue-france-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--blue-france-950-100)";
                readonly hover: "var(--blue-france-950-100-hover)";
                readonly active: "var(--blue-france-950-100-active)";
            };
            readonly sun113_625: {
                readonly default: "var(--blue-france-sun-113-625)";
                readonly hover: "var(--blue-france-sun-113-625-hover)";
                readonly active: "var(--blue-france-sun-113-625-active)";
            };
            readonly _925_125: {
                readonly default: "var(--blue-france-925-125)";
                readonly hover: "var(--blue-france-925-125-hover)";
                readonly active: "var(--blue-france-925-125-active)";
            };
            readonly _975sun113: {
                readonly default: "var(--blue-france-975-sun-113)";
            };
            readonly main525: {
                readonly default: "var(--blue-france-main-525)";
            };
            readonly _850_200: {
                readonly default: "var(--blue-france-850-200)";
            };
        };
        readonly redMarianne: {
            readonly _975_75: {
                readonly default: "var(--red-marianne-975-75)";
                readonly hover: "var(--red-marianne-975-75-hover)";
                readonly active: "var(--red-marianne-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--red-marianne-950-100)";
                readonly hover: "var(--red-marianne-950-100-hover)";
                readonly active: "var(--red-marianne-950-100-active)";
            };
            readonly _425_625: {
                readonly default: "var(--red-marianne-425-625)";
                readonly hover: "var(--red-marianne-425-625-hover)";
                readonly active: "var(--red-marianne-425-625-active)";
            };
            readonly _925_125: {
                readonly default: "var(--red-marianne-925-125)";
                readonly hover: "var(--red-marianne-925-125-hover)";
                readonly active: "var(--red-marianne-925-125-active)";
            };
            readonly main472: {
                readonly default: "var(--red-marianne-main-472)";
            };
            readonly _850_200: {
                readonly default: "var(--red-marianne-850-200)";
            };
        };
        readonly info: {
            readonly _950_100: {
                readonly default: "var(--info-950-100)";
                readonly hover: "var(--info-950-100-hover)";
                readonly active: "var(--info-950-100-active)";
            };
            readonly _425_625: {
                readonly default: "var(--info-425-625)";
                readonly hover: "var(--info-425-625-hover)";
                readonly active: "var(--info-425-625-active)";
            };
            readonly _975_75: {
                readonly default: "var(--info-975-75)";
            };
        };
        readonly success: {
            readonly _950_100: {
                readonly default: "var(--success-950-100)";
                readonly hover: "var(--success-950-100-hover)";
                readonly active: "var(--success-950-100-active)";
            };
            readonly _425_625: {
                readonly default: "var(--success-425-625)";
                readonly hover: "var(--success-425-625-hover)";
                readonly active: "var(--success-425-625-active)";
            };
            readonly _975_75: {
                readonly default: "var(--success-975-75)";
            };
        };
        readonly warning: {
            readonly _950_100: {
                readonly default: "var(--warning-950-100)";
                readonly hover: "var(--warning-950-100-hover)";
                readonly active: "var(--warning-950-100-active)";
            };
            readonly _425_625: {
                readonly default: "var(--warning-425-625)";
                readonly hover: "var(--warning-425-625-hover)";
                readonly active: "var(--warning-425-625-active)";
            };
            readonly _975_75: {
                readonly default: "var(--warning-975-75)";
            };
        };
        readonly error: {
            readonly _950_100: {
                readonly default: "var(--error-950-100)";
                readonly hover: "var(--error-950-100-hover)";
                readonly active: "var(--error-950-100-active)";
            };
            readonly _425_625: {
                readonly default: "var(--error-425-625)";
                readonly hover: "var(--error-425-625-hover)";
                readonly active: "var(--error-425-625-active)";
            };
            readonly _975_75: {
                readonly default: "var(--error-975-75)";
            };
        };
        readonly greenTilleulVerveine: {
            readonly _975_75: {
                readonly default: "var(--green-tilleul-verveine-975-75)";
                readonly hover: "var(--green-tilleul-verveine-975-75-hover)";
                readonly active: "var(--green-tilleul-verveine-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--green-tilleul-verveine-950-100)";
                readonly hover: "var(--green-tilleul-verveine-950-100-hover)";
                readonly active: "var(--green-tilleul-verveine-950-100-active)";
            };
            readonly sun418moon817: {
                readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                readonly hover: "var(--green-tilleul-verveine-sun-418-moon-817-hover)";
                readonly active: "var(--green-tilleul-verveine-sun-418-moon-817-active)";
            };
            readonly _925_125: {
                readonly default: "var(--green-tilleul-verveine-925-125)";
                readonly hover: "var(--green-tilleul-verveine-925-125-hover)";
                readonly active: "var(--green-tilleul-verveine-925-125-active)";
            };
            readonly main707: {
                readonly default: "var(--green-tilleul-verveine-main-707)";
            };
            readonly _850_200: {
                readonly default: "var(--green-tilleul-verveine-850-200)";
            };
        };
        readonly greenBourgeon: {
            readonly _975_75: {
                readonly default: "var(--green-bourgeon-975-75)";
                readonly hover: "var(--green-bourgeon-975-75-hover)";
                readonly active: "var(--green-bourgeon-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--green-bourgeon-950-100)";
                readonly hover: "var(--green-bourgeon-950-100-hover)";
                readonly active: "var(--green-bourgeon-950-100-active)";
            };
            readonly sun425moon759: {
                readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                readonly hover: "var(--green-bourgeon-sun-425-moon-759-hover)";
                readonly active: "var(--green-bourgeon-sun-425-moon-759-active)";
            };
            readonly _925_125: {
                readonly default: "var(--green-bourgeon-925-125)";
                readonly hover: "var(--green-bourgeon-925-125-hover)";
                readonly active: "var(--green-bourgeon-925-125-active)";
            };
            readonly main640: {
                readonly default: "var(--green-bourgeon-main-640)";
            };
            readonly _850_200: {
                readonly default: "var(--green-bourgeon-850-200)";
            };
        };
        readonly greenEmeraude: {
            readonly _975_75: {
                readonly default: "var(--green-emeraude-975-75)";
                readonly hover: "var(--green-emeraude-975-75-hover)";
                readonly active: "var(--green-emeraude-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--green-emeraude-950-100)";
                readonly hover: "var(--green-emeraude-950-100-hover)";
                readonly active: "var(--green-emeraude-950-100-active)";
            };
            readonly sun425moon753: {
                readonly default: "var(--green-emeraude-sun-425-moon-753)";
                readonly hover: "var(--green-emeraude-sun-425-moon-753-hover)";
                readonly active: "var(--green-emeraude-sun-425-moon-753-active)";
            };
            readonly _925_125: {
                readonly default: "var(--green-emeraude-925-125)";
                readonly hover: "var(--green-emeraude-925-125-hover)";
                readonly active: "var(--green-emeraude-925-125-active)";
            };
            readonly main632: {
                readonly default: "var(--green-emeraude-main-632)";
            };
            readonly _850_200: {
                readonly default: "var(--green-emeraude-850-200)";
            };
        };
        readonly greenMenthe: {
            readonly _975_75: {
                readonly default: "var(--green-menthe-975-75)";
                readonly hover: "var(--green-menthe-975-75-hover)";
                readonly active: "var(--green-menthe-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--green-menthe-950-100)";
                readonly hover: "var(--green-menthe-950-100-hover)";
                readonly active: "var(--green-menthe-950-100-active)";
            };
            readonly sun373moon652: {
                readonly default: "var(--green-menthe-sun-373-moon-652)";
                readonly hover: "var(--green-menthe-sun-373-moon-652-hover)";
                readonly active: "var(--green-menthe-sun-373-moon-652-active)";
            };
            readonly _925_125: {
                readonly default: "var(--green-menthe-925-125)";
                readonly hover: "var(--green-menthe-925-125-hover)";
                readonly active: "var(--green-menthe-925-125-active)";
            };
            readonly main548: {
                readonly default: "var(--green-menthe-main-548)";
            };
            readonly _850_200: {
                readonly default: "var(--green-menthe-850-200)";
            };
        };
        readonly greenArchipel: {
            readonly _975_75: {
                readonly default: "var(--green-archipel-975-75)";
                readonly hover: "var(--green-archipel-975-75-hover)";
                readonly active: "var(--green-archipel-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--green-archipel-950-100)";
                readonly hover: "var(--green-archipel-950-100-hover)";
                readonly active: "var(--green-archipel-950-100-active)";
            };
            readonly sun391moon716: {
                readonly default: "var(--green-archipel-sun-391-moon-716)";
                readonly hover: "var(--green-archipel-sun-391-moon-716-hover)";
                readonly active: "var(--green-archipel-sun-391-moon-716-active)";
            };
            readonly _925_125: {
                readonly default: "var(--green-archipel-925-125)";
                readonly hover: "var(--green-archipel-925-125-hover)";
                readonly active: "var(--green-archipel-925-125-active)";
            };
            readonly main557: {
                readonly default: "var(--green-archipel-main-557)";
            };
            readonly _850_200: {
                readonly default: "var(--green-archipel-850-200)";
            };
        };
        readonly blueEcume: {
            readonly _975_75: {
                readonly default: "var(--blue-ecume-975-75)";
                readonly hover: "var(--blue-ecume-975-75-hover)";
                readonly active: "var(--blue-ecume-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--blue-ecume-950-100)";
                readonly hover: "var(--blue-ecume-950-100-hover)";
                readonly active: "var(--blue-ecume-950-100-active)";
            };
            readonly sun247moon675: {
                readonly default: "var(--blue-ecume-sun-247-moon-675)";
                readonly hover: "var(--blue-ecume-sun-247-moon-675-hover)";
                readonly active: "var(--blue-ecume-sun-247-moon-675-active)";
            };
            readonly _925_125: {
                readonly default: "var(--blue-ecume-925-125)";
                readonly hover: "var(--blue-ecume-925-125-hover)";
                readonly active: "var(--blue-ecume-925-125-active)";
            };
            readonly main400: {
                readonly default: "var(--blue-ecume-main-400)";
            };
            readonly _850_200: {
                readonly default: "var(--blue-ecume-850-200)";
            };
        };
        readonly blueCumulus: {
            readonly _975_75: {
                readonly default: "var(--blue-cumulus-975-75)";
                readonly hover: "var(--blue-cumulus-975-75-hover)";
                readonly active: "var(--blue-cumulus-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--blue-cumulus-950-100)";
                readonly hover: "var(--blue-cumulus-950-100-hover)";
                readonly active: "var(--blue-cumulus-950-100-active)";
            };
            readonly sun368moon732: {
                readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                readonly hover: "var(--blue-cumulus-sun-368-moon-732-hover)";
                readonly active: "var(--blue-cumulus-sun-368-moon-732-active)";
            };
            readonly _925_125: {
                readonly default: "var(--blue-cumulus-925-125)";
                readonly hover: "var(--blue-cumulus-925-125-hover)";
                readonly active: "var(--blue-cumulus-925-125-active)";
            };
            readonly main526: {
                readonly default: "var(--blue-cumulus-main-526)";
            };
            readonly _850_200: {
                readonly default: "var(--blue-cumulus-850-200)";
            };
        };
        readonly purpleGlycine: {
            readonly _975_75: {
                readonly default: "var(--purple-glycine-975-75)";
                readonly hover: "var(--purple-glycine-975-75-hover)";
                readonly active: "var(--purple-glycine-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--purple-glycine-950-100)";
                readonly hover: "var(--purple-glycine-950-100-hover)";
                readonly active: "var(--purple-glycine-950-100-active)";
            };
            readonly sun319moon630: {
                readonly default: "var(--purple-glycine-sun-319-moon-630)";
                readonly hover: "var(--purple-glycine-sun-319-moon-630-hover)";
                readonly active: "var(--purple-glycine-sun-319-moon-630-active)";
            };
            readonly _925_125: {
                readonly default: "var(--purple-glycine-925-125)";
                readonly hover: "var(--purple-glycine-925-125-hover)";
                readonly active: "var(--purple-glycine-925-125-active)";
            };
            readonly main494: {
                readonly default: "var(--purple-glycine-main-494)";
            };
            readonly _850_200: {
                readonly default: "var(--purple-glycine-850-200)";
            };
        };
        readonly pinkMacaron: {
            readonly _975_75: {
                readonly default: "var(--pink-macaron-975-75)";
                readonly hover: "var(--pink-macaron-975-75-hover)";
                readonly active: "var(--pink-macaron-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--pink-macaron-950-100)";
                readonly hover: "var(--pink-macaron-950-100-hover)";
                readonly active: "var(--pink-macaron-950-100-active)";
            };
            readonly sun406moon833: {
                readonly default: "var(--pink-macaron-sun-406-moon-833)";
                readonly hover: "var(--pink-macaron-sun-406-moon-833-hover)";
                readonly active: "var(--pink-macaron-sun-406-moon-833-active)";
            };
            readonly _925_125: {
                readonly default: "var(--pink-macaron-925-125)";
                readonly hover: "var(--pink-macaron-925-125-hover)";
                readonly active: "var(--pink-macaron-925-125-active)";
            };
            readonly main689: {
                readonly default: "var(--pink-macaron-main-689)";
            };
            readonly _850_200: {
                readonly default: "var(--pink-macaron-850-200)";
            };
        };
        readonly pinkTuile: {
            readonly _975_75: {
                readonly default: "var(--pink-tuile-975-75)";
                readonly hover: "var(--pink-tuile-975-75-hover)";
                readonly active: "var(--pink-tuile-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--pink-tuile-950-100)";
                readonly hover: "var(--pink-tuile-950-100-hover)";
                readonly active: "var(--pink-tuile-950-100-active)";
            };
            readonly sun425moon750: {
                readonly default: "var(--pink-tuile-sun-425-moon-750)";
                readonly hover: "var(--pink-tuile-sun-425-moon-750-hover)";
                readonly active: "var(--pink-tuile-sun-425-moon-750-active)";
            };
            readonly _925_125: {
                readonly default: "var(--pink-tuile-925-125)";
                readonly hover: "var(--pink-tuile-925-125-hover)";
                readonly active: "var(--pink-tuile-925-125-active)";
            };
            readonly main556: {
                readonly default: "var(--pink-tuile-main-556)";
            };
            readonly _850_200: {
                readonly default: "var(--pink-tuile-850-200)";
            };
        };
        readonly yellowTournesol: {
            readonly _975_75: {
                readonly default: "var(--yellow-tournesol-975-75)";
                readonly hover: "var(--yellow-tournesol-975-75-hover)";
                readonly active: "var(--yellow-tournesol-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--yellow-tournesol-950-100)";
                readonly hover: "var(--yellow-tournesol-950-100-hover)";
                readonly active: "var(--yellow-tournesol-950-100-active)";
            };
            readonly sun407moon922: {
                readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                readonly hover: "var(--yellow-tournesol-sun-407-moon-922-hover)";
                readonly active: "var(--yellow-tournesol-sun-407-moon-922-active)";
            };
            readonly _925_125: {
                readonly default: "var(--yellow-tournesol-925-125)";
                readonly hover: "var(--yellow-tournesol-925-125-hover)";
                readonly active: "var(--yellow-tournesol-925-125-active)";
            };
            readonly main731: {
                readonly default: "var(--yellow-tournesol-main-731)";
            };
            readonly _850_200: {
                readonly default: "var(--yellow-tournesol-850-200)";
            };
        };
        readonly yellowMoutarde: {
            readonly _975_75: {
                readonly default: "var(--yellow-moutarde-975-75)";
                readonly hover: "var(--yellow-moutarde-975-75-hover)";
                readonly active: "var(--yellow-moutarde-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--yellow-moutarde-950-100)";
                readonly hover: "var(--yellow-moutarde-950-100-hover)";
                readonly active: "var(--yellow-moutarde-950-100-active)";
            };
            readonly sun348moon860: {
                readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                readonly hover: "var(--yellow-moutarde-sun-348-moon-860-hover)";
                readonly active: "var(--yellow-moutarde-sun-348-moon-860-active)";
            };
            readonly _925_125: {
                readonly default: "var(--yellow-moutarde-925-125)";
                readonly hover: "var(--yellow-moutarde-925-125-hover)";
                readonly active: "var(--yellow-moutarde-925-125-active)";
            };
            readonly main679: {
                readonly default: "var(--yellow-moutarde-main-679)";
            };
            readonly _850_200: {
                readonly default: "var(--yellow-moutarde-850-200)";
            };
        };
        readonly orangeTerreBattue: {
            readonly _975_75: {
                readonly default: "var(--orange-terre-battue-975-75)";
                readonly hover: "var(--orange-terre-battue-975-75-hover)";
                readonly active: "var(--orange-terre-battue-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--orange-terre-battue-950-100)";
                readonly hover: "var(--orange-terre-battue-950-100-hover)";
                readonly active: "var(--orange-terre-battue-950-100-active)";
            };
            readonly sun370moon672: {
                readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                readonly hover: "var(--orange-terre-battue-sun-370-moon-672-hover)";
                readonly active: "var(--orange-terre-battue-sun-370-moon-672-active)";
            };
            readonly _925_125: {
                readonly default: "var(--orange-terre-battue-925-125)";
                readonly hover: "var(--orange-terre-battue-925-125-hover)";
                readonly active: "var(--orange-terre-battue-925-125-active)";
            };
            readonly main645: {
                readonly default: "var(--orange-terre-battue-main-645)";
            };
            readonly _850_200: {
                readonly default: "var(--orange-terre-battue-850-200)";
            };
        };
        readonly brownCafeCreme: {
            readonly _975_75: {
                readonly default: "var(--brown-cafe-creme-975-75)";
                readonly hover: "var(--brown-cafe-creme-975-75-hover)";
                readonly active: "var(--brown-cafe-creme-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--brown-cafe-creme-950-100)";
                readonly hover: "var(--brown-cafe-creme-950-100-hover)";
                readonly active: "var(--brown-cafe-creme-950-100-active)";
            };
            readonly sun383moon885: {
                readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                readonly hover: "var(--brown-cafe-creme-sun-383-moon-885-hover)";
                readonly active: "var(--brown-cafe-creme-sun-383-moon-885-active)";
            };
            readonly _925_125: {
                readonly default: "var(--brown-cafe-creme-925-125)";
                readonly hover: "var(--brown-cafe-creme-925-125-hover)";
                readonly active: "var(--brown-cafe-creme-925-125-active)";
            };
            readonly main782: {
                readonly default: "var(--brown-cafe-creme-main-782)";
            };
            readonly _850_200: {
                readonly default: "var(--brown-cafe-creme-850-200)";
            };
        };
        readonly brownCaramel: {
            readonly _975_75: {
                readonly default: "var(--brown-caramel-975-75)";
                readonly hover: "var(--brown-caramel-975-75-hover)";
                readonly active: "var(--brown-caramel-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--brown-caramel-950-100)";
                readonly hover: "var(--brown-caramel-950-100-hover)";
                readonly active: "var(--brown-caramel-950-100-active)";
            };
            readonly sun425moon901: {
                readonly default: "var(--brown-caramel-sun-425-moon-901)";
                readonly hover: "var(--brown-caramel-sun-425-moon-901-hover)";
                readonly active: "var(--brown-caramel-sun-425-moon-901-active)";
            };
            readonly _925_125: {
                readonly default: "var(--brown-caramel-925-125)";
                readonly hover: "var(--brown-caramel-925-125-hover)";
                readonly active: "var(--brown-caramel-925-125-active)";
            };
            readonly main648: {
                readonly default: "var(--brown-caramel-main-648)";
            };
            readonly _850_200: {
                readonly default: "var(--brown-caramel-850-200)";
            };
        };
        readonly brownOpera: {
            readonly _975_75: {
                readonly default: "var(--brown-opera-975-75)";
                readonly hover: "var(--brown-opera-975-75-hover)";
                readonly active: "var(--brown-opera-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--brown-opera-950-100)";
                readonly hover: "var(--brown-opera-950-100-hover)";
                readonly active: "var(--brown-opera-950-100-active)";
            };
            readonly sun395moon820: {
                readonly default: "var(--brown-opera-sun-395-moon-820)";
                readonly hover: "var(--brown-opera-sun-395-moon-820-hover)";
                readonly active: "var(--brown-opera-sun-395-moon-820-active)";
            };
            readonly _925_125: {
                readonly default: "var(--brown-opera-925-125)";
                readonly hover: "var(--brown-opera-925-125-hover)";
                readonly active: "var(--brown-opera-925-125-active)";
            };
            readonly main680: {
                readonly default: "var(--brown-opera-main-680)";
            };
            readonly _850_200: {
                readonly default: "var(--brown-opera-850-200)";
            };
        };
        readonly beigeGrisGalet: {
            readonly _975_75: {
                readonly default: "var(--beige-gris-galet-975-75)";
                readonly hover: "var(--beige-gris-galet-975-75-hover)";
                readonly active: "var(--beige-gris-galet-975-75-active)";
            };
            readonly _950_100: {
                readonly default: "var(--beige-gris-galet-950-100)";
                readonly hover: "var(--beige-gris-galet-950-100-hover)";
                readonly active: "var(--beige-gris-galet-950-100-active)";
            };
            readonly sun407moon821: {
                readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                readonly hover: "var(--beige-gris-galet-sun-407-moon-821-hover)";
                readonly active: "var(--beige-gris-galet-sun-407-moon-821-active)";
            };
            readonly _925_125: {
                readonly default: "var(--beige-gris-galet-925-125)";
                readonly hover: "var(--beige-gris-galet-925-125-hover)";
                readonly active: "var(--beige-gris-galet-925-125-active)";
            };
            readonly main702: {
                readonly default: "var(--beige-gris-galet-main-702)";
            };
            readonly _850_200: {
                readonly default: "var(--beige-gris-galet-850-200)";
            };
        };
    };
    decisions: {
        readonly background: {
            readonly default: {
                readonly grey: {
                    readonly default: "var(--grey-1000-50)";
                    readonly hover: "var(--grey-1000-50-hover)";
                    readonly active: "var(--grey-1000-50-active)";
                };
            };
            readonly alt: {
                readonly grey: {
                    readonly default: "var(--grey-975-75)";
                    readonly hover: "var(--grey-975-75-hover)";
                    readonly active: "var(--grey-975-75-active)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-975-75)";
                    readonly hover: "var(--blue-france-975-75-hover)";
                    readonly active: "var(--blue-france-975-75-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-975-75)";
                    readonly hover: "var(--red-marianne-975-75-hover)";
                    readonly active: "var(--red-marianne-975-75-active)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-975-75)";
                    readonly hover: "var(--green-tilleul-verveine-975-75-hover)";
                    readonly active: "var(--green-tilleul-verveine-975-75-active)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-975-75)";
                    readonly hover: "var(--green-bourgeon-975-75-hover)";
                    readonly active: "var(--green-bourgeon-975-75-active)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-975-75)";
                    readonly hover: "var(--green-emeraude-975-75-hover)";
                    readonly active: "var(--green-emeraude-975-75-active)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-975-75)";
                    readonly hover: "var(--green-menthe-975-75-hover)";
                    readonly active: "var(--green-menthe-975-75-active)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-975-75)";
                    readonly hover: "var(--green-archipel-975-75-hover)";
                    readonly active: "var(--green-archipel-975-75-active)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-975-75)";
                    readonly hover: "var(--blue-ecume-975-75-hover)";
                    readonly active: "var(--blue-ecume-975-75-active)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-975-75)";
                    readonly hover: "var(--blue-cumulus-975-75-hover)";
                    readonly active: "var(--blue-cumulus-975-75-active)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-975-75)";
                    readonly hover: "var(--purple-glycine-975-75-hover)";
                    readonly active: "var(--purple-glycine-975-75-active)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-975-75)";
                    readonly hover: "var(--pink-macaron-975-75-hover)";
                    readonly active: "var(--pink-macaron-975-75-active)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-975-75)";
                    readonly hover: "var(--pink-tuile-975-75-hover)";
                    readonly active: "var(--pink-tuile-975-75-active)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-975-75)";
                    readonly hover: "var(--yellow-tournesol-975-75-hover)";
                    readonly active: "var(--yellow-tournesol-975-75-active)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-975-75)";
                    readonly hover: "var(--yellow-moutarde-975-75-hover)";
                    readonly active: "var(--yellow-moutarde-975-75-active)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-975-75)";
                    readonly hover: "var(--orange-terre-battue-975-75-hover)";
                    readonly active: "var(--orange-terre-battue-975-75-active)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-975-75)";
                    readonly hover: "var(--brown-cafe-creme-975-75-hover)";
                    readonly active: "var(--brown-cafe-creme-975-75-active)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-975-75)";
                    readonly hover: "var(--brown-caramel-975-75-hover)";
                    readonly active: "var(--brown-caramel-975-75-active)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-975-75)";
                    readonly hover: "var(--brown-opera-975-75-hover)";
                    readonly active: "var(--brown-opera-975-75-active)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-975-75)";
                    readonly hover: "var(--beige-gris-galet-975-75-hover)";
                    readonly active: "var(--beige-gris-galet-975-75-active)";
                };
            };
            readonly contrast: {
                readonly grey: {
                    readonly default: "var(--grey-950-100)";
                    readonly hover: "var(--grey-950-100-hover)";
                    readonly active: "var(--grey-950-100-active)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-950-100)";
                    readonly hover: "var(--blue-france-950-100-hover)";
                    readonly active: "var(--blue-france-950-100-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-950-100)";
                    readonly hover: "var(--red-marianne-950-100-hover)";
                    readonly active: "var(--red-marianne-950-100-active)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-950-100)";
                    readonly hover: "var(--green-tilleul-verveine-950-100-hover)";
                    readonly active: "var(--green-tilleul-verveine-950-100-active)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-950-100)";
                    readonly hover: "var(--green-bourgeon-950-100-hover)";
                    readonly active: "var(--green-bourgeon-950-100-active)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-950-100)";
                    readonly hover: "var(--green-emeraude-950-100-hover)";
                    readonly active: "var(--green-emeraude-950-100-active)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-950-100)";
                    readonly hover: "var(--green-menthe-950-100-hover)";
                    readonly active: "var(--green-menthe-950-100-active)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-950-100)";
                    readonly hover: "var(--green-archipel-950-100-hover)";
                    readonly active: "var(--green-archipel-950-100-active)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-950-100)";
                    readonly hover: "var(--blue-ecume-950-100-hover)";
                    readonly active: "var(--blue-ecume-950-100-active)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-950-100)";
                    readonly hover: "var(--blue-cumulus-950-100-hover)";
                    readonly active: "var(--blue-cumulus-950-100-active)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-950-100)";
                    readonly hover: "var(--purple-glycine-950-100-hover)";
                    readonly active: "var(--purple-glycine-950-100-active)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-950-100)";
                    readonly hover: "var(--pink-macaron-950-100-hover)";
                    readonly active: "var(--pink-macaron-950-100-active)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-950-100)";
                    readonly hover: "var(--pink-tuile-950-100-hover)";
                    readonly active: "var(--pink-tuile-950-100-active)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-950-100)";
                    readonly hover: "var(--yellow-tournesol-950-100-hover)";
                    readonly active: "var(--yellow-tournesol-950-100-active)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-950-100)";
                    readonly hover: "var(--yellow-moutarde-950-100-hover)";
                    readonly active: "var(--yellow-moutarde-950-100-active)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-950-100)";
                    readonly hover: "var(--orange-terre-battue-950-100-hover)";
                    readonly active: "var(--orange-terre-battue-950-100-active)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-950-100)";
                    readonly hover: "var(--brown-cafe-creme-950-100-hover)";
                    readonly active: "var(--brown-cafe-creme-950-100-active)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-950-100)";
                    readonly hover: "var(--brown-caramel-950-100-hover)";
                    readonly active: "var(--brown-caramel-950-100-active)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-950-100)";
                    readonly hover: "var(--brown-opera-950-100-hover)";
                    readonly active: "var(--brown-opera-950-100-active)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-950-100)";
                    readonly hover: "var(--beige-gris-galet-950-100-hover)";
                    readonly active: "var(--beige-gris-galet-950-100-active)";
                };
                readonly info: {
                    readonly default: "var(--info-950-100)";
                    readonly hover: "var(--info-950-100-hover)";
                    readonly active: "var(--info-950-100-active)";
                };
                readonly success: {
                    readonly default: "var(--success-950-100)";
                    readonly hover: "var(--success-950-100-hover)";
                    readonly active: "var(--success-950-100-active)";
                };
                readonly warning: {
                    readonly default: "var(--warning-950-100)";
                    readonly hover: "var(--warning-950-100-hover)";
                    readonly active: "var(--warning-950-100-active)";
                };
                readonly error: {
                    readonly default: "var(--error-950-100)";
                    readonly hover: "var(--error-950-100-hover)";
                    readonly active: "var(--error-950-100-active)";
                };
            };
            readonly flat: {
                readonly grey: {
                    readonly default: "var(--grey-200-850)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-sun-425-moon-753)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-sun-373-moon-652)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-sun-391-moon-716)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-sun-247-moon-675)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-sun-319-moon-630)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-sun-406-moon-833)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-sun-425-moon-750)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-sun-425-moon-901)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-sun-395-moon-820)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                };
                readonly info: {
                    readonly default: "var(--info-425-625)";
                };
                readonly success: {
                    readonly default: "var(--success-425-625)";
                };
                readonly warning: {
                    readonly default: "var(--warning-425-625)";
                };
                readonly error: {
                    readonly default: "var(--error-425-625)";
                };
            };
            readonly actionHigh: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                    readonly hover: "var(--blue-france-sun-113-625-hover)";
                    readonly active: "var(--blue-france-sun-113-625-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                    readonly hover: "var(--red-marianne-425-625-hover)";
                    readonly active: "var(--red-marianne-425-625-active)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                    readonly hover: "var(--green-tilleul-verveine-sun-418-moon-817-hover)";
                    readonly active: "var(--green-tilleul-verveine-sun-418-moon-817-active)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                    readonly hover: "var(--green-bourgeon-sun-425-moon-759-hover)";
                    readonly active: "var(--green-bourgeon-sun-425-moon-759-active)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-sun-425-moon-753)";
                    readonly hover: "var(--green-emeraude-sun-425-moon-753-hover)";
                    readonly active: "var(--green-emeraude-sun-425-moon-753-active)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-sun-373-moon-652)";
                    readonly hover: "var(--green-menthe-sun-373-moon-652-hover)";
                    readonly active: "var(--green-menthe-sun-373-moon-652-active)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-sun-391-moon-716)";
                    readonly hover: "var(--green-archipel-sun-391-moon-716-hover)";
                    readonly active: "var(--green-archipel-sun-391-moon-716-active)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-sun-247-moon-675)";
                    readonly hover: "var(--blue-ecume-sun-247-moon-675-hover)";
                    readonly active: "var(--blue-ecume-sun-247-moon-675-active)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                    readonly hover: "var(--blue-cumulus-sun-368-moon-732-hover)";
                    readonly active: "var(--blue-cumulus-sun-368-moon-732-active)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-sun-319-moon-630)";
                    readonly hover: "var(--purple-glycine-sun-319-moon-630-hover)";
                    readonly active: "var(--purple-glycine-sun-319-moon-630-active)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-sun-406-moon-833)";
                    readonly hover: "var(--pink-macaron-sun-406-moon-833-hover)";
                    readonly active: "var(--pink-macaron-sun-406-moon-833-active)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-sun-425-moon-750)";
                    readonly hover: "var(--pink-tuile-sun-425-moon-750-hover)";
                    readonly active: "var(--pink-tuile-sun-425-moon-750-active)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                    readonly hover: "var(--yellow-tournesol-sun-407-moon-922-hover)";
                    readonly active: "var(--yellow-tournesol-sun-407-moon-922-active)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                    readonly hover: "var(--yellow-moutarde-sun-348-moon-860-hover)";
                    readonly active: "var(--yellow-moutarde-sun-348-moon-860-active)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                    readonly hover: "var(--orange-terre-battue-sun-370-moon-672-hover)";
                    readonly active: "var(--orange-terre-battue-sun-370-moon-672-active)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                    readonly hover: "var(--brown-cafe-creme-sun-383-moon-885-hover)";
                    readonly active: "var(--brown-cafe-creme-sun-383-moon-885-active)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-sun-425-moon-901)";
                    readonly hover: "var(--brown-caramel-sun-425-moon-901-hover)";
                    readonly active: "var(--brown-caramel-sun-425-moon-901-active)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-sun-395-moon-820)";
                    readonly hover: "var(--brown-opera-sun-395-moon-820-hover)";
                    readonly active: "var(--brown-opera-sun-395-moon-820-active)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                    readonly hover: "var(--beige-gris-galet-sun-407-moon-821-hover)";
                    readonly active: "var(--beige-gris-galet-sun-407-moon-821-active)";
                };
                readonly info: {
                    readonly default: "var(--info-425-625)";
                    readonly hover: "var(--info-425-625-hover)";
                    readonly active: "var(--info-425-625-active)";
                };
                readonly success: {
                    readonly default: "var(--success-425-625)";
                    readonly hover: "var(--success-425-625-hover)";
                    readonly active: "var(--success-425-625-active)";
                };
                readonly warning: {
                    readonly default: "var(--warning-425-625)";
                    readonly hover: "var(--warning-425-625-hover)";
                    readonly active: "var(--warning-425-625-active)";
                };
                readonly error: {
                    readonly default: "var(--error-425-625)";
                    readonly hover: "var(--error-425-625-hover)";
                    readonly active: "var(--error-425-625-active)";
                };
            };
            readonly actionLow: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-925-125)";
                    readonly hover: "var(--blue-france-925-125-hover)";
                    readonly active: "var(--blue-france-925-125-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-925-125)";
                    readonly hover: "var(--red-marianne-925-125-hover)";
                    readonly active: "var(--red-marianne-925-125-active)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-925-125)";
                    readonly hover: "var(--green-tilleul-verveine-925-125-hover)";
                    readonly active: "var(--green-tilleul-verveine-925-125-active)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-925-125)";
                    readonly hover: "var(--green-bourgeon-925-125-hover)";
                    readonly active: "var(--green-bourgeon-925-125-active)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-925-125)";
                    readonly hover: "var(--green-emeraude-925-125-hover)";
                    readonly active: "var(--green-emeraude-925-125-active)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-925-125)";
                    readonly hover: "var(--green-menthe-925-125-hover)";
                    readonly active: "var(--green-menthe-925-125-active)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-925-125)";
                    readonly hover: "var(--green-archipel-925-125-hover)";
                    readonly active: "var(--green-archipel-925-125-active)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-925-125)";
                    readonly hover: "var(--blue-ecume-925-125-hover)";
                    readonly active: "var(--blue-ecume-925-125-active)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-925-125)";
                    readonly hover: "var(--blue-cumulus-925-125-hover)";
                    readonly active: "var(--blue-cumulus-925-125-active)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-925-125)";
                    readonly hover: "var(--purple-glycine-925-125-hover)";
                    readonly active: "var(--purple-glycine-925-125-active)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-925-125)";
                    readonly hover: "var(--pink-macaron-925-125-hover)";
                    readonly active: "var(--pink-macaron-925-125-active)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-925-125)";
                    readonly hover: "var(--pink-tuile-925-125-hover)";
                    readonly active: "var(--pink-tuile-925-125-active)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-925-125)";
                    readonly hover: "var(--yellow-tournesol-925-125-hover)";
                    readonly active: "var(--yellow-tournesol-925-125-active)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-925-125)";
                    readonly hover: "var(--yellow-moutarde-925-125-hover)";
                    readonly active: "var(--yellow-moutarde-925-125-active)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-925-125)";
                    readonly hover: "var(--orange-terre-battue-925-125-hover)";
                    readonly active: "var(--orange-terre-battue-925-125-active)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-925-125)";
                    readonly hover: "var(--brown-cafe-creme-925-125-hover)";
                    readonly active: "var(--brown-cafe-creme-925-125-active)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-925-125)";
                    readonly hover: "var(--brown-caramel-925-125-hover)";
                    readonly active: "var(--brown-caramel-925-125-active)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-925-125)";
                    readonly hover: "var(--brown-opera-925-125-hover)";
                    readonly active: "var(--brown-opera-925-125-active)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-925-125)";
                    readonly hover: "var(--beige-gris-galet-925-125-hover)";
                    readonly active: "var(--beige-gris-galet-925-125-active)";
                };
            };
            readonly active: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                    readonly hover: "var(--blue-france-sun-113-625-hover)";
                    readonly active: "var(--blue-france-sun-113-625-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                    readonly hover: "var(--red-marianne-425-625-hover)";
                    readonly active: "var(--red-marianne-425-625-active)";
                };
            };
            readonly open: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-925-125)";
                    readonly hover: "var(--blue-france-925-125-hover)";
                    readonly active: "var(--blue-france-925-125-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-925-125)";
                    readonly hover: "var(--red-marianne-925-125-hover)";
                    readonly active: "var(--red-marianne-925-125-active)";
                };
            };
            readonly disabled: {
                readonly grey: {
                    readonly default: "var(--grey-925-125)";
                };
            };
            readonly raised: {
                readonly grey: {
                    readonly default: "var(--grey-1000-75)";
                    readonly hover: "var(--grey-1000-75-hover)";
                    readonly active: "var(--grey-1000-75-active)";
                };
            };
            readonly overlap: {
                readonly grey: {
                    readonly default: "var(--grey-1000-100)";
                    readonly hover: "var(--grey-1000-100-hover)";
                    readonly active: "var(--grey-1000-100-active)";
                };
            };
            readonly lifted: {
                readonly grey: {
                    readonly default: "var(--grey-1000-75)";
                    readonly hover: "var(--grey-1000-75-hover)";
                    readonly active: "var(--grey-1000-75-active)";
                };
            };
            readonly altRaised: {
                readonly grey: {
                    readonly default: "var(--grey-975-100)";
                    readonly hover: "var(--grey-975-100-hover)";
                    readonly active: "var(--grey-975-100-active)";
                };
            };
            readonly altOverlap: {
                readonly grey: {
                    readonly default: "var(--grey-975-125)";
                    readonly hover: "var(--grey-975-125-hover)";
                    readonly active: "var(--grey-975-125-active)";
                };
            };
            readonly contrastRaised: {
                readonly grey: {
                    readonly default: "var(--grey-950-125)";
                    readonly hover: "var(--grey-950-125-hover)";
                    readonly active: "var(--grey-950-125-active)";
                };
            };
            readonly contrastOverlap: {
                readonly grey: {
                    readonly default: "var(--grey-950-150)";
                    readonly hover: "var(--grey-950-150-hover)";
                    readonly active: "var(--grey-950-150-active)";
                };
            };
        };
        readonly text: {
            readonly default: {
                readonly grey: {
                    readonly default: "var(--grey-200-850)";
                };
                readonly info: {
                    readonly default: "var(--info-425-625)";
                };
                readonly success: {
                    readonly default: "var(--success-425-625)";
                };
                readonly warning: {
                    readonly default: "var(--warning-425-625)";
                };
                readonly error: {
                    readonly default: "var(--error-425-625)";
                };
            };
            readonly actionHigh: {
                readonly grey: {
                    readonly default: "var(--grey-50-1000)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-sun-425-moon-753)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-sun-373-moon-652)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-sun-391-moon-716)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-sun-247-moon-675)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-sun-319-moon-630)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-sun-406-moon-833)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-sun-425-moon-750)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-sun-425-moon-901)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-sun-395-moon-820)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                };
            };
            readonly title: {
                readonly grey: {
                    readonly default: "var(--grey-50-1000)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
            };
            readonly label: {
                readonly grey: {
                    readonly default: "var(--grey-50-1000)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-sun-425-moon-753)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-sun-373-moon-652)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-sun-391-moon-716)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-sun-247-moon-675)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-sun-319-moon-630)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-sun-406-moon-833)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-sun-425-moon-750)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-sun-425-moon-901)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-sun-395-moon-820)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                };
            };
            readonly active: {
                readonly grey: {
                    readonly default: "var(--grey-50-1000)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
            };
            readonly mention: {
                readonly grey: {
                    readonly default: "var(--grey-425-625)";
                };
            };
            readonly inverted: {
                readonly grey: {
                    readonly default: "var(--grey-1000-50)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-975-sun-113)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-975-75)";
                };
                readonly info: {
                    readonly default: "var(--info-975-75)";
                };
                readonly success: {
                    readonly default: "var(--success-975-75)";
                };
                readonly warning: {
                    readonly default: "var(--warning-975-75)";
                };
                readonly error: {
                    readonly default: "var(--error-975-75)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-975-75)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-975-75)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-975-75)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-975-75)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-975-75)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-975-75)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-975-75)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-975-75)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-975-75)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-975-75)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-975-75)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-975-75)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-975-75)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-975-75)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-975-75)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-975-75)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-975-75)";
                };
            };
            readonly disabled: {
                readonly grey: {
                    readonly default: "var(--grey-625-425)";
                };
            };
        };
        readonly border: {
            readonly default: {
                readonly grey: {
                    readonly default: "var(--grey-900-175)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-main-525)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-main-472)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-main-707)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-main-640)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-main-632)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-main-548)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-main-557)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-main-400)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-main-526)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-main-494)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-main-689)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-main-556)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-main-731)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-main-679)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-main-645)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-main-782)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-main-648)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-main-680)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-main-702)";
                };
            };
            readonly active: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
            };
            readonly actionHigh: {
                readonly grey: {
                    readonly default: "var(--grey-50-1000)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
                readonly info: {
                    readonly default: "var(--info-425-625)";
                };
                readonly success: {
                    readonly default: "var(--success-425-625)";
                };
                readonly warning: {
                    readonly default: "var(--warning-425-625)";
                };
                readonly error: {
                    readonly default: "var(--error-425-625)";
                };
            };
            readonly actionLow: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-850-200)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-850-200)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-850-200)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-850-200)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-850-200)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-850-200)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-850-200)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-850-200)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-850-200)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-850-200)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-850-200)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-850-200)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-850-200)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-850-200)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-850-200)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-850-200)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-850-200)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-850-200)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-850-200)";
                };
            };
            readonly open: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-925-125)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-925-125)";
                };
            };
            readonly plain: {
                readonly grey: {
                    readonly default: "var(--grey-200-850)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                };
                readonly info: {
                    readonly default: "var(--info-425-625)";
                };
                readonly success: {
                    readonly default: "var(--success-425-625)";
                };
                readonly warning: {
                    readonly default: "var(--warning-425-625)";
                };
                readonly error: {
                    readonly default: "var(--error-425-625)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-sun-425-moon-753)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-sun-373-moon-652)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-sun-391-moon-716)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-sun-247-moon-675)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-sun-319-moon-630)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-sun-406-moon-833)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-sun-425-moon-750)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-sun-425-moon-901)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-sun-395-moon-820)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                };
            };
            readonly disabled: {
                readonly grey: {
                    readonly default: "var(--grey-925-125)";
                };
            };
        };
        readonly artwork: {
            readonly major: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-sun-113-625)";
                    readonly hover: "var(--blue-france-sun-113-625-hover)";
                    readonly active: "var(--blue-france-sun-113-625-active)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-425-625)";
                    readonly hover: "var(--red-marianne-425-625-hover)";
                    readonly active: "var(--red-marianne-425-625-active)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-sun-418-moon-817)";
                    readonly hover: "var(--green-tilleul-verveine-sun-418-moon-817-hover)";
                    readonly active: "var(--green-tilleul-verveine-sun-418-moon-817-active)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-sun-425-moon-759)";
                    readonly hover: "var(--green-bourgeon-sun-425-moon-759-hover)";
                    readonly active: "var(--green-bourgeon-sun-425-moon-759-active)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-sun-425-moon-753)";
                    readonly hover: "var(--green-emeraude-sun-425-moon-753-hover)";
                    readonly active: "var(--green-emeraude-sun-425-moon-753-active)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-sun-373-moon-652)";
                    readonly hover: "var(--green-menthe-sun-373-moon-652-hover)";
                    readonly active: "var(--green-menthe-sun-373-moon-652-active)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-sun-391-moon-716)";
                    readonly hover: "var(--green-archipel-sun-391-moon-716-hover)";
                    readonly active: "var(--green-archipel-sun-391-moon-716-active)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-sun-247-moon-675)";
                    readonly hover: "var(--blue-ecume-sun-247-moon-675-hover)";
                    readonly active: "var(--blue-ecume-sun-247-moon-675-active)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-sun-368-moon-732)";
                    readonly hover: "var(--blue-cumulus-sun-368-moon-732-hover)";
                    readonly active: "var(--blue-cumulus-sun-368-moon-732-active)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-sun-319-moon-630)";
                    readonly hover: "var(--purple-glycine-sun-319-moon-630-hover)";
                    readonly active: "var(--purple-glycine-sun-319-moon-630-active)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-sun-406-moon-833)";
                    readonly hover: "var(--pink-macaron-sun-406-moon-833-hover)";
                    readonly active: "var(--pink-macaron-sun-406-moon-833-active)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-sun-425-moon-750)";
                    readonly hover: "var(--pink-tuile-sun-425-moon-750-hover)";
                    readonly active: "var(--pink-tuile-sun-425-moon-750-active)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-sun-407-moon-922)";
                    readonly hover: "var(--yellow-tournesol-sun-407-moon-922-hover)";
                    readonly active: "var(--yellow-tournesol-sun-407-moon-922-active)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-sun-348-moon-860)";
                    readonly hover: "var(--yellow-moutarde-sun-348-moon-860-hover)";
                    readonly active: "var(--yellow-moutarde-sun-348-moon-860-active)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-sun-370-moon-672)";
                    readonly hover: "var(--orange-terre-battue-sun-370-moon-672-hover)";
                    readonly active: "var(--orange-terre-battue-sun-370-moon-672-active)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-sun-383-moon-885)";
                    readonly hover: "var(--brown-cafe-creme-sun-383-moon-885-hover)";
                    readonly active: "var(--brown-cafe-creme-sun-383-moon-885-active)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-sun-425-moon-901)";
                    readonly hover: "var(--brown-caramel-sun-425-moon-901-hover)";
                    readonly active: "var(--brown-caramel-sun-425-moon-901-active)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-sun-395-moon-820)";
                    readonly hover: "var(--brown-opera-sun-395-moon-820-hover)";
                    readonly active: "var(--brown-opera-sun-395-moon-820-active)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-sun-407-moon-821)";
                    readonly hover: "var(--beige-gris-galet-sun-407-moon-821-hover)";
                    readonly active: "var(--beige-gris-galet-sun-407-moon-821-active)";
                };
            };
            readonly minor: {
                readonly blueFrance: {
                    readonly default: "var(--blue-france-main-525)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-main-472)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-main-707)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-main-640)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-main-632)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-main-548)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-main-557)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-main-400)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-main-526)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-main-494)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-main-689)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-main-556)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-main-731)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-main-679)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-main-645)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-main-782)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-main-648)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-main-680)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-main-702)";
                };
            };
            readonly decorative: {
                readonly grey: {
                    readonly default: "var(--grey-950-100)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-950-100)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-950-100)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-950-100)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-950-100)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-950-100)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-950-100)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-950-100)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-950-100)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-950-100)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-950-100)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-950-100)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-950-100)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-950-100)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-950-100)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-950-100)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-950-100)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-950-100)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-950-100)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-950-100)";
                };
            };
            readonly background: {
                readonly grey: {
                    readonly default: "var(--grey-975-75)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-975-75)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-975-75)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-975-75)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-975-75)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-975-75)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-975-75)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-975-75)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-975-75)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-975-75)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-975-75)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-975-75)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-975-75)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-975-75)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-975-75)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-975-75)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-975-75)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-975-75)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-975-75)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-975-75)";
                };
            };
            readonly motif: {
                readonly grey: {
                    readonly default: "var(--grey-925-125)";
                };
                readonly blueFrance: {
                    readonly default: "var(--blue-france-925-125)";
                };
                readonly redMarianne: {
                    readonly default: "var(--red-marianne-925-125)";
                };
                readonly greenTilleulVerveine: {
                    readonly default: "var(--green-tilleul-verveine-925-125)";
                };
                readonly greenBourgeon: {
                    readonly default: "var(--green-bourgeon-925-125)";
                };
                readonly greenEmeraude: {
                    readonly default: "var(--green-emeraude-925-125)";
                };
                readonly greenMenthe: {
                    readonly default: "var(--green-menthe-925-125)";
                };
                readonly greenArchipel: {
                    readonly default: "var(--green-archipel-925-125)";
                };
                readonly blueEcume: {
                    readonly default: "var(--blue-ecume-925-125)";
                };
                readonly blueCumulus: {
                    readonly default: "var(--blue-cumulus-925-125)";
                };
                readonly purpleGlycine: {
                    readonly default: "var(--purple-glycine-925-125)";
                };
                readonly pinkMacaron: {
                    readonly default: "var(--pink-macaron-925-125)";
                };
                readonly pinkTuile: {
                    readonly default: "var(--pink-tuile-925-125)";
                };
                readonly yellowTournesol: {
                    readonly default: "var(--yellow-tournesol-925-125)";
                };
                readonly yellowMoutarde: {
                    readonly default: "var(--yellow-moutarde-925-125)";
                };
                readonly orangeTerreBattue: {
                    readonly default: "var(--orange-terre-battue-925-125)";
                };
                readonly brownCafeCreme: {
                    readonly default: "var(--brown-cafe-creme-925-125)";
                };
                readonly brownCaramel: {
                    readonly default: "var(--brown-caramel-925-125)";
                };
                readonly brownOpera: {
                    readonly default: "var(--brown-opera-925-125)";
                };
                readonly beigeGrisGalet: {
                    readonly default: "var(--beige-gris-galet-925-125)";
                };
            };
        };
    };
};
