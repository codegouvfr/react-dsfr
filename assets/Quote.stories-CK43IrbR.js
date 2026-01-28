import{r as D,a as _,u as k,R as e,b as n,f as l,s as I}from"./iframe-DCkbD6Ro.js";import{g as L}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var A=function(r,c){var i={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&c.indexOf(t)<0&&(i[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(r);o<t.length;o++)c.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(r,t[o])&&(i[t[o]]=r[t[o]]);return i};const x=D.memo(D.forwardRef((r,c)=>{const{id:i,className:t,text:o,author:h,source:v,sourceUrl:b,imageUrl:y,size:E="xlarge",accentColor:w,classes:a={},style:S}=r;A(r,["id","className","text","author","source","sourceUrl","imageUrl","size","accentColor","classes","style"]),_();const O=k({defaultIdPrefix:"fr-quote",explicitlyProvidedId:i});return e.createElement("figure",{id:O,className:n(l.cx("fr-quote"),y&&l.cx("fr-quote--column"),w&&`fr-quote--${w}`,a.root,t),style:S,ref:c},e.createElement("blockquote",{cite:b},e.createElement("p",{className:n(E==="large"&&l.cx("fr-text--lg"),E==="medium"&&l.cx("fr-text--md"),a.text)},"« ",o," »")),e.createElement("figcaption",null,h!==void 0&&e.createElement("p",{className:n(l.cx("fr-quote__author"),a.author)},h),v!==void 0&&e.createElement("ul",{className:n(l.cx("fr-quote__source"),a.source)},v),y!==void 0&&e.createElement("div",{className:n("fr-quote__image",a.image)},e.createElement("img",{src:y,className:n(l.cx("fr-responsive-img"),a.imageTag),alt:""}))))}));x.displayName=I({Quote:x});const{meta:Q,getStory:s}=L({wrappedComponent:{Quote:x},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/citation)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Quote.tsx)`,disabledProps:["lang"]}),R={...Q,title:"components/Quote"},u=s({text:"Lorem [...] elit ut. ",author:"Auteur",source:e.createElement(e.Fragment,null,e.createElement("li",null,e.createElement("cite",null,"Ouvrage")),e.createElement("li",null,"Détail 1"),e.createElement("li",null,"Détail 2"),e.createElement("li",null,"Détail 3"),e.createElement("li",null,e.createElement("a",{target:"_blank",href:"[À MODIFIER | Lien vers la sources ou des infos complémentaires]"},"Détail 4"))),imageUrl:"//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png",size:"xlarge",className:""}),m=s({text:"Lorem [...] elit ut. ",author:"Auteur",source:e.createElement(e.Fragment,null,e.createElement("li",null,e.createElement("cite",null,"Ouvrage")),e.createElement("li",null,"Détail 1"),e.createElement("li",null,"Détail 2"),e.createElement("li",null,"Détail 3"),e.createElement("li",null,e.createElement("a",{target:"_blank",href:"[À MODIFIER | Lien vers la sources ou des infos complémentaires]"},"Détail 4"))),imageUrl:"//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png",size:"medium",accentColor:"pink-macaron"}),d=s({text:"Lorem [...] elit ut. ",author:"Auteur",imageUrl:"//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png"}),g=s({text:"Lorem [...] elit ut. ",imageUrl:"//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png"}),p=s({text:"Lorem [...] elit ut. ",author:"Auteur",source:e.createElement(e.Fragment,null,e.createElement("li",null,e.createElement("cite",null,"Ouvrage")),e.createElement("li",null,"Détail 1"),e.createElement("li",null,"Détail 2"),e.createElement("li",null,"Détail 3"),e.createElement("li",null,e.createElement("a",{target:"_blank",href:"[À MODIFIER | Lien vers la sources ou des infos complémentaires]"},"Détail 4")))}),f=s({text:"Lorem [...] elit ut. ",imageUrl:"//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png",accentColor:"yellow-moutarde",author:"Someone"});u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`getStory({
  text: "Lorem [...] elit ut. ",
  author: "Auteur",
  source: <>
            <li>
                <cite>Ouvrage</cite>
            </li>
            <li>Détail 1</li>
            <li>Détail 2</li>
            <li>Détail 3</li>
            <li>
                <a target="_blank" href="[À MODIFIER | Lien vers la sources ou des infos complémentaires]">
                    Détail 4
                </a>
            </li>
        </>,
  imageUrl: "//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png",
  size: "xlarge",
  className: ""
})`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`getStory({
  text: "Lorem [...] elit ut. ",
  author: "Auteur",
  source: <>
            <li>
                <cite>Ouvrage</cite>
            </li>
            <li>Détail 1</li>
            <li>Détail 2</li>
            <li>Détail 3</li>
            <li>
                <a target="_blank" href="[À MODIFIER | Lien vers la sources ou des infos complémentaires]">
                    Détail 4
                </a>
            </li>
        </>,
  imageUrl: "//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png",
  size: "medium",
  accentColor: "pink-macaron"
})`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`getStory({
  text: "Lorem [...] elit ut. ",
  author: "Auteur",
  imageUrl: "//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png"
})`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  text: "Lorem [...] elit ut. ",
  imageUrl: "//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png"
})`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`getStory({
  text: "Lorem [...] elit ut. ",
  author: "Auteur",
  source: <>
            <li>
                <cite>Ouvrage</cite>
            </li>
            <li>Détail 1</li>
            <li>Détail 2</li>
            <li>Détail 3</li>
            <li>
                <a target="_blank" href="[À MODIFIER | Lien vers la sources ou des infos complémentaires]">
                    Détail 4
                </a>
            </li>
        </>
})`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`getStory({
  text: "Lorem [...] elit ut. ",
  imageUrl: "//www.systeme-de-design.gouv.fr/v1.14/storybook/img/placeholder.1x1.png",
  accentColor: "yellow-moutarde",
  author: "Someone"
})`,...f.parameters?.docs?.source}}};const q=["Default","QuoteMediumAndAccent","QuoteWithoutDetails","QuoteWithoutSource","QuoteWithoutIllustration","QuoteWithAccent"];export{u as Default,m as QuoteMediumAndAccent,f as QuoteWithAccent,d as QuoteWithoutDetails,p as QuoteWithoutIllustration,g as QuoteWithoutSource,q as __namedExportsOrder,R as default};
