import{B as l}from"./Badge-Cbie0W8K.js";import{g as p}from"./getStory-JVSS1Wer.js";import{a as d}from"./iframe-DCkbD6Ro.js";import"./preload-helper-PPVm8Dsz.js";const{meta:u,getStory:e}=p({wrappedComponent:{Badge:l},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Badge.tsx)`,argTypes:{severity:{options:(()=>{const c=["success","warning","info","error","new",void 0];return d(),c})(),control:{type:"select",labels:{null:"no severity"}}},noIcon:{type:{name:"boolean"},description:"Remove badge icon when true"},small:{type:{name:"boolean"},description:"Set small badge size (`sm`) when true"},as:{options:(()=>{const c=["p","span",void 0];return d(),c})(),control:{type:"select",labels:{null:"default p element"}},description:"You can specify a 'span' element instead of default 'p' if the badge is inside a `<p>`."},children:{type:{name:"string",required:!0},description:"Label to display on the badge"}},disabledProps:["lang"]}),w={...u,title:"components/Badge"},r=e({severity:"success",children:"Label badge"}),o=e({children:"Label"},{description:"Medium info `Badge` with icon"}),n=e({severity:"info",children:"Label info"},{description:"Medium info `Badge` with icon"}),s=e({severity:"warning",noIcon:!1,children:'Label "warning"'},{description:"Medium warning `Badge` with icon"}),t=e({severity:"success",noIcon:!0,children:"Label success"},{description:"Medium success `Badge` without icon"}),a=e({severity:"error",noIcon:!0,children:"Label error"},{description:"Medium error `Badge` without icon"}),i=e({severity:"new",small:!0,children:"Label new"},{description:"Small new `Badge` with icon"});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`getStory({
  "severity": "success",
  "children": "Label badge"
})`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label"
}, {
  "description": "Medium info \`Badge\` with icon"
})`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  "severity": "info",
  "children": "Label info"
}, {
  "description": "Medium info \`Badge\` with icon"
})`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`getStory({
  "severity": "warning",
  "noIcon": false,
  "children": 'Label "warning"'
}, {
  "description": "Medium warning \`Badge\` with icon"
})`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`getStory({
  "severity": "success",
  "noIcon": true,
  "children": "Label success"
}, {
  "description": "Medium success \`Badge\` without icon"
})`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  "severity": "error",
  "noIcon": true,
  "children": "Label error"
}, {
  "description": "Medium error \`Badge\` without icon"
})`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "severity": "new",
  "small": true,
  "children": "Label new"
}, {
  "description": "Small new \`Badge\` with icon"
})`,...i.parameters?.docs?.source}}};const b=["Default","BadgeWithoutSeverity","InfoBadge","WarningBadge","SuccessBadge","ErrorBadge","NewBadge"];export{o as BadgeWithoutSeverity,r as Default,a as ErrorBadge,n as InfoBadge,i as NewBadge,t as SuccessBadge,s as WarningBadge,b as __namedExportsOrder,w as default};
