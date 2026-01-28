import{N as B,d as G,r as k,a as D,K as te,c as z,R as e,g as A,f as r,s as H,O as se,Q as Y,U as oe,V as J,b as S}from"./iframe-BpEV2pGA.js";import{g as ae}from"./getStory-Bli_4i1k.js";import{a as W,F as ie}from"./Footer-T0UfrJO3.js";import{c as re}from"./Modal-BHxehAHW.js";import{e as le}from"./exclude-B3YdXBjJ.js";import{B as ce}from"./Button-Zz2W2k20.js";import"./preload-helper-PPVm8Dsz.js";import"./brandTopAndHomeLinkProps-OUsIpWwg.js";function ue(n){const{useFinalityConsent:t,processConsentChanges:o,useConsentCallback:s}=n;return{useConsent:B?f=>{const{consentCallback:c}=f??{};s({consentCallback:c});const g=t();return{assumeConsent:G(C=>o({type:"atomic change",finality:C,isConsentGiven:!0})),finalityConsent:g}}:()=>({finalityConsent:void 0,assumeConsent:()=>{throw new Error("Cannot assume consent on the server side")}})}}function T(n){return JSON.parse(JSON.stringify(n))}var R=function(n,t){var o={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&t.indexOf(s)<0&&(o[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(n);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(n,s[a])&&(o[s[a]]=n[s[a]]);return o};function de(n){return Object.entries(n.finalityConsent).filter(([t])=>t!=="isFullConsent").map(([t,o])=>typeof o=="boolean"?[{finality:t,isConsentGiven:o}]:Object.entries(o).filter(([s])=>s!=="isFullConsent").map(([s,a])=>({finality:`${t}.${s}`,isConsentGiven:(D(typeof a=="boolean"),a)}))).reduce((t,o)=>[...t,...o],[])}function q(n){const{finalities:t,getFinalityConsent:o,setFinalityConsent:s,consentCallback:a}=n,i=[];a!==void 0&&i.push(a);function y(c){const{consentCallback:g}=c,p=G(C=>g?.(C));i.includes(p)||i.push(p),k.useEffect(()=>()=>{i.splice(i.indexOf(p),1)},[])}return{processConsentChanges:async c=>{if(c.type==="no changes but trigger consent callbacks"){const u=o();if(u===void 0)return;await Promise.all(i.map(d=>d({finalityConsent:u,finalityConsent_prev:u})));return}const g=(()=>{switch(c.type){case"grantAll":return t.map(u=>({finality:u,isConsentGiven:!0}));case"denyAll":return t.map(u=>({finality:u,isConsentGiven:!1}));case"atomic change":return[{finality:c.finality,isConsentGiven:c.isConsentGiven}];case"new finalityConsent explicitly provided":return de({finalityConsent:c.finalityConsent})}})(),p=o();let C=p===void 0?K(t):T(p);for(const{finality:u,isConsentGiven:d}of g)C=fe({finalityConsent:C,finality:u,isConsentGiven:d});s({finalityConsent:C,prAllConsentCallbacksRun:Promise.all(i.map(u=>u({finalityConsent:C,finalityConsent_prev:p}))).then(()=>{})})},useConsentCallback:y}}function K(n){var t;const o={isFullConsent:!1};for(const s of n){const[a,i]=s.split(".");if(i===void 0){o[a]=!1;continue}((t=o[a])!==null&&t!==void 0?t:o[a]={isFullConsent:!1})[i]=!1}return o}function fe(n){const{finality:t,finalityConsent:o,isConsentGiven:s}=n,[a,i]=t.split(".");D(te());const y=T(o),{isFullConsent:f}=y,c=a;y[c];const g=R(y,["isFullConsent",typeof c=="symbol"?c:c+""]);if(i===void 0)return Object.assign(Object.assign({},g),{[a]:s,isFullConsent:s&&!Object.values(g).map(l=>typeof l=="boolean"?l:l.isFullConsent).includes(!1)});const p=T(o[a]),{isFullConsent:C}=p,u=i;p[u];const d=R(p,["isFullConsent",typeof u=="symbol"?u:u+""]),v=s&&!Object.keys(d).map(l=>d[l]).includes(!1);return Object.assign(Object.assign({},g),{[a]:Object.assign(Object.assign({},d),{[i]:s,isFullConsent:v}),isFullConsent:v&&!Object.values(g).map(l=>typeof l=="boolean"?l:l.isFullConsent).includes(!1)})}const{useTranslation:_,addConsentManagementTranslations:me}=z({componentName:"ConsentManagement",frMessages:{"all services pref":"Préférences pour tous les services.","personal data cookies":"Données personnelles et cookies","accept all":"Tout accepter","accept all - title":"Autoriser tous les cookies","refuse all":"Tout refuser","refuse all - title":"Refuser tous les cookies",accept:"Accepter",refuse:"Refuser","confirm choices":"Confirmer mes choix","about cookies":n=>`À propos des cookies sur ${n.hostname}`,"welcome message":n=>{const{Link:t}=A();return e.createElement(e.Fragment,null,"Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site.",n.personalDataPolicyLinkProps!==void 0&&e.createElement(e.Fragment,null," ","Pour en savoir plus, visitez la page"," ",e.createElement(t,Object.assign({},n.personalDataPolicyLinkProps),"Données personnelles et cookies"),"."),"  Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer.")},customize:"Personnaliser","customize cookies - title":"Personnaliser les cookies","consent modal title":"Panneau de gestion des cookies","cookies management":"Gestion des cookies","personal data":"Données personnelles","preferences for all services":n=>{const{Link:t}=A();return e.createElement(e.Fragment,null,"Préférences pour tous les services.",e.createElement("br",null),n.personalDataPolicyLinkProps!==void 0&&e.createElement(t,Object.assign({},n.personalDataPolicyLinkProps),"Données personnelles et cookies"))},"see more details":"Voir plus de détails","hide details":"Cacher les détails","mandatory cookies":"Cookies obligatoires","mandatory cookies - description":"Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés.","confirm my choices":"Confirmer mes choix"}});me({lang:"en",messages:{"all services pref":"Preferences for all services.","personal data cookies":"Personal data and cookies","accept all":"Accept all","accept all - title":"Accept all cookies","refuse all":"Refuse all","refuse all - title":"Refuse all cookies",accept:"Accept",refuse:"Refuse","confirm choices":"Confirm my choices","about cookies":n=>`About cookies on ${n.hostname}`,"welcome message":n=>{const{Link:t}=A();return e.createElement(e.Fragment,null,"Welcome to our website! We use cookies to improve your experience and the services available services available on this site.",n.personalDataPolicyLinkProps!==void 0&&e.createElement(e.Fragment,null,"To learn more, visit the"," ",e.createElement(t,Object.assign({},n.personalDataPolicyLinkProps),'"Personal Data and Cookies"')," ","page."),"  You can, at any time, have control over which cookies you wish to enable at any time.")},customize:"Customize","customize cookies - title":"Customize cookies","consent modal title":"Cookie management panel","cookies management":"Cookies management","preferences for all services":n=>{const{Link:t}=A();return e.createElement(e.Fragment,null,"Preferences for all services ",e.createElement("br",null),n.personalDataPolicyLinkProps!==void 0&&e.createElement(t,Object.assign({},n.personalDataPolicyLinkProps),"Personal data and cookies"))},"see more details":"See more details","hide details":"Hide details","mandatory cookies":"Mandatory cookies","mandatory cookies - description":"This site uses cookies necessary for its proper functioning which cannot be deactivated.","confirm my choices":"Confirm my choices"}});function pe(n){const{personalDataPolicyLinkProps:t,processConsentChanges:o,consentModalButtonProps:s}=n;function a(){const{t:i}=_(),[y,f]=k.useState(""),[c,g]=k.useState(!1);k.useEffect(()=>{B&&f(location.host)},[]);const p="fr-consent-banner";return e.createElement(e.Fragment,null,e.createElement("div",{id:p,className:r.cx("fr-consent-banner")},e.createElement("h2",{className:r.cx("fr-h6")},i("about cookies",{hostname:y})),e.createElement("div",null,e.createElement("p",{className:r.cx("fr-text--sm")},i("welcome message",{personalDataPolicyLinkProps:t}))),e.createElement("ul",{className:r.cx("fr-consent-banner__buttons","fr-btns-group","fr-btns-group--right","fr-btns-group--inline-reverse","fr-btns-group--inline-sm")},e.createElement("li",null,e.createElement("button",{id:`${p}-button-accept-all`,className:r.cx("fr-btn"),title:i("accept all - title"),onClick:async()=>{g(!0),await o({type:"grantAll"}),g(!1)},disabled:c},i("accept all"))),e.createElement("li",null,e.createElement("button",{id:`${p}-button-refuse-app`,className:r.cx("fr-btn"),title:i("refuse all - title"),onClick:()=>{g(!0),o({type:"denyAll"}),g(!1)},disabled:c},i("refuse all"))),e.createElement("li",null,e.createElement("button",Object.assign({id:`${p}-button-customize`,className:r.cx("fr-btn","fr-btn--secondary"),title:i("customize cookies - title"),disabled:c},s),i("customize"))))))}return{ConsentBanner:a}}function ye(n,t){const{id:o,isOpenedByDefault:s}=n,[a,i]=k.useState(s),y=G(()=>t);return k.useEffect(()=>{const f=[],c=C=>{const u=()=>{i(!1),setTimeout(()=>{var m,b;(b=(m=y())===null||m===void 0?void 0:m.onConceal)===null||b===void 0||b.call(m)},0)},d=()=>{var m,b;i(!0),(b=(m=y())===null||m===void 0?void 0:m.onDisclose)===null||b===void 0||b.call(m)};C.addEventListener("dsfr.conceal",u),C.addEventListener("dsfr.disclose",d);const v=()=>{C.removeEventListener("dsfr.conceal",u),C.removeEventListener("dsfr.disclose",d)};f.push(v);const l=new MutationObserver(m=>{m.find(P=>Array.from(P.removedNodes).indexOf(C)!==-1)!==void 0&&(f.splice(f.indexOf(v),1),l.disconnect(),f.splice(f.indexOf(h),1),i(!1),g({isInitialCall:!1}))});l.observe(document,{childList:!0,subtree:!0});const h=()=>l.disconnect();f.push(h)},g=C=>{const{isInitialCall:u}=C;u&&D(!s,[`The ${o} modal isn't initially mounted,`,`it's ok but in this case ${H({isOpenedByDefault:s})} must be set to false.`,"This limitation is to prevent inconsistent state in SSR setups."].join(" "));const d=new MutationObserver((l,h)=>{const m=l.map(b=>Array.from(b.addedNodes)).reduce((b,P)=>b.concat(P),[]).find(b=>b.nodeType===Node.ELEMENT_NODE&&b.nodeName==="DIALOG"&&b.id===o);m!==void 0&&(h.disconnect(),f.splice(f.indexOf(v),1),c(m),s&&i(!0))});d.observe(document,{childList:!0,subtree:!0});const v=()=>d.disconnect();f.push(v)},p=document.getElementById(o);return p!==null?c(p):g({isInitialCall:!0}),()=>{f.forEach(C=>C())}},[o]),a}function ge(n){const[t]=k.useState(n);return t}function Ce(n){const{finalityDescription:t,personalDataPolicyLinkProps:o,useFinalityConsent:s,processConsentChanges:a,finalities:i}=n,y=re({isOpenedByDefault:!1,id:"fr-consent-modal"});function f(){const u=se(),{t:d}=_(),v=k.useMemo(()=>typeof t=="function"?t({lang:u}):t,[u]),{processLocalConsentChange:l,localFinalityConsent:h}=(function(){const E=s(),x=ge(()=>J(()=>E??K(i)));Y(x),k.useEffect(()=>{E!==void 0&&(x.current=E)},[E]);const{processConsentChanges:I}=q({consentCallback:void 0,finalities:i,getFinalityConsent:()=>x.current,setFinalityConsent:({finalityConsent:w})=>x.current=w});return{processLocalConsentChange:I,localFinalityConsent:x.current}})(),[m,b]=k.useState(!1),P=F=>async()=>{switch(b(!0),F){case"apply local changes":await a({type:"new finalityConsent explicitly provided",finalityConsent:h});break;case"denyAll":case"grantAll":l({type:F}),await a({type:F});break}b(!1),y.close()};return e.createElement(y.Component,{title:d("consent modal title"),size:"large"},e.createElement("div",null,e.createElement("div",{className:r.cx("fr-consent-service","fr-consent-manager__header")},e.createElement("fieldset",{className:r.cx("fr-fieldset","fr-fieldset--inline")},e.createElement("legend",{className:r.cx("fr-consent-service__title")},d("preferences for all services",{personalDataPolicyLinkProps:o})),e.createElement("div",{className:r.cx("fr-consent-service__radios")},e.createElement("div",{className:r.cx("fr-btns-group","fr-btns-group--inline","fr-btns-group--right")},e.createElement("button",{id:`${y.id}-button-accept-all`,title:d("accept all - title"),className:r.cx("fr-btn"),onClick:P("grantAll"),disabled:m},d("accept all"))," ",e.createElement("button",{id:`${y.id}-button-refuse-all`,title:d("refuse all - title"),className:r.cx("fr-btn","fr-btn--secondary"),disabled:m,onClick:P("denyAll")},d("refuse all")))))),e.createElement(c,{title:d("mandatory cookies"),description:d("mandatory cookies - description"),finalityConsent:!0,onChange:void 0,subFinalities:void 0}),oe(v).map(F=>({finality:(D(typeof F=="string"),F),wrap:v[F]})).map(({finality:F,wrap:E})=>e.createElement(c,{key:F,title:E.title,description:E.description,subFinalities:E.subFinalities,onChange:({subFinality:x,isConsentGiven:I})=>(x!==void 0?[`${F}.${x}`]:E.subFinalities===void 0?[F]:Object.keys(E.subFinalities).map(N=>`${F}.${N}`)).forEach(N=>l({type:"atomic change",finality:N,isConsentGiven:I})),finalityConsent:h[F]})),e.createElement("ul",{className:r.cx("fr-consent-manager__buttons","fr-btns-group","fr-btns-group--right","fr-btns-group--inline-sm")},e.createElement("li",null,e.createElement("button",{id:`${y.id}-button-confirm`,className:r.cx("fr-btn"),disabled:m,onClick:P("apply local changes")},d("confirm choices"))))))}function c(u){const{title:d,description:v,subFinalities:l,finalityConsent:h,onChange:m}=u,{t:b}=_(),{legendId:P,descriptionId:F,acceptInputId:E,refuseInputId:x,subFinalityDivId:I}=(function(){const O=k.useId(),L=`finality-${O}-legend`,$=`finality-${O}-desc`,X=`consent-finality-${O}-accept`,ee=`consent-finality-${O}-refuse`,ne=`finality-${O}-collapse`;return{legendId:L,descriptionId:$,acceptInputId:X,refuseInputId:ee,subFinalityDivId:ne}})(),N=k.useMemo(()=>typeof h=="boolean"?h?"full consent":"full refusal":h.isFullConsent?"full consent":Object.keys(h).filter(le("isFullConsent")).map(M=>h[M]).includes(!0)?"partial consent":"full refusal",[h]),[w,Z]=k.useState(!0);return e.createElement("div",{className:r.cx("fr-consent-service")},e.createElement("fieldset",{"aria-labelledby":`${P} ${F}`,role:"group",className:r.cx("fr-fieldset")},e.createElement("legend",{id:P,className:r.cx("fr-consent-service__title")},d),e.createElement("div",{className:r.cx("fr-consent-service__radios")},e.createElement("div",{className:r.cx("fr-radio-group")},e.createElement("input",Object.assign({type:"radio",id:E,checked:N==="full consent"},m===void 0?{disabled:!0}:{onChange:()=>m({subFinality:void 0,isConsentGiven:!0})})),e.createElement("label",{className:r.cx("fr-label"),htmlFor:E},b("accept"))),e.createElement("div",{className:r.cx("fr-radio-group")},e.createElement("input",Object.assign({type:"radio",id:x,checked:N==="full refusal"},m===void 0?{disabled:!0}:{onChange:()=>m({subFinality:void 0,isConsentGiven:!1})})),e.createElement("label",{className:r.cx("fr-label"),htmlFor:x},b("refuse")))),v!==void 0&&e.createElement("p",{className:r.cx("fr-consent-service__desc")},v),l!==void 0&&(D(typeof h!="boolean"),D(m!==void 0),e.createElement(e.Fragment,null,e.createElement("div",{className:r.cx("fr-consent-service__collapse")},e.createElement("button",{className:r.cx("fr-consent-service__collapse-btn"),"aria-expanded":"false","aria-describedby":P,"aria-controls":I,onClick:()=>Z(!w)},b(w?"see more details":"hide details"))),e.createElement("div",{className:r.cx("fr-consent-services","fr-collapse"),id:I},Object.entries(l).map(([M,{title:O,description:L}])=>e.createElement(g,{key:M,title:O,description:L,isConsentGiven:h[M],onChange:({isConsentGiven:$})=>m({subFinality:M,isConsentGiven:$})})))))))}function g(u){const{title:d,description:v,onChange:l,isConsentGiven:h}=u,{t:m}=_(),{acceptInputId:b,refuseInputId:P}=(function(){const E=k.useId(),x=`consent-finality-${E}-service-accept`,I=`consent-finality-${E}-service-refuse`;return{acceptInputId:x,refuseInputId:I}})();return e.createElement("div",{className:r.cx("fr-consent-service")},e.createElement("fieldset",{className:r.cx("fr-fieldset","fr-fieldset--inline")},e.createElement("legend",{className:r.cx("fr-consent-service__title")},d),v!==void 0&&e.createElement("p",{className:r.cx("fr-consent-service__desc")},v),e.createElement("div",{className:r.cx("fr-consent-service__radios","fr-fieldset--inline")},e.createElement("div",{className:r.cx("fr-radio-group")},e.createElement("input",{type:"radio",id:b,checked:h,onChange:()=>l({isConsentGiven:!0})}),e.createElement("label",{className:r.cx("fr-label"),htmlFor:b},m("accept"))),e.createElement("div",{className:r.cx("fr-radio-group")},e.createElement("input",{type:"radio",id:P,checked:!h,onChange:()=>l({isConsentGiven:!1})}),e.createElement("label",{className:r.cx("fr-label"),htmlFor:P},m("refuse"))))))}const p=y.buttonProps;function C(){return ye(y)}return{ConsentManagement:f,consentModalButtonProps:p,useIsConsentManagementOpen:C}}function be(n){const{finalityDescription:t,useFinalityConsent:o,processConsentChanges:s,personalDataPolicyLinkProps:a,finalities:i}=n,{ConsentManagement:y,consentModalButtonProps:f,useIsConsentManagementOpen:c}=Ce({finalityDescription:t,personalDataPolicyLinkProps:a,useFinalityConsent:o,processConsentChanges:s,finalities:i}),{ConsentBanner:g}=pe({personalDataPolicyLinkProps:a,processConsentChanges:s,consentModalButtonProps:f}),{FooterConsentManagementItem:p}=he({consentModalButtonProps:f});let C=()=>{s({type:"no changes but trigger consent callbacks"}),C=void 0};function u(){const[v,l]=k.useReducer(()=>!0,!1);k.useEffect(()=>{C?.(),l()},[]);const h=o(),m=c();return v?e.createElement(e.Fragment,null,h===void 0&&!m&&e.createElement(g,null),e.createElement(y,null)):null}const{FooterPersonalDataPolicyItem:d}=ve({personalDataPolicyLinkProps:a});return{ConsentBannerAndConsentManagement:u,FooterConsentManagementItem:p,FooterPersonalDataPolicyItem:d}}function he(n){const{consentModalButtonProps:t}=n;function o(){const{t:s}=_();return e.createElement(W,{bottomItem:{buttonProps:t,text:s("cookies management")}})}return{FooterConsentManagementItem:o}}function ve(n){const{personalDataPolicyLinkProps:t}=n;function o(){const{t:s}=_();if(t===void 0)throw new Error(["You should provide a personalDataPolicyLinkProps to createConsentManagement if","you want to add a link to the personal data policy in the footer"].join(" "));return e.createElement(W,{bottomItem:{text:s("personal data"),linkProps:t}})}return{FooterPersonalDataPolicyItem:o}}const U="@codegouvfr/react-dsfr finalityConsent";function ke(n){const{finalityDescription:t,personalDataPolicyLinkProps:o,consentCallback:s,localStorageKeyPrefix:a=U}=n,i=Ee({finalityDescription:typeof t=="function"?t({lang:"fr"}):t}),y=`${a} ${i.join("-")}`,f=J(()=>{if(!B)return;const l=localStorage.getItem(y);if(l!==null)return JSON.parse(l)}),{processConsentChanges:c,useConsentCallback:g}=q({consentCallback:s,finalities:i,getFinalityConsent:()=>f.current,setFinalityConsent:({finalityConsent:l,prAllConsentCallbacksRun:h})=>{localStorage.setItem(y,JSON.stringify(l)),h.then(()=>f.current=l)}});function p(){Y(f);const[l,h]=k.useReducer(()=>!0,!0);if(k.useEffect(()=>{h()},[]),!!l)return f.current}const{useConsent:C}=ue({useFinalityConsent:p,processConsentChanges:c,useConsentCallback:g}),{ConsentBannerAndConsentManagement:u,FooterConsentManagementItem:d,FooterPersonalDataPolicyItem:v}=be({finalityDescription:t,personalDataPolicyLinkProps:o,processConsentChanges:c,useFinalityConsent:p,finalities:i});return{useConsent:C,ConsentBannerAndConsentManagement:u,FooterConsentManagementItem:d,FooterPersonalDataPolicyItem:v}}function Ee(n){const{finalityDescription:t}=n,o=[];for(const s in t){const a=t[s],{subFinalities:i}=a;if(i===void 0){o.push(s);continue}for(const y in i)o.push(`${s}.${y}`)}return o}var Fe=function(n,t){var o={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&t.indexOf(s)<0&&(o[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(n);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(n,s[a])&&(o[s[a]]=n[s[a]]);return o};const V=k.memo(k.forwardRef((n,t)=>{const{t:o}=Pe(),{className:s,titleAs:a="h4",classes:i={},style:y,title:f,description:c,onGranted:g}=n,p=Fe(n,["className","titleAs","classes","style","title","description","onGranted"]);return D(),e.createElement("div",Object.assign({className:S(r.cx("fr-consent-placeholder"),i.root,s),ref:t,style:y},p),e.createElement(a,{className:S(r.cx("fr-h6","fr-mb-2v"),i.title)},f),e.createElement("p",{className:S(r.cx("fr-mb-6v"),i.title)},c),e.createElement("button",{className:S(r.cx("fr-btn"),i.button),title:c,onClick:g},o("enable message")))})),{useTranslation:Pe,addPlaceholderTranslations:Q}=z({componentName:H({Placeholder:V}),frMessages:{"enable message":"Autoriser"}});Q({lang:"en",messages:{"enable message":"Authorize"}});Q({lang:"es",messages:{"enable message":"Permitir"}});const{meta:xe,getStory:Ie}=ae({wrappedComponent:{consentManagement:_e},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/consentManagement)

\`src/consentManagement.tsx\` (This is a file you should create in your project)  

Refer to [this section of the Guides](https://react-dsfr.codegouv.studio/analytics) to see how to setup the the 
mandated solution for analytics in your project.  
  
You can find a complete example setup in [the Demo repo for Next.js App Router](https://github.com/garronej/react-dsfr-next-appdir-demo/blob/main/ui/consentManagement.tsx) 
which is live [here](https://stackblitz.com/edit/nextjs-j2wba3?file=pages/index.tsx). You should be able to easily adapt it to other meta frameworks (Vite, Next Pages Router, CRA).
  
\`\`\`tsx
"use client";

import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";

export const { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem,
    useConsent
} = createConsentManagement({
    /* 
        Can be an object or a function that take the current language as argument.
        You should here describe the finalities of the cookies you use so that the user can choose to accept or not.
    */
    "finalityDescription": ({ lang }) => ({
        "advertising": {
            "title": "Publicité",
            "description": "Nous utilisons des cookies pour vous proposer des publicités adaptées à vos centres d’intérêts et mesurer leur efficacité."
        },
        "analytics": {
            "title": "Analyse",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
        },
        "personalization": {
            "title": "Personnalisation",
            "description": "Nous utilisons des cookies pour vous proposer des contenus adaptés à vos centres d’intérêts."
        },
        "instagram": {
            "title": "Instagram integration",
            "description": "We use cookies to display Instagram content."
        },
        "statistics": {
            "title": "Statistiques",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
            /* You can add subFinalities to a finality in order to let the user choose more precisely what he accepts.  */
            "subFinalities": {
                "deviceInfo": "Informations sur votre appareil",
                "traffic": "Informations sur votre navigation",
            }
        }
    }),
    /* 
    If you have a page that describe your personal data policy, you can link to it here. 
    Like any other *LinkProps you can turn it into a button by using { href: "#", onClick: ... } 
    (if you are using react-router it will be \`to\` instead of \`href\`).
    */
    "personalDataPolicyLinkProps": {
        "href": "/politique-de-confidentialite",
    },
    /* 
    This optional callback is called when the user take stance on what he accept and refuse. 
    It gives you the opportunity to perform asynchronous actions before the user can continue to navigate.

    */
    "consentCallback": async ({ finalityConsent, finalityConsent_prev })=> {

        /*
        Given the finalityDescription used in this example the Finality consent object will be of the form:  
        {
            advertising: boolean;
            analytics: boolean;
            personalization: boolean;
            instagram: boolean;
            statistics: {
                deviceInfo: boolean;
                traffic: boolean;
                isFullConsent: boolean;
            };
            isFullConsent: boolean;
        }

        The finalityConsent_prev represent the previous consent object.
        If the user is taking stance for the first time, finalityConsent_prev will be undefined.
        finalityConsent_prev is restored from the localStorage.
        */


        /*
        Example with Google Analytics:

        window.gtag("consent", "update", {
            analytics_storage: finalityConsent.statistics.isFullConsent ? "granted" : "denied"
        });

        */


        /*
        Example: Reload the page if the user refuse cookies.
        if( finalityConsent_prev === undefined && !finalityConsent.isFullConsent ){
            //Do something async
            location.reload();
        }
        */

    }
});
\`\`\`

\`app/layout.tsx\` (or any other file where you have your footer)  

\`\`\`tsx
import { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem 
} from "./consentManagement";


function RootLayout(){
    return (
        <html>
            <head></head>
            <body>
                {/* This component must be the first thing in the body of your app.
                If you're in Next App Router it should be wrapped within <DsfrProvider> */}
                <ConsentBannerAndConsentManagement /> 
                {/* ... */}
                <Footer
                    bottomItems={[
                        headerFooterDisplayItem,
                        <FooterPersonalDataPolicyItem />,
                        <FooterConsentManagementItem />
                    ]}
                />
            </body>
        </html>
    );
}
\`\`\`

You are all set, now let's see some use cases.

Placeholders are also provided to help you display content conditionally based on the user consent.  

\`\`\`tsx
import { useConsent } from "./consentManagement";
import { Placeholder } from "@codegouvfr/react-dsfr/consentManagement/Placeholder";

export function MyComponent(){

    const { finalityConsent, g } = useConsent();

    return (
        !finalityConsent.instagram ?
            <Placeholder
                title="Instagram"
                description="We use cookies to display Instagram content."
                onGranted={()=> assumeConsent("instagram")}
            />
            :
            <InstagramEmbed url="https://www.instagram.com/p/COQwZ9XKZ1b/" />
    );


}
\`\`\`

You can also register a \`consentCallback\` in a component.  

\`\`\`tsx
import { useConsent } from "./consentManagement";
import { Placeholder } from "@codegouvfr/react-dsfr/consentManagement/Placeholder";

export function MyComponent(){

    useConsent({
        consentCallback: async ({ finalityConsent, finalityConsent_prev })=> {
            //Do something when user take stance
        }
    });

    return (
        //...
    );

}
\`\`\`
`,disabledProps:["containerWidth"],doHideImportInstruction:!0}),{ConsentBannerAndConsentManagement:Ne,FooterConsentManagementItem:Oe,FooterPersonalDataPolicyItem:De,useConsent:Me}=ke({finalityDescription:{advertising:{title:"Publicité",description:"Nous utilisons des cookies pour vous proposer des publicités adaptées à vos centres d’intérêts et mesurer leur efficacité."},analytics:{title:"Analyse",description:"Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."},personalization:{title:"Personnalisation",description:"Nous utilisons des cookies pour vous proposer des contenus adaptés à vos centres d’intérêts."},statistics:{title:"Statistiques",description:"Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",subFinalities:{deviceInfo:{title:"Informations sur votre appareil",description:"Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."},traffic:{title:"Informations sur votre navigation",description:"Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."}}}},personalDataPolicyLinkProps:{href:"#",onClick:()=>alert("Navigate to the page where you explain your personal data policy")},consentCallback:({finalityConsent:n,finalityConsent_prev:t})=>alert(["Opportunity to do an async operation here.","","Previously the finalityConsent object was:","",t===void 0?"undefined (the user hadn't took stance yet)":JSON.stringify(t,null,2),"","The new finalityConsentObject is:","",JSON.stringify(n,null,2)].join(`
`))});function _e(){const{finalityConsent:n,assumeConsent:t}=Me();return e.createElement(e.Fragment,null,n===void 0?e.createElement("p",null,"User hasn't given consent nor explicitly refused use of third party cookies."):e.createElement("pre",null,JSON.stringify({finalityConsent:n},null,2)),n&&n.analytics===!1&&e.createElement(V,{title:"Analytics are not enabled",description:"We use cookies to measure the audience of our site and improve its content.",onGranted:()=>t("analytics"),titleAs:"span"}),e.createElement(ce,{onClick:()=>{Object.keys(localStorage).filter(o=>o.startsWith(U)).forEach(o=>localStorage.removeItem(o)),location.reload()},className:r.cx("fr-mb-10v","fr-mt-10v")},"Clear localStorage and reload."),e.createElement(Ne,null),e.createElement(ie,{accessibility:"fully compliant",contentDescription:`
                Ce message est à remplacer par les informations de votre site.

                Comme exemple de contenu, vous pouvez indiquer les informations 
                suivantes : Le site officiel d’information administrative pour les entreprises.
                Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
                à la gestion et au développement de votre entreprise.
            `,brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},bottomItems:[e.createElement(De,null),e.createElement(Oe,null)]}))}const Ge={...xe,title:"components/ConsentManagement"},j=Ie({});j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"getStory({})",...j.parameters?.docs?.source}}};const Re=["Default"];export{j as Default,Re as __namedExportsOrder,Ge as default};
