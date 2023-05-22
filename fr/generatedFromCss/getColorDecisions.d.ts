import type { ColorOptions } from "./getColorOptions";
export declare function getColorDecisions(params: {
    colorOptions: ColorOptions;
}): {
    readonly background: {
        readonly default: {
            readonly grey: {
                readonly default: "#ffffff";
                readonly hover: "#f6f6f6";
                readonly active: "#ededed";
            };
        };
        readonly alt: {
            readonly grey: {
                readonly default: "#f6f6f6";
                readonly hover: "#dfdfdf";
                readonly active: "#cfcfcf";
            };
            readonly blueFrance: {
                readonly default: "#f5f5fe";
                readonly hover: "#dcdcfc";
                readonly active: "#cbcbfa";
            };
            readonly redMarianne: {
                readonly default: "#fef4f4";
                readonly hover: "#fcd7d7";
                readonly active: "#fac4c4";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fef7da";
                readonly hover: "#fce552";
                readonly active: "#ebd54c";
            };
            readonly greenBourgeon: {
                readonly default: "#e6feda";
                readonly hover: "#a7fc62";
                readonly active: "#98ed4d";
            };
            readonly greenEmeraude: {
                readonly default: "#e3fdeb";
                readonly hover: "#94f9b9";
                readonly active: "#6df1a3";
            };
            readonly greenMenthe: {
                readonly default: "#dffdf7";
                readonly hover: "#84f9e7";
                readonly active: "#70ebd8";
            };
            readonly greenArchipel: {
                readonly default: "#e5fbfd";
                readonly hover: "#99f2f8";
                readonly active: "#73e9f0";
            };
            readonly blueEcume: {
                readonly default: "#f4f6fe";
                readonly hover: "#d7dffb";
                readonly active: "#c3cffa";
            };
            readonly blueCumulus: {
                readonly default: "#f3f6fe";
                readonly hover: "#d3dffc";
                readonly active: "#bed0fa";
            };
            readonly purpleGlycine: {
                readonly default: "#fef3fd";
                readonly hover: "#fcd4f8";
                readonly active: "#fabff5";
            };
            readonly pinkMacaron: {
                readonly default: "#fef4f2";
                readonly hover: "#fcd8d0";
                readonly active: "#fac5b8";
            };
            readonly pinkTuile: {
                readonly default: "#fef4f3";
                readonly hover: "#fcd7d3";
                readonly active: "#fac4be";
            };
            readonly yellowTournesol: {
                readonly default: "#fef6e3";
                readonly hover: "#fce086";
                readonly active: "#f5d24b";
            };
            readonly yellowMoutarde: {
                readonly default: "#fef5e8";
                readonly hover: "#fcdca3";
                readonly active: "#fbcd64";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fef4f2";
                readonly hover: "#fcd8d0";
                readonly active: "#fac5b8";
            };
            readonly brownCafeCreme: {
                readonly default: "#fbf6ed";
                readonly hover: "#f2deb6";
                readonly active: "#eacf91";
            };
            readonly brownCaramel: {
                readonly default: "#fbf5f2";
                readonly hover: "#f1dbcf";
                readonly active: "#ecc9b5";
            };
            readonly brownOpera: {
                readonly default: "#fbf5f2";
                readonly hover: "#f1dbcf";
                readonly active: "#ecc9b5";
            };
            readonly beigeGrisGalet: {
                readonly default: "#f9f6f2";
                readonly hover: "#eadecd";
                readonly active: "#e1ceb1";
            };
        };
        readonly contrast: {
            readonly grey: {
                readonly default: "#eeeeee";
                readonly hover: "#d2d2d2";
                readonly active: "#c1c1c1";
            };
            readonly blueFrance: {
                readonly default: "#ececfe";
                readonly hover: "#cecefc";
                readonly active: "#bbbbfc";
            };
            readonly redMarianne: {
                readonly default: "#fee9e9";
                readonly hover: "#fdc5c5";
                readonly active: "#fcafaf";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fceeac";
                readonly hover: "#e8d45c";
                readonly active: "#d4c254";
            };
            readonly greenBourgeon: {
                readonly default: "#c9fcac";
                readonly hover: "#9ae95d";
                readonly active: "#8dd555";
            };
            readonly greenEmeraude: {
                readonly default: "#c3fad5";
                readonly hover: "#77eda5";
                readonly active: "#6dd897";
            };
            readonly greenMenthe: {
                readonly default: "#bafaee";
                readonly hover: "#79e7d5";
                readonly active: "#6fd3c3";
            };
            readonly greenArchipel: {
                readonly default: "#c7f6fc";
                readonly hover: "#64ecf8";
                readonly active: "#5bd8e3";
            };
            readonly blueEcume: {
                readonly default: "#e9edfe";
                readonly hover: "#c5d0fc";
                readonly active: "#adbffc";
            };
            readonly blueCumulus: {
                readonly default: "#e6eefe";
                readonly hover: "#bcd3fc";
                readonly active: "#9fc3fc";
            };
            readonly purpleGlycine: {
                readonly default: "#fee7fc";
                readonly hover: "#fdc0f8";
                readonly active: "#fca8f6";
            };
            readonly pinkMacaron: {
                readonly default: "#fee9e6";
                readonly hover: "#fdc6bd";
                readonly active: "#fcb0a2";
            };
            readonly pinkTuile: {
                readonly default: "#fee9e7";
                readonly hover: "#fdc6c0";
                readonly active: "#fcb0a7";
            };
            readonly yellowTournesol: {
                readonly default: "#feecc2";
                readonly hover: "#fbd335";
                readonly active: "#e6c130";
            };
            readonly yellowMoutarde: {
                readonly default: "#feebd0";
                readonly hover: "#fdcd6d";
                readonly active: "#f4be30";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fee9e5";
                readonly hover: "#fdc6ba";
                readonly active: "#fcb09e";
            };
            readonly brownCafeCreme: {
                readonly default: "#f7ecdb";
                readonly hover: "#edce94";
                readonly active: "#dabd84";
            };
            readonly brownCaramel: {
                readonly default: "#f7ebe5";
                readonly hover: "#eccbb9";
                readonly active: "#e6b79a";
            };
            readonly brownOpera: {
                readonly default: "#f7ece4";
                readonly hover: "#eccdb3";
                readonly active: "#e6ba90";
            };
            readonly beigeGrisGalet: {
                readonly default: "#f3ede5";
                readonly hover: "#e1d0b5";
                readonly active: "#d1bea2";
            };
            readonly info: {
                readonly default: "#e8edff";
                readonly hover: "#c2d1ff";
                readonly active: "#a9bfff";
            };
            readonly success: {
                readonly default: "#b8fec9";
                readonly hover: "#46fd89";
                readonly active: "#34eb7b";
            };
            readonly warning: {
                readonly default: "#ffe9e6";
                readonly hover: "#ffc6bd";
                readonly active: "#ffb0a2";
            };
            readonly error: {
                readonly default: "#ffe9e9";
                readonly hover: "#ffc5c5";
                readonly active: "#ffafaf";
            };
        };
        readonly flat: {
            readonly grey: {
                readonly default: "#3a3a3a";
            };
            readonly info: {
                readonly default: "#0063cb";
            };
            readonly success: {
                readonly default: "#18753c";
            };
            readonly warning: {
                readonly default: "#b34000";
            };
            readonly error: {
                readonly default: "#ce0500";
            };
        };
        readonly actionHigh: {
            readonly blueFrance: {
                readonly default: "#000091";
                readonly hover: "#1212ff";
                readonly active: "#2323ff";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
                readonly hover: "#f93f42";
                readonly active: "#f95a5c";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#66673d";
                readonly hover: "#929359";
                readonly active: "#a7a967";
            };
            readonly greenBourgeon: {
                readonly default: "#447049";
                readonly hover: "#639f6a";
                readonly active: "#72b77a";
            };
            readonly greenEmeraude: {
                readonly default: "#297254";
                readonly hover: "#3ea47a";
                readonly active: "#49bc8d";
            };
            readonly greenMenthe: {
                readonly default: "#37635f";
                readonly hover: "#53918c";
                readonly active: "#62a9a2";
            };
            readonly greenArchipel: {
                readonly default: "#006a6f";
                readonly hover: "#009fa7";
                readonly active: "#00bbc3";
            };
            readonly blueEcume: {
                readonly default: "#2f4077";
                readonly hover: "#4e68bb";
                readonly active: "#667dcf";
            };
            readonly blueCumulus: {
                readonly default: "#3558a2";
                readonly hover: "#5982e0";
                readonly active: "#7996e6";
            };
            readonly purpleGlycine: {
                readonly default: "#6e445a";
                readonly hover: "#a66989";
                readonly active: "#bb7f9e";
            };
            readonly pinkMacaron: {
                readonly default: "#8d533e";
                readonly hover: "#ca795c";
                readonly active: "#e08e73";
            };
            readonly pinkTuile: {
                readonly default: "#a94645";
                readonly hover: "#d5706f";
                readonly active: "#da8a89";
            };
            readonly yellowTournesol: {
                readonly default: "#716043";
                readonly hover: "#a28a62";
                readonly active: "#ba9f72";
            };
            readonly yellowMoutarde: {
                readonly default: "#695240";
                readonly hover: "#9b7b61";
                readonly active: "#b58f72";
            };
            readonly orangeTerreBattue: {
                readonly default: "#755348";
                readonly hover: "#ab7b6b";
                readonly active: "#c68f7d";
            };
            readonly brownCafeCreme: {
                readonly default: "#685c48";
                readonly hover: "#97866a";
                readonly active: "#ae9b7b";
            };
            readonly brownCaramel: {
                readonly default: "#845d48";
                readonly hover: "#bb8568";
                readonly active: "#d69978";
            };
            readonly brownOpera: {
                readonly default: "#745b47";
                readonly hover: "#a78468";
                readonly active: "#c09979";
            };
            readonly beigeGrisGalet: {
                readonly default: "#6a6156";
                readonly hover: "#988b7c";
                readonly active: "#afa08f";
            };
            readonly info: {
                readonly default: "#0063cb";
                readonly hover: "#3b87ff";
                readonly active: "#6798ff";
            };
            readonly success: {
                readonly default: "#18753c";
                readonly hover: "#27a959";
                readonly active: "#2fc368";
            };
            readonly warning: {
                readonly default: "#b34000";
                readonly hover: "#ff6218";
                readonly active: "#ff7a55";
            };
            readonly error: {
                readonly default: "#ce0500";
                readonly hover: "#ff2725";
                readonly active: "#ff4140";
            };
        };
        readonly actionLow: {
            readonly blueFrance: {
                readonly default: "#e3e3fd";
                readonly hover: "#c1c1fb";
                readonly active: "#adadf9";
            };
            readonly redMarianne: {
                readonly default: "#fddede";
                readonly hover: "#fbb6b6";
                readonly active: "#fa9e9e";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fbe769";
                readonly hover: "#d7c655";
                readonly active: "#c2b24c";
            };
            readonly greenBourgeon: {
                readonly default: "#a9fb68";
                readonly hover: "#8ed654";
                readonly active: "#7fc04b";
            };
            readonly greenEmeraude: {
                readonly default: "#9ef9be";
                readonly hover: "#69df97";
                readonly active: "#5ec988";
            };
            readonly greenMenthe: {
                readonly default: "#8bf8e7";
                readonly hover: "#6ed5c5";
                readonly active: "#62bfb1";
            };
            readonly greenArchipel: {
                readonly default: "#a6f2fa";
                readonly hover: "#62dbe5";
                readonly active: "#58c5cf";
            };
            readonly blueEcume: {
                readonly default: "#dee5fd";
                readonly hover: "#b4c5fb";
                readonly active: "#99b3f9";
            };
            readonly blueCumulus: {
                readonly default: "#dae6fd";
                readonly hover: "#a9c8fb";
                readonly active: "#8ab8f9";
            };
            readonly purpleGlycine: {
                readonly default: "#fddbfa";
                readonly hover: "#fbaff5";
                readonly active: "#fa96f2";
            };
            readonly pinkMacaron: {
                readonly default: "#fddfda";
                readonly hover: "#fbb8ab";
                readonly active: "#faa18d";
            };
            readonly pinkTuile: {
                readonly default: "#fddfdb";
                readonly hover: "#fbb8ad";
                readonly active: "#faa191";
            };
            readonly yellowTournesol: {
                readonly default: "#fde39c";
                readonly hover: "#e9c53b";
                readonly active: "#d3b235";
            };
            readonly yellowMoutarde: {
                readonly default: "#fde2b5";
                readonly hover: "#f6c43c";
                readonly active: "#dfb135";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fddfd8";
                readonly hover: "#fbb8a5";
                readonly active: "#faa184";
            };
            readonly brownCafeCreme: {
                readonly default: "#f4e3c7";
                readonly hover: "#e1c386";
                readonly active: "#ccb078";
            };
            readonly brownCaramel: {
                readonly default: "#f3e2d9";
                readonly hover: "#e7bea6";
                readonly active: "#e1a982";
            };
            readonly brownOpera: {
                readonly default: "#f3e2d7";
                readonly hover: "#e7bfa0";
                readonly active: "#deaa7e";
            };
            readonly beigeGrisGalet: {
                readonly default: "#eee4d9";
                readonly hover: "#dbc3a4";
                readonly active: "#c6b094";
            };
        };
        readonly active: {
            readonly blueFrance: {
                readonly default: "#000091";
                readonly hover: "#1212ff";
                readonly active: "#2323ff";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
                readonly hover: "#f93f42";
                readonly active: "#f95a5c";
            };
        };
        readonly open: {
            readonly blueFrance: {
                readonly default: "#e3e3fd";
                readonly hover: "#c1c1fb";
                readonly active: "#adadf9";
            };
            readonly redMarianne: {
                readonly default: "#fddede";
                readonly hover: "#fbb6b6";
                readonly active: "#fa9e9e";
            };
        };
        readonly disabled: {
            readonly grey: {
                readonly default: "#e5e5e5";
            };
        };
        readonly raised: {
            readonly grey: {
                readonly default: "#ffffff";
                readonly hover: "#f6f6f6";
                readonly active: "#ededed";
            };
        };
        readonly overlap: {
            readonly grey: {
                readonly default: "#ffffff";
                readonly hover: "#f6f6f6";
                readonly active: "#ededed";
            };
        };
        readonly lifted: {
            readonly grey: {
                readonly default: "#ffffff";
                readonly hover: "#f6f6f6";
                readonly active: "#ededed";
            };
        };
        readonly altRaised: {
            readonly grey: {
                readonly default: "#f6f6f6";
                readonly hover: "#dfdfdf";
                readonly active: "#cfcfcf";
            };
        };
        readonly altOverlap: {
            readonly grey: {
                readonly default: "#f6f6f6";
                readonly hover: "#dfdfdf";
                readonly active: "#cfcfcf";
            };
        };
        readonly contrastRaised: {
            readonly grey: {
                readonly default: "#eeeeee";
                readonly hover: "#d2d2d2";
                readonly active: "#c1c1c1";
            };
        };
        readonly contrastOverlap: {
            readonly grey: {
                readonly default: "#eeeeee";
                readonly hover: "#d2d2d2";
                readonly active: "#c1c1c1";
            };
        };
    };
    readonly text: {
        readonly default: {
            readonly grey: {
                readonly default: "#3a3a3a";
            };
            readonly info: {
                readonly default: "#0063cb";
            };
            readonly success: {
                readonly default: "#18753c";
            };
            readonly warning: {
                readonly default: "#b34000";
            };
            readonly error: {
                readonly default: "#ce0500";
            };
        };
        readonly actionHigh: {
            readonly grey: {
                readonly default: "#161616";
            };
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#66673d";
            };
            readonly greenBourgeon: {
                readonly default: "#447049";
            };
            readonly greenEmeraude: {
                readonly default: "#297254";
            };
            readonly greenMenthe: {
                readonly default: "#37635f";
            };
            readonly greenArchipel: {
                readonly default: "#006a6f";
            };
            readonly blueEcume: {
                readonly default: "#2f4077";
            };
            readonly blueCumulus: {
                readonly default: "#3558a2";
            };
            readonly purpleGlycine: {
                readonly default: "#6e445a";
            };
            readonly pinkMacaron: {
                readonly default: "#8d533e";
            };
            readonly pinkTuile: {
                readonly default: "#a94645";
            };
            readonly yellowTournesol: {
                readonly default: "#716043";
            };
            readonly yellowMoutarde: {
                readonly default: "#695240";
            };
            readonly orangeTerreBattue: {
                readonly default: "#755348";
            };
            readonly brownCafeCreme: {
                readonly default: "#685c48";
            };
            readonly brownCaramel: {
                readonly default: "#845d48";
            };
            readonly brownOpera: {
                readonly default: "#745b47";
            };
            readonly beigeGrisGalet: {
                readonly default: "#6a6156";
            };
        };
        readonly title: {
            readonly grey: {
                readonly default: "#161616";
            };
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
        };
        readonly label: {
            readonly grey: {
                readonly default: "#161616";
            };
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#66673d";
            };
            readonly greenBourgeon: {
                readonly default: "#447049";
            };
            readonly greenEmeraude: {
                readonly default: "#297254";
            };
            readonly greenMenthe: {
                readonly default: "#37635f";
            };
            readonly greenArchipel: {
                readonly default: "#006a6f";
            };
            readonly blueEcume: {
                readonly default: "#2f4077";
            };
            readonly blueCumulus: {
                readonly default: "#3558a2";
            };
            readonly purpleGlycine: {
                readonly default: "#6e445a";
            };
            readonly pinkMacaron: {
                readonly default: "#8d533e";
            };
            readonly pinkTuile: {
                readonly default: "#a94645";
            };
            readonly yellowTournesol: {
                readonly default: "#716043";
            };
            readonly yellowMoutarde: {
                readonly default: "#695240";
            };
            readonly orangeTerreBattue: {
                readonly default: "#755348";
            };
            readonly brownCafeCreme: {
                readonly default: "#685c48";
            };
            readonly brownCaramel: {
                readonly default: "#845d48";
            };
            readonly brownOpera: {
                readonly default: "#745b47";
            };
            readonly beigeGrisGalet: {
                readonly default: "#6a6156";
            };
        };
        readonly active: {
            readonly grey: {
                readonly default: "#161616";
            };
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
        };
        readonly mention: {
            readonly grey: {
                readonly default: "#666666";
            };
        };
        readonly inverted: {
            readonly grey: {
                readonly default: "#ffffff";
            };
            readonly blueFrance: {
                readonly default: "#f5f5fe";
            };
            readonly redMarianne: {
                readonly default: "#fef4f4";
            };
            readonly info: {
                readonly default: "#f4f6ff";
            };
            readonly success: {
                readonly default: "#dffee6";
            };
            readonly warning: {
                readonly default: "#fff4f3";
            };
            readonly error: {
                readonly default: "#fff4f4";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fef7da";
            };
            readonly greenBourgeon: {
                readonly default: "#e6feda";
            };
            readonly greenEmeraude: {
                readonly default: "#e3fdeb";
            };
            readonly greenMenthe: {
                readonly default: "#dffdf7";
            };
            readonly greenArchipel: {
                readonly default: "#e5fbfd";
            };
            readonly blueEcume: {
                readonly default: "#f4f6fe";
            };
            readonly blueCumulus: {
                readonly default: "#f3f6fe";
            };
            readonly purpleGlycine: {
                readonly default: "#fef3fd";
            };
            readonly pinkMacaron: {
                readonly default: "#fef4f2";
            };
            readonly pinkTuile: {
                readonly default: "#fef4f3";
            };
            readonly yellowTournesol: {
                readonly default: "#fef6e3";
            };
            readonly yellowMoutarde: {
                readonly default: "#fef5e8";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fef4f2";
            };
            readonly brownCafeCreme: {
                readonly default: "#fbf6ed";
            };
            readonly brownCaramel: {
                readonly default: "#fbf5f2";
            };
            readonly brownOpera: {
                readonly default: "#fbf5f2";
            };
            readonly beigeGrisGalet: {
                readonly default: "#f9f6f2";
            };
        };
        readonly disabled: {
            readonly grey: {
                readonly default: "#929292";
            };
        };
    };
    readonly border: {
        readonly default: {
            readonly grey: {
                readonly default: "#dddddd";
            };
            readonly blueFrance: {
                readonly default: "#6a6af4";
            };
            readonly redMarianne: {
                readonly default: "#e1000f";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#b7a73f";
            };
            readonly greenBourgeon: {
                readonly default: "#68a532";
            };
            readonly greenEmeraude: {
                readonly default: "#00a95f";
            };
            readonly greenMenthe: {
                readonly default: "#009081";
            };
            readonly greenArchipel: {
                readonly default: "#009099";
            };
            readonly blueEcume: {
                readonly default: "#465f9d";
            };
            readonly blueCumulus: {
                readonly default: "#417dc4";
            };
            readonly purpleGlycine: {
                readonly default: "#a558a0";
            };
            readonly pinkMacaron: {
                readonly default: "#e18b76";
            };
            readonly pinkTuile: {
                readonly default: "#ce614a";
            };
            readonly yellowTournesol: {
                readonly default: "#c8aa39";
            };
            readonly yellowMoutarde: {
                readonly default: "#c3992a";
            };
            readonly orangeTerreBattue: {
                readonly default: "#e4794a";
            };
            readonly brownCafeCreme: {
                readonly default: "#d1b781";
            };
            readonly brownCaramel: {
                readonly default: "#c08c65";
            };
            readonly brownOpera: {
                readonly default: "#bd987a";
            };
            readonly beigeGrisGalet: {
                readonly default: "#aea397";
            };
        };
        readonly active: {
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
        };
        readonly actionHigh: {
            readonly grey: {
                readonly default: "#161616";
            };
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
            readonly info: {
                readonly default: "#0063cb";
            };
            readonly success: {
                readonly default: "#18753c";
            };
            readonly warning: {
                readonly default: "#b34000";
            };
            readonly error: {
                readonly default: "#ce0500";
            };
        };
        readonly actionLow: {
            readonly blueFrance: {
                readonly default: "#cacafb";
            };
            readonly redMarianne: {
                readonly default: "#fcbfbf";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#e2cf58";
            };
            readonly greenBourgeon: {
                readonly default: "#95e257";
            };
            readonly greenEmeraude: {
                readonly default: "#6fe49d";
            };
            readonly greenMenthe: {
                readonly default: "#73e0cf";
            };
            readonly greenArchipel: {
                readonly default: "#60e0eb";
            };
            readonly blueEcume: {
                readonly default: "#bfccfb";
            };
            readonly blueCumulus: {
                readonly default: "#b6cffb";
            };
            readonly purpleGlycine: {
                readonly default: "#fbb8f6";
            };
            readonly pinkMacaron: {
                readonly default: "#fcc0b4";
            };
            readonly pinkTuile: {
                readonly default: "#fcbfb7";
            };
            readonly yellowTournesol: {
                readonly default: "#efcb3a";
            };
            readonly yellowMoutarde: {
                readonly default: "#fcc63a";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fcc0b0";
            };
            readonly brownCafeCreme: {
                readonly default: "#e7ca8e";
            };
            readonly brownCaramel: {
                readonly default: "#eac7b2";
            };
            readonly brownOpera: {
                readonly default: "#eac7ad";
            };
            readonly beigeGrisGalet: {
                readonly default: "#e0cab0";
            };
        };
        readonly open: {
            readonly blueFrance: {
                readonly default: "#e3e3fd";
            };
            readonly redMarianne: {
                readonly default: "#fddede";
            };
        };
        readonly plain: {
            readonly grey: {
                readonly default: "#3a3a3a";
            };
            readonly blueFrance: {
                readonly default: "#000091";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
            };
            readonly info: {
                readonly default: "#0063cb";
            };
            readonly success: {
                readonly default: "#18753c";
            };
            readonly warning: {
                readonly default: "#b34000";
            };
            readonly error: {
                readonly default: "#ce0500";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#66673d";
            };
            readonly greenBourgeon: {
                readonly default: "#447049";
            };
            readonly greenEmeraude: {
                readonly default: "#297254";
            };
            readonly greenMenthe: {
                readonly default: "#37635f";
            };
            readonly greenArchipel: {
                readonly default: "#006a6f";
            };
            readonly blueEcume: {
                readonly default: "#2f4077";
            };
            readonly blueCumulus: {
                readonly default: "#3558a2";
            };
            readonly purpleGlycine: {
                readonly default: "#6e445a";
            };
            readonly pinkMacaron: {
                readonly default: "#8d533e";
            };
            readonly pinkTuile: {
                readonly default: "#a94645";
            };
            readonly yellowTournesol: {
                readonly default: "#716043";
            };
            readonly yellowMoutarde: {
                readonly default: "#695240";
            };
            readonly orangeTerreBattue: {
                readonly default: "#755348";
            };
            readonly brownCafeCreme: {
                readonly default: "#685c48";
            };
            readonly brownCaramel: {
                readonly default: "#845d48";
            };
            readonly brownOpera: {
                readonly default: "#745b47";
            };
            readonly beigeGrisGalet: {
                readonly default: "#6a6156";
            };
        };
        readonly disabled: {
            readonly grey: {
                readonly default: "#e5e5e5";
            };
        };
    };
    readonly artwork: {
        readonly major: {
            readonly blueFrance: {
                readonly default: "#000091";
                readonly hover: "#1212ff";
                readonly active: "#2323ff";
            };
            readonly redMarianne: {
                readonly default: "#c9191e";
                readonly hover: "#f93f42";
                readonly active: "#f95a5c";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#66673d";
                readonly hover: "#929359";
                readonly active: "#a7a967";
            };
            readonly greenBourgeon: {
                readonly default: "#447049";
                readonly hover: "#639f6a";
                readonly active: "#72b77a";
            };
            readonly greenEmeraude: {
                readonly default: "#297254";
                readonly hover: "#3ea47a";
                readonly active: "#49bc8d";
            };
            readonly greenMenthe: {
                readonly default: "#37635f";
                readonly hover: "#53918c";
                readonly active: "#62a9a2";
            };
            readonly greenArchipel: {
                readonly default: "#006a6f";
                readonly hover: "#009fa7";
                readonly active: "#00bbc3";
            };
            readonly blueEcume: {
                readonly default: "#2f4077";
                readonly hover: "#4e68bb";
                readonly active: "#667dcf";
            };
            readonly blueCumulus: {
                readonly default: "#3558a2";
                readonly hover: "#5982e0";
                readonly active: "#7996e6";
            };
            readonly purpleGlycine: {
                readonly default: "#6e445a";
                readonly hover: "#a66989";
                readonly active: "#bb7f9e";
            };
            readonly pinkMacaron: {
                readonly default: "#8d533e";
                readonly hover: "#ca795c";
                readonly active: "#e08e73";
            };
            readonly pinkTuile: {
                readonly default: "#a94645";
                readonly hover: "#d5706f";
                readonly active: "#da8a89";
            };
            readonly yellowTournesol: {
                readonly default: "#716043";
                readonly hover: "#a28a62";
                readonly active: "#ba9f72";
            };
            readonly yellowMoutarde: {
                readonly default: "#695240";
                readonly hover: "#9b7b61";
                readonly active: "#b58f72";
            };
            readonly orangeTerreBattue: {
                readonly default: "#755348";
                readonly hover: "#ab7b6b";
                readonly active: "#c68f7d";
            };
            readonly brownCafeCreme: {
                readonly default: "#685c48";
                readonly hover: "#97866a";
                readonly active: "#ae9b7b";
            };
            readonly brownCaramel: {
                readonly default: "#845d48";
                readonly hover: "#bb8568";
                readonly active: "#d69978";
            };
            readonly brownOpera: {
                readonly default: "#745b47";
                readonly hover: "#a78468";
                readonly active: "#c09979";
            };
            readonly beigeGrisGalet: {
                readonly default: "#6a6156";
                readonly hover: "#988b7c";
                readonly active: "#afa08f";
            };
        };
        readonly minor: {
            readonly blueFrance: {
                readonly default: "#6a6af4";
            };
            readonly redMarianne: {
                readonly default: "#e1000f";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#b7a73f";
            };
            readonly greenBourgeon: {
                readonly default: "#68a532";
            };
            readonly greenEmeraude: {
                readonly default: "#00a95f";
            };
            readonly greenMenthe: {
                readonly default: "#009081";
            };
            readonly greenArchipel: {
                readonly default: "#009099";
            };
            readonly blueEcume: {
                readonly default: "#465f9d";
            };
            readonly blueCumulus: {
                readonly default: "#417dc4";
            };
            readonly purpleGlycine: {
                readonly default: "#a558a0";
            };
            readonly pinkMacaron: {
                readonly default: "#e18b76";
            };
            readonly pinkTuile: {
                readonly default: "#ce614a";
            };
            readonly yellowTournesol: {
                readonly default: "#c8aa39";
            };
            readonly yellowMoutarde: {
                readonly default: "#c3992a";
            };
            readonly orangeTerreBattue: {
                readonly default: "#e4794a";
            };
            readonly brownCafeCreme: {
                readonly default: "#d1b781";
            };
            readonly brownCaramel: {
                readonly default: "#c08c65";
            };
            readonly brownOpera: {
                readonly default: "#bd987a";
            };
            readonly beigeGrisGalet: {
                readonly default: "#aea397";
            };
        };
        readonly decorative: {
            readonly grey: {
                readonly default: "#eeeeee";
            };
            readonly blueFrance: {
                readonly default: "#ececfe";
            };
            readonly redMarianne: {
                readonly default: "#fee9e9";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fceeac";
            };
            readonly greenBourgeon: {
                readonly default: "#c9fcac";
            };
            readonly greenEmeraude: {
                readonly default: "#c3fad5";
            };
            readonly greenMenthe: {
                readonly default: "#bafaee";
            };
            readonly greenArchipel: {
                readonly default: "#c7f6fc";
            };
            readonly blueEcume: {
                readonly default: "#e9edfe";
            };
            readonly blueCumulus: {
                readonly default: "#e6eefe";
            };
            readonly purpleGlycine: {
                readonly default: "#fee7fc";
            };
            readonly pinkMacaron: {
                readonly default: "#fee9e6";
            };
            readonly pinkTuile: {
                readonly default: "#fee9e7";
            };
            readonly yellowTournesol: {
                readonly default: "#feecc2";
            };
            readonly yellowMoutarde: {
                readonly default: "#feebd0";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fee9e5";
            };
            readonly brownCafeCreme: {
                readonly default: "#f7ecdb";
            };
            readonly brownCaramel: {
                readonly default: "#f7ebe5";
            };
            readonly brownOpera: {
                readonly default: "#f7ece4";
            };
            readonly beigeGrisGalet: {
                readonly default: "#f3ede5";
            };
        };
        readonly background: {
            readonly grey: {
                readonly default: "#f6f6f6";
            };
            readonly blueFrance: {
                readonly default: "#f5f5fe";
            };
            readonly redMarianne: {
                readonly default: "#fef4f4";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fef7da";
            };
            readonly greenBourgeon: {
                readonly default: "#e6feda";
            };
            readonly greenEmeraude: {
                readonly default: "#e3fdeb";
            };
            readonly greenMenthe: {
                readonly default: "#dffdf7";
            };
            readonly greenArchipel: {
                readonly default: "#e5fbfd";
            };
            readonly blueEcume: {
                readonly default: "#f4f6fe";
            };
            readonly blueCumulus: {
                readonly default: "#f3f6fe";
            };
            readonly purpleGlycine: {
                readonly default: "#fef3fd";
            };
            readonly pinkMacaron: {
                readonly default: "#fef4f2";
            };
            readonly pinkTuile: {
                readonly default: "#fef4f3";
            };
            readonly yellowTournesol: {
                readonly default: "#fef6e3";
            };
            readonly yellowMoutarde: {
                readonly default: "#fef5e8";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fef4f2";
            };
            readonly brownCafeCreme: {
                readonly default: "#fbf6ed";
            };
            readonly brownCaramel: {
                readonly default: "#fbf5f2";
            };
            readonly brownOpera: {
                readonly default: "#fbf5f2";
            };
            readonly beigeGrisGalet: {
                readonly default: "#f9f6f2";
            };
        };
        readonly motif: {
            readonly grey: {
                readonly default: "#e5e5e5";
            };
            readonly blueFrance: {
                readonly default: "#e3e3fd";
            };
            readonly redMarianne: {
                readonly default: "#fddede";
            };
            readonly greenTilleulVerveine: {
                readonly default: "#fbe769";
            };
            readonly greenBourgeon: {
                readonly default: "#a9fb68";
            };
            readonly greenEmeraude: {
                readonly default: "#9ef9be";
            };
            readonly greenMenthe: {
                readonly default: "#8bf8e7";
            };
            readonly greenArchipel: {
                readonly default: "#a6f2fa";
            };
            readonly blueEcume: {
                readonly default: "#dee5fd";
            };
            readonly blueCumulus: {
                readonly default: "#dae6fd";
            };
            readonly purpleGlycine: {
                readonly default: "#fddbfa";
            };
            readonly pinkMacaron: {
                readonly default: "#fddfda";
            };
            readonly pinkTuile: {
                readonly default: "#fddfdb";
            };
            readonly yellowTournesol: {
                readonly default: "#fde39c";
            };
            readonly yellowMoutarde: {
                readonly default: "#fde2b5";
            };
            readonly orangeTerreBattue: {
                readonly default: "#fddfd8";
            };
            readonly brownCafeCreme: {
                readonly default: "#f4e3c7";
            };
            readonly brownCaramel: {
                readonly default: "#f3e2d9";
            };
            readonly brownOpera: {
                readonly default: "#f3e2d7";
            };
            readonly beigeGrisGalet: {
                readonly default: "#eee4d9";
            };
        };
    };
};
export type ColorDecisions = ReturnType<typeof getColorDecisions>;
