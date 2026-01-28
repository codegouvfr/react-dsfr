import{r as d,a as y,u as b,R as p,b as u,f,s as z}from"./iframe-DCkbD6Ro.js";import{g as C}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var v=function(t,i){var s={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&i.indexOf(e)<0&&(s[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)i.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(s[e[r]]=t[e[r]]);return s};const h=d.memo(d.forwardRef((t,i)=>{const{className:s,classes:e={},style:r,children:H,size:m,id:x}=t,S=v(t,["className","classes","style","children","size","id"]);y();const w=b({defaultIdPrefix:"fr-highlight",explicitlyProvidedId:x});return p.createElement("div",Object.assign({id:w,className:u(f.cx("fr-highlight"),e.root,s),ref:i,style:r},S),p.createElement("p",{className:u(f.cx({[`fr-text--${m}`]:m}),e.content)},H))}));h.displayName=z({Highlight:h});const{meta:A,getStory:o}=C({wrappedComponent:{Highlight:h},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-exergue)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Highlight.tsx)`,argTypes:{size:{options:(()=>{const t=["sm","lg"];return y(),[null,...t]})(),control:{type:"select",labels:{null:"default",sm:"small",lg:"large"}},description:"Content text size"},children:{type:{name:"string",required:!0},description:"Text to display as highlight content"},classes:{control:"object",description:'Add custom classes for "root" or "content" component inner elements. Associate custom class values with "root" or "content" keys'}},disabledProps:["lang"]}),_={...A,title:"components/Highlight"},n=o({children:"Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires qui remplissent les conditions."}),a=o({children:"Highlight contains a text with small font size",size:"sm"},{description:"Small `Highlight`"}),c=o({children:"Highlight contains a text with large font size",size:"lg"},{description:"Large `Highlight`"}),l=o({children:"Highlight contains a text with custom green emeraude accent color",classes:{root:"fr-highlight--green-emeraude"}},{description:"Large `Highlight`"}),g=o({children:"Highlight contains a text with custom brown caramel accent color",classes:{root:"fr-highlight--brown-caramel"}},{description:"Large `Highlight`"});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`getStory({
  children: "Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires qui remplissent les conditions."
})`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  children: "Highlight contains a text with small font size",
  size: "sm"
}, {
  description: "Small \`Highlight\`"
})`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  children: "Highlight contains a text with large font size",
  size: "lg"
}, {
  description: "Large \`Highlight\`"
})`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  children: "Highlight contains a text with custom green emeraude accent color",
  classes: {
    root: "fr-highlight--green-emeraude"
  }
}, {
  description: "Large \`Highlight\`"
})`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  children: "Highlight contains a text with custom brown caramel accent color",
  classes: {
    root: "fr-highlight--brown-caramel"
  }
}, {
  description: "Large \`Highlight\`"
})`,...g.parameters?.docs?.source}}};const P=["Default","HighlightSmall","HighlightLarge","HighlightCustomGreenAccentColor","HighlightCustomBrownAccentColor"];export{n as Default,g as HighlightCustomBrownAccentColor,l as HighlightCustomGreenAccentColor,c as HighlightLarge,a as HighlightSmall,P as __namedExportsOrder,_ as default};
