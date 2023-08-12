import type { ColorOptions } from "./colorOptions";
declare function getColorDecisions_noReturnType<Format extends "css var" | "hex">(params: {
    colorOptions: ColorOptions<Format>;
}): {
    readonly background: {
        readonly default: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-1000-50)";
                readonly hover: "#343434" | "#f6f6f6" | "var(--grey-1000-50-hover)";
                readonly active: "#474747" | "#ededed" | "var(--grey-1000-50-active)";
            };
        };
        readonly alt: {
            readonly grey: {
                readonly default: "#f6f6f6" | "#1e1e1e" | "var(--grey-975-75)";
                readonly hover: "#3f3f3f" | "#dfdfdf" | "var(--grey-975-75-hover)";
                readonly active: "#525252" | "#cfcfcf" | "var(--grey-975-75-active)";
            };
            readonly blueFrance: {
                readonly default: "#1b1b35" | "#f5f5fe" | "var(--blue-france-975-75)";
                readonly hover: "#3a3a68" | "#dcdcfc" | "var(--blue-france-975-75-hover)";
                readonly active: "#4d4d83" | "#cbcbfa" | "var(--blue-france-975-75-active)";
            };
            readonly redMarianne: {
                readonly default: "#2b1919" | "#fef4f4" | "var(--red-marianne-975-75)";
                readonly hover: "#573737" | "#fcd7d7" | "var(--red-marianne-975-75-hover)";
                readonly active: "#704848" | "#fac4c4" | "var(--red-marianne-975-75-active)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#201e14" | "#fef7da" | "var(--green-tilleul-verveine-975-75)";
                readonly hover: "#433f2e" | "#fce552" | "var(--green-tilleul-verveine-975-75-hover)";
                readonly active: "#57533d" | "#ebd54c" | "var(--green-tilleul-verveine-975-75-active)";
            };
            readonly greenBourgeon: {
                readonly default: "#182014" | "#e6feda" | "var(--green-bourgeon-975-75)";
                readonly hover: "#35432e" | "#a7fc62" | "var(--green-bourgeon-975-75-hover)";
                readonly active: "#46573d" | "#98ed4d" | "var(--green-bourgeon-975-75-active)";
            };
            readonly greenEmeraude: {
                readonly default: "#142018" | "#e3fdeb" | "var(--green-emeraude-975-75)";
                readonly hover: "#2e4335" | "#94f9b9" | "var(--green-emeraude-975-75-hover)";
                readonly active: "#3d5846" | "#6df1a3" | "var(--green-emeraude-975-75-active)";
            };
            readonly greenMenthe: {
                readonly default: "#15201e" | "#dffdf7" | "var(--green-menthe-975-75)";
                readonly hover: "#30433f" | "#84f9e7" | "var(--green-menthe-975-75-hover)";
                readonly active: "#3f5753" | "#70ebd8" | "var(--green-menthe-975-75-active)";
            };
            readonly greenArchipel: {
                readonly default: "#152021" | "#e5fbfd" | "var(--green-archipel-975-75)";
                readonly hover: "#2f4345" | "#99f2f8" | "var(--green-archipel-975-75-hover)";
                readonly active: "#3f5759" | "#73e9f0" | "var(--green-archipel-975-75-active)";
            };
            readonly blueEcume: {
                readonly default: "#171d2f" | "#f4f6fe" | "var(--blue-ecume-975-75)";
                readonly hover: "#333e5e" | "#d7dffb" | "var(--blue-ecume-975-75-hover)";
                readonly active: "#445179" | "#c3cffa" | "var(--blue-ecume-975-75-active)";
            };
            readonly blueCumulus: {
                readonly default: "#171e2b" | "#f3f6fe" | "var(--blue-cumulus-975-75)";
                readonly hover: "#333f56" | "#d3dffc" | "var(--blue-cumulus-975-75-hover)";
                readonly active: "#43536f" | "#bed0fa" | "var(--blue-cumulus-975-75-active)";
            };
            readonly purpleGlycine: {
                readonly default: "#251a24" | "#fef3fd" | "var(--purple-glycine-975-75)";
                readonly hover: "#4c394a" | "#fcd4f8" | "var(--purple-glycine-975-75-hover)";
                readonly active: "#634a60" | "#fabff5" | "var(--purple-glycine-975-75-active)";
            };
            readonly pinkMacaron: {
                readonly default: "#261b19" | "#fef4f2" | "var(--pink-macaron-975-75)";
                readonly hover: "#4e3a37" | "#fcd8d0" | "var(--pink-macaron-975-75-hover)";
                readonly active: "#654c48" | "#fac5b8" | "var(--pink-macaron-975-75-active)";
            };
            readonly pinkTuile: {
                readonly default: "#281b19" | "#fef4f3" | "var(--pink-tuile-975-75)";
                readonly hover: "#513a37" | "#fcd7d3" | "var(--pink-tuile-975-75-hover)";
                readonly active: "#694c48" | "#fac4be" | "var(--pink-tuile-975-75-active)";
            };
            readonly yellowTournesol: {
                readonly default: "#221d11" | "#fef6e3" | "var(--yellow-tournesol-975-75)";
                readonly hover: "#473e29" | "#fce086" | "var(--yellow-tournesol-975-75-hover)";
                readonly active: "#5c5136" | "#f5d24b" | "var(--yellow-tournesol-975-75-active)";
            };
            readonly yellowMoutarde: {
                readonly default: "#231d14" | "#fef5e8" | "var(--yellow-moutarde-975-75)";
                readonly hover: "#483e2e" | "#fcdca3" | "var(--yellow-moutarde-975-75-hover)";
                readonly active: "#5e513d" | "#fbcd64" | "var(--yellow-moutarde-975-75-active)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fef4f2" | "#281a16" | "var(--orange-terre-battue-975-75)";
                readonly hover: "#fcd8d0" | "#513932" | "var(--orange-terre-battue-975-75-hover)";
                readonly active: "#fac5b8" | "#6a4b42" | "var(--orange-terre-battue-975-75-active)";
            };
            readonly brownCafeCreme: {
                readonly default: "#211d16" | "#fbf6ed" | "var(--brown-cafe-creme-975-75)";
                readonly hover: "#453e31" | "#f2deb6" | "var(--brown-cafe-creme-975-75-hover)";
                readonly active: "#5a5141" | "#eacf91" | "var(--brown-cafe-creme-975-75-active)";
            };
            readonly brownCaramel: {
                readonly default: "#251c16" | "#fbf5f2" | "var(--brown-caramel-975-75)";
                readonly hover: "#4c3c31" | "#f1dbcf" | "var(--brown-caramel-975-75-hover)";
                readonly active: "#624e41" | "#ecc9b5" | "var(--brown-caramel-975-75-active)";
            };
            readonly brownOpera: {
                readonly default: "#fbf5f2" | "#241c17" | "var(--brown-opera-975-75)";
                readonly hover: "#f1dbcf" | "#4a3c33" | "var(--brown-opera-975-75-hover)";
                readonly active: "#ecc9b5" | "#604f44" | "var(--brown-opera-975-75-active)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#211d19" | "#f9f6f2" | "var(--beige-gris-galet-975-75)";
                readonly hover: "#453e37" | "#eadecd" | "var(--beige-gris-galet-975-75-hover)";
                readonly active: "#595148" | "#e1ceb1" | "var(--beige-gris-galet-975-75-active)";
            };
        };
        readonly contrast: {
            readonly grey: {
                readonly default: "#242424" | "#eeeeee" | "var(--grey-950-100)";
                readonly hover: "#474747" | "#d2d2d2" | "var(--grey-950-100-hover)";
                readonly active: "#5b5b5b" | "#c1c1c1" | "var(--grey-950-100-active)";
            };
            readonly blueFrance: {
                readonly default: "#21213f" | "#ececfe" | "var(--blue-france-950-100)";
                readonly hover: "#424275" | "#cecefc" | "var(--blue-france-950-100-hover)";
                readonly active: "#56568c" | "#bbbbfc" | "var(--blue-france-950-100-active)";
            };
            readonly redMarianne: {
                readonly default: "#331f1f" | "#fee9e9" | "var(--red-marianne-950-100)";
                readonly hover: "#613f3f" | "#fdc5c5" | "var(--red-marianne-950-100-hover)";
                readonly active: "#7b5151" | "#fcafaf" | "var(--red-marianne-950-100-active)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#272419" | "#fceeac" | "var(--green-tilleul-verveine-950-100)";
                readonly hover: "#4c4734" | "#e8d45c" | "var(--green-tilleul-verveine-950-100-hover)";
                readonly active: "#615b44" | "#d4c254" | "var(--green-tilleul-verveine-950-100-active)";
            };
            readonly greenBourgeon: {
                readonly default: "#1e2719" | "#c9fcac" | "var(--green-bourgeon-950-100)";
                readonly hover: "#3d4c34" | "#9ae95d" | "var(--green-bourgeon-950-100-hover)";
                readonly active: "#4e6144" | "#8dd555" | "var(--green-bourgeon-950-100-active)";
            };
            readonly greenEmeraude: {
                readonly default: "#19271e" | "#c3fad5" | "var(--green-emeraude-950-100)";
                readonly hover: "#344c3d" | "#77eda5" | "var(--green-emeraude-950-100-hover)";
                readonly active: "#44624f" | "#6dd897" | "var(--green-emeraude-950-100-active)";
            };
            readonly greenMenthe: {
                readonly default: "#1a2624" | "#bafaee" | "var(--green-menthe-950-100)";
                readonly hover: "#364b47" | "#79e7d5" | "var(--green-menthe-950-100-hover)";
                readonly active: "#46605b" | "#6fd3c3" | "var(--green-menthe-950-100-active)";
            };
            readonly greenArchipel: {
                readonly default: "#1a2628" | "#c7f6fc" | "var(--green-archipel-950-100)";
                readonly hover: "#364a4e" | "#64ecf8" | "var(--green-archipel-950-100-hover)";
                readonly active: "#465f63" | "#5bd8e3" | "var(--green-archipel-950-100-active)";
            };
            readonly blueEcume: {
                readonly default: "#1d2437" | "#e9edfe" | "var(--blue-ecume-950-100)";
                readonly hover: "#3b4767" | "#c5d0fc" | "var(--blue-ecume-950-100-hover)";
                readonly active: "#4c5b83" | "#adbffc" | "var(--blue-ecume-950-100-active)";
            };
            readonly blueCumulus: {
                readonly default: "#1c2433" | "#e6eefe" | "var(--blue-cumulus-950-100)";
                readonly hover: "#3a4761" | "#bcd3fc" | "var(--blue-cumulus-950-100-hover)";
                readonly active: "#4a5b7b" | "#9fc3fc" | "var(--blue-cumulus-950-100-active)";
            };
            readonly purpleGlycine: {
                readonly default: "#2c202b" | "#fee7fc" | "var(--purple-glycine-950-100)";
                readonly hover: "#554053" | "#fdc0f8" | "var(--purple-glycine-950-100-hover)";
                readonly active: "#6c536a" | "#fca8f6" | "var(--purple-glycine-950-100-active)";
            };
            readonly pinkMacaron: {
                readonly default: "#2e211f" | "#fee9e6" | "var(--pink-macaron-950-100)";
                readonly hover: "#58423f" | "#fdc6bd" | "var(--pink-macaron-950-100-hover)";
                readonly active: "#705551" | "#fcb0a2" | "var(--pink-macaron-950-100-active)";
            };
            readonly pinkTuile: {
                readonly default: "#2f211f" | "#fee9e7" | "var(--pink-tuile-950-100)";
                readonly hover: "#5a423e" | "#fdc6c0" | "var(--pink-tuile-950-100-hover)";
                readonly active: "#725550" | "#fcb0a7" | "var(--pink-tuile-950-100-active)";
            };
            readonly yellowTournesol: {
                readonly default: "#292416" | "#feecc2" | "var(--yellow-tournesol-950-100)";
                readonly hover: "#4f472f" | "#fbd335" | "var(--yellow-tournesol-950-100-hover)";
                readonly active: "#655b3d" | "#e6c130" | "var(--yellow-tournesol-950-100-active)";
            };
            readonly yellowMoutarde: {
                readonly default: "#2a2319" | "#feebd0" | "var(--yellow-moutarde-950-100)";
                readonly hover: "#514534" | "#fdcd6d" | "var(--yellow-moutarde-950-100-hover)";
                readonly active: "#685944" | "#f4be30" | "var(--yellow-moutarde-950-100-active)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#31201c" | "#fee9e5" | "var(--orange-terre-battue-950-100)";
                readonly hover: "#5d403a" | "#fdc6ba" | "var(--orange-terre-battue-950-100-hover)";
                readonly active: "#77534a" | "#fcb09e" | "var(--orange-terre-battue-950-100-active)";
            };
            readonly brownCafeCreme: {
                readonly default: "#28241c" | "#f7ecdb" | "var(--brown-cafe-creme-950-100)";
                readonly hover: "#4e4739" | "#edce94" | "var(--brown-cafe-creme-950-100-hover)";
                readonly active: "#635b4a" | "#dabd84" | "var(--brown-cafe-creme-950-100-active)";
            };
            readonly brownCaramel: {
                readonly default: "#2c221c" | "#f7ebe5" | "var(--brown-caramel-950-100)";
                readonly hover: "#554439" | "#eccbb9" | "var(--brown-caramel-950-100-hover)";
                readonly active: "#6c574a" | "#e6b79a" | "var(--brown-caramel-950-100-active)";
            };
            readonly brownOpera: {
                readonly default: "#2b221c" | "#f7ece4" | "var(--brown-opera-950-100)";
                readonly hover: "#53443a" | "#eccdb3" | "var(--brown-opera-950-100-hover)";
                readonly active: "#6a574a" | "#e6ba90" | "var(--brown-opera-950-100-active)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#28231f" | "#f3ede5" | "var(--beige-gris-galet-950-100)";
                readonly hover: "#4e453f" | "#e1d0b5" | "var(--beige-gris-galet-950-100-hover)";
                readonly active: "#635950" | "#d1bea2" | "var(--beige-gris-galet-950-100-active)";
            };
            readonly info: {
                readonly default: "#1d2437" | "#e8edff" | "var(--info-950-100)";
                readonly hover: "#3b4767" | "#c2d1ff" | "var(--info-950-100-hover)";
                readonly active: "#4c5b83" | "#a9bfff" | "var(--info-950-100-active)";
            };
            readonly success: {
                readonly default: "#19271d" | "#b8fec9" | "var(--success-950-100)";
                readonly hover: "#344c3b" | "#46fd89" | "var(--success-950-100-hover)";
                readonly active: "#44624d" | "#34eb7b" | "var(--success-950-100-active)";
            };
            readonly warning: {
                readonly default: "#361e19" | "#ffe9e6" | "var(--warning-950-100)";
                readonly hover: "#663d35" | "#ffc6bd" | "var(--warning-950-100-hover)";
                readonly active: "#824f44" | "#ffb0a2" | "var(--warning-950-100-active)";
            };
            readonly error: {
                readonly default: "#391c1c" | "#ffe9e9" | "var(--error-950-100)";
                readonly hover: "#6c3a3a" | "#ffc5c5" | "var(--error-950-100-hover)";
                readonly active: "#894b4b" | "#ffafaf" | "var(--error-950-100-active)";
            };
        };
        readonly flat: {
            readonly grey: {
                readonly default: "#cecece" | "#3a3a3a" | "var(--grey-200-850)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#d8c634" | "#66673d" | "var(--green-tilleul-verveine-sun-418-moon-817)";
            };
            readonly greenBourgeon: {
                readonly default: "#99c221" | "#447049" | "var(--green-bourgeon-sun-425-moon-759)";
            };
            readonly greenEmeraude: {
                readonly default: "#34cb6a" | "#297254" | "var(--green-emeraude-sun-425-moon-753)";
            };
            readonly greenMenthe: {
                readonly default: "#21ab8e" | "#37635f" | "var(--green-menthe-sun-373-moon-652)";
            };
            readonly greenArchipel: {
                readonly default: "#34bab5" | "#006a6f" | "var(--green-archipel-sun-391-moon-716)";
            };
            readonly blueEcume: {
                readonly default: "#869ece" | "#2f4077" | "var(--blue-ecume-sun-247-moon-675)";
            };
            readonly blueCumulus: {
                readonly default: "#7ab1e8" | "#3558a2" | "var(--blue-cumulus-sun-368-moon-732)";
            };
            readonly purpleGlycine: {
                readonly default: "#ce70cc" | "#6e445a" | "var(--purple-glycine-sun-319-moon-630)";
            };
            readonly pinkMacaron: {
                readonly default: "#ffb7ae" | "#8d533e" | "var(--pink-macaron-sun-406-moon-833)";
            };
            readonly pinkTuile: {
                readonly default: "#ff9575" | "#a94645" | "var(--pink-tuile-sun-425-moon-750)";
            };
            readonly yellowTournesol: {
                readonly default: "#ffe552" | "#716043" | "var(--yellow-tournesol-sun-407-moon-922)";
            };
            readonly yellowMoutarde: {
                readonly default: "#ffca00" | "#695240" | "var(--yellow-moutarde-sun-348-moon-860)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#ff732c" | "#755348" | "var(--orange-terre-battue-sun-370-moon-672)";
            };
            readonly brownCafeCreme: {
                readonly default: "#ecd7a2" | "#685c48" | "var(--brown-cafe-creme-sun-383-moon-885)";
            };
            readonly brownCaramel: {
                readonly default: "#fbd8ab" | "#845d48" | "var(--brown-caramel-sun-425-moon-901)";
            };
            readonly brownOpera: {
                readonly default: "#e6be92" | "#745b47" | "var(--brown-opera-sun-395-moon-820)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#d0c3b7" | "#6a6156" | "var(--beige-gris-galet-sun-407-moon-821)";
            };
            readonly info: {
                readonly default: "#518fff" | "#0063cb" | "var(--info-425-625)";
            };
            readonly success: {
                readonly default: "#27a658" | "#18753c" | "var(--success-425-625)";
            };
            readonly warning: {
                readonly default: "#fc5d00" | "#b34000" | "var(--warning-425-625)";
            };
            readonly error: {
                readonly default: "#ff5655" | "#ce0500" | "var(--error-425-625)";
            };
        };
        readonly actionHigh: {
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
                readonly hover: "#b1b1f9" | "#1212ff" | "var(--blue-france-sun-113-625-hover)";
                readonly active: "#c6c6fb" | "#2323ff" | "var(--blue-france-sun-113-625-active)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
                readonly hover: "#fa9293" | "#f93f42" | "var(--red-marianne-425-625-hover)";
                readonly active: "#fbabac" | "#f95a5c" | "var(--red-marianne-425-625-active)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#d8c634" | "#66673d" | "var(--green-tilleul-verveine-sun-418-moon-817)";
                readonly hover: "#fee943" | "#929359" | "var(--green-tilleul-verveine-sun-418-moon-817-hover)";
                readonly active: "#fef1ab" | "#a7a967" | "var(--green-tilleul-verveine-sun-418-moon-817-active)";
            };
            readonly greenBourgeon: {
                readonly default: "#99c221" | "#447049" | "var(--green-bourgeon-sun-425-moon-759)";
                readonly hover: "#baec2a" | "#639f6a" | "var(--green-bourgeon-sun-425-moon-759-hover)";
                readonly active: "#c9fd2e" | "#72b77a" | "var(--green-bourgeon-sun-425-moon-759-active)";
            };
            readonly greenEmeraude: {
                readonly default: "#34cb6a" | "#297254" | "var(--green-emeraude-sun-425-moon-753)";
                readonly hover: "#42fb84" | "#3ea47a" | "var(--green-emeraude-sun-425-moon-753-hover)";
                readonly active: "#80fda3" | "#49bc8d" | "var(--green-emeraude-sun-425-moon-753-active)";
            };
            readonly greenMenthe: {
                readonly default: "#21ab8e" | "#37635f" | "var(--green-menthe-sun-373-moon-652)";
                readonly hover: "#2eddb8" | "#53918c" | "var(--green-menthe-sun-373-moon-652-hover)";
                readonly active: "#34f4cc" | "#62a9a2" | "var(--green-menthe-sun-373-moon-652-active)";
            };
            readonly greenArchipel: {
                readonly default: "#34bab5" | "#006a6f" | "var(--green-archipel-sun-391-moon-716)";
                readonly hover: "#43e9e2" | "#009fa7" | "var(--green-archipel-sun-391-moon-716-hover)";
                readonly active: "#4cfdf6" | "#00bbc3" | "var(--green-archipel-sun-391-moon-716-active)";
            };
            readonly blueEcume: {
                readonly default: "#869ece" | "#2f4077" | "var(--blue-ecume-sun-247-moon-675)";
                readonly hover: "#b8c5e2" | "#4e68bb" | "var(--blue-ecume-sun-247-moon-675-hover)";
                readonly active: "#ced6ea" | "#667dcf" | "var(--blue-ecume-sun-247-moon-675-active)";
            };
            readonly blueCumulus: {
                readonly default: "#7ab1e8" | "#3558a2" | "var(--blue-cumulus-sun-368-moon-732)";
                readonly hover: "#bad2f2" | "#5982e0" | "var(--blue-cumulus-sun-368-moon-732-hover)";
                readonly active: "#d2e2f6" | "#7996e6" | "var(--blue-cumulus-sun-368-moon-732-active)";
            };
            readonly purpleGlycine: {
                readonly default: "#ce70cc" | "#6e445a" | "var(--purple-glycine-sun-319-moon-630)";
                readonly hover: "#dfa4dd" | "#a66989" | "var(--purple-glycine-sun-319-moon-630-hover)";
                readonly active: "#e7bbe6" | "#bb7f9e" | "var(--purple-glycine-sun-319-moon-630-active)";
            };
            readonly pinkMacaron: {
                readonly default: "#ffb7ae" | "#8d533e" | "var(--pink-macaron-sun-406-moon-833)";
                readonly hover: "#ffe0dc" | "#ca795c" | "var(--pink-macaron-sun-406-moon-833-hover)";
                readonly active: "#fff0ee" | "#e08e73" | "var(--pink-macaron-sun-406-moon-833-active)";
            };
            readonly pinkTuile: {
                readonly default: "#ff9575" | "#a94645" | "var(--pink-tuile-sun-425-moon-750)";
                readonly hover: "#ffc4b7" | "#d5706f" | "var(--pink-tuile-sun-425-moon-750-hover)";
                readonly active: "#ffd8d0" | "#da8a89" | "var(--pink-tuile-sun-425-moon-750-active)";
            };
            readonly yellowTournesol: {
                readonly default: "#ffe552" | "#716043" | "var(--yellow-tournesol-sun-407-moon-922)";
                readonly hover: "#e1c700" | "#a28a62" | "var(--yellow-tournesol-sun-407-moon-922-hover)";
                readonly active: "#cab300" | "#ba9f72" | "var(--yellow-tournesol-sun-407-moon-922-active)";
            };
            readonly yellowMoutarde: {
                readonly default: "#ffca00" | "#695240" | "var(--yellow-moutarde-sun-348-moon-860)";
                readonly hover: "#cda200" | "#9b7b61" | "var(--yellow-moutarde-sun-348-moon-860-hover)";
                readonly active: "#b28c00" | "#b58f72" | "var(--yellow-moutarde-sun-348-moon-860-active)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#ff732c" | "#755348" | "var(--orange-terre-battue-sun-370-moon-672)";
                readonly hover: "#ffa48b" | "#ab7b6b" | "var(--orange-terre-battue-sun-370-moon-672-hover)";
                readonly active: "#ffbbab" | "#c68f7d" | "var(--orange-terre-battue-sun-370-moon-672-active)";
            };
            readonly brownCafeCreme: {
                readonly default: "#ecd7a2" | "#685c48" | "var(--brown-cafe-creme-sun-383-moon-885)";
                readonly hover: "#c5b386" | "#97866a" | "var(--brown-cafe-creme-sun-383-moon-885-hover)";
                readonly active: "#af9f77" | "#ae9b7b" | "var(--brown-cafe-creme-sun-383-moon-885-active)";
            };
            readonly brownCaramel: {
                readonly default: "#fbd8ab" | "#845d48" | "var(--brown-caramel-sun-425-moon-901)";
                readonly hover: "#efb547" | "#bb8568" | "var(--brown-caramel-sun-425-moon-901-hover)";
                readonly active: "#d6a23e" | "#d69978" | "var(--brown-caramel-sun-425-moon-901-active)";
            };
            readonly brownOpera: {
                readonly default: "#e6be92" | "#745b47" | "var(--brown-opera-sun-395-moon-820)";
                readonly hover: "#f2e2d3" | "#a78468" | "var(--brown-opera-sun-395-moon-820-hover)";
                readonly active: "#f8f0e9" | "#c09979" | "var(--brown-opera-sun-395-moon-820-active)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#d0c3b7" | "#6a6156" | "var(--beige-gris-galet-sun-407-moon-821)";
                readonly hover: "#eae5e1" | "#988b7c" | "var(--beige-gris-galet-sun-407-moon-821-hover)";
                readonly active: "#f4f2f0" | "#afa08f" | "var(--beige-gris-galet-sun-407-moon-821-active)";
            };
            readonly info: {
                readonly default: "#518fff" | "#0063cb" | "var(--info-425-625)";
                readonly hover: "#98b4ff" | "#3b87ff" | "var(--info-425-625-hover)";
                readonly active: "#b4c7ff" | "#6798ff" | "var(--info-425-625-active)";
            };
            readonly success: {
                readonly default: "#27a658" | "#18753c" | "var(--success-425-625)";
                readonly hover: "#36d975" | "#27a959" | "var(--success-425-625-hover)";
                readonly active: "#3df183" | "#2fc368" | "var(--success-425-625-active)";
            };
            readonly warning: {
                readonly default: "#fc5d00" | "#b34000" | "var(--warning-425-625)";
                readonly hover: "#ff8c73" | "#ff6218" | "var(--warning-425-625-hover)";
                readonly active: "#ffa595" | "#ff7a55" | "var(--warning-425-625-active)";
            };
            readonly error: {
                readonly default: "#ff5655" | "#ce0500" | "var(--error-425-625)";
                readonly hover: "#ff8c8c" | "#ff2725" | "var(--error-425-625-hover)";
                readonly active: "#ffa6a6" | "#ff4140" | "var(--error-425-625-active)";
            };
        };
        readonly actionLow: {
            readonly blueFrance: {
                readonly default: "#272747" | "#e3e3fd" | "var(--blue-france-925-125)";
                readonly hover: "#4a4a7d" | "#c1c1fb" | "var(--blue-france-925-125-hover)";
                readonly active: "#5e5e90" | "#adadf9" | "var(--blue-france-925-125-active)";
            };
            readonly redMarianne: {
                readonly default: "#3b2424" | "#fddede" | "var(--red-marianne-925-125)";
                readonly hover: "#6b4545" | "#fbb6b6" | "var(--red-marianne-925-125-hover)";
                readonly active: "#865757" | "#fa9e9e" | "var(--red-marianne-925-125-active)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#2d2a1d" | "#fbe769" | "var(--green-tilleul-verveine-925-125)";
                readonly hover: "#534f39" | "#d7c655" | "var(--green-tilleul-verveine-925-125-hover)";
                readonly active: "#696349" | "#c2b24c" | "var(--green-tilleul-verveine-925-125-active)";
            };
            readonly greenBourgeon: {
                readonly default: "#232d1d" | "#a9fb68" | "var(--green-bourgeon-925-125)";
                readonly hover: "#435339" | "#8ed654" | "var(--green-bourgeon-925-125-hover)";
                readonly active: "#556949" | "#7fc04b" | "var(--green-bourgeon-925-125-active)";
            };
            readonly greenEmeraude: {
                readonly default: "#1e2e23" | "#9ef9be" | "var(--green-emeraude-925-125)";
                readonly hover: "#3b5543" | "#69df97" | "var(--green-emeraude-925-125-hover)";
                readonly active: "#4b6b55" | "#5ec988" | "var(--green-emeraude-925-125-active)";
            };
            readonly greenMenthe: {
                readonly default: "#1f2d2a" | "#8bf8e7" | "var(--green-menthe-925-125)";
                readonly hover: "#3c534e" | "#6ed5c5" | "var(--green-menthe-925-125-hover)";
                readonly active: "#4d6963" | "#62bfb1" | "var(--green-menthe-925-125-active)";
            };
            readonly greenArchipel: {
                readonly default: "#1f2c2e" | "#a6f2fa" | "var(--green-archipel-925-125)";
                readonly hover: "#3c5255" | "#62dbe5" | "var(--green-archipel-925-125-hover)";
                readonly active: "#4d676b" | "#58c5cf" | "var(--green-archipel-925-125-active)";
            };
            readonly blueEcume: {
                readonly default: "#222940" | "#dee5fd" | "var(--blue-ecume-925-125)";
                readonly hover: "#424d73" | "#b4c5fb" | "var(--blue-ecume-925-125-hover)";
                readonly active: "#536190" | "#99b3f9" | "var(--blue-ecume-925-125-active)";
            };
            readonly blueCumulus: {
                readonly default: "#212a3a" | "#dae6fd" | "var(--blue-cumulus-925-125)";
                readonly hover: "#404f69" | "#a9c8fb" | "var(--blue-cumulus-925-125-hover)";
                readonly active: "#516384" | "#8ab8f9" | "var(--blue-cumulus-925-125-active)";
            };
            readonly purpleGlycine: {
                readonly default: "#332632" | "#fddbfa" | "var(--purple-glycine-925-125)";
                readonly hover: "#5d485c" | "#fbaff5" | "var(--purple-glycine-925-125-hover)";
                readonly active: "#755b73" | "#fa96f2" | "var(--purple-glycine-925-125-active)";
            };
            readonly pinkMacaron: {
                readonly default: "#352724" | "#fddfda" | "var(--pink-macaron-925-125)";
                readonly hover: "#614a45" | "#fbb8ab" | "var(--pink-macaron-925-125-hover)";
                readonly active: "#795d57" | "#faa18d" | "var(--pink-macaron-925-125-active)";
            };
            readonly pinkTuile: {
                readonly default: "#372624" | "#fddfdb" | "var(--pink-tuile-925-125)";
                readonly hover: "#644845" | "#fbb8ad" | "var(--pink-tuile-925-125-hover)";
                readonly active: "#7d5b57" | "#faa191" | "var(--pink-tuile-925-125-active)";
            };
            readonly yellowTournesol: {
                readonly default: "#302a1a" | "#fde39c" | "var(--yellow-tournesol-925-125)";
                readonly hover: "#584e34" | "#e9c53b" | "var(--yellow-tournesol-925-125-hover)";
                readonly active: "#6f6342" | "#d3b235" | "var(--yellow-tournesol-925-125-active)";
            };
            readonly yellowMoutarde: {
                readonly default: "#30291d" | "#fde2b5" | "var(--yellow-moutarde-925-125)";
                readonly hover: "#584d39" | "#f6c43c" | "var(--yellow-moutarde-925-125-hover)";
                readonly active: "#6f6149" | "#dfb135" | "var(--yellow-moutarde-925-125-active)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#382621" | "#fddfd8" | "var(--orange-terre-battue-925-125)";
                readonly hover: "#664840" | "#fbb8a5" | "var(--orange-terre-battue-925-125-hover)";
                readonly active: "#7f5b51" | "#faa184" | "var(--orange-terre-battue-925-125-active)";
            };
            readonly brownCafeCreme: {
                readonly default: "#2e2a21" | "#f4e3c7" | "var(--brown-cafe-creme-925-125)";
                readonly hover: "#554e3f" | "#e1c386" | "var(--brown-cafe-creme-925-125-hover)";
                readonly active: "#6b6351" | "#ccb078" | "var(--brown-cafe-creme-925-125-active)";
            };
            readonly brownCaramel: {
                readonly default: "#332821" | "#f3e2d9" | "var(--brown-caramel-925-125)";
                readonly hover: "#5d4b40" | "#e7bea6" | "var(--brown-caramel-925-125-hover)";
                readonly active: "#755f51" | "#e1a982" | "var(--brown-caramel-925-125-active)";
            };
            readonly brownOpera: {
                readonly default: "#322821" | "#f3e2d7" | "var(--brown-opera-925-125)";
                readonly hover: "#5c4b40" | "#e7bfa0" | "var(--brown-opera-925-125-hover)";
                readonly active: "#735f51" | "#deaa7e" | "var(--brown-opera-925-125-active)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#2e2924" | "#eee4d9" | "var(--beige-gris-galet-925-125)";
                readonly hover: "#554d45" | "#dbc3a4" | "var(--beige-gris-galet-925-125-hover)";
                readonly active: "#6b6157" | "#c6b094" | "var(--beige-gris-galet-925-125-active)";
            };
        };
        readonly active: {
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
                readonly hover: "#b1b1f9" | "#1212ff" | "var(--blue-france-sun-113-625-hover)";
                readonly active: "#c6c6fb" | "#2323ff" | "var(--blue-france-sun-113-625-active)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
                readonly hover: "#fa9293" | "#f93f42" | "var(--red-marianne-425-625-hover)";
                readonly active: "#fbabac" | "#f95a5c" | "var(--red-marianne-425-625-active)";
            };
        };
        readonly open: {
            readonly blueFrance: {
                readonly default: "#272747" | "#e3e3fd" | "var(--blue-france-925-125)";
                readonly hover: "#4a4a7d" | "#c1c1fb" | "var(--blue-france-925-125-hover)";
                readonly active: "#5e5e90" | "#adadf9" | "var(--blue-france-925-125-active)";
            };
            readonly redMarianne: {
                readonly default: "#3b2424" | "#fddede" | "var(--red-marianne-925-125)";
                readonly hover: "#6b4545" | "#fbb6b6" | "var(--red-marianne-925-125-hover)";
                readonly active: "#865757" | "#fa9e9e" | "var(--red-marianne-925-125-active)";
            };
        };
        readonly disabled: {
            readonly grey: {
                readonly default: "#2a2a2a" | "#e5e5e5" | "var(--grey-925-125)";
            };
        };
        readonly raised: {
            readonly grey: {
                readonly default: "#ffffff" | "#1e1e1e" | "var(--grey-1000-75)";
                readonly hover: "#f6f6f6" | "#3f3f3f" | "var(--grey-1000-75-hover)";
                readonly active: "#ededed" | "#525252" | "var(--grey-1000-75-active)";
            };
        };
        readonly overlap: {
            readonly grey: {
                readonly default: "#ffffff" | "#242424" | "var(--grey-1000-100)";
                readonly hover: "#f6f6f6" | "#474747" | "var(--grey-1000-100-hover)";
                readonly active: "#ededed" | "#5b5b5b" | "var(--grey-1000-100-active)";
            };
        };
        readonly lifted: {
            readonly grey: {
                readonly default: "#ffffff" | "#1e1e1e" | "var(--grey-1000-75)";
                readonly hover: "#f6f6f6" | "#3f3f3f" | "var(--grey-1000-75-hover)";
                readonly active: "#ededed" | "#525252" | "var(--grey-1000-75-active)";
            };
        };
        readonly altRaised: {
            readonly grey: {
                readonly default: "#f6f6f6" | "#242424" | "var(--grey-975-100)";
                readonly hover: "#474747" | "#dfdfdf" | "var(--grey-975-100-hover)";
                readonly active: "#cfcfcf" | "#5b5b5b" | "var(--grey-975-100-active)";
            };
        };
        readonly altOverlap: {
            readonly grey: {
                readonly default: "#f6f6f6" | "#2a2a2a" | "var(--grey-975-125)";
                readonly hover: "#dfdfdf" | "#4e4e4e" | "var(--grey-975-125-hover)";
                readonly active: "#cfcfcf" | "#636363" | "var(--grey-975-125-active)";
            };
        };
        readonly contrastRaised: {
            readonly grey: {
                readonly default: "#eeeeee" | "#2a2a2a" | "var(--grey-950-125)";
                readonly hover: "#d2d2d2" | "#4e4e4e" | "var(--grey-950-125-hover)";
                readonly active: "#c1c1c1" | "#636363" | "var(--grey-950-125-active)";
            };
        };
        readonly contrastOverlap: {
            readonly grey: {
                readonly default: "#eeeeee" | "#2f2f2f" | "var(--grey-950-150)";
                readonly hover: "#d2d2d2" | "#545454" | "var(--grey-950-150-hover)";
                readonly active: "#c1c1c1" | "#696969" | "var(--grey-950-150-active)";
            };
        };
    };
    readonly text: {
        readonly default: {
            readonly grey: {
                readonly default: "#cecece" | "#3a3a3a" | "var(--grey-200-850)";
            };
            readonly info: {
                readonly default: "#518fff" | "#0063cb" | "var(--info-425-625)";
            };
            readonly success: {
                readonly default: "#27a658" | "#18753c" | "var(--success-425-625)";
            };
            readonly warning: {
                readonly default: "#fc5d00" | "#b34000" | "var(--warning-425-625)";
            };
            readonly error: {
                readonly default: "#ff5655" | "#ce0500" | "var(--error-425-625)";
            };
        };
        readonly actionHigh: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-50-1000)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#d8c634" | "#66673d" | "var(--green-tilleul-verveine-sun-418-moon-817)";
            };
            readonly greenBourgeon: {
                readonly default: "#99c221" | "#447049" | "var(--green-bourgeon-sun-425-moon-759)";
            };
            readonly greenEmeraude: {
                readonly default: "#34cb6a" | "#297254" | "var(--green-emeraude-sun-425-moon-753)";
            };
            readonly greenMenthe: {
                readonly default: "#21ab8e" | "#37635f" | "var(--green-menthe-sun-373-moon-652)";
            };
            readonly greenArchipel: {
                readonly default: "#34bab5" | "#006a6f" | "var(--green-archipel-sun-391-moon-716)";
            };
            readonly blueEcume: {
                readonly default: "#869ece" | "#2f4077" | "var(--blue-ecume-sun-247-moon-675)";
            };
            readonly blueCumulus: {
                readonly default: "#7ab1e8" | "#3558a2" | "var(--blue-cumulus-sun-368-moon-732)";
            };
            readonly purpleGlycine: {
                readonly default: "#ce70cc" | "#6e445a" | "var(--purple-glycine-sun-319-moon-630)";
            };
            readonly pinkMacaron: {
                readonly default: "#ffb7ae" | "#8d533e" | "var(--pink-macaron-sun-406-moon-833)";
            };
            readonly pinkTuile: {
                readonly default: "#ff9575" | "#a94645" | "var(--pink-tuile-sun-425-moon-750)";
            };
            readonly yellowTournesol: {
                readonly default: "#ffe552" | "#716043" | "var(--yellow-tournesol-sun-407-moon-922)";
            };
            readonly yellowMoutarde: {
                readonly default: "#ffca00" | "#695240" | "var(--yellow-moutarde-sun-348-moon-860)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#ff732c" | "#755348" | "var(--orange-terre-battue-sun-370-moon-672)";
            };
            readonly brownCafeCreme: {
                readonly default: "#ecd7a2" | "#685c48" | "var(--brown-cafe-creme-sun-383-moon-885)";
            };
            readonly brownCaramel: {
                readonly default: "#fbd8ab" | "#845d48" | "var(--brown-caramel-sun-425-moon-901)";
            };
            readonly brownOpera: {
                readonly default: "#e6be92" | "#745b47" | "var(--brown-opera-sun-395-moon-820)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#d0c3b7" | "#6a6156" | "var(--beige-gris-galet-sun-407-moon-821)";
            };
        };
        readonly title: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-50-1000)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
        };
        readonly label: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-50-1000)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#d8c634" | "#66673d" | "var(--green-tilleul-verveine-sun-418-moon-817)";
            };
            readonly greenBourgeon: {
                readonly default: "#99c221" | "#447049" | "var(--green-bourgeon-sun-425-moon-759)";
            };
            readonly greenEmeraude: {
                readonly default: "#34cb6a" | "#297254" | "var(--green-emeraude-sun-425-moon-753)";
            };
            readonly greenMenthe: {
                readonly default: "#21ab8e" | "#37635f" | "var(--green-menthe-sun-373-moon-652)";
            };
            readonly greenArchipel: {
                readonly default: "#34bab5" | "#006a6f" | "var(--green-archipel-sun-391-moon-716)";
            };
            readonly blueEcume: {
                readonly default: "#869ece" | "#2f4077" | "var(--blue-ecume-sun-247-moon-675)";
            };
            readonly blueCumulus: {
                readonly default: "#7ab1e8" | "#3558a2" | "var(--blue-cumulus-sun-368-moon-732)";
            };
            readonly purpleGlycine: {
                readonly default: "#ce70cc" | "#6e445a" | "var(--purple-glycine-sun-319-moon-630)";
            };
            readonly pinkMacaron: {
                readonly default: "#ffb7ae" | "#8d533e" | "var(--pink-macaron-sun-406-moon-833)";
            };
            readonly pinkTuile: {
                readonly default: "#ff9575" | "#a94645" | "var(--pink-tuile-sun-425-moon-750)";
            };
            readonly yellowTournesol: {
                readonly default: "#ffe552" | "#716043" | "var(--yellow-tournesol-sun-407-moon-922)";
            };
            readonly yellowMoutarde: {
                readonly default: "#ffca00" | "#695240" | "var(--yellow-moutarde-sun-348-moon-860)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#ff732c" | "#755348" | "var(--orange-terre-battue-sun-370-moon-672)";
            };
            readonly brownCafeCreme: {
                readonly default: "#ecd7a2" | "#685c48" | "var(--brown-cafe-creme-sun-383-moon-885)";
            };
            readonly brownCaramel: {
                readonly default: "#fbd8ab" | "#845d48" | "var(--brown-caramel-sun-425-moon-901)";
            };
            readonly brownOpera: {
                readonly default: "#e6be92" | "#745b47" | "var(--brown-opera-sun-395-moon-820)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#d0c3b7" | "#6a6156" | "var(--beige-gris-galet-sun-407-moon-821)";
            };
        };
        readonly active: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-50-1000)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
        };
        readonly mention: {
            readonly grey: {
                readonly default: "#929292" | "#666666" | "var(--grey-425-625)";
            };
        };
        readonly inverted: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-1000-50)";
            };
            readonly blueFrance: {
                readonly default: "#f5f5fe" | "#000091" | "var(--blue-france-975-sun-113)";
            };
            readonly redMarianne: {
                readonly default: "#2b1919" | "#fef4f4" | "var(--red-marianne-975-75)";
            };
            readonly info: {
                readonly default: "#171d2e" | "#f4f6ff" | "var(--info-975-75)";
            };
            readonly success: {
                readonly default: "#142117" | "#dffee6" | "var(--success-975-75)";
            };
            readonly warning: {
                readonly default: "#2d1814" | "#fff4f3" | "var(--warning-975-75)";
            };
            readonly error: {
                readonly default: "#301717" | "#fff4f4" | "var(--error-975-75)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#201e14" | "#fef7da" | "var(--green-tilleul-verveine-975-75)";
            };
            readonly greenBourgeon: {
                readonly default: "#182014" | "#e6feda" | "var(--green-bourgeon-975-75)";
            };
            readonly greenEmeraude: {
                readonly default: "#142018" | "#e3fdeb" | "var(--green-emeraude-975-75)";
            };
            readonly greenMenthe: {
                readonly default: "#15201e" | "#dffdf7" | "var(--green-menthe-975-75)";
            };
            readonly greenArchipel: {
                readonly default: "#152021" | "#e5fbfd" | "var(--green-archipel-975-75)";
            };
            readonly blueEcume: {
                readonly default: "#171d2f" | "#f4f6fe" | "var(--blue-ecume-975-75)";
            };
            readonly blueCumulus: {
                readonly default: "#171e2b" | "#f3f6fe" | "var(--blue-cumulus-975-75)";
            };
            readonly purpleGlycine: {
                readonly default: "#251a24" | "#fef3fd" | "var(--purple-glycine-975-75)";
            };
            readonly pinkMacaron: {
                readonly default: "#261b19" | "#fef4f2" | "var(--pink-macaron-975-75)";
            };
            readonly pinkTuile: {
                readonly default: "#281b19" | "#fef4f3" | "var(--pink-tuile-975-75)";
            };
            readonly yellowTournesol: {
                readonly default: "#221d11" | "#fef6e3" | "var(--yellow-tournesol-975-75)";
            };
            readonly yellowMoutarde: {
                readonly default: "#231d14" | "#fef5e8" | "var(--yellow-moutarde-975-75)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fef4f2" | "#281a16" | "var(--orange-terre-battue-975-75)";
            };
            readonly brownCafeCreme: {
                readonly default: "#211d16" | "#fbf6ed" | "var(--brown-cafe-creme-975-75)";
            };
            readonly brownCaramel: {
                readonly default: "#251c16" | "#fbf5f2" | "var(--brown-caramel-975-75)";
            };
            readonly brownOpera: {
                readonly default: "#fbf5f2" | "#241c17" | "var(--brown-opera-975-75)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#211d19" | "#f9f6f2" | "var(--beige-gris-galet-975-75)";
            };
        };
        readonly disabled: {
            readonly grey: {
                readonly default: "#929292" | "#666666" | "var(--grey-625-425)";
            };
        };
    };
    readonly border: {
        readonly default: {
            readonly grey: {
                readonly default: "#353535" | "#dddddd" | "var(--grey-900-175)";
            };
            readonly blueFrance: {
                readonly default: "#6a6af4" | "var(--blue-france-main-525)";
            };
            readonly redMarianne: {
                readonly default: "#e1000f" | "var(--red-marianne-main-472)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#b7a73f" | "var(--green-tilleul-verveine-main-707)";
            };
            readonly greenBourgeon: {
                readonly default: "#68a532" | "var(--green-bourgeon-main-640)";
            };
            readonly greenEmeraude: {
                readonly default: "#00a95f" | "var(--green-emeraude-main-632)";
            };
            readonly greenMenthe: {
                readonly default: "#009081" | "var(--green-menthe-main-548)";
            };
            readonly greenArchipel: {
                readonly default: "#009099" | "var(--green-archipel-main-557)";
            };
            readonly blueEcume: {
                readonly default: "#465f9d" | "var(--blue-ecume-main-400)";
            };
            readonly blueCumulus: {
                readonly default: "#417dc4" | "var(--blue-cumulus-main-526)";
            };
            readonly purpleGlycine: {
                readonly default: "#a558a0" | "var(--purple-glycine-main-494)";
            };
            readonly pinkMacaron: {
                readonly default: "#e18b76" | "var(--pink-macaron-main-689)";
            };
            readonly pinkTuile: {
                readonly default: "#ce614a" | "var(--pink-tuile-main-556)";
            };
            readonly yellowTournesol: {
                readonly default: "#c8aa39" | "var(--yellow-tournesol-main-731)";
            };
            readonly yellowMoutarde: {
                readonly default: "#c3992a" | "var(--yellow-moutarde-main-679)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#e4794a" | "var(--orange-terre-battue-main-645)";
            };
            readonly brownCafeCreme: {
                readonly default: "#d1b781" | "var(--brown-cafe-creme-main-782)";
            };
            readonly brownCaramel: {
                readonly default: "#c08c65" | "var(--brown-caramel-main-648)";
            };
            readonly brownOpera: {
                readonly default: "#bd987a" | "var(--brown-opera-main-680)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#aea397" | "var(--beige-gris-galet-main-702)";
            };
        };
        readonly active: {
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
        };
        readonly actionHigh: {
            readonly grey: {
                readonly default: "#161616" | "#ffffff" | "var(--grey-50-1000)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
            readonly info: {
                readonly default: "#518fff" | "#0063cb" | "var(--info-425-625)";
            };
            readonly success: {
                readonly default: "#27a658" | "#18753c" | "var(--success-425-625)";
            };
            readonly warning: {
                readonly default: "#fc5d00" | "#b34000" | "var(--warning-425-625)";
            };
            readonly error: {
                readonly default: "#ff5655" | "#ce0500" | "var(--error-425-625)";
            };
        };
        readonly actionLow: {
            readonly blueFrance: {
                readonly default: "#313178" | "#cacafb" | "var(--blue-france-850-200)";
            };
            readonly redMarianne: {
                readonly default: "#5e2a2b" | "#fcbfbf" | "var(--red-marianne-850-200)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#3f3a20" | "#e2cf58" | "var(--green-tilleul-verveine-850-200)";
            };
            readonly greenBourgeon: {
                readonly default: "#2a401a" | "#95e257" | "var(--green-bourgeon-850-200)";
            };
            readonly greenEmeraude: {
                readonly default: "#21402c" | "#6fe49d" | "var(--green-emeraude-850-200)";
            };
            readonly greenMenthe: {
                readonly default: "#223f3a" | "#73e0cf" | "var(--green-menthe-850-200)";
            };
            readonly greenArchipel: {
                readonly default: "#233e41" | "#60e0eb" | "var(--green-archipel-850-200)";
            };
            readonly blueEcume: {
                readonly default: "#273962" | "#bfccfb" | "var(--blue-ecume-850-200)";
            };
            readonly blueCumulus: {
                readonly default: "#263b58" | "#b6cffb" | "var(--blue-cumulus-850-200)";
            };
            readonly purpleGlycine: {
                readonly default: "#502e4d" | "#fbb8f6" | "var(--purple-glycine-850-200)";
            };
            readonly pinkMacaron: {
                readonly default: "#52312a" | "#fcc0b4" | "var(--pink-macaron-850-200)";
            };
            readonly pinkTuile: {
                readonly default: "#55302a" | "#fcbfb7" | "var(--pink-tuile-850-200)";
            };
            readonly yellowTournesol: {
                readonly default: "#43391a" | "#efcb3a" | "var(--yellow-tournesol-850-200)";
            };
            readonly yellowMoutarde: {
                readonly default: "#453820" | "#fcc63a" | "var(--yellow-moutarde-850-200)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#543125" | "#fcc0b0" | "var(--orange-terre-battue-850-200)";
            };
            readonly brownCafeCreme: {
                readonly default: "#423925" | "#e7ca8e" | "var(--brown-cafe-creme-850-200)";
            };
            readonly brownCaramel: {
                readonly default: "#4b3525" | "#eac7b2" | "var(--brown-caramel-850-200)";
            };
            readonly brownOpera: {
                readonly default: "#493625" | "#eac7ad" | "var(--brown-opera-850-200)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#433829" | "#e0cab0" | "var(--beige-gris-galet-850-200)";
            };
        };
        readonly open: {
            readonly blueFrance: {
                readonly default: "#272747" | "#e3e3fd" | "var(--blue-france-925-125)";
            };
            readonly redMarianne: {
                readonly default: "#3b2424" | "#fddede" | "var(--red-marianne-925-125)";
            };
        };
        readonly plain: {
            readonly grey: {
                readonly default: "#cecece" | "#3a3a3a" | "var(--grey-200-850)";
            };
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
            };
            readonly info: {
                readonly default: "#518fff" | "#0063cb" | "var(--info-425-625)";
            };
            readonly success: {
                readonly default: "#27a658" | "#18753c" | "var(--success-425-625)";
            };
            readonly warning: {
                readonly default: "#fc5d00" | "#b34000" | "var(--warning-425-625)";
            };
            readonly error: {
                readonly default: "#ff5655" | "#ce0500" | "var(--error-425-625)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#d8c634" | "#66673d" | "var(--green-tilleul-verveine-sun-418-moon-817)";
            };
            readonly greenBourgeon: {
                readonly default: "#99c221" | "#447049" | "var(--green-bourgeon-sun-425-moon-759)";
            };
            readonly greenEmeraude: {
                readonly default: "#34cb6a" | "#297254" | "var(--green-emeraude-sun-425-moon-753)";
            };
            readonly greenMenthe: {
                readonly default: "#21ab8e" | "#37635f" | "var(--green-menthe-sun-373-moon-652)";
            };
            readonly greenArchipel: {
                readonly default: "#34bab5" | "#006a6f" | "var(--green-archipel-sun-391-moon-716)";
            };
            readonly blueEcume: {
                readonly default: "#869ece" | "#2f4077" | "var(--blue-ecume-sun-247-moon-675)";
            };
            readonly blueCumulus: {
                readonly default: "#7ab1e8" | "#3558a2" | "var(--blue-cumulus-sun-368-moon-732)";
            };
            readonly purpleGlycine: {
                readonly default: "#ce70cc" | "#6e445a" | "var(--purple-glycine-sun-319-moon-630)";
            };
            readonly pinkMacaron: {
                readonly default: "#ffb7ae" | "#8d533e" | "var(--pink-macaron-sun-406-moon-833)";
            };
            readonly pinkTuile: {
                readonly default: "#ff9575" | "#a94645" | "var(--pink-tuile-sun-425-moon-750)";
            };
            readonly yellowTournesol: {
                readonly default: "#ffe552" | "#716043" | "var(--yellow-tournesol-sun-407-moon-922)";
            };
            readonly yellowMoutarde: {
                readonly default: "#ffca00" | "#695240" | "var(--yellow-moutarde-sun-348-moon-860)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#ff732c" | "#755348" | "var(--orange-terre-battue-sun-370-moon-672)";
            };
            readonly brownCafeCreme: {
                readonly default: "#ecd7a2" | "#685c48" | "var(--brown-cafe-creme-sun-383-moon-885)";
            };
            readonly brownCaramel: {
                readonly default: "#fbd8ab" | "#845d48" | "var(--brown-caramel-sun-425-moon-901)";
            };
            readonly brownOpera: {
                readonly default: "#e6be92" | "#745b47" | "var(--brown-opera-sun-395-moon-820)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#d0c3b7" | "#6a6156" | "var(--beige-gris-galet-sun-407-moon-821)";
            };
        };
        readonly disabled: {
            readonly grey: {
                readonly default: "#2a2a2a" | "#e5e5e5" | "var(--grey-925-125)";
            };
        };
    };
    readonly artwork: {
        readonly major: {
            readonly blueFrance: {
                readonly default: "#8585f6" | "#000091" | "var(--blue-france-sun-113-625)";
                readonly hover: "#b1b1f9" | "#1212ff" | "var(--blue-france-sun-113-625-hover)";
                readonly active: "#c6c6fb" | "#2323ff" | "var(--blue-france-sun-113-625-active)";
            };
            readonly redMarianne: {
                readonly default: "#f95c5e" | "#c9191e" | "var(--red-marianne-425-625)";
                readonly hover: "#fa9293" | "#f93f42" | "var(--red-marianne-425-625-hover)";
                readonly active: "#fbabac" | "#f95a5c" | "var(--red-marianne-425-625-active)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#d8c634" | "#66673d" | "var(--green-tilleul-verveine-sun-418-moon-817)";
                readonly hover: "#fee943" | "#929359" | "var(--green-tilleul-verveine-sun-418-moon-817-hover)";
                readonly active: "#fef1ab" | "#a7a967" | "var(--green-tilleul-verveine-sun-418-moon-817-active)";
            };
            readonly greenBourgeon: {
                readonly default: "#99c221" | "#447049" | "var(--green-bourgeon-sun-425-moon-759)";
                readonly hover: "#baec2a" | "#639f6a" | "var(--green-bourgeon-sun-425-moon-759-hover)";
                readonly active: "#c9fd2e" | "#72b77a" | "var(--green-bourgeon-sun-425-moon-759-active)";
            };
            readonly greenEmeraude: {
                readonly default: "#34cb6a" | "#297254" | "var(--green-emeraude-sun-425-moon-753)";
                readonly hover: "#42fb84" | "#3ea47a" | "var(--green-emeraude-sun-425-moon-753-hover)";
                readonly active: "#80fda3" | "#49bc8d" | "var(--green-emeraude-sun-425-moon-753-active)";
            };
            readonly greenMenthe: {
                readonly default: "#21ab8e" | "#37635f" | "var(--green-menthe-sun-373-moon-652)";
                readonly hover: "#2eddb8" | "#53918c" | "var(--green-menthe-sun-373-moon-652-hover)";
                readonly active: "#34f4cc" | "#62a9a2" | "var(--green-menthe-sun-373-moon-652-active)";
            };
            readonly greenArchipel: {
                readonly default: "#34bab5" | "#006a6f" | "var(--green-archipel-sun-391-moon-716)";
                readonly hover: "#43e9e2" | "#009fa7" | "var(--green-archipel-sun-391-moon-716-hover)";
                readonly active: "#4cfdf6" | "#00bbc3" | "var(--green-archipel-sun-391-moon-716-active)";
            };
            readonly blueEcume: {
                readonly default: "#869ece" | "#2f4077" | "var(--blue-ecume-sun-247-moon-675)";
                readonly hover: "#b8c5e2" | "#4e68bb" | "var(--blue-ecume-sun-247-moon-675-hover)";
                readonly active: "#ced6ea" | "#667dcf" | "var(--blue-ecume-sun-247-moon-675-active)";
            };
            readonly blueCumulus: {
                readonly default: "#7ab1e8" | "#3558a2" | "var(--blue-cumulus-sun-368-moon-732)";
                readonly hover: "#bad2f2" | "#5982e0" | "var(--blue-cumulus-sun-368-moon-732-hover)";
                readonly active: "#d2e2f6" | "#7996e6" | "var(--blue-cumulus-sun-368-moon-732-active)";
            };
            readonly purpleGlycine: {
                readonly default: "#ce70cc" | "#6e445a" | "var(--purple-glycine-sun-319-moon-630)";
                readonly hover: "#dfa4dd" | "#a66989" | "var(--purple-glycine-sun-319-moon-630-hover)";
                readonly active: "#e7bbe6" | "#bb7f9e" | "var(--purple-glycine-sun-319-moon-630-active)";
            };
            readonly pinkMacaron: {
                readonly default: "#ffb7ae" | "#8d533e" | "var(--pink-macaron-sun-406-moon-833)";
                readonly hover: "#ffe0dc" | "#ca795c" | "var(--pink-macaron-sun-406-moon-833-hover)";
                readonly active: "#fff0ee" | "#e08e73" | "var(--pink-macaron-sun-406-moon-833-active)";
            };
            readonly pinkTuile: {
                readonly default: "#ff9575" | "#a94645" | "var(--pink-tuile-sun-425-moon-750)";
                readonly hover: "#ffc4b7" | "#d5706f" | "var(--pink-tuile-sun-425-moon-750-hover)";
                readonly active: "#ffd8d0" | "#da8a89" | "var(--pink-tuile-sun-425-moon-750-active)";
            };
            readonly yellowTournesol: {
                readonly default: "#ffe552" | "#716043" | "var(--yellow-tournesol-sun-407-moon-922)";
                readonly hover: "#e1c700" | "#a28a62" | "var(--yellow-tournesol-sun-407-moon-922-hover)";
                readonly active: "#cab300" | "#ba9f72" | "var(--yellow-tournesol-sun-407-moon-922-active)";
            };
            readonly yellowMoutarde: {
                readonly default: "#ffca00" | "#695240" | "var(--yellow-moutarde-sun-348-moon-860)";
                readonly hover: "#cda200" | "#9b7b61" | "var(--yellow-moutarde-sun-348-moon-860-hover)";
                readonly active: "#b28c00" | "#b58f72" | "var(--yellow-moutarde-sun-348-moon-860-active)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#ff732c" | "#755348" | "var(--orange-terre-battue-sun-370-moon-672)";
                readonly hover: "#ffa48b" | "#ab7b6b" | "var(--orange-terre-battue-sun-370-moon-672-hover)";
                readonly active: "#ffbbab" | "#c68f7d" | "var(--orange-terre-battue-sun-370-moon-672-active)";
            };
            readonly brownCafeCreme: {
                readonly default: "#ecd7a2" | "#685c48" | "var(--brown-cafe-creme-sun-383-moon-885)";
                readonly hover: "#c5b386" | "#97866a" | "var(--brown-cafe-creme-sun-383-moon-885-hover)";
                readonly active: "#af9f77" | "#ae9b7b" | "var(--brown-cafe-creme-sun-383-moon-885-active)";
            };
            readonly brownCaramel: {
                readonly default: "#fbd8ab" | "#845d48" | "var(--brown-caramel-sun-425-moon-901)";
                readonly hover: "#efb547" | "#bb8568" | "var(--brown-caramel-sun-425-moon-901-hover)";
                readonly active: "#d6a23e" | "#d69978" | "var(--brown-caramel-sun-425-moon-901-active)";
            };
            readonly brownOpera: {
                readonly default: "#e6be92" | "#745b47" | "var(--brown-opera-sun-395-moon-820)";
                readonly hover: "#f2e2d3" | "#a78468" | "var(--brown-opera-sun-395-moon-820-hover)";
                readonly active: "#f8f0e9" | "#c09979" | "var(--brown-opera-sun-395-moon-820-active)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#d0c3b7" | "#6a6156" | "var(--beige-gris-galet-sun-407-moon-821)";
                readonly hover: "#eae5e1" | "#988b7c" | "var(--beige-gris-galet-sun-407-moon-821-hover)";
                readonly active: "#f4f2f0" | "#afa08f" | "var(--beige-gris-galet-sun-407-moon-821-active)";
            };
        };
        readonly minor: {
            readonly blueFrance: {
                readonly default: "#6a6af4" | "var(--blue-france-main-525)";
            };
            readonly redMarianne: {
                readonly default: "#e1000f" | "var(--red-marianne-main-472)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#b7a73f" | "var(--green-tilleul-verveine-main-707)";
            };
            readonly greenBourgeon: {
                readonly default: "#68a532" | "var(--green-bourgeon-main-640)";
            };
            readonly greenEmeraude: {
                readonly default: "#00a95f" | "var(--green-emeraude-main-632)";
            };
            readonly greenMenthe: {
                readonly default: "#009081" | "var(--green-menthe-main-548)";
            };
            readonly greenArchipel: {
                readonly default: "#009099" | "var(--green-archipel-main-557)";
            };
            readonly blueEcume: {
                readonly default: "#465f9d" | "var(--blue-ecume-main-400)";
            };
            readonly blueCumulus: {
                readonly default: "#417dc4" | "var(--blue-cumulus-main-526)";
            };
            readonly purpleGlycine: {
                readonly default: "#a558a0" | "var(--purple-glycine-main-494)";
            };
            readonly pinkMacaron: {
                readonly default: "#e18b76" | "var(--pink-macaron-main-689)";
            };
            readonly pinkTuile: {
                readonly default: "#ce614a" | "var(--pink-tuile-main-556)";
            };
            readonly yellowTournesol: {
                readonly default: "#c8aa39" | "var(--yellow-tournesol-main-731)";
            };
            readonly yellowMoutarde: {
                readonly default: "#c3992a" | "var(--yellow-moutarde-main-679)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#e4794a" | "var(--orange-terre-battue-main-645)";
            };
            readonly brownCafeCreme: {
                readonly default: "#d1b781" | "var(--brown-cafe-creme-main-782)";
            };
            readonly brownCaramel: {
                readonly default: "#c08c65" | "var(--brown-caramel-main-648)";
            };
            readonly brownOpera: {
                readonly default: "#bd987a" | "var(--brown-opera-main-680)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#aea397" | "var(--beige-gris-galet-main-702)";
            };
        };
        readonly decorative: {
            readonly grey: {
                readonly default: "#242424" | "#eeeeee" | "var(--grey-950-100)";
            };
            readonly blueFrance: {
                readonly default: "#21213f" | "#ececfe" | "var(--blue-france-950-100)";
            };
            readonly redMarianne: {
                readonly default: "#331f1f" | "#fee9e9" | "var(--red-marianne-950-100)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#272419" | "#fceeac" | "var(--green-tilleul-verveine-950-100)";
            };
            readonly greenBourgeon: {
                readonly default: "#1e2719" | "#c9fcac" | "var(--green-bourgeon-950-100)";
            };
            readonly greenEmeraude: {
                readonly default: "#19271e" | "#c3fad5" | "var(--green-emeraude-950-100)";
            };
            readonly greenMenthe: {
                readonly default: "#1a2624" | "#bafaee" | "var(--green-menthe-950-100)";
            };
            readonly greenArchipel: {
                readonly default: "#1a2628" | "#c7f6fc" | "var(--green-archipel-950-100)";
            };
            readonly blueEcume: {
                readonly default: "#1d2437" | "#e9edfe" | "var(--blue-ecume-950-100)";
            };
            readonly blueCumulus: {
                readonly default: "#1c2433" | "#e6eefe" | "var(--blue-cumulus-950-100)";
            };
            readonly purpleGlycine: {
                readonly default: "#2c202b" | "#fee7fc" | "var(--purple-glycine-950-100)";
            };
            readonly pinkMacaron: {
                readonly default: "#2e211f" | "#fee9e6" | "var(--pink-macaron-950-100)";
            };
            readonly pinkTuile: {
                readonly default: "#2f211f" | "#fee9e7" | "var(--pink-tuile-950-100)";
            };
            readonly yellowTournesol: {
                readonly default: "#292416" | "#feecc2" | "var(--yellow-tournesol-950-100)";
            };
            readonly yellowMoutarde: {
                readonly default: "#2a2319" | "#feebd0" | "var(--yellow-moutarde-950-100)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#31201c" | "#fee9e5" | "var(--orange-terre-battue-950-100)";
            };
            readonly brownCafeCreme: {
                readonly default: "#28241c" | "#f7ecdb" | "var(--brown-cafe-creme-950-100)";
            };
            readonly brownCaramel: {
                readonly default: "#2c221c" | "#f7ebe5" | "var(--brown-caramel-950-100)";
            };
            readonly brownOpera: {
                readonly default: "#2b221c" | "#f7ece4" | "var(--brown-opera-950-100)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#28231f" | "#f3ede5" | "var(--beige-gris-galet-950-100)";
            };
        };
        readonly background: {
            readonly grey: {
                readonly default: "#f6f6f6" | "#1e1e1e" | "var(--grey-975-75)";
            };
            readonly blueFrance: {
                readonly default: "#1b1b35" | "#f5f5fe" | "var(--blue-france-975-75)";
            };
            readonly redMarianne: {
                readonly default: "#2b1919" | "#fef4f4" | "var(--red-marianne-975-75)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#201e14" | "#fef7da" | "var(--green-tilleul-verveine-975-75)";
            };
            readonly greenBourgeon: {
                readonly default: "#182014" | "#e6feda" | "var(--green-bourgeon-975-75)";
            };
            readonly greenEmeraude: {
                readonly default: "#142018" | "#e3fdeb" | "var(--green-emeraude-975-75)";
            };
            readonly greenMenthe: {
                readonly default: "#15201e" | "#dffdf7" | "var(--green-menthe-975-75)";
            };
            readonly greenArchipel: {
                readonly default: "#152021" | "#e5fbfd" | "var(--green-archipel-975-75)";
            };
            readonly blueEcume: {
                readonly default: "#171d2f" | "#f4f6fe" | "var(--blue-ecume-975-75)";
            };
            readonly blueCumulus: {
                readonly default: "#171e2b" | "#f3f6fe" | "var(--blue-cumulus-975-75)";
            };
            readonly purpleGlycine: {
                readonly default: "#251a24" | "#fef3fd" | "var(--purple-glycine-975-75)";
            };
            readonly pinkMacaron: {
                readonly default: "#261b19" | "#fef4f2" | "var(--pink-macaron-975-75)";
            };
            readonly pinkTuile: {
                readonly default: "#281b19" | "#fef4f3" | "var(--pink-tuile-975-75)";
            };
            readonly yellowTournesol: {
                readonly default: "#221d11" | "#fef6e3" | "var(--yellow-tournesol-975-75)";
            };
            readonly yellowMoutarde: {
                readonly default: "#231d14" | "#fef5e8" | "var(--yellow-moutarde-975-75)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fef4f2" | "#281a16" | "var(--orange-terre-battue-975-75)";
            };
            readonly brownCafeCreme: {
                readonly default: "#211d16" | "#fbf6ed" | "var(--brown-cafe-creme-975-75)";
            };
            readonly brownCaramel: {
                readonly default: "#251c16" | "#fbf5f2" | "var(--brown-caramel-975-75)";
            };
            readonly brownOpera: {
                readonly default: "#fbf5f2" | "#241c17" | "var(--brown-opera-975-75)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#211d19" | "#f9f6f2" | "var(--beige-gris-galet-975-75)";
            };
        };
        readonly motif: {
            readonly grey: {
                readonly default: "#2a2a2a" | "#e5e5e5" | "var(--grey-925-125)";
            };
            readonly blueFrance: {
                readonly default: "#272747" | "#e3e3fd" | "var(--blue-france-925-125)";
            };
            readonly redMarianne: {
                readonly default: "#3b2424" | "#fddede" | "var(--red-marianne-925-125)";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#2d2a1d" | "#fbe769" | "var(--green-tilleul-verveine-925-125)";
            };
            readonly greenBourgeon: {
                readonly default: "#232d1d" | "#a9fb68" | "var(--green-bourgeon-925-125)";
            };
            readonly greenEmeraude: {
                readonly default: "#1e2e23" | "#9ef9be" | "var(--green-emeraude-925-125)";
            };
            readonly greenMenthe: {
                readonly default: "#1f2d2a" | "#8bf8e7" | "var(--green-menthe-925-125)";
            };
            readonly greenArchipel: {
                readonly default: "#1f2c2e" | "#a6f2fa" | "var(--green-archipel-925-125)";
            };
            readonly blueEcume: {
                readonly default: "#222940" | "#dee5fd" | "var(--blue-ecume-925-125)";
            };
            readonly blueCumulus: {
                readonly default: "#212a3a" | "#dae6fd" | "var(--blue-cumulus-925-125)";
            };
            readonly purpleGlycine: {
                readonly default: "#332632" | "#fddbfa" | "var(--purple-glycine-925-125)";
            };
            readonly pinkMacaron: {
                readonly default: "#352724" | "#fddfda" | "var(--pink-macaron-925-125)";
            };
            readonly pinkTuile: {
                readonly default: "#372624" | "#fddfdb" | "var(--pink-tuile-925-125)";
            };
            readonly yellowTournesol: {
                readonly default: "#302a1a" | "#fde39c" | "var(--yellow-tournesol-925-125)";
            };
            readonly yellowMoutarde: {
                readonly default: "#30291d" | "#fde2b5" | "var(--yellow-moutarde-925-125)";
            };
            readonly orangeTerreBattue: {
                readonly default: "#382621" | "#fddfd8" | "var(--orange-terre-battue-925-125)";
            };
            readonly brownCafeCreme: {
                readonly default: "#2e2a21" | "#f4e3c7" | "var(--brown-cafe-creme-925-125)";
            };
            readonly brownCaramel: {
                readonly default: "#332821" | "#f3e2d9" | "var(--brown-caramel-925-125)";
            };
            readonly brownOpera: {
                readonly default: "#322821" | "#f3e2d7" | "var(--brown-opera-925-125)";
            };
            readonly beigeGrisGalet: {
                readonly default: "#2e2924" | "#eee4d9" | "var(--beige-gris-galet-925-125)";
            };
        };
    };
};
type IsHex<T> = T extends `#${string}` ? T : never;
type OnlyHex<T> = {
    [K in keyof T]: T[K] extends string ? IsHex<T[K]> : OnlyHex<T[K]>;
};
type IsCssVar<T> = T extends `var(--${string})` ? T : never;
type OnlyCssVar<T> = {
    [K in keyof T]: T[K] extends string ? IsCssVar<T[K]> : OnlyCssVar<T[K]>;
};
export type ColorDecisions<Format extends "css var" | "hex" = "css var"> = Format extends "css var" ? OnlyCssVar<ReturnType<typeof getColorDecisions_noReturnType>> : OnlyHex<ReturnType<typeof getColorDecisions_noReturnType>>;
export declare function getColorDecisions<Format extends "css var" | "hex">(params: {
    colorOptions: ColorOptions<Format>;
}): ColorDecisions<Format>;
export {};
