import{r as p,c as k,a as v,u as S,R as t,b as d,f as l,s as f}from"./iframe-DCkbD6Ro.js";import{g as x}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var O=function(a,r){var n={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&r.indexOf(e)<0&&(n[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(a);s<e.length;s++)r.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(a,e[s])&&(n[e[s]]=a[e[s]]);return n};const i=p.memo(p.forwardRef((a,r)=>{const{className:n,classes:e={},links:s,style:u,id:b}=a,g=O(a,["className","classes","links","style","id"]),{t:h}=_();v();const y=S({defaultIdPrefix:"fr-skiplinks",explicitlyProvidedId:b});return t.createElement("div",Object.assign({id:y,className:d(l.cx("fr-skiplinks"),e.root,n),ref:r,style:u},g),t.createElement("nav",{className:l.cx("fr-container"),role:"navigation","aria-label":h("label")},t.createElement("ul",{className:d(l.cx("fr-skiplinks__list"),e.list)},s&&s.map(o=>t.createElement("li",{key:o.anchor},t.createElement("a",{className:d(l.cx("fr-link"),e.link),href:o.anchor,id:o.id},o.label))))))}));i.displayName=f({SkipLinks:i});const{useTranslation:_,addSkipLinksTranslations:m}=k({componentName:f({SkipLinks:i}),frMessages:{label:"Accès rapide"}});m({lang:"en",messages:{label:"Quick access"}});m({lang:"es",messages:{label:"Acceso rapido"}});m({lang:"de",messages:{label:"Schneller Zugang"}});const{meta:w,getStory:E}=x({wrappedComponent:{SkipLinks:i},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien-d-evitement)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SkipLinks.tsx)`}),j={...w,title:"components/SkipLinks"},c=E({links:[{label:"Contenu",anchor:"#contenu"},{label:"Menu",anchor:"#header-navigation"},{label:"Recherche",anchor:"#header-search"},{label:"Pied de page",anchor:"#footer"}],classes:{root:"fr-mt-9v"}});c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  links: [{
    label: "Contenu",
    anchor: "#contenu"
  }, {
    label: "Menu",
    anchor: "#header-navigation"
  }, {
    label: "Recherche",
    anchor: "#header-search"
  }, {
    label: "Pied de page",
    anchor: "#footer"
  }],
  classes: {
    root: "fr-mt-9v" // Just to fix storybook preview toolbar overlapping
  }
})`,...c.parameters?.docs?.source}}};const I=["Default"];export{c as Default,I as __namedExportsOrder,j as default};
