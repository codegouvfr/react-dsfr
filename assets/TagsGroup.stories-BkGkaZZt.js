import{r as y,a as O,u as W,b as w,f as _,R as f,s as D}from"./iframe-BpEV2pGA.js";import{T as v}from"./Tag-BtiM6OkI.js";import{g as E}from"./getStory-Bli_4i1k.js";import"./preload-helper-PPVm8Dsz.js";var j=function(s,n){var o={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&n.indexOf(e)<0&&(o[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(s);r<e.length;r++)n.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(s,e[r])&&(o[e[r]]=s[e[r]]);return o};const T=y.memo(y.forwardRef((s,n)=>{const{id:o,className:e,tags:r,smallTags:S=!1,style:h}=s;j(s,["id","className","tags","smallTags","style"]),O();const b=W({defaultIdPrefix:"fr-tags-group",explicitlyProvidedId:o}),P=w(_.cx("fr-tags-group",S&&"fr-tags-group--sm"),e);return f.createElement("ul",{className:P,style:h,id:b,ref:n},r.map((x,A)=>f.createElement("li",{key:A},f.createElement(v,Object.assign({},x)))))}));T.displayName=D({TagsGroup:T});const{meta:k,getStory:a}=E({wrappedComponent:{TagsGroup:T},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/tag)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/TagsGroup.tsx)`,argTypes:{smallTags:{description:` 
                Default: false, if true, the tags will be smaller.
            `,control:{type:"boolean"}},tags:{description:"An array of TagProps (at least 1, max recommended: 6).",control:!1}},disabledProps:["lang"],defaultContainerWidth:800}),C={...k,title:"components/TagsGroup"},t=s=>Array.from({length:6},(n,o)=>({...s,children:`Libellé tag ${o+1}`})),l=a({tags:t()}),c=a({tags:t(),smallTags:!0}),g=a({tags:t({linkProps:{href:"#"}})}),m=a({tags:t({linkProps:{href:"#"}}),smallTags:!0}),i=a({tags:t({pressed:!0})}),p=a({tags:t({pressed:!0}),smallTags:!0}),d=a({tags:t({dismissible:!0})}),u=a({tags:t({dismissible:!0}),smallTags:!0});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps()
})`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps(),
  "smallTags": true
})`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps({
    "linkProps": {
      "href": "#"
    }
  })
})`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps({
    "linkProps": {
      "href": "#"
    }
  }),
  "smallTags": true
})`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps({
    "pressed": true
  })
})`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps({
    "pressed": true
  }),
  "smallTags": true
})`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps({
    "dismissible": true
  })
})`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`getStory({
  "tags": tagsWithProps({
    "dismissible": true
  }),
  "smallTags": true
})`,...u.parameters?.docs?.source}}};const F=["Default","SmallTags","TagsAsAnchor","SmallTagsAsAnchor","TagsPressed","SmallTagsPressed","TagsDismissable","SmallTagsDismissable"];export{l as Default,c as SmallTags,m as SmallTagsAsAnchor,u as SmallTagsDismissable,p as SmallTagsPressed,g as TagsAsAnchor,d as TagsDismissable,i as TagsPressed,F as __namedExportsOrder,C as default};
