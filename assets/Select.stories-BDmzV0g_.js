import{a as p,R as e}from"./iframe-BpEV2pGA.js";import{S as s}from"./Select-r1QViMCd.js";import{g as c}from"./getStory-Bli_4i1k.js";import"./preload-helper-PPVm8Dsz.js";const{meta:u,getStory:t}=c({wrappedComponent:{Select:s},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/liste-deroulante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Select.tsx)

> 🗣️ This implementation of the <Select /> component is headless. It matched very closely the behavior of a native select input.  
> Try out [\`SelectNext\`](https://components.react-dsfr.codegouv.studio/?path=/docs/components-selectnext--default) if you want a smarter component with better type inference.  

## Controlled

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState("");

    return (
        <Select
            label="Label"
            nativeSelectProps={{
                onChange: event => setValue(event.target.value),
                value
            }}
        >
            <option value="" disabled hidden>Selectionnez une option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </Select>
    );

}
\`\`\`

## Uncontrolled

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    return (
        <form>
            <Select
                label="Label"
                nativeSelectProps={{
                    name: "my-select"
                }}
            >
                <option value="" selected disabled hidden>Selectionnez une option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
            </Select>
        </form>
    );

}
\`\`\`

`,argTypes:{label:{control:{type:"text"}},nativeSelectProps:{description:"The props that you would pass to a native `<select />`",control:!1},children:{description:"The `children` that you would give a native `<select />`",control:!1},disabled:{control:{type:"boolean"}},hint:{control:{type:"text"}},state:{options:(()=>{const r=["success","error","info","default"];return p(),r})(),control:{type:"select"}},stateRelatedMessage:{description:"Text to provide if the state is defined",control:{type:"text"}}},disabledProps:["lang"]}),b={...u,title:"components/Select"},o=t({label:"Label pour liste déroulante",nativeSelectProps:{},children:e.createElement(e.Fragment,null,e.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Selectionnez une option"),e.createElement("option",{value:"1"},"Option 1"),e.createElement("option",{value:"2"},"Option 2"),e.createElement("option",{value:"3"},"Option 3"),e.createElement("option",{value:"4"},"Option 4"))}),n=t({label:"Label pour liste déroulante",state:"error",stateRelatedMessage:"Texte d’erreur obligatoire",nativeSelectProps:{},children:e.createElement(e.Fragment,null,e.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Selectionnez une option"),e.createElement("option",{value:"1"},"Option 1"),e.createElement("option",{value:"2"},"Option 2"),e.createElement("option",{value:"3"},"Option 3"),e.createElement("option",{value:"4"},"Option 4"))}),i=t({label:"Label pour liste déroulante",state:"success",stateRelatedMessage:"Texte de validation",nativeSelectProps:{},children:e.createElement(e.Fragment,null,e.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Selectionnez une option"),e.createElement("option",{value:"1"},"Option 1"),e.createElement("option",{value:"2"},"Option 2"),e.createElement("option",{value:"3"},"Option 3"),e.createElement("option",{value:"4"},"Option 4"))}),a=t({label:"Label pour liste déroulante",disabled:!0,nativeSelectProps:{},children:e.createElement(e.Fragment,null,e.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Selectionnez une option"),e.createElement("option",{value:"1"},"Option 1"),e.createElement("option",{value:"2"},"Option 2"),e.createElement("option",{value:"3"},"Option 3"),e.createElement("option",{value:"4"},"Option 4"))}),l=t({label:"Label pour liste déroulante",hint:"Texte de description additionnel",nativeSelectProps:{},children:e.createElement(e.Fragment,null,e.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Selectionnez une option"),e.createElement("option",{value:"1"},"Option 1"),e.createElement("option",{value:"2"},"Option 2"),e.createElement("option",{value:"3"},"Option 3"),e.createElement("option",{value:"4"},"Option 4"))});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "nativeSelectProps": {},
  "children": <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
})`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "state": "error",
  "stateRelatedMessage": "Texte d’erreur obligatoire",
  "nativeSelectProps": {},
  "children": <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
})`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "state": "success",
  "stateRelatedMessage": "Texte de validation",
  "nativeSelectProps": {},
  "children": <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
})`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "disabled": true,
  "nativeSelectProps": {},
  "children": <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
})`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "hint": "Texte de description additionnel",
  "nativeSelectProps": {},
  "children": <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
})`,...l.parameters?.docs?.source}}};const O=["Default","ErrorState","SuccessState","Disabled","WithHint"];export{o as Default,a as Disabled,n as ErrorState,i as SuccessState,l as WithHint,O as __namedExportsOrder,b as default};
