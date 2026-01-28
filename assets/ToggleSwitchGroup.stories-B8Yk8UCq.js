import{r as f,a,u as m,R as i,b as h,f as x}from"./iframe-DCkbD6Ro.js";import{T as b}from"./ToggleSwitch-DTREhPKT.js";import{g as y}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var S=function(e,r){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)r.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(o[t[l]]=e[t[l]]);return o};const w=f.memo(e=>{const{id:r,className:o,toggles:t,showCheckedHint:l=!0,labelPosition:g="right",classes:s={},style:c}=e,p=S(e,["id","className","toggles","showCheckedHint","labelPosition","classes","style"]);a();const d=m({defaultIdPrefix:"fr-toggle",explicitlyProvidedId:r});return i.createElement("ul",Object.assign({id:d,className:h(x.cx("fr-toggle__list"),s.root,o),style:c},p),t.map((u,T)=>i.createElement("li",{key:T,className:s.li},i.createElement(b,Object.assign({},u,{showCheckedHint:l,labelPosition:g})))))}),{meta:O,getStory:P}=y({wrappedComponent:{ToggleSwitchGroup:w},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur)
- [See DSFR demo](https://main--ds-gouv.netlify.app/example/component/toggle/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ToggleSwitchGroup.tsx)`,disabledProps:["lang"],argTypes:{labelPosition:{control:{type:"radio",options:(()=>{const e=["right","left"];return a(),e})()},description:'Default: "right"'},toggles:{description:"An array of ToggleSwitchProps",control:!1}},defaultContainerWidth:800}),j={...O,title:"components/ToggleSwitchGroup"},n=P({toggles:[{label:"Toggle 1",helperText:"Text toggle 1",defaultChecked:!0,inputTitle:"title-1"},{label:"Toggle 2",helperText:"Text toggle 2",defaultChecked:!0,inputTitle:"title-2"},{label:"Toggle 3",helperText:"Text toggle 3",disabled:!0,inputTitle:"title-3"},{label:"Toggle 4",helperText:"Text toggle 4",inputTitle:"title-4"},{label:"Toggle 5",helperText:"Text toggle 5",inputTitle:"title-5"}]});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  "toggles": [{
    "label": "Toggle 1",
    "helperText": "Text toggle 1",
    "defaultChecked": true,
    "inputTitle": "title-1"
  }, {
    "label": "Toggle 2",
    "helperText": "Text toggle 2",
    "defaultChecked": true,
    "inputTitle": "title-2"
  }, {
    "label": "Toggle 3",
    "helperText": "Text toggle 3",
    "disabled": true,
    "inputTitle": "title-3"
  }, {
    "label": "Toggle 4",
    "helperText": "Text toggle 4",
    "inputTitle": "title-4"
  }, {
    "label": "Toggle 5",
    "helperText": "Text toggle 5",
    "inputTitle": "title-5"
  }]
})`,...n.parameters?.docs?.source}}};const E=["Default"];export{n as Default,E as __namedExportsOrder,j as default};
