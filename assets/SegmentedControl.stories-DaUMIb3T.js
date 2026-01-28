import{r as h,a as R,u as $,R as o,b as i,f as d}from"./iframe-DCkbD6Ro.js";import{g as W}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var A=function(n,m){var c={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&m.indexOf(e)<0&&(c[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,e=Object.getOwnPropertySymbols(n);l<e.length;l++)m.indexOf(e[l])<0&&Object.prototype.propertyIsEnumerable.call(n,e[l])&&(c[e[l]]=n[e[l]]);return c};const F=h.memo(h.forwardRef((n,m)=>{const{id:c,name:e,className:l,classes:s={},style:v,small:O=!1,segments:D,hideLegend:N,inlineLegend:w,legend:P,hintText:_}=n,C=A(n,["id","name","className","classes","style","small","segments","hideLegend","inlineLegend","legend","hintText"]);R();const T=$({defaultIdPrefix:`fr-segmented${e===void 0?"":`-${e}`}`,explicitlyProvidedId:c}),j=t=>`${T}-${t}`,H=(function(){const p=h.useId();return e??`segmented-name-${p}`})();return o.createElement("fieldset",Object.assign({id:T,className:i(d.cx("fr-segmented",O&&"fr-segmented--sm",N&&"fr-segmented--no-legend"),s.root,l),ref:m,style:v},C),P!==void 0&&o.createElement("legend",{className:i(d.cx("fr-segmented__legend",w&&"fr-segmented__legend--inline"),s.legend)},P,_!==void 0&&o.createElement("span",{className:i(d.cx("fr-hint-text"),s.hintText)},_)),o.createElement("div",{className:i(d.cx("fr-segmented__elements"),s.elements)},D.map((t,p)=>{if(!t)return null;const E=j(p);return o.createElement("div",{className:i(d.cx("fr-segmented__element"),s["element-each"]),key:p},o.createElement("input",Object.assign({},t.nativeInputProps,{id:E,name:H,type:"radio"})),t.label&&o.createElement("label",{className:i(d.cx(t.iconId!==void 0&&t.iconId,"fr-label"),s["element-each__label"]),htmlFor:E},t.label))})))})),{meta:z,getStory:r}=W({wrappedComponent:{SegmentedControl:F},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/controle-segmente/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SegmentedControl.tsx)`,argTypes:{small:{control:{type:"boolean"}},hideLegend:{control:{type:"boolean"}},inlineLegend:{control:{type:"boolean"}},segments:{control:!1}},disabledProps:["lang"]}),B={...z,title:"components/SegmentedControl"},a={legend:"Légende",segments:[{label:"Libellé"},{label:"Libellé"},{label:"Libellé"}]},u=r({...a}),g=r({...a,small:!0}),b=r({...a,inlineLegend:!0}),f=r({...a,hintText:"Texte d’aide"}),L=r({...a,inlineLegend:!0,hintText:"Texte d’aide"}),y=r({...a,segments:[{label:"Libellé",iconId:"fr-icon-road-map-line"},{label:"Libellé",iconId:"fr-icon-road-map-line"},{label:"Libellé",iconId:"fr-icon-road-map-line"}]}),I=r({...a,hideLegend:!0}),x=r({...a,segments:[{label:"Libellé"},{label:"Libellé"},{label:"Libellé",nativeInputProps:{disabled:!0}}]}),S=r({...a,segments:[{label:"label long",iconId:"fr-icon-star-line"},{label:"label trop long",iconId:"fr-icon-time-line"},{label:"Libellé",iconId:"fr-icon-road-map-line"},{label:"Libellé",iconId:"fr-icon-road-map-line"},{label:"Libellé",iconId:"fr-icon-road-map-line"}]},{description:"DEPRECATED (resize to see automatic vertical orientation)"});u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps
})`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  small: true
})`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  inlineLegend: true
})`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  hintText: "Texte d’aide"
})`,...f.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  inlineLegend: true,
  hintText: "Texte d’aide"
})`,...L.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  segments: [{
    label: "Libellé",
    iconId: "fr-icon-road-map-line"
  }, {
    label: "Libellé",
    iconId: "fr-icon-road-map-line"
  }, {
    label: "Libellé",
    iconId: "fr-icon-road-map-line"
  }]
})`,...y.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  hideLegend: true
})`,...I.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  segments: [{
    label: "Libellé"
  }, {
    label: "Libellé"
  }, {
    label: "Libellé",
    nativeInputProps: {
      disabled: true
    }
  }]
})`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  segments: [{
    label: "label long",
    iconId: "fr-icon-star-line"
  }, {
    label: "label trop long",
    iconId: "fr-icon-time-line"
  }, {
    label: "Libellé",
    iconId: "fr-icon-road-map-line"
  }, {
    label: "Libellé",
    iconId: "fr-icon-road-map-line"
  }, {
    label: "Libellé",
    iconId: "fr-icon-road-map-line"
  }]
}, {
  description: "DEPRECATED (resize to see automatic vertical orientation)"
})`,...S.parameters?.docs?.source}}};const G=["Default","Small","InlineLegend","HintText","InlineLegendWithHintText","WithIcons","HiddenLegend","PartiallyDisabled","Maximum"];export{u as Default,I as HiddenLegend,f as HintText,b as InlineLegend,L as InlineLegendWithHintText,S as Maximum,x as PartiallyDisabled,g as Small,y as WithIcons,G as __namedExportsOrder,B as default};
