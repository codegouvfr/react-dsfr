import{r as u,a2 as h,a0 as xe,a1 as S,a3 as y,a4 as Z,R as ge,b as Jt}from"./iframe-DCkbD6Ro.js";import{a as Qt}from"./SearchButton-BS3Oea2P.js";import{g as Zt}from"./getStory-JVSS1Wer.js";import{f as eo,e as It,h as Ve,m as to,b as We,g as me,c as Fe,s as V,j as E,l as Ke,_ as oo,T as Dt,a as dt,i as no,P as qt}from"./TransitionGroupContext-Ds29whtg.js";import{k as Ot}from"./emotion-react.browser.esm-CVkFjoh8.js";import"./preload-helper-PPVm8Dsz.js";import"./emotion-serialize.browser.esm-B2PIuRZ_.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-Bh5soZz2.js";const ro=e=>{const t=u.useRef({});return u.useEffect(()=>{t.current=e}),t.current},At=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)};function zt(e){return typeof e.normalize<"u"?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function ao(e={}){const{ignoreAccents:t=!0,ignoreCase:o=!0,limit:a,matchFrom:l="any",stringify:s,trim:c=!1}=e;return(p,{inputValue:d,getOptionLabel:m})=>{let b=c?d.trim():d;o&&(b=b.toLowerCase()),t&&(b=zt(b));const x=b?p.filter(P=>{let k=(s||m)(P);return o&&(k=k.toLowerCase()),t&&(k=zt(k)),l==="start"?k.indexOf(b)===0:k.indexOf(b)>-1}):p;return typeof a=="number"?x.slice(0,a):x}}function $t(e,t){for(let o=0;o<e.length;o+=1)if(t(e[o]))return o;return-1}const lo=ao(),Bt=5,io=e=>{var t;return e.current!==null&&((t=e.current.parentElement)==null?void 0:t.contains(document.activeElement))};function so(e){const{unstable_isActiveElementInListbox:t=io,unstable_classNamePrefix:o="Mui",autoComplete:a=!1,autoHighlight:l=!1,autoSelect:s=!1,blurOnSelect:c=!1,clearOnBlur:p=!e.freeSolo,clearOnEscape:d=!1,componentName:m="useAutocomplete",defaultValue:b=e.multiple?[]:null,disableClearable:x=!1,disableCloseOnSelect:P=!1,disabled:k,disabledItemsFocusable:R=!1,disableListWrap:z=!1,filterOptions:se=lo,filterSelectedOptions:ee=!1,freeSolo:te=!1,getOptionDisabled:W,getOptionLabel:M=r=>{var n;return(n=r.label)!=null?n:r},groupBy:F,handleHomeEndKeys:K=!e.freeSolo,id:Y,includeInputInList:ce=!1,inputValue:Ce,isOptionEqualToValue:w=(r,n)=>r===n,multiple:C=!1,onChange:_,onClose:q,onHighlightChange:D,onInputChange:U,onOpen:X,open:ue,openOnFocus:oe=!1,options:B,readOnly:de=!1,selectOnFocus:tt=!e.freeSolo,value:_e}=e,ne=eo(Y);let N=M;N=r=>{const n=M(r);return typeof n!="string"?String(n):n};const Ie=u.useRef(!1),Te=u.useRef(!0),j=u.useRef(null),re=u.useRef(null),[ae,ot]=u.useState(null),[ie,Ee]=u.useState(-1),qe=l?0:-1,J=u.useRef(qe),[v,Ge]=It({controlled:_e,default:b,name:m}),[T,$e]=It({controlled:Ce,default:"",name:m,state:"inputValue"}),[be,Ne]=u.useState(!1),Se=u.useCallback((r,n)=>{if(!(C?v.length<n.length:n!==null)&&!p)return;let f;if(C)f="";else if(n==null)f="";else{const I=N(n);f=typeof I=="string"?I:""}T!==f&&($e(f),U&&U(r,f,"reset"))},[N,T,C,U,$e,p,v]),[ve,Ye]=It({controlled:ue,default:!1,name:m,state:"open"}),[we,Re]=u.useState(!0),Xe=!C&&v!=null&&T===N(v),Q=ve&&!de,L=Q?se(B.filter(r=>!(ee&&(C?v:[v]).some(n=>n!==null&&w(r,n)))),{inputValue:Xe&&we?"":T,getOptionLabel:N}):[],g=ro({filteredOptions:L,value:v,inputValue:T});u.useEffect(()=>{const r=v!==g.value;be&&!r||te&&!r||Se(null,v)},[v,Se,be,g.value,te]);const De=ve&&L.length>0&&!de,Ae=Ve(r=>{r===-1?j.current.focus():ae.querySelector(`[data-tag-index="${r}"]`).focus()});u.useEffect(()=>{C&&ie>v.length-1&&(Ee(-1),Ae(-1))},[v,C,ie,Ae]);function Je(r,n){if(!re.current||r<0||r>=L.length)return-1;let i=r;for(;;){const f=re.current.querySelector(`[data-option-index="${i}"]`),I=R?!1:!f||f.disabled||f.getAttribute("aria-disabled")==="true";if(f&&f.hasAttribute("tabindex")&&!I)return i;if(n==="next"?i=(i+1)%L.length:i=(i-1+L.length)%L.length,i===r)return-1}}const pe=Ve(({event:r,index:n,reason:i="auto"})=>{if(J.current=n,n===-1?j.current.removeAttribute("aria-activedescendant"):j.current.setAttribute("aria-activedescendant",`${ne}-option-${n}`),D&&D(r,n===-1?null:L[n],i),!re.current)return;const f=re.current.querySelector(`[role="option"].${o}-focused`);f&&(f.classList.remove(`${o}-focused`),f.classList.remove(`${o}-focusVisible`));let I=re.current;if(re.current.getAttribute("role")!=="listbox"&&(I=re.current.parentElement.querySelector('[role="listbox"]')),!I)return;if(n===-1){I.scrollTop=0;return}const A=re.current.querySelector(`[data-option-index="${n}"]`);if(A&&(A.classList.add(`${o}-focused`),i==="keyboard"&&A.classList.add(`${o}-focusVisible`),I.scrollHeight>I.clientHeight&&i!=="mouse"&&i!=="touch")){const H=A,Oe=I.clientHeight+I.scrollTop,wt=H.offsetTop+H.offsetHeight;wt>Oe?I.scrollTop=wt-I.clientHeight:H.offsetTop-H.offsetHeight*(F?1.3:0)<I.scrollTop&&(I.scrollTop=H.offsetTop-H.offsetHeight*(F?1.3:0))}}),fe=Ve(({event:r,diff:n,direction:i="next",reason:f="auto"})=>{if(!Q)return;const A=Je((()=>{const H=L.length-1;if(n==="reset")return qe;if(n==="start")return 0;if(n==="end")return H;const Oe=J.current+n;return Oe<0?Oe===-1&&ce?-1:z&&J.current!==-1||Math.abs(n)>1?0:H:Oe>H?Oe===H+1&&ce?-1:z||Math.abs(n)>1?H:0:Oe})(),i);if(pe({index:A,reason:f,event:r}),a&&n!=="reset")if(A===-1)j.current.value=T;else{const H=N(L[A]);j.current.value=H,H.toLowerCase().indexOf(T.toLowerCase())===0&&T.length>0&&j.current.setSelectionRange(T.length,H.length)}}),gt=()=>{const r=(n,i)=>{const f=n?N(n):"",I=i?N(i):"";return f===I};if(J.current!==-1&&g.filteredOptions&&g.filteredOptions.length!==L.length&&g.inputValue===T&&(C?v.length===g.value.length&&g.value.every((n,i)=>N(v[i])===N(n)):r(g.value,v))){const n=g.filteredOptions[J.current];if(n&&L.some(f=>N(f)===N(n)))return!0}return!1},ze=u.useCallback(()=>{if(!Q||gt())return;const r=C?v[0]:v;if(L.length===0||r==null){fe({diff:"reset"});return}if(re.current){if(r!=null){const n=L[J.current];if(C&&n&&$t(v,f=>w(n,f))!==-1)return;const i=$t(L,f=>w(f,r));i===-1?fe({diff:"reset"}):pe({index:i});return}if(J.current>=L.length-1){pe({index:L.length-1});return}pe({index:J.current})}},[L.length,C?!1:v,ee,fe,pe,Q,T,C]),mt=Ve(r=>{to(re,r),r&&ze()});u.useEffect(()=>{ze()},[ze]);const Le=r=>{ve||(Ye(!0),Re(!0),X&&X(r))},ke=(r,n)=>{ve&&(Ye(!1),q&&q(r,n))},Pe=(r,n,i,f)=>{if(C){if(v.length===n.length&&v.every((I,A)=>I===n[A]))return}else if(v===n)return;_&&_(r,n,i,f),Ge(n)},Be=u.useRef(!1),Ue=(r,n,i="selectOption",f="options")=>{let I=i,A=n;if(C){A=Array.isArray(v)?v.slice():[];const H=$t(A,Oe=>w(n,Oe));H===-1?A.push(n):f!=="freeSolo"&&(A.splice(H,1),I="removeOption")}Se(r,A),Pe(r,A,I,{option:n}),!P&&(!r||!r.ctrlKey&&!r.metaKey)&&ke(r,I),(c===!0||c==="touch"&&Be.current||c==="mouse"&&!Be.current)&&j.current.blur()};function bt(r,n){if(r===-1)return-1;let i=r;for(;;){if(n==="next"&&i===v.length||n==="previous"&&i===-1)return-1;const f=ae.querySelector(`[data-tag-index="${i}"]`);if(!f||!f.hasAttribute("tabindex")||f.disabled||f.getAttribute("aria-disabled")==="true")i+=n==="next"?1:-1;else return i}}const nt=(r,n)=>{if(!C)return;T===""&&ke(r,"toggleInput");let i=ie;ie===-1?T===""&&n==="previous"&&(i=v.length-1):(i+=n==="next"?1:-1,i<0&&(i=0),i===v.length&&(i=-1)),i=bt(i,n),Ee(i),Ae(i)},at=r=>{Ie.current=!0,$e(""),U&&U(r,"","clear"),Pe(r,C?[]:null,"clear")},vt=r=>n=>{if(r.onKeyDown&&r.onKeyDown(n),!n.defaultMuiPrevented&&(ie!==-1&&["ArrowLeft","ArrowRight"].indexOf(n.key)===-1&&(Ee(-1),Ae(-1)),n.which!==229))switch(n.key){case"Home":Q&&K&&(n.preventDefault(),fe({diff:"start",direction:"next",reason:"keyboard",event:n}));break;case"End":Q&&K&&(n.preventDefault(),fe({diff:"end",direction:"previous",reason:"keyboard",event:n}));break;case"PageUp":n.preventDefault(),fe({diff:-Bt,direction:"previous",reason:"keyboard",event:n}),Le(n);break;case"PageDown":n.preventDefault(),fe({diff:Bt,direction:"next",reason:"keyboard",event:n}),Le(n);break;case"ArrowDown":n.preventDefault(),fe({diff:1,direction:"next",reason:"keyboard",event:n}),Le(n);break;case"ArrowUp":n.preventDefault(),fe({diff:-1,direction:"previous",reason:"keyboard",event:n}),Le(n);break;case"ArrowLeft":nt(n,"previous");break;case"ArrowRight":nt(n,"next");break;case"Enter":if(J.current!==-1&&Q){const i=L[J.current],f=W?W(i):!1;if(n.preventDefault(),f)return;Ue(n,i,"selectOption"),a&&j.current.setSelectionRange(j.current.value.length,j.current.value.length)}else te&&T!==""&&Xe===!1&&(C&&n.preventDefault(),Ue(n,T,"createOption","freeSolo"));break;case"Escape":Q?(n.preventDefault(),n.stopPropagation(),ke(n,"escape")):d&&(T!==""||C&&v.length>0)&&(n.preventDefault(),n.stopPropagation(),at(n));break;case"Backspace":if(C&&!de&&T===""&&v.length>0){const i=ie===-1?v.length-1:ie,f=v.slice();f.splice(i,1),Pe(n,f,"removeOption",{option:v[i]})}break;case"Delete":if(C&&!de&&T===""&&v.length>0&&ie!==-1){const i=ie,f=v.slice();f.splice(i,1),Pe(n,f,"removeOption",{option:v[i]})}break}},yt=r=>{Ne(!0),oe&&!Ie.current&&Le(r)},xt=r=>{if(t(re)){j.current.focus();return}Ne(!1),Te.current=!0,Ie.current=!1,s&&J.current!==-1&&Q?Ue(r,L[J.current],"blur"):s&&te&&T!==""?Ue(r,T,"blur","freeSolo"):p&&Se(r,v),ke(r,"blur")},rt=r=>{const n=r.target.value;T!==n&&($e(n),Re(!1),U&&U(r,n,"input")),n===""?!x&&!C&&Pe(r,null,"clear"):Le(r)},le=r=>{const n=Number(r.currentTarget.getAttribute("data-option-index"));J.current!==n&&pe({event:r,index:n,reason:"mouse"})},G=r=>{pe({event:r,index:Number(r.currentTarget.getAttribute("data-option-index")),reason:"touch"}),Be.current=!0},ye=r=>{const n=Number(r.currentTarget.getAttribute("data-option-index"));Ue(r,L[n],"selectOption"),Be.current=!1},Et=r=>n=>{const i=v.slice();i.splice(r,1),Pe(n,i,"removeOption",{option:v[r]})},lt=r=>{ve?ke(r,"toggleInput"):Le(r)},Nt=r=>{r.currentTarget.contains(r.target)&&r.target.getAttribute("id")!==ne&&r.preventDefault()},Ct=r=>{r.currentTarget.contains(r.target)&&(j.current.focus(),tt&&Te.current&&j.current.selectionEnd-j.current.selectionStart===0&&j.current.select(),Te.current=!1)},it=r=>{!k&&(T===""||!ve)&&lt(r)};let je=te&&T.length>0;je=je||(C?v.length>0:v!==null);let Qe=L;return F&&(Qe=L.reduce((r,n,i)=>{const f=F(n);return r.length>0&&r[r.length-1].group===f?r[r.length-1].options.push(n):r.push({key:i,index:i,group:f,options:[n]}),r},[])),k&&be&&xt(),{getRootProps:(r={})=>h({"aria-owns":De?`${ne}-listbox`:null},r,{onKeyDown:vt(r),onMouseDown:Nt,onClick:Ct}),getInputLabelProps:()=>({id:`${ne}-label`,htmlFor:ne}),getInputProps:()=>({id:ne,value:T,onBlur:xt,onFocus:yt,onChange:rt,onMouseDown:it,"aria-activedescendant":Q?"":null,"aria-autocomplete":a?"both":"list","aria-controls":De?`${ne}-listbox`:void 0,"aria-expanded":De,autoComplete:"off",ref:j,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:k}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:at}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:lt}),getTagProps:({index:r})=>h({key:r,"data-tag-index":r,tabIndex:-1},!de&&{onDelete:Et(r)}),getListboxProps:()=>({role:"listbox",id:`${ne}-listbox`,"aria-labelledby":`${ne}-label`,ref:mt,onMouseDown:r=>{r.preventDefault()}}),getOptionProps:({index:r,option:n})=>{const i=(C?v:[v]).some(I=>I!=null&&w(n,I)),f=W?W(n):!1;return{key:N(n),tabIndex:-1,role:"option",id:`${ne}-option-${r}`,onMouseMove:le,onClick:ye,onTouchStart:G,"data-option-index":r,"aria-disabled":f,"aria-selected":i}},id:ne,inputValue:T,value:v,dirty:je,expanded:Q&&ae,popupOpen:Q,focused:be||ie!==-1,anchorEl:ae,setAnchorEl:ot,focusedTag:ie,groupedOptions:Qe}}function co(e){return We("MuiListSubheader",e)}me("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const po=["className","color","component","disableGutters","disableSticky","inset"],uo=e=>{const{classes:t,color:o,disableGutters:a,inset:l,disableSticky:s}=e,c={root:["root",o!=="default"&&`color${y(o)}`,!a&&"gutters",l&&"inset",!s&&"sticky"]};return Ke(c,co,t)},fo=V("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="default"&&t[`color${y(o.color)}`],!o.disableGutters&&t.gutters,o.inset&&t.inset,!o.disableSticky&&t.sticky]}})(({theme:e,ownerState:t})=>h({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(e.vars||e).palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},t.color==="primary"&&{color:(e.vars||e).palette.primary.main},t.color==="inherit"&&{color:"inherit"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.inset&&{paddingLeft:72},!t.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(e.vars||e).palette.background.paper})),Gt=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiListSubheader"}),{className:l,color:s="default",component:c="li",disableGutters:p=!1,disableSticky:d=!1,inset:m=!1}=a,b=xe(a,po),x=h({},a,{color:s,component:c,disableGutters:p,disableSticky:d,inset:m}),P=uo(x);return S.jsx(fo,h({as:c,className:E(P.root,l),ref:o,ownerState:x},b))});Gt.muiSkipListHighlight=!0;function ho(e){return We("MuiPaper",e)}me("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const go=["className","component","elevation","square","variant"],mo=e=>{const{square:t,elevation:o,variant:a,classes:l}=e,s={root:["root",a,!t&&"rounded",a==="elevation"&&`elevation${o}`]};return Ke(s,ho,l)},bo=V("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],!o.square&&t.rounded,o.variant==="elevation"&&t[`elevation${o.elevation}`]]}})(({theme:e,ownerState:t})=>{var o;return h({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&h({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Z("#fff",At(t.elevation))}, ${Z("#fff",At(t.elevation))})`},e.vars&&{backgroundImage:(o=e.vars.overlays)==null?void 0:o[t.elevation]}))}),Yt=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiPaper"}),{className:l,component:s="div",elevation:c=1,square:p=!1,variant:d="elevation"}=a,m=xe(a,go),b=h({},a,{component:s,elevation:c,square:p,variant:d}),x=mo(b);return S.jsx(bo,h({as:s,ownerState:b,className:E(x.root,l),ref:o},m))});function vo(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Mt(e,t){var o=function(s){return t&&u.isValidElement(s)?t(s):s},a=Object.create(null);return e&&u.Children.map(e,function(l){return l}).forEach(function(l){a[l.key]=o(l)}),a}function yo(e,t){e=e||{},t=t||{};function o(b){return b in t?t[b]:e[b]}var a=Object.create(null),l=[];for(var s in e)s in t?l.length&&(a[s]=l,l=[]):l.push(s);var c,p={};for(var d in t){if(a[d])for(c=0;c<a[d].length;c++){var m=a[d][c];p[a[d][c]]=o(m)}p[d]=o(d)}for(c=0;c<l.length;c++)p[l[c]]=o(l[c]);return p}function He(e,t,o){return o[t]!=null?o[t]:e.props[t]}function xo(e,t){return Mt(e.children,function(o){return u.cloneElement(o,{onExited:t.bind(null,o),in:!0,appear:He(o,"appear",e),enter:He(o,"enter",e),exit:He(o,"exit",e)})})}function Co(e,t,o){var a=Mt(e.children),l=yo(t,a);return Object.keys(l).forEach(function(s){var c=l[s];if(u.isValidElement(c)){var p=s in t,d=s in a,m=t[s],b=u.isValidElement(m)&&!m.props.in;d&&(!p||b)?l[s]=u.cloneElement(c,{onExited:o.bind(null,c),in:!0,exit:He(c,"exit",e),enter:He(c,"enter",e)}):!d&&p&&!b?l[s]=u.cloneElement(c,{in:!1}):d&&p&&u.isValidElement(m)&&(l[s]=u.cloneElement(c,{onExited:o.bind(null,c),in:m.props.in,exit:He(c,"exit",e),enter:He(c,"enter",e)}))}}),l}var Io=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},$o={component:"div",childFactory:function(t){return t}},Tt=(function(e){oo(t,e);function t(a,l){var s;s=e.call(this,a,l)||this;var c=s.handleExited.bind(vo(s));return s.state={contextValue:{isMounting:!0},handleExited:c,firstRender:!0},s}var o=t.prototype;return o.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},o.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(l,s){var c=s.children,p=s.handleExited,d=s.firstRender;return{children:d?xo(l,p):Co(l,c,p),firstRender:!1}},o.handleExited=function(l,s){var c=Mt(this.props.children);l.key in c||(l.props.onExited&&l.props.onExited(s),this.mounted&&this.setState(function(p){var d=h({},p.children);return delete d[l.key],{children:d}}))},o.render=function(){var l=this.props,s=l.component,c=l.childFactory,p=xe(l,["component","childFactory"]),d=this.state.contextValue,m=Io(this.state.children).map(c);return delete p.appear,delete p.enter,delete p.exit,s===null?ge.createElement(Dt.Provider,{value:d},m):ge.createElement(Dt.Provider,{value:d},ge.createElement(s,p,m))},t})(ge.Component);Tt.propTypes={};Tt.defaultProps=$o;function So(e){const{className:t,classes:o,pulsate:a=!1,rippleX:l,rippleY:s,rippleSize:c,in:p,onExited:d,timeout:m}=e,[b,x]=u.useState(!1),P=E(t,o.ripple,o.rippleVisible,a&&o.ripplePulsate),k={width:c,height:c,top:-(c/2)+s,left:-(c/2)+l},R=E(o.child,b&&o.childLeaving,a&&o.childPulsate);return!p&&!b&&x(!0),u.useEffect(()=>{if(!p&&d!=null){const z=setTimeout(d,m);return()=>{clearTimeout(z)}}},[d,p,m]),S.jsx("span",{className:P,style:k,children:S.jsx("span",{className:R})})}const he=me("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Ro=["center","classes","className"];let ft=e=>e,Vt,Ft,_t,Ut;const Rt=550,ko=80,Po=Ot(Vt||(Vt=ft`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),Oo=Ot(Ft||(Ft=ft`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),Mo=Ot(_t||(_t=ft`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),To=V("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Lo=V(So,{name:"MuiTouchRipple",slot:"Ripple"})(Ut||(Ut=ft`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),he.rippleVisible,Po,Rt,({theme:e})=>e.transitions.easing.easeInOut,he.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,he.child,he.childLeaving,Oo,Rt,({theme:e})=>e.transitions.easing.easeInOut,he.childPulsate,Mo,({theme:e})=>e.transitions.easing.easeInOut),Eo=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiTouchRipple"}),{center:l=!1,classes:s={},className:c}=a,p=xe(a,Ro),[d,m]=u.useState([]),b=u.useRef(0),x=u.useRef(null);u.useEffect(()=>{x.current&&(x.current(),x.current=null)},[d]);const P=u.useRef(!1),k=u.useRef(0),R=u.useRef(null),z=u.useRef(null);u.useEffect(()=>()=>{k.current&&clearTimeout(k.current)},[]);const se=u.useCallback(M=>{const{pulsate:F,rippleX:K,rippleY:Y,rippleSize:ce,cb:Ce}=M;m(w=>[...w,S.jsx(Lo,{classes:{ripple:E(s.ripple,he.ripple),rippleVisible:E(s.rippleVisible,he.rippleVisible),ripplePulsate:E(s.ripplePulsate,he.ripplePulsate),child:E(s.child,he.child),childLeaving:E(s.childLeaving,he.childLeaving),childPulsate:E(s.childPulsate,he.childPulsate)},timeout:Rt,pulsate:F,rippleX:K,rippleY:Y,rippleSize:ce},b.current)]),b.current+=1,x.current=Ce},[s]),ee=u.useCallback((M={},F={},K=()=>{})=>{const{pulsate:Y=!1,center:ce=l||F.pulsate,fakeElement:Ce=!1}=F;if(M?.type==="mousedown"&&P.current){P.current=!1;return}M?.type==="touchstart"&&(P.current=!0);const w=Ce?null:z.current,C=w?w.getBoundingClientRect():{width:0,height:0,left:0,top:0};let _,q,D;if(ce||M===void 0||M.clientX===0&&M.clientY===0||!M.clientX&&!M.touches)_=Math.round(C.width/2),q=Math.round(C.height/2);else{const{clientX:U,clientY:X}=M.touches&&M.touches.length>0?M.touches[0]:M;_=Math.round(U-C.left),q=Math.round(X-C.top)}if(ce)D=Math.sqrt((2*C.width**2+C.height**2)/3),D%2===0&&(D+=1);else{const U=Math.max(Math.abs((w?w.clientWidth:0)-_),_)*2+2,X=Math.max(Math.abs((w?w.clientHeight:0)-q),q)*2+2;D=Math.sqrt(U**2+X**2)}M!=null&&M.touches?R.current===null&&(R.current=()=>{se({pulsate:Y,rippleX:_,rippleY:q,rippleSize:D,cb:K})},k.current=setTimeout(()=>{R.current&&(R.current(),R.current=null)},ko)):se({pulsate:Y,rippleX:_,rippleY:q,rippleSize:D,cb:K})},[l,se]),te=u.useCallback(()=>{ee({},{pulsate:!0})},[ee]),W=u.useCallback((M,F)=>{if(clearTimeout(k.current),M?.type==="touchend"&&R.current){R.current(),R.current=null,k.current=setTimeout(()=>{W(M,F)});return}R.current=null,m(K=>K.length>0?K.slice(1):K),x.current=F},[]);return u.useImperativeHandle(o,()=>({pulsate:te,start:ee,stop:W}),[te,ee,W]),S.jsx(To,h({className:E(he.root,s.root,c),ref:z},p,{children:S.jsx(Tt,{component:null,exit:!0,children:d})}))});function No(e){return We("MuiButtonBase",e)}const wo=me("MuiButtonBase",["root","disabled","focusVisible"]),Do=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],Ao=e=>{const{disabled:t,focusVisible:o,focusVisibleClassName:a,classes:l}=e,c=Ke({root:["root",t&&"disabled",o&&"focusVisible"]},No,l);return o&&a&&(c.root+=` ${a}`),c},zo=V("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${wo.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),kt=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiButtonBase"}),{action:l,centerRipple:s=!1,children:c,className:p,component:d="button",disabled:m=!1,disableRipple:b=!1,disableTouchRipple:x=!1,focusRipple:P=!1,LinkComponent:k="a",onBlur:R,onClick:z,onContextMenu:se,onDragLeave:ee,onFocus:te,onFocusVisible:W,onKeyDown:M,onKeyUp:F,onMouseDown:K,onMouseLeave:Y,onMouseUp:ce,onTouchEnd:Ce,onTouchMove:w,onTouchStart:C,tabIndex:_=0,TouchRippleProps:q,touchRippleRef:D,type:U}=a,X=xe(a,Do),ue=u.useRef(null),oe=u.useRef(null),B=dt(oe,D),{isFocusVisibleRef:de,onFocus:tt,onBlur:_e,ref:ne}=no(),[N,Ie]=u.useState(!1);m&&N&&Ie(!1),u.useImperativeHandle(l,()=>({focusVisible:()=>{Ie(!0),ue.current.focus()}}),[]);const[Te,j]=u.useState(!1);u.useEffect(()=>{j(!0)},[]);const re=Te&&!b&&!m;u.useEffect(()=>{N&&P&&!b&&Te&&oe.current.pulsate()},[b,P,N,Te]);function ae(g,De,Ae=x){return Ve(Je=>(De&&De(Je),!Ae&&oe.current&&oe.current[g](Je),!0))}const ot=ae("start",K),ie=ae("stop",se),Ee=ae("stop",ee),qe=ae("stop",ce),J=ae("stop",g=>{N&&g.preventDefault(),Y&&Y(g)}),v=ae("start",C),Ge=ae("stop",Ce),T=ae("stop",w),$e=ae("stop",g=>{_e(g),de.current===!1&&Ie(!1),R&&R(g)},!1),be=Ve(g=>{ue.current||(ue.current=g.currentTarget),tt(g),de.current===!0&&(Ie(!0),W&&W(g)),te&&te(g)}),Ne=()=>{const g=ue.current;return d&&d!=="button"&&!(g.tagName==="A"&&g.href)},Se=u.useRef(!1),ve=Ve(g=>{P&&!Se.current&&N&&oe.current&&g.key===" "&&(Se.current=!0,oe.current.stop(g,()=>{oe.current.start(g)})),g.target===g.currentTarget&&Ne()&&g.key===" "&&g.preventDefault(),M&&M(g),g.target===g.currentTarget&&Ne()&&g.key==="Enter"&&!m&&(g.preventDefault(),z&&z(g))}),Ye=Ve(g=>{P&&g.key===" "&&oe.current&&N&&!g.defaultPrevented&&(Se.current=!1,oe.current.stop(g,()=>{oe.current.pulsate(g)})),F&&F(g),z&&g.target===g.currentTarget&&Ne()&&g.key===" "&&!g.defaultPrevented&&z(g)});let we=d;we==="button"&&(X.href||X.to)&&(we=k);const Re={};we==="button"?(Re.type=U===void 0?"button":U,Re.disabled=m):(!X.href&&!X.to&&(Re.role="button"),m&&(Re["aria-disabled"]=m));const Xe=dt(o,ne,ue),Q=h({},a,{centerRipple:s,component:d,disabled:m,disableRipple:b,disableTouchRipple:x,focusRipple:P,tabIndex:_,focusVisible:N}),L=Ao(Q);return S.jsxs(zo,h({as:we,className:E(L.root,p),ownerState:Q,onBlur:$e,onClick:z,onContextMenu:ie,onFocus:be,onKeyDown:ve,onKeyUp:Ye,onMouseDown:ot,onMouseLeave:J,onMouseUp:qe,onDragLeave:Ee,onTouchEnd:Ge,onTouchMove:T,onTouchStart:v,ref:Xe,tabIndex:m?-1:_,type:U},Re,X,{children:[c,re?S.jsx(Eo,h({ref:B,center:s},q)):null]}))});function Bo(e){return We("MuiIconButton",e)}const Vo=me("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),Fo=["edge","children","className","color","disabled","disableFocusRipple","size"],_o=e=>{const{classes:t,disabled:o,color:a,edge:l,size:s}=e,c={root:["root",o&&"disabled",a!=="default"&&`color${y(a)}`,l&&`edge${y(l)}`,`size${y(s)}`]};return Ke(c,Bo,t)},Uo=V(kt,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="default"&&t[`color${y(o.color)}`],o.edge&&t[`edge${y(o.edge)}`],t[`size${y(o.size)}`]]}})(({theme:e,ownerState:t})=>h({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12}),({theme:e,ownerState:t})=>{var o;const a=(o=(e.vars||e).palette)==null?void 0:o[t.color];return h({},t.color==="inherit"&&{color:"inherit"},t.color!=="inherit"&&t.color!=="default"&&h({color:a?.main},!t.disableRipple&&{"&:hover":h({},a&&{backgroundColor:e.vars?`rgba(${a.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(a.main,e.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),t.size==="small"&&{padding:5,fontSize:e.typography.pxToRem(18)},t.size==="large"&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${Vo.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}})}),Xt=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiIconButton"}),{edge:l=!1,children:s,className:c,color:p="default",disabled:d=!1,disableFocusRipple:m=!1,size:b="medium"}=a,x=xe(a,Fo),P=h({},a,{edge:l,color:p,disabled:d,disableFocusRipple:m,size:b}),k=_o(P);return S.jsx(Uo,h({className:E(k.root,c),centerRipple:!0,focusRipple:!m,disabled:d,ref:o,ownerState:P},x,{children:s}))});function jo(e){return We("MuiSvgIcon",e)}me("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ho=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Wo=e=>{const{color:t,fontSize:o,classes:a}=e,l={root:["root",t!=="inherit"&&`color${y(t)}`,`fontSize${y(o)}`]};return Ke(l,jo,a)},Ko=V("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="inherit"&&t[`color${y(o.color)}`],t[`fontSize${y(o.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var o,a,l,s,c,p,d,m,b,x,P,k,R;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(o=e.transitions)==null||(a=o.create)==null?void 0:a.call(o,"fill",{duration:(l=e.transitions)==null||(l=l.duration)==null?void 0:l.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(c=s.pxToRem)==null?void 0:c.call(s,20))||"1.25rem",medium:((p=e.typography)==null||(d=p.pxToRem)==null?void 0:d.call(p,24))||"1.5rem",large:((m=e.typography)==null||(b=m.pxToRem)==null?void 0:b.call(m,35))||"2.1875rem"}[t.fontSize],color:(x=(P=(e.vars||e).palette)==null||(P=P[t.color])==null?void 0:P.main)!=null?x:{action:(k=(e.vars||e).palette)==null||(k=k.action)==null?void 0:k.active,disabled:(R=(e.vars||e).palette)==null||(R=R.action)==null?void 0:R.disabled,inherit:void 0}[t.color]}}),Pt=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiSvgIcon"}),{children:l,className:s,color:c="inherit",component:p="svg",fontSize:d="medium",htmlColor:m,inheritViewBox:b=!1,titleAccess:x,viewBox:P="0 0 24 24"}=a,k=xe(a,Ho),R=u.isValidElement(l)&&l.type==="svg",z=h({},a,{color:c,component:p,fontSize:d,instanceFontSize:t.fontSize,inheritViewBox:b,viewBox:P,hasSvgAsChild:R}),se={};b||(se.viewBox=P);const ee=Wo(z);return S.jsxs(Ko,h({as:p,className:E(ee.root,s),focusable:"false",color:m,"aria-hidden":x?void 0:!0,role:x?"img":void 0,ref:o},se,k,R&&l.props,{ownerState:z,children:[R?l.props.children:l,x?S.jsx("title",{children:x}):null]}))});Pt.muiName="SvgIcon";function Lt(e,t){function o(a,l){return S.jsx(Pt,h({"data-testid":`${t}Icon`,ref:l},a,{children:e}))}return o.muiName=Pt.muiName,u.memo(u.forwardRef(o))}const qo=Lt(S.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");function Go(e){return We("MuiChip",e)}const O=me("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),Yo=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],Xo=e=>{const{classes:t,disabled:o,size:a,color:l,iconColor:s,onDelete:c,clickable:p,variant:d}=e,m={root:["root",d,o&&"disabled",`size${y(a)}`,`color${y(l)}`,p&&"clickable",p&&`clickableColor${y(l)}`,c&&"deletable",c&&`deletableColor${y(l)}`,`${d}${y(l)}`],label:["label",`label${y(a)}`],avatar:["avatar",`avatar${y(a)}`,`avatarColor${y(l)}`],icon:["icon",`icon${y(a)}`,`iconColor${y(s)}`],deleteIcon:["deleteIcon",`deleteIcon${y(a)}`,`deleteIconColor${y(l)}`,`deleteIcon${y(d)}Color${y(l)}`]};return Ke(m,Go,t)},Jo=V("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{color:a,iconColor:l,clickable:s,onDelete:c,size:p,variant:d}=o;return[{[`& .${O.avatar}`]:t.avatar},{[`& .${O.avatar}`]:t[`avatar${y(p)}`]},{[`& .${O.avatar}`]:t[`avatarColor${y(a)}`]},{[`& .${O.icon}`]:t.icon},{[`& .${O.icon}`]:t[`icon${y(p)}`]},{[`& .${O.icon}`]:t[`iconColor${y(l)}`]},{[`& .${O.deleteIcon}`]:t.deleteIcon},{[`& .${O.deleteIcon}`]:t[`deleteIcon${y(p)}`]},{[`& .${O.deleteIcon}`]:t[`deleteIconColor${y(a)}`]},{[`& .${O.deleteIcon}`]:t[`deleteIcon${y(d)}Color${y(a)}`]},t.root,t[`size${y(p)}`],t[`color${y(a)}`],s&&t.clickable,s&&a!=="default"&&t[`clickableColor${y(a)})`],c&&t.deletable,c&&a!=="default"&&t[`deletableColor${y(a)}`],t[d],t[`${d}${y(a)}`]]}})(({theme:e,ownerState:t})=>{const o=e.palette.mode==="light"?e.palette.grey[700]:e.palette.grey[300];return h({maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${O.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${O.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:o,fontSize:e.typography.pxToRem(12)},[`& .${O.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${O.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${O.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${O.icon}`]:h({marginLeft:5,marginRight:-6},t.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},t.iconColor===t.color&&h({color:e.vars?e.vars.palette.Chip.defaultIconColor:o},t.color!=="default"&&{color:"inherit"})),[`& .${O.deleteIcon}`]:h({WebkitTapHighlightColor:"transparent",color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.26)`:Z(e.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:Z(e.palette.text.primary,.4)}},t.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},t.color!=="default"&&{color:e.vars?`rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`:Z(e.palette[t.color].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[t.color].contrastText}})},t.size==="small"&&{height:24},t.color!=="default"&&{backgroundColor:(e.vars||e).palette[t.color].main,color:(e.vars||e).palette[t.color].contrastText},t.onDelete&&{[`&.${O.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:Z(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},t.onDelete&&t.color!=="default"&&{[`&.${O.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}})},({theme:e,ownerState:t})=>h({},t.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:Z(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)},[`&.${O.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:Z(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},"&:active":{boxShadow:(e.vars||e).shadows[1]}},t.clickable&&t.color!=="default"&&{[`&:hover, &.${O.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}}),({theme:e,ownerState:t})=>h({},t.variant==="outlined"&&{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${O.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${O.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${O.avatar}`]:{marginLeft:4},[`& .${O.avatarSmall}`]:{marginLeft:2},[`& .${O.icon}`]:{marginLeft:4},[`& .${O.iconSmall}`]:{marginLeft:2},[`& .${O.deleteIcon}`]:{marginRight:5},[`& .${O.deleteIconSmall}`]:{marginRight:3}},t.variant==="outlined"&&t.color!=="default"&&{color:(e.vars||e).palette[t.color].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`:Z(e.palette[t.color].main,.7)}`,[`&.${O.clickable}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(e.palette[t.color].main,e.palette.action.hoverOpacity)},[`&.${O.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.focusOpacity})`:Z(e.palette[t.color].main,e.palette.action.focusOpacity)},[`& .${O.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`:Z(e.palette[t.color].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[t.color].main}}})),Qo=V("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,t)=>{const{ownerState:o}=e,{size:a}=o;return[t.label,t[`label${y(a)}`]]}})(({ownerState:e})=>h({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},e.variant==="outlined"&&{paddingLeft:11,paddingRight:11},e.size==="small"&&{paddingLeft:8,paddingRight:8},e.size==="small"&&e.variant==="outlined"&&{paddingLeft:7,paddingRight:7}));function jt(e){return e.key==="Backspace"||e.key==="Delete"}const Zo=u.forwardRef(function(t,o){const a=Fe({props:t,name:"MuiChip"}),{avatar:l,className:s,clickable:c,color:p="default",component:d,deleteIcon:m,disabled:b=!1,icon:x,label:P,onClick:k,onDelete:R,onKeyDown:z,onKeyUp:se,size:ee="medium",variant:te="filled",tabIndex:W,skipFocusWhenDisabled:M=!1}=a,F=xe(a,Yo),K=u.useRef(null),Y=dt(K,o),ce=B=>{B.stopPropagation(),R&&R(B)},Ce=B=>{B.currentTarget===B.target&&jt(B)&&B.preventDefault(),z&&z(B)},w=B=>{B.currentTarget===B.target&&(R&&jt(B)?R(B):B.key==="Escape"&&K.current&&K.current.blur()),se&&se(B)},C=c!==!1&&k?!0:c,_=C||R?kt:d||"div",q=h({},a,{component:_,disabled:b,size:ee,color:p,iconColor:u.isValidElement(x)&&x.props.color||p,onDelete:!!R,clickable:C,variant:te}),D=Xo(q),U=_===kt?h({component:d||"div",focusVisibleClassName:D.focusVisible},R&&{disableRipple:!0}):{};let X=null;R&&(X=m&&u.isValidElement(m)?u.cloneElement(m,{className:E(m.props.className,D.deleteIcon),onClick:ce}):S.jsx(qo,{className:E(D.deleteIcon),onClick:ce}));let ue=null;l&&u.isValidElement(l)&&(ue=u.cloneElement(l,{className:E(D.avatar,l.props.className)}));let oe=null;return x&&u.isValidElement(x)&&(oe=u.cloneElement(x,{className:E(D.icon,x.props.className)})),S.jsxs(Jo,h({as:_,className:E(D.root,s),disabled:C&&b?!0:void 0,onClick:k,onKeyDown:Ce,onKeyUp:w,ref:Y,tabIndex:M&&b?-1:W,ownerState:q},U,F,{children:[ue||oe,S.jsx(Qo,{className:E(D.label),ownerState:q,children:P}),X]}))}),Me=me("MuiInputBase",["root","formControl","focused","disabled","adornedStart","adornedEnd","error","sizeSmall","multiline","colorSecondary","fullWidth","hiddenLabel","readOnly","input","inputSizeSmall","inputMultiline","inputTypeSearch","inputAdornedStart","inputAdornedEnd","inputHiddenLabel"]),St=h({},Me,me("MuiInput",["root","underline","input"])),Ht=h({},Me,me("MuiOutlinedInput",["root","notchedOutline","input"])),Ze=h({},Me,me("MuiFilledInput",["root","underline","input"])),en=Lt(S.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),tn=Lt(S.jsx("path",{d:"M7 10l5 5 5-5z"}),"ArrowDropDown");function on(e){return We("MuiAutocomplete",e)}const $=me("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]);var Wt,Kt;const nn=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],rn=["ref"],an=["key"],ln=e=>{const{classes:t,disablePortal:o,expanded:a,focused:l,fullWidth:s,hasClearIcon:c,hasPopupIcon:p,inputFocused:d,popupOpen:m,size:b}=e,x={root:["root",a&&"expanded",l&&"focused",s&&"fullWidth",c&&"hasClearIcon",p&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",d&&"inputFocused"],tag:["tag",`tagSize${y(b)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",m&&"popupIndicatorOpen"],popper:["popper",o&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return Ke(x,on,t)},sn=V("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{fullWidth:a,hasClearIcon:l,hasPopupIcon:s,inputFocused:c,size:p}=o;return[{[`& .${$.tag}`]:t.tag},{[`& .${$.tag}`]:t[`tagSize${y(p)}`]},{[`& .${$.inputRoot}`]:t.inputRoot},{[`& .${$.input}`]:t.input},{[`& .${$.input}`]:c&&t.inputFocused},t.root,a&&t.fullWidth,s&&t.hasPopupIcon,l&&t.hasClearIcon]}})(({ownerState:e})=>h({[`&.${$.focused} .${$.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${$.clearIndicator}`]:{visibility:"visible"}}},e.fullWidth&&{width:"100%"},{[`& .${$.tag}`]:h({margin:3,maxWidth:"calc(100% - 6px)"},e.size==="small"&&{margin:2,maxWidth:"calc(100% - 4px)"}),[`& .${$.inputRoot}`]:{flexWrap:"wrap",[`.${$.hasPopupIcon}&, .${$.hasClearIcon}&`]:{paddingRight:30},[`.${$.hasPopupIcon}.${$.hasClearIcon}&`]:{paddingRight:56},[`& .${$.input}`]:{width:0,minWidth:30}},[`& .${St.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${St.root}.${Me.sizeSmall}`]:{[`& .${St.input}`]:{padding:"2px 4px 3px 0"}},[`& .${Ht.root}`]:{padding:9,[`.${$.hasPopupIcon}&, .${$.hasClearIcon}&`]:{paddingRight:39},[`.${$.hasPopupIcon}.${$.hasClearIcon}&`]:{paddingRight:65},[`& .${$.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${$.endAdornment}`]:{right:9}},[`& .${Ht.root}.${Me.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${$.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${Ze.root}`]:{paddingTop:19,paddingLeft:8,[`.${$.hasPopupIcon}&, .${$.hasClearIcon}&`]:{paddingRight:39},[`.${$.hasPopupIcon}.${$.hasClearIcon}&`]:{paddingRight:65},[`& .${Ze.input}`]:{padding:"7px 4px"},[`& .${$.endAdornment}`]:{right:9}},[`& .${Ze.root}.${Me.sizeSmall}`]:{paddingBottom:1,[`& .${Ze.input}`]:{padding:"2.5px 4px"}},[`& .${Me.hiddenLabel}`]:{paddingTop:8},[`& .${Ze.root}.${Me.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${$.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${Ze.root}.${Me.hiddenLabel}.${Me.sizeSmall}`]:{[`& .${$.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${$.input}`]:h({flexGrow:1,textOverflow:"ellipsis",opacity:0},e.inputFocused&&{opacity:1})})),cn=V("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(e,t)=>t.endAdornment})({position:"absolute",right:0,top:"calc(50% - 14px)"}),pn=V(Xt,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(e,t)=>t.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),un=V(Xt,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:e},t)=>h({},t.popupIndicator,e.popupOpen&&t.popupIndicatorOpen)})(({ownerState:e})=>h({padding:2,marginRight:-2},e.popupOpen&&{transform:"rotate(180deg)"})),dn=V(qt,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${$.option}`]:t.option},t.popper,o.disablePortal&&t.popperDisablePortal]}})(({theme:e,ownerState:t})=>h({zIndex:(e.vars||e).zIndex.modal},t.disablePortal&&{position:"absolute"})),fn=V(Yt,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(e,t)=>t.paper})(({theme:e})=>h({},e.typography.body1,{overflow:"auto"})),hn=V("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(e,t)=>t.loading})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),gn=V("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(e,t)=>t.noOptions})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),mn=V("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(e,t)=>t.listbox})(({theme:e})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${$.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[e.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${$.focused}`]:{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${$.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:Z(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${$.focused}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:Z(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(e.vars||e).palette.action.selected}},[`&.${$.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:Z(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}}})),bn=V(Gt,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(e,t)=>t.groupLabel})(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,top:-8})),vn=V("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(e,t)=>t.groupUl})({padding:0,[`& .${$.option}`]:{paddingLeft:24}}),yn=u.forwardRef(function(t,o){var a,l,s,c;const p=Fe({props:t,name:"MuiAutocomplete"}),{autoComplete:d=!1,autoHighlight:m=!1,autoSelect:b=!1,blurOnSelect:x=!1,ChipProps:P,className:k,clearIcon:R=Wt||(Wt=S.jsx(en,{fontSize:"small"})),clearOnBlur:z=!p.freeSolo,clearOnEscape:se=!1,clearText:ee="Clear",closeText:te="Close",componentsProps:W={},defaultValue:M=p.multiple?[]:null,disableClearable:F=!1,disableCloseOnSelect:K=!1,disabled:Y=!1,disabledItemsFocusable:ce=!1,disableListWrap:Ce=!1,disablePortal:w=!1,filterSelectedOptions:C=!1,forcePopupIcon:_="auto",freeSolo:q=!1,fullWidth:D=!1,getLimitTagsText:U=i=>`+${i}`,getOptionLabel:X,groupBy:ue,handleHomeEndKeys:oe=!p.freeSolo,includeInputInList:B=!1,limitTags:de=-1,ListboxComponent:tt="ul",ListboxProps:_e,loading:ne=!1,loadingText:N="Loading…",multiple:Ie=!1,noOptionsText:Te="No options",openOnFocus:j=!1,openText:re="Open",PaperComponent:ae=Yt,PopperComponent:ot=qt,popupIcon:ie=Kt||(Kt=S.jsx(tn,{})),readOnly:Ee=!1,renderGroup:qe,renderInput:J,renderOption:v,renderTags:Ge,selectOnFocus:T=!p.freeSolo,size:$e="medium",slotProps:be={}}=p,Ne=xe(p,nn),{getRootProps:Se,getInputProps:ve,getInputLabelProps:Ye,getPopupIndicatorProps:we,getClearProps:Re,getTagProps:Xe,getListboxProps:Q,getOptionProps:L,value:g,dirty:De,expanded:Ae,id:Je,popupOpen:pe,focused:fe,focusedTag:gt,anchorEl:ze,setAnchorEl:mt,inputValue:Le,groupedOptions:ke}=so(h({},p,{componentName:"Autocomplete"})),Pe=!F&&!Y&&De&&!Ee,Be=(!q||_===!0)&&_!==!1,{onMouseDown:Ue}=ve(),{ref:bt}=_e??{},nt=Q(),{ref:at}=nt,vt=xe(nt,rn),yt=dt(at,bt),rt=X||(i=>{var f;return(f=i.label)!=null?f:i}),le=h({},p,{disablePortal:w,expanded:Ae,focused:fe,fullWidth:D,getOptionLabel:rt,hasClearIcon:Pe,hasPopupIcon:Be,inputFocused:gt===-1,popupOpen:pe,size:$e}),G=ln(le);let ye;if(Ie&&g.length>0){const i=f=>h({className:G.tag,disabled:Y},Xe(f));Ge?ye=Ge(g,i,le):ye=g.map((f,I)=>S.jsx(Zo,h({label:rt(f),size:$e},i({index:I}),P)))}if(de>-1&&Array.isArray(ye)){const i=ye.length-de;!fe&&i>0&&(ye=ye.splice(0,de),ye.push(S.jsx("span",{className:G.tag,children:U(i)},ye.length)))}const lt=qe||(i=>S.jsxs("li",{children:[S.jsx(bn,{className:G.groupLabel,ownerState:le,component:"div",children:i.group}),S.jsx(vn,{className:G.groupUl,ownerState:le,children:i.children})]},i.key)),Ct=v||((i,f)=>{const{key:I}=i,A=xe(i,an);return S.jsx("li",h({},A,{children:rt(f)}),I)}),it=(i,f)=>{const I=L({option:i,index:f});return Ct(h({},I,{className:G.option}),i,{selected:I["aria-selected"],index:f,inputValue:Le},le)},je=(a=be.clearIndicator)!=null?a:W.clearIndicator,Qe=(l=be.paper)!=null?l:W.paper,r=(s=be.popper)!=null?s:W.popper,n=(c=be.popupIndicator)!=null?c:W.popupIndicator;return S.jsxs(u.Fragment,{children:[S.jsx(sn,h({ref:o,className:E(G.root,k),ownerState:le},Se(Ne),{children:J({id:Je,disabled:Y,fullWidth:!0,size:$e==="small"?"small":void 0,InputLabelProps:Ye(),InputProps:h({ref:mt,className:G.inputRoot,startAdornment:ye,onClick:i=>{i.target===i.currentTarget&&Ue(i)}},(Pe||Be)&&{endAdornment:S.jsxs(cn,{className:G.endAdornment,ownerState:le,children:[Pe?S.jsx(pn,h({},Re(),{"aria-label":ee,title:ee,ownerState:le},je,{className:E(G.clearIndicator,je?.className),children:R})):null,Be?S.jsx(un,h({},we(),{disabled:Y,"aria-label":pe?te:re,title:pe?te:re,ownerState:le},n,{className:E(G.popupIndicator,n?.className),children:ie})):null]})}),inputProps:h({className:G.input,disabled:Y,readOnly:Ee},ve())})})),ze?S.jsx(dn,h({as:ot,disablePortal:w,style:{width:ze?ze.clientWidth:null},ownerState:le,role:"presentation",anchorEl:ze,open:pe},r,{className:E(G.popper,r?.className),children:S.jsxs(fn,h({ownerState:le,as:ae},Qe,{className:E(G.paper,Qe?.className),children:[ne&&ke.length===0?S.jsx(hn,{className:G.loading,ownerState:le,children:N}):null,ke.length===0&&!q&&!ne?S.jsx(gn,{className:G.noOptions,ownerState:le,role:"presentation",onMouseDown:i=>{i.preventDefault()},children:Te}):null,ke.length>0?S.jsx(mn,h({as:tt,className:G.listbox,ownerState:le},vt,_e,{ref:yt,children:ke.map((i,f)=>ue?lt({key:i.key,group:i.group,children:i.options.map((I,A)=>it(I,i.index+A))}):it(i,f))})):null]}))})):null]})}),{meta:xn,getStory:ht}=Zt({wrappedComponent:{SearchBar:Qt},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/barre-de-recherche)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SearchBar/SearchBar.tsx)`,argTypes:{big:{description:"Use the big variant if you have space to spare",control:{type:"boolean"}},label:{description:"Default: 'Rechercher' (or translation)",control:{type:"text"}},clearInputOnSearch:{description:"Default: false, if true the input value will be cleared when the user click on the search button or press enter",control:{type:"boolean"}},allowEmptySearch:{description:"Default: false, if true the user will be able to search with an empty input, otherwise clicking ont the search button or pressing enter will focus the input",control:{type:"boolean"}},renderInput:{description:"Optional: To control the input yourself",control:!1}}}),Tn={...xn,title:"components/SearchBar"},st=ht({defaultValue:"France",label:void 0,onButtonClick:e=>alert(`TODO: implement search with text: ${e}`)},{description:`

If you you do not plan to provide any realtime hinting to the user as he types the search query you can provide a \`onButtonClick\`
callback that will be called when the user click on the search button or press enter.

\`\`\`tsx
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";

<SearchBar
    ...
    onButtonClick={text=> alert(\`TODO: implement search with text: \${text}\`)}
/>
\`\`\`

`}),ct=ht({label:void 0,onButtonClick:e=>alert(`TODO: implement search with text: ${e}`),big:!0}),pt=ht({renderInput:({className:e,id:t,placeholder:o,type:a})=>{const[l,s]=u.useState(""),[c,p]=u.useState(null);return ge.createElement(ge.Fragment,null,ge.createElement("input",{ref:p,className:e,id:t,placeholder:o,type:a,value:l,onChange:d=>s(d.currentTarget.value),onKeyDown:d=>{d.key==="Escape"&&c?.blur()}}),ge.createElement("p",{style:{position:"absolute",top:43}},"Search results for: ",l))}},{description:` 

\`\`\`tsx
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
        
function Root(){
        
    const [search, onSearchChange] = useState("");

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
        
    return (
        <>
            <SearchBar
                ...
                renderInput={({ className, id, placeholder, type }) => 
                    <input
                        ref={setInputElement}
                        className={className}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={search}
                        // Note: The default behavior for an input of type 'text' is to clear the input value when the escape key is pressed.
                        // However, due to a bug in @gouvfr/dsfr the escape key event is not propagated to the input element.
                        // As a result this onChange is not called when the escape key is pressed.
                        onChange={event => onSearchChange(event.currentTarget.value)}
                        // Same goes for the keydown event so this is useless but we hope the bug will be fixed soon.
                        onKeyDown={event => {
                            if (event.key === "Escape") {
                                assert(inputElement !== null);
                                inputElement.blur();
                            }
                        }}
                    />
                }
                ...
            />
            <p>Search results for: {search}</p>
        </>
        
    );
        
}
\`\`\`
`}),ut=ht({renderInput:({className:e,id:t,placeholder:o,type:a})=>ge.createElement(et,{className:e,id:t,placeholder:o,type:a})},{description:` 
        
If you want to feature a modern search experience with realtime hinting you can omit providing a \`onSearchButtonClick\` callback and instead
make sure you provide an overlay with the search results in the the \`renderSearchInput\` function.  
        
As, to this day, the DSFR do not provide any component to help you with that, you are on your own for implementing the overlay.  
You can achieve great result by using [MUI's autocomplete](https://mui.com/material-ui/react-autocomplete/) component.  
[Implementation example](https://github.com/mui/material-ui/issues/37838).  
If you go with MUI make sure to use the [\`<MuiDsfrProvider />\`](https://react-dsfr.codegouv.studio/mui).  
        
\`\`\`tsx
        
import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
        
type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search;
};
        
function MySearchInput(props: MySearchInputProps) {
        
    const { className, id, placeholder, type } = props;
        
    return (
        <Autocomplete 
            ...
            id={id}
            renderInput={params => 
                <div ref={params.InputProps.ref}>
                    <input 
                        {...params.inputProps} 
                        className={cx(params.inputProps.className, className)}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            }
        />
    );
        
}
        
<SearchBar
    ...
    renderInput={({ className, id, placeholder, type }) => (
        <MySearchInput
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
        />
    )}
/>
\`\`\`
`}),Cn=["Option 1","Option 2"];function et(e){const{className:t,id:o,placeholder:a,type:l}=e;return ge.createElement(yn,{style:{width:"100%"},id:o,options:Cn,renderInput:s=>ge.createElement("div",{ref:s.InputProps.ref},ge.createElement("input",{...s.inputProps,className:Jt(s.inputProps.className,t),placeholder:a,type:l}))})}et.__docgenInfo={description:"",methods:[],displayName:"MuiSearchInput",props:{className:{required:!0,tsType:{name:"string"},description:""},id:{required:!0,tsType:{name:"string"},description:""},placeholder:{required:!0,tsType:{name:"string"},description:""},type:{required:!0,tsType:{name:"literal",value:'"search"'},description:""}}};st.parameters={...st.parameters,docs:{...st.parameters?.docs,source:{originalSource:`getStory({
  "defaultValue": "France",
  "label": undefined,
  "onButtonClick": text => alert(\`TODO: implement search with text: \${text}\`)
}, {
  "description": \`

If you you do not plan to provide any realtime hinting to the user as he types the search query you can provide a \\\`onButtonClick\\\`
callback that will be called when the user click on the search button or press enter.

\\\`\\\`\\\`tsx
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";

<SearchBar
    ...
    onButtonClick={text=> alert(\\\`TODO: implement search with text: \\\${text}\\\`)}
/>
\\\`\\\`\\\`

\`
})`,...st.parameters?.docs?.source}}};ct.parameters={...ct.parameters,docs:{...ct.parameters?.docs,source:{originalSource:`getStory({
  "label": undefined,
  "onButtonClick": text => alert(\`TODO: implement search with text: \${text}\`),
  "big": true
})`,...ct.parameters?.docs?.source}}};pt.parameters={...pt.parameters,docs:{...pt.parameters?.docs,source:{originalSource:`getStory({
  "renderInput": ({
    className,
    id,
    placeholder,
    type
  }) => {
    const [search, onSearchChange] = useState("");
    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
    return <>
                    <input ref={setInputElement} className={className} id={id} placeholder={placeholder} type={type} value={search} onChange={event => onSearchChange(event.currentTarget.value)} onKeyDown={event => {
        if (event.key === "Escape") {
          inputElement?.blur();
        }
      }} />
                    <p style={{
        "position": "absolute",
        "top": 43
      }}>
                        Search results for: {search}
                    </p>
                </>;
  }
}, {
  "description": \` 

\\\`\\\`\\\`tsx
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
        
function Root(){
        
    const [search, onSearchChange] = useState("");

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
        
    return (
        <>
            <SearchBar
                ...
                renderInput={({ className, id, placeholder, type }) => 
                    <input
                        ref={setInputElement}
                        className={className}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={search}
                        // Note: The default behavior for an input of type 'text' is to clear the input value when the escape key is pressed.
                        // However, due to a bug in @gouvfr/dsfr the escape key event is not propagated to the input element.
                        // As a result this onChange is not called when the escape key is pressed.
                        onChange={event => onSearchChange(event.currentTarget.value)}
                        // Same goes for the keydown event so this is useless but we hope the bug will be fixed soon.
                        onKeyDown={event => {
                            if (event.key === "Escape") {
                                assert(inputElement !== null);
                                inputElement.blur();
                            }
                        }}
                    />
                }
                ...
            />
            <p>Search results for: {search}</p>
        </>
        
    );
        
}
\\\`\\\`\\\`
\`
})`,...pt.parameters?.docs?.source}}};ut.parameters={...ut.parameters,docs:{...ut.parameters?.docs,source:{originalSource:`getStory({
  "renderInput": ({
    className,
    id,
    placeholder,
    type
  }) => <MuiSearchInput className={className} id={id} placeholder={placeholder} type={type} />
}, {
  "description": \` 
        
If you want to feature a modern search experience with realtime hinting you can omit providing a \\\`onSearchButtonClick\\\` callback and instead
make sure you provide an overlay with the search results in the the \\\`renderSearchInput\\\` function.  
        
As, to this day, the DSFR do not provide any component to help you with that, you are on your own for implementing the overlay.  
You can achieve great result by using [MUI's autocomplete](https://mui.com/material-ui/react-autocomplete/) component.  
[Implementation example](https://github.com/mui/material-ui/issues/37838).  
If you go with MUI make sure to use the [\\\`<MuiDsfrProvider />\\\`](https://react-dsfr.codegouv.studio/mui).  
        
\\\`\\\`\\\`tsx
        
import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
        
type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search;
};
        
function MySearchInput(props: MySearchInputProps) {
        
    const { className, id, placeholder, type } = props;
        
    return (
        <Autocomplete 
            ...
            id={id}
            renderInput={params => 
                <div ref={params.InputProps.ref}>
                    <input 
                        {...params.inputProps} 
                        className={cx(params.inputProps.className, className)}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            }
        />
    );
        
}
        
<SearchBar
    ...
    renderInput={({ className, id, placeholder, type }) => (
        <MySearchInput
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
        />
    )}
/>
\\\`\\\`\\\`
\`
})`,...ut.parameters?.docs?.source}}};et.parameters={...et.parameters,docs:{...et.parameters?.docs,source:{originalSource:`function MuiSearchInput(props: MuiSearchInputProps) {
  const {
    className,
    id,
    placeholder,
    type
  } = props;
  return <Autocomplete style={{
    "width": "100%"
  }} id={id} options={options} renderInput={params => <div ref={params.InputProps.ref}>
                    <input {...params.inputProps} className={cx(params.inputProps.className, className)} placeholder={placeholder} type={type} />
                </div>} />;
}`,...et.parameters?.docs?.source}}};const Ln=["DefaultUncontrolled","BigUncontrolled","WithControlledInput","WithMuiAutocomplete","MuiSearchInput"];export{ct as BigUncontrolled,st as DefaultUncontrolled,et as MuiSearchInput,pt as WithControlledInput,ut as WithMuiAutocomplete,Ln as __namedExportsOrder,Tn as default};
