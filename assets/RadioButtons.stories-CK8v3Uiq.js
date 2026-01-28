import{r as b,R as v,s as L,a as m}from"./iframe-DCkbD6Ro.js";import{F as h}from"./Fieldset-wbfQX3GK.js";import{g as I}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";const c=b.memo(b.forwardRef((a,g)=>v.createElement(h,Object.assign({ref:g},a,{type:"radio"}))));c.displayName=L({RadioButtons:c});const{meta:P,getStory:e}=I({wrappedComponent:{RadioButtons:c},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/RadioButtons.tsx)  
  
## Controlled

\`\`\`tsx
import { useState } from "react";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

function MyComponent(){

    const [ value, setValue ] = useState<"one" | "two" | "three" | undefined>(undefined);

    return (
        <RadioButtons 
            legend="Label" 
            options={[
                {
                    label: "Label radio",
                    nativeInputProps: {
                        checked: value === "one"
                        onChange: ()=> setValue("one")
                    }
                },
                {
                    label: "Label radio 2",
                    nativeInputProps: {
                        checked: value === "two"
                        onChange: ()=> setValue("two")
                    }
                },
                {
                    label: "Label radio 3",
                    nativeInputProps: {
                        checked: value === "three"
                        onChange: ()=> setValue("three")
                    }
                }
            ]}
        />
    );

}
\`\`\`  
  
## Uncontrolled  

\`\`\`tsx
import { useState } from "react";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

function MyComponent(){

    return (
        <form>
            <RadioButtons
                legend="Label"
                name="my-radio"
                options={[
                    {
                        label: "Label radio",
                        nativeInputProps: {
                            value: "one"
                        }
                    },
                    {
                        label: "Label radio 2",
                        nativeInputProps: {
                            value: "two"
                        }
                    },
                    {
                        label: "Label radio 3",
                        nativeInputProps: {
                            value: "three"
                        }
                    }
                ]}
            />
        </form>
    );

}
\`\`\`


`,argTypes:{name:{description:"The name that will be applied to all the underlying `<input type='radio' />`",control:{type:"text"}},options:{description:"An array describing the radio options. \n            `nativeInputProps` is an object that you would pass as prop to `<input type='radio' />`, \n            this is where you define the value for each option",control:!1},orientation:{description:"Default: 'vertical'",options:(()=>{const a=["horizontal","vertical"];return m(),a})(),control:{type:"radio"}},state:{description:"Default: 'default'",options:(()=>{const a=["success","error","info","default"];return m(),a})(),control:{type:"radio"}},stateRelatedMessage:{description:`The message won't be displayed if state is "default". 
                If the state is "error" providing a message is mandatory`,control:{type:"text"}},disabled:{control:{type:"boolean"}},small:{control:{type:"boolean"}}},disabledProps:["lang"]}),T={...P,title:"components/RadioButtons"},n=e({legend:"Légende pour l’ensemble de champs",name:"radio",options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}],state:"default",stateRelatedMessage:"State description"}),t=e({legend:"Légende pour l’ensemble de champs",name:"radio",orientation:"horizontal",options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),l=e({legend:"Légende pour l’ensemble de champs",name:"radio",hintText:"Texte de description additionnel",options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),o=e({legend:"Légende pour l’ensemble de champs",name:"radio",options:[{label:"Label radio",hintText:"Texte de description additionnel",nativeInputProps:{value:"value1"}},{label:"Label radio 2",hintText:"Texte de description additionnel",nativeInputProps:{value:"value2"}},{label:"Label radio 3",hintText:"Texte de description additionnel",nativeInputProps:{value:"value3"}}]}),r=e({legend:"Légende pour l’ensemble de champs",state:"error",stateRelatedMessage:"Texte d’erreur obligatoire",options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),s=e({legend:"Légende pour l’ensemble de champs",state:"error",orientation:"horizontal",stateRelatedMessage:"Texte d’erreur obligatoire",options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),i=e({legend:"Légende pour l’ensemble de champs",state:"success",orientation:"horizontal",stateRelatedMessage:"Texte de validation",options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),u=e({legend:"Légende pour l’ensemble de champs",disabled:!0,options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),p=e({legend:"Légende pour l’ensemble de champs",small:!0,options:[{label:"Label radio",nativeInputProps:{value:"value1"}},{label:"Label radio 2",nativeInputProps:{value:"value2"}},{label:"Label radio 3",nativeInputProps:{value:"value3"}}]}),d=e({legend:"Légende pour l’ensemble de champs",name:"radio",options:[{label:"Label radio",nativeInputProps:{value:"value1"},illustration:v.createElement("img",{src:"https://placehold.it/100x100",alt:"illustration"})},{label:"Label radio 2",nativeInputProps:{value:"value2"},illustration:v.createElement("img",{src:"https://placehold.it/100x100",alt:"illustration"})},{label:"Label radio 3",nativeInputProps:{value:"value3"},illustration:v.createElement("img",{src:"https://placehold.it/100x100",alt:"illustration"})}],state:"default",stateRelatedMessage:"State description"});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "name": "radio",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }],
  "state": "default",
  "stateRelatedMessage": "State description"
})`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "name": "radio",
  "orientation": "horizontal",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "name": "radio",
  "hintText": "Texte de description additionnel",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "name": "radio",
  "options": [{
    "label": "Label radio",
    "hintText": "Texte de description additionnel",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "hintText": "Texte de description additionnel",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "hintText": "Texte de description additionnel",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "state": "error",
  "stateRelatedMessage": "Texte d’erreur obligatoire",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "state": "error",
  "orientation": "horizontal",
  "stateRelatedMessage": "Texte d’erreur obligatoire",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "state": "success",
  "orientation": "horizontal",
  "stateRelatedMessage": "Texte de validation",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "disabled": true,
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "small": true,
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    }
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    }
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    }
  }]
})`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`getStory({
  "legend": "Légende pour l’ensemble de champs",
  "name": "radio",
  "options": [{
    "label": "Label radio",
    "nativeInputProps": {
      "value": "value1"
    },
    "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
  }, {
    "label": "Label radio 2",
    "nativeInputProps": {
      "value": "value2"
    },
    "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
  }, {
    "label": "Label radio 3",
    "nativeInputProps": {
      "value": "value3"
    },
    "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
  }],
  "state": "default",
  "stateRelatedMessage": "State description"
})`,...d.parameters?.docs?.source}}};const R=["Default","Horizontal","WithHintText","WithIndividualHints","ErrorState","HorizontalErrorState","SuccessState","Disabled","Small","Rich"];export{n as Default,u as Disabled,r as ErrorState,t as Horizontal,s as HorizontalErrorState,d as Rich,p as Small,i as SuccessState,l as WithHintText,o as WithIndividualHints,R as __namedExportsOrder,T as default};
