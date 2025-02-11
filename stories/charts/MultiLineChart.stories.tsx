import { MultiLineChart, type MultiLineChartProps } from "../../dist/Chart/MultiLineChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<MultiLineChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { MultiLineChart },
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
        "color": { "description": "Array of color", control: "object" },
        "hline": { "description": "Array of horizontal lines to add", control: "object" },
        "hlinename": { "description": "Name of the horizontal lines", control: "object" },
        "vline": { "description": "Array of vertical lines to add", control: "object" },
        "vlinename": { "description": "Name of the vertical lines", control: "object" },
        "vlinecolor": { "description": "Color of the horizontal lines", control: "object" },
        "hlinecolor": { "description": "Color of the vertical lines", control: "object" }
    },
    "disabledProps": ["lang"],
    isChartComponent: true
});

export default meta;

export const Default = getStory({
    x: [
        [1, 2, 3],
        [1, 2, 3]
    ],
    y: [
        [30, 10, 20],
        [10, 20, 30]
    ]
});
