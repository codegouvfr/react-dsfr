import { BarChart, type BarChartProps } from "../dist/Chart/BarChart";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { BarChart },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants-beta/graphiques-charts/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Chart/BarChart.tsx)`,
    "argTypes": {},
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "x": [["Serie 1", "Serie 2"]],
    "y": [
        [1, 2, 3],
        [2, 3, 4]
    ]
});
