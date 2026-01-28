import{r as O,a as W,u as A,c as D,R as s,b as l,f as m,g as w,s as F}from"./iframe-BpEV2pGA.js";import{g as z}from"./getStory-Bli_4i1k.js";import"./preload-helper-PPVm8Dsz.js";var $=function(e,r){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(o[n[a]]=e[n[a]]);return o};const f=e=>{var{useReactLinkComponent:r,children:o}=e,n=$(e,["useReactLinkComponent","children"]);const{Link:a}=w();return r?s.createElement(a,Object.assign({},n),o):s.createElement("a",Object.assign({},n),o)},I=({count:e,defaultPage:r})=>e<=10?Array.from({length:e},(a,t)=>({number:t+1,active:r===t+1})):r>e-10?Array.from({length:10},(a,t)=>{const i=e-(10-t)+1;return{number:i,active:r===i}}):[...Array.from({length:4},(a,t)=>{if(r>4){const i=t+r;return{number:i,active:r===i}}return{number:t+1,active:r===t+1}}),{number:null,active:!1},...Array.from({length:4},(a,t)=>{const i=e-(4-t)+1;return{number:i,active:r===i}})],_=O.memo(O.forwardRef((e,r)=>{const{id:o,className:n,count:a,defaultPage:t=1,showFirstLast:i=!0,getPageLinkProps:p,classes:c={},style:j}=e;$(e,["id","className","count","defaultPage","showFirstLast","getPageLinkProps","classes","style"]),W();const R=A({defaultIdPrefix:"fr-pagination",explicitlyProvidedId:o}),{t:d}=V(),{Link:C}=w(),N=I({count:a,defaultPage:t}),L=N.find(g=>g.active),x=L?.number,v=x===1,E=x===a;return s.createElement("nav",{id:R,role:"navigation",className:l(m.cx("fr-pagination"),c.root,n),"aria-label":d("aria-label"),style:j,ref:r},s.createElement("ul",{className:l(m.cx("fr-pagination__list"),c.list)},i&&s.createElement("li",null,s.createElement(f,Object.assign({useReactLinkComponent:t>1},a>0&&t>1&&p(1),{className:l(m.cx("fr-pagination__link","fr-pagination__link--first"),c.link,p(1).className),"aria-disabled":a>0&&v?!0:void 0,role:"link"}),d("first page"))),s.createElement("li",null,s.createElement(f,Object.assign({useReactLinkComponent:t>1},t>1&&p(t-1),{className:l(m.cx("fr-pagination__link","fr-pagination__link--prev","fr-pagination__link--lg-label"),c.link),"aria-disabled":v?!0:void 0,role:"link"}),d("previous page"))),N.map(g=>s.createElement("li",{key:g.number},g.number===null?s.createElement("a",{className:l(m.cx("fr-pagination__link"),c.link)},"..."):s.createElement(C,Object.assign({className:l(m.cx("fr-pagination__link"),c.link),"aria-current":g.active?!0:void 0,title:`Page ${g.number}`},p(g.number)),g.number))),s.createElement("li",null,s.createElement(f,Object.assign({useReactLinkComponent:t<a},t<a&&p(t+1),{className:l(m.cx("fr-pagination__link","fr-pagination__link--next","fr-pagination__link--lg-label"),c.link),"aria-disabled":E?!0:void 0,role:"link"}),d("next page"))),i&&s.createElement("li",null,s.createElement(f,Object.assign({useReactLinkComponent:t<a},t<a&&p(a),{className:l(m.cx("fr-pagination__link","fr-pagination__link--last"),c.link),"aria-disabled":E?!0:void 0}),d("last page")))))}));_.displayName=F({Pagination:_});const{useTranslation:V,addPaginationTranslations:T}=D({componentName:F({Pagination:_}),frMessages:{"first page":"Première page","previous page":"Page précédente","next page":"Page suivante","last page":"Dernière page","aria-label":"Pagination"}});T({lang:"en",messages:{"first page":"First page","previous page":"Previous page","next page":"Next page","last page":"Last page","aria-label":"Pagination"}});const{meta:M,getStory:u}=z({wrappedComponent:{Pagination:_},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pagination)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/pagination/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Pagination.tsx)`,disabledProps:["lang"]}),H={...M,title:"components/Pagination"},P=u({count:100,defaultPage:2,showFirstLast:!0,getPageLinkProps:e=>({href:`/page/${e}`})}),b=u({count:0,getPageLinkProps:e=>({href:`/page/${e}`})}),k=u({count:1,getPageLinkProps:e=>({href:`/page/${e}`})}),y=u({count:132,defaultPage:42,getPageLinkProps:e=>({href:`/page/${e}`})}),h=u({count:45,defaultPage:42,showFirstLast:!1,getPageLinkProps:e=>({href:`/page/${e}`})}),S=u({count:24,defaultPage:24,getPageLinkProps:e=>({href:`/page/${e}`})});P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`getStory({
  count: 100,
  defaultPage: 2,
  showFirstLast: true,
  getPageLinkProps: pageNumber => ({
    href: \`/page/\${pageNumber}\`
  })
})`,...P.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`getStory({
  count: 0,
  getPageLinkProps: pageNumber => ({
    href: \`/page/\${pageNumber}\`
  })
})`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`getStory({
  count: 1,
  getPageLinkProps: pageNumber => ({
    href: \`/page/\${pageNumber}\`
  })
})`,...k.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  count: 132,
  defaultPage: 42,
  getPageLinkProps: pageNumber => ({
    href: \`/page/\${pageNumber}\`
  })
})`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`getStory({
  count: 45,
  defaultPage: 42,
  showFirstLast: false,
  getPageLinkProps: pageNumber => ({
    href: \`/page/\${pageNumber}\`
  })
})`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  count: 24,
  defaultPage: 24,
  getPageLinkProps: pageNumber => ({
    href: \`/page/\${pageNumber}\`
  })
})`,...S.parameters?.docs?.source}}};const J=["Default","SummaryWithNoPage","SummaryWithSinglePage","SummaryWith132Pages","SummaryWithoutShowFirstLast","SummaryWithLastPage"];export{P as Default,y as SummaryWith132Pages,S as SummaryWithLastPage,b as SummaryWithNoPage,k as SummaryWithSinglePage,h as SummaryWithoutShowFirstLast,J as __namedExportsOrder,H as default};
