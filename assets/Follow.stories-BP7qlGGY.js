import{r as M,a as A,u as J,R as e,b as r,f as i,c as Q,s as I}from"./iframe-DCkbD6Ro.js";import{B as Z}from"./Button-DMub5GVd.js";import{I as ee}from"./Input-BHQnVfDC.js";import{A as te}from"./Alert-BzwglT7K.js";import{B}from"./ButtonsGroup-B0dMCKFh.js";import{g as oe}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";var d=function(t,o){var l={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&o.indexOf(n)<0&&(l[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)o.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(l[n[s]]=t[n[s]]);return l};const se=t=>{const{t:o}=j(),{title:l=o("subscribe to our newsletter"),desc:n,buttonProps:s,form:p,hasSocial:m,titleAs:u="h5",classes:a={}}=t;return d(t,["title","desc","buttonProps","form","hasSocial","titleAs","classes"]),A(),e.createElement("div",{className:r(i.cx("fr-col-12",m&&"fr-col-md-8"),a["newsletter-col"])},e.createElement("div",{className:r(i.cx("fr-follow__newsletter"),a.newsletter)},e.createElement("div",null,e.createElement("h2",{className:r(i.cx(`fr-${u}`),a["newsletter-title"])},l),n!==void 0&&e.createElement("p",{className:r(i.cx("fr-text--sm"),a["newsletter-desc"])},n)),e.createElement("div",null,p!==void 0?(()=>{const{success:h,consentHint:b=o("consent hint"),formComponent:f,inputProps:y={},successMessage:D=o("your registration has been processed")}=p;if(d(p,["success","consentHint","formComponent","inputProps","successMessage"]),A(),h)return e.createElement(te,{severity:"success",description:D,title:void 0});const{label:R=o("your email address"),hintText:L=b}=y,_=y.nativeInputProps,W=_===void 0?{}:_,{title:Y=o("your email address"),placeholder:$=o("your email address"),autoComplete:V="email",type:q="email"}=W,z=d(W,["title","placeholder","autoComplete","type"]),G=d(y,["label","hintText","nativeInputProps"]),{children:H=o("subscribe"),title:X=o("subscribe to our newsletter (2)"),type:K="button"}=s,U=d(s,["children","title","type"]);return f({children:e.createElement(e.Fragment,null,e.createElement(ee,Object.assign({label:R,nativeInputProps:Object.assign({title:Y,placeholder:$,autoComplete:V,type:q},z)},G,{addon:e.createElement(Z,Object.assign({},U,{title:X,type:K}),H)})),L!==void 0&&e.createElement("p",{className:r(i.cx("fr-hint-text"),a["newsletter-form-hint"])},L))})})():(()=>{const{children:h=o("subscribe"),title:b=o("subscribe to our newsletter (2)")}=s,f=d(s,["children","title"]);return e.createElement(B,{inlineLayoutWhen:"md and up",buttons:[Object.assign({children:h,title:b},f)]})})())))},ne=t=>{const{t:o}=j(),{buttons:l,title:n=o("follow us on social medias"),titleAs:s="h5",hasNewsletter:p,classes:m={}}=t;return d(t,["buttons","title","titleAs","hasNewsletter","classes"]),A(),e.createElement("div",{className:r(i.cx("fr-col-12",p&&"fr-col-md-4"),m["social-col"])},e.createElement("div",{className:r(i.cx("fr-follow__social"),m.social)},e.createElement("h2",{className:r(i.cx(`fr-${s}`),m["social-title"])},n),e.createElement(B,{className:r(m["social-buttons"]),buttons:l.map(u=>{const a=u.linkProps,{target:h="_blank",rel:b="noopener external",title:f=`${o(u.type)} - ${o("new window")}`}=a,y=d(a,["target","rel","title"]);return{className:r(i.cx(`fr-btn--${u.type}`),m["social-buttons-each"]),children:o(u.type),linkProps:Object.assign(Object.assign({},y),{target:h,rel:b,title:f})}})})))},T=M.memo(M.forwardRef((t,o)=>{const{id:l,className:n,classes:s={},social:p,style:m,newsletter:u}=t,a=d(t,["id","className","classes","social","style","newsletter"]);A();const h=J({defaultIdPrefix:"fr-follow",explicitlyProvidedId:l}),b=p!==void 0,f=u!==void 0;return e.createElement("div",Object.assign({id:h,className:r(i.cx("fr-follow"),s.root,n),ref:o,style:m},a),e.createElement("div",{className:r(i.cx("fr-container"),s.container)},e.createElement("div",{className:r(i.cx("fr-grid-row"),s.row)},f&&e.createElement(se,Object.assign({},u,{hasSocial:b,classes:s})),b&&e.createElement(ne,Object.assign({},p,{hasNewsletter:f,classes:s})))))}));T.displayName=I({Follow:T});const{useTranslation:j,addFollowTranslations:re}=Q({componentName:I({Follow:T}),frMessages:{"follow us on social medias":e.createElement(e.Fragment,null,"Suivez-nous",e.createElement("br",null)," sur les réseaux sociaux"),"subscribe to our newsletter":"Abonnez-vous à notre lettre d'information","subscribe to our newsletter (2)":"S'abonner à notre lettre d'information",subscribe:"S'abonner","your registration has been processed":"Votre inscription a bien été prise en compte","your email address":"Votre adresse électronique (ex. : nom@domaine.fr)","consent hint":"En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou en nous contactant.","new window":"nouvelle fenêtre",copy:"copier",dailymotion:"Dailymotion",facebook:"Facebook",github:"Github",instagram:"Instagram",linkedin:"LinkedIn",mail:"Email",mastodon:"Mastodon",snapchat:"Snapchat",telegram:"Telegram",threads:"Threads (Instagram)",tiktok:"TikTok",twitch:"Twitch",twitter:"Twitter","twitter-x":"X (anciennement Twitter)",vimeo:"Vimeo",youtube:"Youtube"}});re({lang:"en",messages:{"follow us on social medias":e.createElement(e.Fragment,null,"Follow us",e.createElement("br",null)," on social medias"),"subscribe to our newsletter":"Subscribe to our newsletter","subscribe to our newsletter (2)":"Subscribe to our newsletter",subscribe:"Subscribe","your registration has been processed":"Your registration has been processed","your email address":"Your email address (e.g. name@domain.fr)","consent hint":"By entering your email address, you agree to receive our news by email. You can unsubscribe at any time using the unsubscribe links or by contacting us.","new window":"new window",copy:"copy",dailymotion:"Dailymotion",facebook:"Facebook",github:"Github",instagram:"Instagram",linkedin:"LinkedIn",mail:"Email",mastodon:"Mastodon",snapchat:"Snapchat",telegram:"Telegram",threads:"Threads (Instagram)",tiktok:"TikTok",twitch:"Twitch",twitter:"Twitter","twitter-x":"X (formerly Twitter)",vimeo:"Vimeo",youtube:"Youtube"}});const{action:w}=__STORYBOOK_MODULE_ACTIONS__,{meta:ie,getStory:c}=oe({wrappedComponent:{Follow:T},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lettre-d-information-et-reseaux-sociaux)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/follow/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Follow.tsx)`,argTypes:{classes:{control:!1,description:'Add custom classes for various inner elements. Possible keys are "root", "container", "row", "newsletter-col", "newsletter", "newsletter-title", "newsletter-desc", "newsletter-form-wrapper", "newsletter-form-hint", "social-col", "social", "social-title", "social-buttons", "social-buttons-each"'},newsletter:{control:!1,description:"Newsletter subscription section props"},social:{control:!1,description:"Social media follow buttons section props"}},disabledProps:["lang"]}),be={...ie,title:"components/Follow"},g=[{type:"facebook",linkProps:{href:"#facebook"}},{type:"twitter-x",linkProps:{href:"#twitter"}},{type:"linkedin",linkProps:{href:"#linkedin"}},{type:"instagram",linkProps:{href:"#instagram"}},{type:"youtube",linkProps:{href:"#youtube"}}],S=c({newsletter:{buttonProps:{onClick:w("Default onClick")},form:{formComponent:({children:t})=>React.createElement("form",{action:"#"},t),inputProps:{label:void 0},success:!1}},social:{buttons:g}}),k=c({social:{buttons:g}}),N=c({newsletter:{buttonProps:{onClick:w("NewsletterOnly onClick")}}}),C=c({newsletter:{buttonProps:{linkProps:{href:"#"}}}}),P=c({newsletter:{buttonProps:{onClick:w("NewsletterOnlyWithDescription onClick")},desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et."}}),v=c({newsletter:{buttonProps:{onClick:w("NewsletterOnlyWithForm onClick")},desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",form:{formComponent:({children:t})=>React.createElement("form",{action:"#"},t),success:!1}}}),E=c({newsletter:{buttonProps:{onClick:w("SocialAndNewsletter onClick")},desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et."},social:{buttons:g}}),O=c({newsletter:{buttonProps:{onClick:w("SocialAndNewsletterWithForm onClick")},desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",form:{formComponent:({children:t})=>React.createElement("form",{action:"#"},t),success:!1}},social:{buttons:g}}),x=c({newsletter:{buttonProps:{onClick:w("SocialAndNewsletterWithFormSuccess onClick")},desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",form:{formComponent:({children:t})=>React.createElement("form",{action:"#"},t),success:!0}},social:{buttons:g}}),F=c({newsletter:{buttonProps:{onClick:w("SocialAndNewsletterWithFormError onClick")},desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",form:{formComponent:({children:t})=>React.createElement("form",{action:"#"},t),success:!1,inputProps:{state:"error",stateRelatedMessage:"Le format de l’adresse electronique saisie n’est pas valide. Le format attendu est : nom@exemple.org"}}},social:{buttons:g}});S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("Default onClick")
    },
    form: {
      formComponent: ({
        children
      }) => <form action="#">{children}</form>,
      inputProps: {
        label: undefined
      },
      success: false
    }
  },
  social: {
    buttons: defaultSocialButtons
  }
})`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`getStory({
  social: {
    buttons: defaultSocialButtons
  }
})`,...k.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("NewsletterOnly onClick")
    }
  }
})`,...N.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      linkProps: {
        href: "#"
      }
    }
  }
})`,...C.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("NewsletterOnlyWithDescription onClick")
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et."
  }
})`,...P.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("NewsletterOnlyWithForm onClick")
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
    form: {
      formComponent: ({
        children
      }) => <form action="#">{children}</form>,
      success: false
    }
  }
})`,...v.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("SocialAndNewsletter onClick")
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et."
  },
  social: {
    buttons: defaultSocialButtons
  }
})`,...E.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("SocialAndNewsletterWithForm onClick")
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
    form: {
      formComponent: ({
        children
      }) => <form action="#">{children}</form>,
      success: false
    }
  },
  social: {
    buttons: defaultSocialButtons
  }
})`,...O.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("SocialAndNewsletterWithFormSuccess onClick")
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
    form: {
      formComponent: ({
        children
      }) => <form action="#">{children}</form>,
      success: true
    }
  },
  social: {
    buttons: defaultSocialButtons
  }
})`,...x.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`getStory({
  newsletter: {
    buttonProps: {
      onClick: action("SocialAndNewsletterWithFormError onClick")
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
    form: {
      formComponent: ({
        children
      }) => <form action="#">{children}</form>,
      success: false,
      inputProps: {
        state: "error",
        stateRelatedMessage: "Le format de l’adresse electronique saisie n’est pas valide. Le format attendu est : nom@exemple.org"
      }
    }
  },
  social: {
    buttons: defaultSocialButtons
  }
})`,...F.parameters?.docs?.source}}};const fe=["Default","SocialOnly","NewsletterOnly","NewsletterOnlyButtonAsLink","NewsletterOnlyWithDescription","NewsletterOnlyWithForm","SocialAndNewsletter","SocialAndNewsletterWithForm","SocialAndNewsletterWithFormSuccess","SocialAndNewsletterWithFormError"];export{S as Default,N as NewsletterOnly,C as NewsletterOnlyButtonAsLink,P as NewsletterOnlyWithDescription,v as NewsletterOnlyWithForm,E as SocialAndNewsletter,O as SocialAndNewsletterWithForm,F as SocialAndNewsletterWithFormError,x as SocialAndNewsletterWithFormSuccess,k as SocialOnly,fe as __namedExportsOrder,be as default};
