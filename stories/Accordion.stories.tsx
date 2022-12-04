import { Accordion } from "../dist/Accordion";
import { getStoryFactory } from "./getStory";
//import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    "sectionName": "wip",
    "wrappedComponent": { Accordion },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Accordion.tsx)  

## Controlled 

In this mode you are in charge of the behavior of the Accordion.  
_NOTE: In controlled mode there is no animation transition when expanding or colapsing the accordion._

\`\`\`tsx
function ControlledAccordion() {
    const [expanded,setExpanded] = useState(true)
    return (
        <Accordion label="Name of the Accordion" content="Content of the Accordion" onChange={(e,value) => setExpanded(!value)} expanded={expanded}/>
    );

}
\`\`\``,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Name of the Accordion",
    "content": "Content of the Accordion",
    "defaultExpanded": false
});
