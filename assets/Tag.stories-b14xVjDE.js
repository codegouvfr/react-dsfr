import{T as m}from"./Tag-WGUCu2Zp.js";import{g as b}from"./getStory-JVSS1Wer.js";import{a as u}from"./iframe-DCkbD6Ro.js";import"./preload-helper-PPVm8Dsz.js";const{meta:g,getStory:e}=b({wrappedComponent:{Tag:m},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tag)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Tag.tsx)`,argTypes:{dismissible:{control:{type:"boolean"}},small:{control:{type:"boolean"}},iconId:{options:(()=>{const d=["fr-icon-checkbox-circle-line","ri-ancient-gate-fill"];return u(),d})(),control:{type:"radio"}},nativeButtonProps:{description:'Can be used to attach extra props to the underlying native button.  \n            Example: `{ "aria-controls": "fr-modal-1", onMouseEnter: event => {...} }`',control:!1},as:{options:(()=>{const d=["p","span","button","a",void 0];return u(),d})(),control:{type:"select",labels:{null:"default p element"}},description:"You can specify a 'span' element instead of default 'p' if the badge is inside a `<p>`. 'button' and 'a' are implicit."},children:{description:"The label of the button",control:{type:"text"}}},disabledProps:["lang"]}),T={...g,title:"components/Tag"},o=e({children:"Label tag"}),r=e({children:"I'm a link",linkProps:{href:"#"}}),n=e({children:"Label button",iconId:"fr-icon-checkbox-circle-line"}),t=e({children:"Label link",iconId:"fr-icon-checkbox-circle-line",linkProps:{href:"#"}}),s=e({children:"Label button",iconId:"fr-icon-checkbox-circle-line",nativeButtonProps:{onClick:()=>console.log("click")}}),c=e({children:"Label button",small:!0,iconId:"fr-icon-checkbox-circle-line"}),a=e({children:"Label button",dismissible:!0,nativeButtonProps:{onClick:()=>console.log("click")}}),i=e({children:"Label button",small:!0,dismissible:!0,nativeButtonProps:{onClick:()=>console.log("click")}}),l=e({children:"Label button",pressed:!0,nativeButtonProps:{onClick:()=>console.log("click")}}),p=e({children:"Label button",as:"span"});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label tag"
})`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`getStory({
  "children": "I'm a link",
  "linkProps": {
    "href": "#"
  }
})`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  "iconId": "fr-icon-checkbox-circle-line"
})`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label link",
  "iconId": "fr-icon-checkbox-circle-line",
  "linkProps": {
    "href": "#"
  }
})`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  "iconId": "fr-icon-checkbox-circle-line",
  "nativeButtonProps": {
    onClick: () => console.log("click")
  }
})`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  "small": true,
  "iconId": "fr-icon-checkbox-circle-line"
})`,...c.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  "dismissible": true,
  "nativeButtonProps": {
    onClick: () => console.log("click")
  }
})`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  "small": true,
  "dismissible": true,
  "nativeButtonProps": {
    onClick: () => console.log("click")
  }
})`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  "pressed": true,
  "nativeButtonProps": {
    onClick: () => console.log("click")
  }
})`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`getStory({
  "children": "Label button",
  as: "span"
})`,...p.parameters?.docs?.source}}};const y=["Default","TagAsAnchor","TagWithIcon","TagLinkWithIcon","TagButtonWithIcon","SmallTag","TagDismissible","SmallTagDismissible","TagPressed","AsSpan"];export{p as AsSpan,o as Default,c as SmallTag,i as SmallTagDismissible,r as TagAsAnchor,s as TagButtonWithIcon,a as TagDismissible,t as TagLinkWithIcon,l as TagPressed,n as TagWithIcon,y as __namedExportsOrder,T as default};
