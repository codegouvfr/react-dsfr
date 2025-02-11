import { RadarChart, type RadarChartProps } from "../../dist/Chart/RadarChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<RadarChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { RadarChart },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants-beta/graphiques-charts/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Chart/BarChart.tsx)

To use this component you need to add \`@gouvfr/dsfr-chart\` to your dependencies.  

Note for Next users: Chart components are not SSR compatible. You need to import them dynamically with [\`next/dynamic\`](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic).  
You can find an example [here](https://github.com/codegouvfr/react-dsfr/blob/bc2c2be290b09684711c53176b7a379cebed08a8/test/integration/next-appdir/app/dsfr-chart/page.tsx#L8-L9).  

`,
    "argTypes": {
        "x": {
            "description": "Array of value for the x axis"
        },
        "y": {
            "description": "Array of value for the y axis"
        },
        "name": { "description": "Array of name", control: "object" },
        "color": { "description": "Array of color", control: "object" }
    },
    "disabledProps": ["lang"],
    isChartComponent: true
});

export default meta;

export const Default = getStory({
    x: [
        ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"]
    ],
    y: [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100],
        [12, 12, 20, 23, 13, 14, 15]
    ]
});
