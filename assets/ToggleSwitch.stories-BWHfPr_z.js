import{T as c}from"./ToggleSwitch-Alb1a8T0.js";import{g as s,l as d}from"./getStory-Bli_4i1k.js";import{a as p}from"./iframe-BpEV2pGA.js";import"./preload-helper-PPVm8Dsz.js";const{meta:h,getStory:e}=s({wrappedComponent:{ToggleSwitch:c},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur)
- [See DSFR demo](https://main--ds-gouv.netlify.app/example/component/toggle/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ToggleSwitch.tsx)

## Uncontrolled

In this mode the \`ToggleSwitch\` component is in charge for managing it's internal state.  

\`\`\`tsx
<form action="/api/submit">
    {/* ... */}
    <ToggleSwitch
        label="Accept therme and conditions"
        inputTitle="terms"
        defaultChecked={false}
    />
</form> 
\`\`\`

## Controlled 

In this mode you are in charge to update the toggle state.  

\`\`\`tsx
function ControlledToggleSwitch() {

    const [areThermAccepted, setAreThermAccepted] = useState(false);

    return (
        <ToggleSwitch
            label="Accept therme and conditions"
            checked={areThermAccepted}
            onChange={checked => setAreThermAccepted(checked)}
        />
    );

}
\`\`\`

`,argTypes:{label:{description:"The label of the toggle switch",control:{type:"text"}},inputTitle:{description:"The title attribute of the underlying input",control:{type:"text"}},helperText:{description:"The helper text displayed below the toggle switch",control:{type:"text"}},disabled:{description:"Whether the toggle switch is disabled or not",control:{type:"boolean"}},labelPosition:{control:{type:"radio",options:(()=>{const n=["right","left"];return p(),n})()},description:'Default: "right"'},defaultChecked:{description:"Only in uncontrolled mode. Default: false"}},disabledProps:["lang"]}),m={...h,title:"components/ToggleSwitch"},t=e({label:"Label action interrupteur",helperText:"Texte d’aide pour clarifier l’action",disabled:!1,labelPosition:"right",showCheckedHint:!0,defaultChecked:!1,inputTitle:"the-title"}),i=e({label:"Label action interrupteur",disabled:!1,labelPosition:"right",showCheckedHint:!1,inputTitle:"the-title"}),r=e({label:"Label action interrupteur",helperText:"Texte d’aide pour clarifier l’action",disabled:!0,labelPosition:"right",inputTitle:"the-title"}),l=e({label:"Label action interrupteur",helperText:"Texte d’aide pour clarifier l’action",labelPosition:"left",inputTitle:"the-title"}),o=e({label:"Label action interrupteur",helperText:"Texte d’aide pour clarifier l’action",labelPosition:"left",defaultChecked:!0,inputTitle:"the-title",...d(["onChange"])}),a=e({label:"Label action interrupteur",helperText:"Texte d’aide pour clarifier l’action",labelPosition:"left",disabled:!0,inputTitle:"the-title"});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label action interrupteur",
  "helperText": "Texte d’aide pour clarifier l’action",
  "disabled": false,
  "labelPosition": "right",
  "showCheckedHint": true,
  "defaultChecked": false,
  "inputTitle": "the-title"
})`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label action interrupteur",
  "disabled": false,
  "labelPosition": "right",
  "showCheckedHint": false,
  "inputTitle": "the-title"
})`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label action interrupteur",
  "helperText": "Texte d’aide pour clarifier l’action",
  "disabled": true,
  "labelPosition": "right",
  "inputTitle": "the-title"
})`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label action interrupteur",
  "helperText": "Texte d’aide pour clarifier l’action",
  "labelPosition": "left",
  "inputTitle": "the-title"
})`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label action interrupteur",
  "helperText": "Texte d’aide pour clarifier l’action",
  "labelPosition": "left",
  "defaultChecked": true,
  "inputTitle": "the-title",
  ...logCallbacks(["onChange"])
})`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label action interrupteur",
  "helperText": "Texte d’aide pour clarifier l’action",
  "labelPosition": "left",
  "disabled": true,
  "inputTitle": "the-title"
})`,...a.parameters?.docs?.source}}};const f=["Default","ToggleSwitchNoTextNoHint","ToggleSwitchDisabled","ToggleSwitchLabelLeft","ToggleSwitchLabelLeftCheckedWithOnChange","ToggleSwitchLabelLeftCheckedDisabled"];export{t as Default,r as ToggleSwitchDisabled,l as ToggleSwitchLabelLeft,a as ToggleSwitchLabelLeftCheckedDisabled,o as ToggleSwitchLabelLeftCheckedWithOnChange,i as ToggleSwitchNoTextNoHint,f as __namedExportsOrder,m as default};
