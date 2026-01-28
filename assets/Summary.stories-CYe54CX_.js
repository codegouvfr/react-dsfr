import{r as k,c as N,a as I,u as j,R as r,b as x,f as h,s as g,g as F}from"./iframe-DCkbD6Ro.js";import{g as $}from"./generateValidHtmlId-Bu5zDHjN.js";import{g as C}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var R=function(t,o){var l={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&o.indexOf(n)<0&&(l[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)o.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(l[n[s]]=t[n[s]]);return l};const d=k.memo(k.forwardRef((t,o)=>{const{className:l,links:n,as:s="p",title:p,classes:f={},style:S,id:E}=t;R(t,["className","links","as","title","classes","style","id"]);const{t:_}=D(),P=k.useId(),v=p??_("title"),{Link:O}=F();I();const T=j({defaultIdPrefix:"fr-summary",explicitlyProvidedId:E}),w=(e,i)=>{let a=[];return e.subLinks&&e.subLinks.length!==0&&(a=e.subLinks.map((u,b)=>y(u,`${i}-${b}`))),a.length===0?void 0:r.createElement("ol",null,...a)},y=(e,i)=>{var a;if(e.linkProps.href===void 0)return r.createElement(r.Fragment,null);const u=w(e,i);return e.linkProps.href!==void 0?r.createElement("li",{key:i},r.createElement(O,Object.assign({},e.linkProps,{id:(a=e.linkProps.id)!==null&&a!==void 0?a:`${T}-link${$({text:e.text})}-${i}`,className:x(h.cx("fr-summary__link"),f.link,e.linkProps.className)}),e.text),u):r.createElement(r.Fragment,null)};return r.createElement("nav",{id:T,className:x(h.cx("fr-summary"),f.root,l),role:"navigation","aria-labelledby":P,style:S,ref:o},r.createElement(s,{className:x(h.cx("fr-summary__title"),f.title),id:P},r.createElement(r.Fragment,null,v)),r.createElement("ol",null,n.map((e,i)=>y(e,String(i)))))}));d.displayName=g({Summary:d});const{useTranslation:D,addSummaryTranslations:A}=N({componentName:g({Summary:d}),frMessages:{title:"Sommaire"}});A({lang:"en",messages:{title:"Summary"}});const{meta:W,getStory:L}=C({wrappedComponent:{Summary:d},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Summary.tsx)`,disabledProps:["lang"]}),z={...W,title:"components/Summary"},c=L({links:[{linkProps:{href:"#"},text:"Titre de l’ancre 1",subLinks:[{linkProps:{href:"#"},text:"Titre de l’ancre 1.1"}]},{linkProps:{href:"#"},text:"Titre de l’ancre 2"},{linkProps:{href:"#"},text:"Titre de l’ancre 3"},{linkProps:{href:"#"},text:"Titre de l’ancre 4",subLinks:[{linkProps:{href:"#"},text:"Titre de l’ancre 4.1",subLinks:[{linkProps:{href:"#"},text:"Titre de l’ancre 4.1.1"}]}]},{linkProps:{href:"#"},text:"Titre de l’ancre 5"}]}),m=L({title:"Sommaire personnalisé",links:[{linkProps:{href:"#"},text:"Titre de l’ancre 1",subLinks:[{linkProps:{href:"#"},text:"Titre de l’ancre 1.1"}]},{linkProps:{href:"#"},text:"Titre de l’ancre 2"},{linkProps:{href:"#"},text:"Titre de l’ancre 3"},{linkProps:{href:"#"},text:"Titre de l’ancre 4",subLinks:[{linkProps:{href:"#"},text:"Titre de l’ancre 4.1",subLinks:[{linkProps:{href:"#"},text:"Titre de l’ancre 4.1.1"}]}]},{linkProps:{href:"#"},text:"Titre de l’ancre 5"}]});c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  links: [{
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 1",
    subLinks: [{
      linkProps: {
        href: "#"
      },
      text: "Titre de l’ancre 1.1"
    }]
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 2"
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 3"
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 4",
    subLinks: [{
      linkProps: {
        href: "#"
      },
      text: "Titre de l’ancre 4.1",
      subLinks: [{
        linkProps: {
          href: "#"
        },
        text: "Titre de l’ancre 4.1.1"
      }]
    }]
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 5"
  }]
})`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`getStory({
  title: "Sommaire personnalisé",
  links: [{
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 1",
    subLinks: [{
      linkProps: {
        href: "#"
      },
      text: "Titre de l’ancre 1.1"
    }]
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 2"
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 3"
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 4",
    subLinks: [{
      linkProps: {
        href: "#"
      },
      text: "Titre de l’ancre 4.1",
      subLinks: [{
        linkProps: {
          href: "#"
        },
        text: "Titre de l’ancre 4.1.1"
      }]
    }]
  }, {
    linkProps: {
      href: "#"
    },
    text: "Titre de l’ancre 5"
  }]
})`,...m.parameters?.docs?.source}}};const B=["Default","SummaryWithCustomTitle"];export{c as Default,m as SummaryWithCustomTitle,B as __namedExportsOrder,z as default};
