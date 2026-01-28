import{r as o,a as A,u as U,d as V,c as X,R as n,b as l,f as a,g as Y,s as R}from"./iframe-BpEV2pGA.js";import{g as Z,l as ee}from"./getStory-Bli_4i1k.js";import"./preload-helper-PPVm8Dsz.js";var te=function(t,d){var c={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&d.indexOf(s)<0&&(c[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(t);i<s.length;i++)d.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(c[s[i]]=t[s[i]]);return c};const W=o.memo(o.forwardRef((t,d)=>{const{id:c,className:s,classes:i={},title:j,description:E,link:p,isClosable:K=!1,isClosed:r,onClose:h,style:M,severity:B="info",iconDisplayed:F=!0}=t,q=te(t,["id","className","classes","title","description","link","isClosable","isClosed","onClose","style","severity","iconDisplayed"]);A();const L=U({defaultIdPrefix:"fr-notice",explicitlyProvidedId:c}),[G,P]=o.useState(r??!1),[O,H]=o.useState(null),_=o.useRef(!1),I=o.useRef(!1),{Link:$}=Y();o.useEffect(()=>{r!==void 0&&P(u=>(u&&!r&&(_.current=!0,I.current=!0),r))},[r]),o.useEffect(()=>{_.current&&O!==null&&(_.current=!1,O.focus())},[O]);const z=V(u=>{r===void 0?(P(!0),h?.(u)):h(u)}),J=!F,{t:Q}=se();return G?null:n.createElement("div",Object.assign({id:L,className:l(a.cx("fr-notice",`fr-notice--${B}`,J&&"fr-notice--no-icon"),i.root,s)},I.current&&{role:"notice"},{ref:d,style:M},q),n.createElement("div",{className:a.cx("fr-container")},n.createElement("div",{className:a.cx("fr-notice__body")},n.createElement("p",null,n.createElement("span",{className:l(a.cx("fr-notice__title"),i.title)},j),E&&n.createElement("span",{className:l(a.cx("fr-notice__desc"),i.description)},E),p&&n.createElement($,Object.assign({target:"_blank",rel:"noopener external"},p.linkProps,{className:l(a.cx("fr-notice__link"),i.link,p.linkProps.className)}),p.text)),K&&n.createElement("button",{ref:H,className:l(a.cx("fr-btn--close","fr-btn"),i.close),onClick:z},Q("hide message")))))}));W.displayName=R({Notice:W});const{useTranslation:se,addNoticeTranslations:D}=X({componentName:R({Notice:W}),frMessages:{"hide message":"Masquer le message"}});D({lang:"en",messages:{"hide message":"Hide the message"}});D({lang:"es",messages:{"hide message":"Occultar el mesage"}});const{meta:ie,getStory:e}=Z({wrappedComponent:{Notice:W},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Notice.tsx)`,argTypes:{title:{description:'Required message to display, it should not relay a "classic" information, but an important and temporary information.'},description:{description:"Optional message to complete title"},link:{description:"Optional link to display"},severity:{description:'Default : "info"',options:(()=>{const t=["info","warning","alert","weather-orange","weather-red","weather-purple","witness","kidnapping","attack","cyberattack"];return A(),t})(),control:{type:"radio"}},iconDisplayed:{description:"This option is possible if the notice is not a weather one or an alert one (witness, kidnapping, attack or cyberattack)."},isClosable:{description:"If the notice should have a close button"},onClose:{description:"Called when the user clicks the close button"},isClosed:{description:"If specified the `<Notice />` is in \n                [controlled mode](https://reactjs.org/docs/forms.html#controlled-components)\n                this means that when the close button is clicked\n                the `onClose()` callback will be called but you are responsible\n                for setting `isClosed` to `false`, the `<Notice />` wont close itself.",control:!1}},disabledProps:["lang"]}),ae={...ie,title:"components/Notice"},m=e({title:"Service maintenance is scheduled today from 12:00 to 14:00.",description:"All will be ok after 14:00.",link:{linkProps:{href:"#"},text:"More information"},isClosable:!0,isClosed:void 0,severity:"info",iconDisplayed:!0,...ee(["onClose"])}),f=e({title:"This is the title",description:"This is the description."}),g=e({title:"This is the title.",description:"This is the description.",isClosable:!0}),y=e({title:"This is a Info notice.",description:"This is the description.",severity:"info"}),b=e({title:"This is a Warning notice.",description:"This is the description.",severity:"warning"}),T=e({title:"This is an Alert notice.",description:"This is the description.",severity:"alert"}),N=e({title:"This is a WeatherOrange notice.",description:"This is the description.",severity:"weather-orange"}),k=e({title:"This is a WeatherRed notice.",description:"This is the description.",severity:"weather-red"}),v=e({title:"This is a WeatherPurple notice.",description:"This is the description.",severity:"weather-purple"}),S=e({title:"This is a Witness notice.",description:"This is the description.",severity:"witness"}),C=e({title:"This is a Kidnapping notice.",description:"This is the description.",severity:"kidnapping"}),w=e({title:"This is an Attack notice.",description:"This is the description.",severity:"attack"}),x=e({title:"This is a Cyberattack notice.",description:"This is the description.",severity:"cyberattack"});m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`getStory({
  "title": "Service maintenance is scheduled today from 12:00 to 14:00.",
  "description": "All will be ok after 14:00.",
  "link": {
    "linkProps": {
      "href": "#"
    },
    "text": "More information"
  },
  "isClosable": true,
  "isClosed": undefined,
  "severity": "info",
  "iconDisplayed": true,
  ...logCallbacks(["onClose"])
})`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is the title",
  "description": "This is the description."
})`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is the title.",
  "description": "This is the description.",
  "isClosable": true
})`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a Info notice.",
  "description": "This is the description.",
  "severity": "info"
})`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a Warning notice.",
  "description": "This is the description.",
  "severity": "warning"
})`,...b.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is an Alert notice.",
  "description": "This is the description.",
  "severity": "alert"
})`,...T.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a WeatherOrange notice.",
  "description": "This is the description.",
  "severity": "weather-orange"
})`,...N.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a WeatherRed notice.",
  "description": "This is the description.",
  "severity": "weather-red"
})`,...k.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a WeatherPurple notice.",
  "description": "This is the description.",
  "severity": "weather-purple"
})`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a Witness notice.",
  "description": "This is the description.",
  "severity": "witness"
})`,...S.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a Kidnapping notice.",
  "description": "This is the description.",
  "severity": "kidnapping"
})`,...C.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is an Attack notice.",
  "description": "This is the description.",
  "severity": "attack"
})`,...w.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`getStory({
  "title": "This is a Cyberattack notice.",
  "description": "This is the description.",
  "severity": "cyberattack"
})`,...x.parameters?.docs?.source}}};const ce=["Default","NonClosableNotice","ClosableNotice","InfoNotice","WarningNotice","AlertNotice","WeatherOrangeNotice","WeatherRedNotice","WeatherPurpleNotice","WitnessNotice","KidnappingNotice","AttackNotice","CyberattackNotice"];export{T as AlertNotice,w as AttackNotice,g as ClosableNotice,x as CyberattackNotice,m as Default,y as InfoNotice,C as KidnappingNotice,f as NonClosableNotice,b as WarningNotice,N as WeatherOrangeNotice,v as WeatherPurpleNotice,k as WeatherRedNotice,S as WitnessNotice,ce as __namedExportsOrder,ae as default};
