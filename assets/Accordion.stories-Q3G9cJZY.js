import{A as e}from"./Accordion-ClqEbEcb.js";import{g as n,l as t}from"./getStory-Bli_4i1k.js";import"./iframe-BpEV2pGA.js";import"./preload-helper-PPVm8Dsz.js";const{meta:r,getStory:c}=n({wrappedComponent:{Accordion:e},argTypes:{label:{control:{type:"text"}},titleAs:{description:"Define the heading level of the accordion label",options:["h1","h2","h3","h4","h5","h6",void 0]},children:{control:{type:"text"}},defaultExpanded:{control:{type:"boolean"}}},description:`- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon)
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
\`\`\``,disabledProps:["lang"]}),l={...r,title:"components/Accordion"},o=c({label:"Name of the Accordion",titleAs:void 0,children:"Content of the Accordion",defaultExpanded:!1,...t(["onExpandedChange"])});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "label": "Name of the Accordion",
  "titleAs": undefined,
  "children": "Content of the Accordion",
  "defaultExpanded": false,
  ...logCallbacks(["onExpandedChange"])
})`,...o.parameters?.docs?.source}}};const p=["Default"];export{o as Default,p as __namedExportsOrder,l as default};
