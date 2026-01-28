import{I as f}from"./Input-CmFSF75_.js";import{g as x}from"./getStory-Bli_4i1k.js";import{a as g,R as y}from"./iframe-BpEV2pGA.js";import{B as S}from"./Button-Zz2W2k20.js";import"./preload-helper-PPVm8Dsz.js";const{meta:I,getStory:e}=x({wrappedComponent:{Input:f},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Input.tsx)`,argTypes:{label:{control:{type:"text"}},disabled:{control:{type:"boolean"}},iconId:{options:(()=>{const h=["fr-icon-checkbox-circle-line","ri-ancient-gate-fill"];return g(),h})(),control:{type:"radio"}},state:{options:(()=>{const h=["default","success","info","error"];return g(),h})(),control:{type:"radio"}},stateRelatedMessage:{description:"This message is only displayed when `state` is `success` or `error`.  \n                If state is `success` or `error` this message is mandatory."},textArea:{control:{type:"boolean"}},nativeInputProps:{description:"An object that is forwarded as props to te underlying native `<input />` element.  \n                This is where you pass the `name` prop or `onChange` for example.",control:!1},nativeTextAreaProps:{description:"Like the `nativeInputProps` but when `textArea` is `true`",control:!1}},disabledProps:["lang"]}),A={...I,title:"components/Input"},a=e({label:"Label champ de saisie",hintText:"Texte de description",state:"default",stateRelatedMessage:"Text de validation / d'explication de l'erreur",textArea:!1}),t=e({label:"Label champ de saisie"}),s=e({label:"Label champs de saisie",state:"error",stateRelatedMessage:"Texte d’erreur obligatoire"}),r=e({label:"Label champs de saisie",state:"success",stateRelatedMessage:"Texte de validation"}),o=e({label:"Label champs de saisie",state:"info",stateRelatedMessage:"Info text"}),i=e({label:"Label champs de saisie",disabled:!0}),n=e({label:"Label champs de saisie",hintText:"Texte de description additionnel"}),c=e({label:"Label champs de saisie",textArea:!0}),l=e({label:"Label champs de saisie",iconId:"fr-icon-alert-line"}),p=e({label:"Label champs de saisie",nativeInputProps:{type:"date"}},{description:"The correct icon is applied automatically if nativeInputProps type is `date`"}),d=e({label:"Label champs de saisie",nativeInputProps:{pattern:"[0-9]*",inputMode:"numeric",type:"number"}}),m=e({label:"Url du site :",hintText:"Saisissez une url valide, commençant par https://",nativeInputProps:{placeholder:"https://"}}),u=e({label:"Label champs de saisie",addon:y.createElement(S,null,"Valider")}),b=e({label:"Label champs de saisie",addon:y.createElement(S,{title:"Supprimer le champ",iconId:"fr-icon-delete-line",priority:"secondary"})});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champ de saisie",
  "hintText": "Texte de description",
  "state": "default",
  "stateRelatedMessage": "Text de validation / d'explication de l'erreur",
  "textArea": false
})`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champ de saisie"
})`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "state": "error",
  "stateRelatedMessage": "Texte d’erreur obligatoire"
})`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "state": "success",
  "stateRelatedMessage": "Texte de validation"
})`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "state": "info",
  "stateRelatedMessage": "Info text"
})`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "disabled": true
})`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "hintText": "Texte de description additionnel"
})`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "textArea": true
})`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "iconId": "fr-icon-alert-line"
})`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "nativeInputProps": {
    "type": "date"
  }
}, {
  "description": "The correct icon is applied automatically if nativeInputProps type is \`date\`"
})`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "nativeInputProps": {
    "pattern": "[0-9]*",
    "inputMode": "numeric",
    "type": "number"
  }
})`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`getStory({
  "label": "Url du site :",
  "hintText": "Saisissez une url valide, commençant par https://",
  "nativeInputProps": {
    "placeholder": "https://"
  }
})`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "addon": <Button>Valider</Button>
})`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`getStory({
  "label": "Label champs de saisie",
  "addon": <Button title="Supprimer le champ" iconId="fr-icon-delete-line" priority="secondary" />
})`,...b.parameters?.docs?.source}}};const P=["Default","Basic","WithErrorMessage","WithSuccessMessage","WithInfoMessage","Disabled","WithHint","TextArea","WithIcon","Date","InputTypeNumber","WithPlaceholder","WithButtonAddon","WithButtonAction"];export{t as Basic,p as Date,a as Default,i as Disabled,d as InputTypeNumber,c as TextArea,b as WithButtonAction,u as WithButtonAddon,s as WithErrorMessage,n as WithHint,l as WithIcon,o as WithInfoMessage,m as WithPlaceholder,r as WithSuccessMessage,P as __namedExportsOrder,A as default};
