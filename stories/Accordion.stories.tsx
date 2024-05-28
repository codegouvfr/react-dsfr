import { Accordion } from "../dist/Accordion";
import { getStoryFactory, logCallbacks } from "./getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Accordion },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Accordion.tsx)  

## Accordion group 

If you want to use a group of accordion, you just have to wrap your accordion in a div with a class \`fr-accordions-group\` as bellow :

\`\`\`tsx
import { fr } from "@codegouvfr/react-dsfr";

<div className={fr.cx("fr-accordions-group")}>
    <Accordion label="Name of the Accordion 1">Content of the Accordion 1</Accordion>
    <Accordion label="Name of the Accordion 2">Content of the Accordion 2</Accordion>
</div>
\`\`\`

## Controlled

In this mode you are in charge of the behavior of the Accordion.  
_NOTE: In controlled mode there is no animation transition when expanding or colapsing the accordion._

\`\`\`tsx
function ControlledAccordion() {
    const [ expanded, setExpanded ] = useState(false)
    return (
        <Accordion 
            label="Name of the Accordion" 
            onExpandedChange={(value,) => setExpanded(!value)} 
            expanded={expanded}
        >
            Content of the Accordion
        </Accordion>
    );
}
\`\`\``,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Name of the Accordion",
    "children": "Content of the Accordion",
    "defaultExpanded": false,
    ...logCallbacks(["onExpandedChange"])
});
