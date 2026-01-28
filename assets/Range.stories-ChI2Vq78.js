import{r as A,a as C,u as Y,R as r,b as n,f as i,s as Z}from"./iframe-DCkbD6Ro.js";import{g as ee}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var re=function(s,d){var u={};for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&d.indexOf(a)<0&&(u[a]=s[a]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,a=Object.getOwnPropertySymbols(s);e<a.length;e++)d.indexOf(a[e])<0&&Object.prototype.propertyIsEnumerable.call(s,a[e])&&(u[a[e]]=s[a[e]]);return u};const D=A.memo(A.forwardRef((s,d)=>{const{id:u,className:a,classes:e={},disabled:j=!1,double:T,hideMinMax:H=!1,hintText:_,label:W,max:w,min:R,nativeInputProps:l,prefix:B,small:G=!1,state:p="default",stateRelatedMessage:L,step:$,style:k,suffix:q}=s,z=re(s,["id","className","classes","disabled","double","hideMinMax","hintText","label","max","min","nativeInputProps","prefix","small","state","stateRelatedMessage","step","style","suffix"]);if(C(),R>w)throw new Error("min must be lower than max");const c=Y({defaultIdPrefix:"fr-range",explicitlyProvidedId:u}),F=`${c}-label`,J=`${c}-message-error`,K=`${c}-message-valid`,V=`${c}-messages`;return r.createElement("div",Object.assign({className:n(i.cx("fr-range-group",j&&"fr-range-group--disabled",p==="error"&&"fr-range-group--error",p==="success"&&"fr-range-group--valid"),e.root,a),style:k,ref:d,id:`${c}-group`},z),!!(W||_)&&r.createElement("label",{className:n(i.cx("fr-label"),e.label),id:F},W,_!==void 0&&r.createElement("span",{className:n(i.cx("fr-hint-text"),e.hintText)},_)),r.createElement("div",{className:n(i.cx("fr-range",G&&"fr-range--sm",T&&"fr-range--double",$!==void 0&&"fr-range--step"),e.rangeWrapper),"data-fr-prefix":B,"data-fr-suffix":q},r.createElement("span",{className:n(i.cx("fr-range__output"),e.output)}),(()=>{var O,I;const N={type:"range",id:c,name:c,min:R,max:w,step:$,disabled:j,"aria-labelledby":F,"aria-describedby":V,"aria-invalid":p==="error"};if(T){const U=(O=l?.[0])!==null&&O!==void 0?O:{},X=(I=l?.[1])!==null&&I!==void 0?I:{};return r.createElement(r.Fragment,null,r.createElement("input",Object.assign({},U,N)),r.createElement("input",Object.assign({},X,N,{id:`${c}-2`,name:`${c}-2`})))}const Q=l??{};return r.createElement("input",Object.assign({},Q,N))})(),!H&&r.createElement(r.Fragment,null,r.createElement("span",{className:n(i.cx("fr-range__min"),e.min),"aria-hidden":!0},R),r.createElement("span",{className:n(i.cx("fr-range__max"),e.max),"aria-hidden":!0},w))),r.createElement("div",{className:n(i.cx("fr-messages-group"),e.messagesGroup),id:V,"aria-live":"polite"},r.createElement("p",{id:n({[J]:p==="error",[K]:p==="success"}),className:n(i.cx("fr-message",{"fr-message--error":p==="error","fr-message--valid":p==="success"}),e.message)},L)))}));D.displayName=Z({Range:D});const{meta:se,getStory:t}=ee({wrappedComponent:{Range:D},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/curseur-range)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Range.tsx)`,argTypes:{label:{control:{type:"text"}},disabled:{control:{type:"boolean"}},state:{options:(()=>{const s=["default","success","error"];return C(),s})(),control:{type:"radio"}},stateRelatedMessage:{description:"This message is only displayed when `state` is `success` or `error`.  \n                If state is `success` or `error` this message is mandatory."},nativeInputProps:{description:"An object or an tuple of two objects that is forwarded as props to te underlying native `<input />` element(s).  \n                This is where you pass the `name` prop or `onChange` for example.",control:!1},small:{control:{type:"boolean"}},double:{control:{type:"boolean"}},hideMinMax:{control:{type:"boolean"}},step:{control:{type:"number"}},max:{control:{type:"number"}},min:{control:{type:"number"}}},disabledProps:["lang"]}),ne={...se,title:"components/Range"},o={label:"Label",hintText:"Texte de description additionnel, valeur de 0 à 100.",min:0,max:100},m=t(o),f=t({...o,small:!0}),g=t({...o,hideMinMax:!0}),b=t({...o,step:10}),x=t({...o,small:!0,step:10}),y=t({...o,double:!0}),S=t({...o,small:!0,double:!0}),h=t({...o,small:!0,double:!0,step:10}),v=t({...o,prefix:"~",suffix:"%"}),P=t({...o,disabled:!0}),M=t({...o,state:"error",stateRelatedMessage:"Valeur sélectionnée impossible"}),E=t({...o,state:"success",stateRelatedMessage:"Valeur sélectionnée possible"});m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"getStory(defaultProps)",...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  small: true
})`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  hideMinMax: true
})`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  step: 10
})`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  small: true,
  step: 10
})`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  double: true
})`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  small: true,
  double: true
})`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  small: true,
  double: true,
  step: 10
})`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  prefix: "~",
  suffix: "%"
})`,...v.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  disabled: true
})`,...P.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  state: "error",
  stateRelatedMessage: "Valeur sélectionnée impossible"
})`,...M.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  state: "success",
  stateRelatedMessage: "Valeur sélectionnée possible"
})`,...E.parameters?.docs?.source}}};const le=["Default","Small","HideMinMax","WithStep","SmallWithStep","Double","SmallDouble","SmallDoubleWithStep","PrefixSuffix","Disabled","Error","Success"];export{m as Default,P as Disabled,y as Double,M as Error,g as HideMinMax,v as PrefixSuffix,f as Small,S as SmallDouble,h as SmallDoubleWithStep,x as SmallWithStep,E as Success,b as WithStep,le as __namedExportsOrder,ne as default};
