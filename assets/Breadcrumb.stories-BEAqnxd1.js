import{r as d,a as v,u as w,c as E,R as r,b as l,f as a,g as O,s as f}from"./iframe-BpEV2pGA.js";import{g as N}from"./getStory-Bli_4i1k.js";import"./preload-helper-PPVm8Dsz.js";var L=function(n,m){var s={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&m.indexOf(e)<0&&(s[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)m.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(s[e[t]]=n[e[t]]);return s};const i=d.memo(d.forwardRef((n,m)=>{const{id:s,className:e,homeLinkProps:t,segments:p,currentPageLabel:h,classes:o={},style:P}=n,y=L(n,["id","className","homeLinkProps","segments","currentPageLabel","classes","style"]);v();const S=w({defaultIdPrefix:"fr-breadcrumb",explicitlyProvidedId:s}),{t:g}=I(),{Link:k}=O(),b=`breadcrumb-${d.useId()}`;return r.createElement("nav",Object.assign({id:S,ref:m,role:"navigation",className:l(a.cx("fr-breadcrumb"),o.root,e),style:P,"aria-label":`${g("navigation label")} :`},y),r.createElement("button",{className:l(a.cx("fr-breadcrumb__button"),o.button),"aria-expanded":"false","aria-controls":b},g("show breadcrumb")),r.createElement("div",{className:l(a.cx("fr-collapse"),o.collapse),id:b},r.createElement("ol",{className:l(a.cx("fr-breadcrumb__list"),o.list)},r.createElement(r.Fragment,null,[...t===void 0?[]:[{linkProps:t,label:g("home")}],...p].map(({linkProps:u,label:x},_)=>r.createElement("li",{key:_},r.createElement(k,Object.assign({},u,{className:l(a.cx("fr-breadcrumb__link"),o.link,u.className)}),x))),r.createElement("li",null,r.createElement("a",{className:a.cx("fr-breadcrumb__link"),"aria-current":"page"},h))))))}));i.displayName=f({Breadcrumb:i});const{useTranslation:I,addBreadcrumbTranslations:j}=E({componentName:f({Breadcrumb:i}),frMessages:{"show breadcrumb":"Voir le fil d’Ariane","navigation label":"vous êtes ici",home:"Accueil"}});j({lang:"en",messages:{"show breadcrumb":"Show navigation","navigation label":"you are here",home:"Home"}});const{meta:A,getStory:B}=N({wrappedComponent:{Breadcrumb:i},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/fil-d-ariane)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Breadcrumb.tsx)`,disabledProps:["lang"]}),T={...A,title:"components/Breadcrumb"},c=B({homeLinkProps:{href:"/"},segments:[{label:"Segment 1",linkProps:{href:"/segment-1"}},{label:"Segment 2",linkProps:{href:"/segment-1/segment-2"}},{label:"Segment 3",linkProps:{href:"/segment-1/segment-2/segment-3"}},{label:"Segment 4",linkProps:{href:"/segment-1/segment-2/segment-3/segment-4"}}],currentPageLabel:"Page Actuelle"});c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  "homeLinkProps": {
    "href": "/"
  },
  "segments": [{
    "label": "Segment 1",
    "linkProps": {
      "href": "/segment-1"
    }
  }, {
    "label": "Segment 2",
    "linkProps": {
      "href": "/segment-1/segment-2"
    }
  }, {
    "label": "Segment 3",
    "linkProps": {
      "href": "/segment-1/segment-2/segment-3"
    }
  }, {
    "label": "Segment 4",
    "linkProps": {
      "href": "/segment-1/segment-2/segment-3/segment-4"
    }
  }],
  "currentPageLabel": "Page Actuelle"
})`,...c.parameters?.docs?.source}}};const C=["Default"];export{c as Default,C as __namedExportsOrder,T as default};
