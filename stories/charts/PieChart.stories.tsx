import { PieChart, type PieChartProps } from "../../dist/Chart/PieChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<PieChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { PieChart },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants-beta/graphiques-charts/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Chart/BarChart.tsx)`,
    "argTypes": {
        "x": {
            "description": "Array of value for the x axis"
        },
        "y": {
            "description": "Array of value for the y axis"
        },
        "name": { "description": "Array of name", control: "object" },
        "color": { "description": "Array of color", control: "object" },
        "fill": { control: "boolean" }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    x: [1, 2, 3],
    y: [10, 20, 30]
});
