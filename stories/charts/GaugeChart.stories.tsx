import { GaugeChart, type GaugeChartProps } from "../../dist/Chart/GaugeChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<GaugeChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { GaugeChart },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants-beta/graphiques-charts/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Chart/BarChart.tsx)`,
    "argTypes": {
        "value": {
            "description": "Current value"
        },
        "init": {
            "description": "Base value"
        },
        "target": {
            "description": "Target value"
        },
        "color": {
            "description": "Color"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    value: 16,
    init: 10,
    target: 20,
    color: "blue-france"
});
