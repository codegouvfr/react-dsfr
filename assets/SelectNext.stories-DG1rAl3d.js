import{r as V,a as z,u as A,c as q,R as p,b as R,f as m,s as $}from"./iframe-DCkbD6Ro.js";import{e as U}from"./exclude-B3YdXBjJ.js";import{g as B}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var T=function(e,b){var d={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&b.indexOf(t)<0&&(d[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,t=Object.getOwnPropertySymbols(e);c<t.length;c++)b.indexOf(t[c])<0&&Object.prototype.propertyIsEnumerable.call(e,t[c])&&(d[t[c]]=e[t[c]]);return d};function Y(e,b){var d;const{id:t,className:c,label:E,hint:I,nativeSelectProps:a={},disabled:C=(d=a.disabled)!==null&&d!==void 0?d:!1,options:f,state:u="default",stateRelatedMessage:_,placeholder:M,style:j}=e,F=T(e,["id","className","label","hint","nativeSelectProps","disabled","options","state","stateRelatedMessage","placeholder","style"]);z();const H=A({defaultIdPrefix:"fr-select-group",explicitlyProvidedId:t}),{selectId:W,stateDescriptionId:N}=(function(){const l=a.id,n=V.useId(),r=l??`select-${n}`,D=l!==void 0?`${l}-desc`:`select-${n}-desc`;return{selectId:r,stateDescriptionId:D}})(),{t:k}=G();return p.createElement("div",Object.assign({id:H,className:R(m.cx("fr-select-group",C&&"fr-select-group--disabled",u!=="default"&&`fr-select-group--${u}`),c),ref:b,style:j},F),!!(E||I)&&p.createElement("label",{className:m.cx("fr-label"),htmlFor:W},E,I!==void 0&&p.createElement("span",{className:m.cx("fr-hint-text")},I)),p.createElement("select",Object.assign({},a,(()=>{var o;const l=a!==void 0&&"value"in a,n=l?a.value===void 0:f.find(r=>r.selected)===void 0;return l?n?{value:""}:{}:{defaultValue:n?(o=a?.defaultValue)!==null&&o!==void 0?o:"":(()=>{const r=f.find(D=>D.selected);return z(r!==void 0),r.value})()}})(),{className:R(m.cx("fr-select"),a.className),id:W,"aria-describedby":u!=="default"&&a["aria-describedby"]!==void 0?`${N} ${a["aria-describedby"]}`:u!=="default"?N:void 0,disabled:C}),[f.find(o=>o.value==="")!==void 0?void 0:{label:M===void 0?k("select an option"):M,value:"",disabled:!0},...f.map(o=>{var{selected:l}=o,n=T(o,["selected"]);return n})].filter(U(void 0)).map((o,l)=>{var{label:n}=o,r=T(o,["label"]);return p.createElement("option",Object.assign({},r,{key:`${r.value}-${l}`}),n)})),u!=="default"&&p.createElement("p",{id:N,className:m.cx(`fr-${u}-text`)},_))}const L=V.memo(V.forwardRef(Y));L.displayName=$({Select:L});const{useTranslation:G,addSelectTranslations:J}=q({componentName:$({Select:L}),frMessages:{"select an option":"Sélectionner une option"}});J({lang:"en",messages:{"select an option":"Select an option"}});const{meta:K,getStory:s}=B({wrappedComponent:{SelectNext:L},doHideImportInstruction:!0,description:`
\`\`\`tsx

import { Select } from "@codegouvfr/react-dsfr/SelectNext";

\`\`\`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SelectNext.tsx)


## Controlled

You want to make the user select an option between "foo", "bar" and "baz".

For all examples we assumes those are defined:

\`\`\`tsx
const values = ["foo", "bar", "baz"] as const;

type Value = typeof values[number]; // "foo" | "bar" | "baz";
\`\`\`

### No value is pre selected

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState<Value | undefined>(undefined);

    return (
        {/* 
          * If the user didn't select anything, 
          * when submitted the value of "my-select" will be "" 
          */}
        <Select
            label="..."
            placeholder="Select an options"
            nativeSelectProps={{
                value,
                onChange: event => setValue(event.target.value)
            }}
            options={values.map(value=> ({
                value,
                "label": \`Option \${value}\`
            }))}
        />
    );

}
\`\`\`

> NOTE: In this implementation, once the use has selected a value it can't be unselected.  
> If you need you want your users to be able to unselect please provide an option with an empty string as value
> and use the next example as reference.  

### Value pre-selected

"bar" selected by default.

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState<Value>("bar");

    return (
        <Select
            label="..."
            nativeSelectProps={{
                value,
                onChange: event => setValue(event.target.value)
            }}
            options={values.map(value=> ({
                value,
                "label": \`Option \${value}\`
            }))}
        />
    );

}
\`\`\`

## Uncontrolled

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    return (
        <form method="POST" action="...">
            {/* 
              * With no value pre selected, if the user didn't select anything, 
              * when submitted the value of "my-select" will be "".  
              * Here as well, the value once selected can't be unselected.
              * Use an explicit option with an empty string as value and set selected to true to allow unselecting.  
              */}
            <Select
                label="Label"
                nativeSelectProps={{
                    name: "my-select"
                }}
                options={[
                    {
                        value: "1",
                        label: "Option 1",
                    },
                    {
                        value: "2",
                        label: "Option 2",
                    },
                    {
                        value: "3",
                        label: "Option 3",
                    }
                ]}
                placeholder="Select an option"
            />
            {/* With a value pre selected ("bar") */}
            <Select
                label="Label"
                nativeSelectProps={{
                    name: "my-select-2"
                }}
                options={[
                    {
                        value: "foo",
                        label: "Option foo",
                    },
                    {
                        value: "bar",
                        label: "Option bar",
                        selected: true
                    },
                    {
                        value: "baz",
                        label: "Option baz",
                    }
                ]}
            />
        </form>
    );
}
\`\`\`

`,argTypes:{label:{control:{type:"text"}},options:{description:"The options to display in the select",control:!1},nativeSelectProps:{description:"The props that you would pass to a native `<select />`",control:!1},disabled:{control:{type:"boolean"}},placeholder:{description:"Adds a fake placeholder for the select element",control:{type:"text"}},hint:{control:{type:"text"}},state:{options:(()=>{const e=["valid","error","info","default"];return z(),e})(),control:{type:"select"}},stateRelatedMessage:{description:"Text to provide if the state is defined",control:{type:"text"}}},disabledProps:["lang"]}),te={...K,title:"components/SelectNext"},i=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"}],v=s({label:"Label pour liste déroulante",options:i}),S=s({label:"Label pour liste déroulante",options:[...i,{value:"4",label:"Option 4",selected:!0}]}),h=s({label:"Label pour liste déroulante",options:i,nativeSelectProps:{defaultValue:"2"}}),y=s({label:"Label pour liste déroulante",placeholder:"Sélectionnez une option",options:i}),g=s({label:"Label pour liste déroulante",state:"error",stateRelatedMessage:"Texte d’erreur obligatoire",options:i}),x=s({label:"Label pour liste déroulante",state:"valid",stateRelatedMessage:"Texte de validation",placeholder:"Sélectionnez une option",options:i}),O=s({label:"Label pour liste déroulante",disabled:!0,placeholder:"Sélectionnez une option",options:i}),w=s({label:"Label pour liste déroulante",hint:"Texte de description additionnel",placeholder:"Sélectionnez une option",options:i}),P=s({label:"Label pour liste déroulante",nativeSelectProps:{id:"my-unique-id"},options:i});v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  options
})`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  options: [...options, {
    "value": "4",
    "label": "Option 4",
    "selected": true
  }]
})`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  options,
  "nativeSelectProps": {
    "defaultValue": "2"
  }
})`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "placeholder": "Sélectionnez une option",
  options
})`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "state": "error",
  "stateRelatedMessage": "Texte d’erreur obligatoire",
  options
})`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "state": "valid",
  "stateRelatedMessage": "Texte de validation",
  "placeholder": "Sélectionnez une option",
  options
})`,...x.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "disabled": true,
  "placeholder": "Sélectionnez une option",
  options
})`,...O.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "hint": "Texte de description additionnel",
  "placeholder": "Sélectionnez une option",
  options
})`,...w.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label pour liste déroulante",
  "nativeSelectProps": {
    id: "my-unique-id"
  },
  options
})`,...P.parameters?.docs?.source}}};const ae=["Default","DefaultWithSelectedOption","DefaultWithDefaultValue","DefaultWithPlaceholder","ErrorState","SuccessState","Disabled","WithHint","SelectWithCustomId"];export{v as Default,h as DefaultWithDefaultValue,y as DefaultWithPlaceholder,S as DefaultWithSelectedOption,O as Disabled,g as ErrorState,P as SelectWithCustomId,x as SuccessState,w as WithHint,ae as __namedExportsOrder,te as default};
