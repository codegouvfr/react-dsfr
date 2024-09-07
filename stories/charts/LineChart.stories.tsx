import { LineChart, type LineChartProps } from "../../dist/Chart/LineChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<LineChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { LineChart },
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
        "hline": { "description": "Array of horizontal lines to add", control: "object" },
        "hlinename": { "description": "Name of the horizontal lines", control: "object" },
        "vline": { "description": "Array of vertical lines to add", control: "object" },
        "vlinename": { "description": "Name of the vertical lines", control: "object" },
        "vlinecolor": { "description": "Color of the horizontal lines", control: "object" },
        "hlinecolor": { "description": "Color of the vertical lines", control: "object" }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    x: [1, 2, 3],
    y: [10, 20, 30]
});
