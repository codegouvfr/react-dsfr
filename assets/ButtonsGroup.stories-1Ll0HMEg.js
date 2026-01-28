import{B as r}from"./ButtonsGroup-BZmY5RVW.js";import{g as s}from"./getStory-Bli_4i1k.js";import{a as e}from"./iframe-BpEV2pGA.js";import"./Button-Zz2W2k20.js";import"./preload-helper-PPVm8Dsz.js";const{meta:i,getStory:l}=s({wrappedComponent:{ButtonsGroup:r},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/groupe-de-boutons)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ButtonsGroup.tsx)`,argTypes:{inlineLayoutWhen:{options:(()=>{const t=["never","always",...["sm","md","lg"].map(n=>`${n} and up`)];return e(),t})(),description:` 
                Default "never", "never" means that the button are 
                stacked vertically regardless of the screed width 
            `,control:{type:"select"}},buttonsEquisized:{description:` 
                Default: false, TODO: Report @gouvfr/dsfr bug: only applies when
                inlineLayout: "never" | "always"
            `,control:{type:"boolean"}},alignment:{options:(()=>{const t=["left","center","right","between"];return e(),t})(),description:'Default: "left", in vertical layout this has no effect',control:{type:"select"}},buttonsSize:{options:(()=>{const t=["small","medium","large"];return e(),t})(),description:` 
                Default: "medium", it overwrite the size that would have been set on the buttons
            `,control:{type:"select"}},buttonsIconPosition:{options:(()=>{const t=["left","right"];return e(),t})(),description:` 
                Default: "left", WARNING: Do not set iconPosition on child buttons
            `,control:{type:"select"}},buttons:{description:"An array of ButtonProps (at least 1)",control:!1}},disabledProps:["lang"],defaultContainerWidth:800}),f={...i,title:"components/ButtonsGroup"},o=l({buttons:[{linkProps:{href:"#"},iconId:"fr-icon-git-commit-fill",children:"Button 1 label"},{priority:"secondary",linkProps:{href:"#"},iconId:"fr-icon-chat-check-fill",children:"Button 2 label (longer)"},{linkProps:{href:"#"},iconId:"fr-icon-bank-card-line",children:"Button 3 label"}]});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "buttons": [{
    "linkProps": {
      "href": "#"
    },
    "iconId": "fr-icon-git-commit-fill",
    "children": "Button 1 label"
  }, {
    "priority": "secondary",
    "linkProps": {
      "href": "#"
    },
    "iconId": "fr-icon-chat-check-fill",
    "children": "Button 2 label (longer)"
  }, {
    "linkProps": {
      "href": "#"
    },
    "iconId": "fr-icon-bank-card-line",
    "children": "Button 3 label"
  }]
})`,...o.parameters?.docs?.source}}};const m=["Default"];export{o as Default,m as __namedExportsOrder,f as default};
