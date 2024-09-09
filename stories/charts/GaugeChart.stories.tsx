import { GaugeChart, type GaugeChartProps } from "../../dist/Chart/GaugeChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<GaugeChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { GaugeChart },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants-beta/graphiques-charts/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Chart/BarChart.tsx)

To use this component you need to add \`@gouvfr/dsfr-chart\` to your dependencies.  

Note for Next users: Chart components are not SSR compatible. You need to import them dynamically with [\`next/dynamic\`](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic).  
You can find an example [here](https://github.com/codegouvfr/react-dsfr/blob/bc2c2be290b09684711c53176b7a379cebed08a8/test/integration/next-appdir/app/dsfr-chart/page.tsx#L8-L9).  

`,
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
