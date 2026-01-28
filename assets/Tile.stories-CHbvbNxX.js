import{r as V,a as U,u as ae,R as e,b as i,f as a,g as ne,s as se}from"./iframe-BpEV2pGA.js";import{B as u}from"./Badge-C9D7WWiQ.js";import{T as le}from"./Tag-BtiM6OkI.js";import{g as ce}from"./getStory-Bli_4i1k.js";import{C as de}from"./CityHall-BRwPlVj7.js";import"./preload-helper-PPVm8Dsz.js";import"./PictoWrapper-BdKLICYe.js";var pe=function(n,m){var d={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&m.indexOf(s)<0&&(d[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,s=Object.getOwnPropertySymbols(n);l<s.length;l++)m.indexOf(s[l])<0&&Object.prototype.propertyIsEnumerable.call(n,s[l])&&(d[s[l]]=n[s[l]]);return d};const O=V.memo(V.forwardRef((n,m)=>{const{id:d,className:s,title:l,titleAs:R="h3",linkProps:c,buttonProps:p,downloadButton:F,desc:M,detail:H,start:C,imageUrl:g,imageAlt:G,imageWidth:$,imageHeight:q,imageSvg:X=!1,pictogram:f,orientation:A="vertical",small:J=!1,noBorder:K=!1,noIcon:Q=!1,noBackground:Y=!1,grey:Z=!1,classes:r={},enlargeLinkOrButton:ee=!0,disabled:_=!1,style:te}=n,oe=pe(n,["id","className","title","titleAs","linkProps","buttonProps","downloadButton","desc","detail","start","imageUrl","imageAlt","imageWidth","imageHeight","imageSvg","pictogram","orientation","small","noBorder","noIcon","noBackground","grey","classes","enlargeLinkOrButton","disabled","style"]);U();const{Link:re}=ne(),ie=ae({defaultIdPrefix:"fr-tile",explicitlyProvidedId:d});return e.createElement("div",Object.assign({id:ie,className:i(a.cx("fr-tile",ee&&(c?"fr-enlarge-link":p?"fr-enlarge-button":null),A&&`fr-tile--${A}`,Q&&"fr-tile--no-icon",K&&"fr-tile--no-border",Y&&"fr-tile--no-background",Z&&"fr-tile--grey",J&&"fr-tile--sm",(p||c)&&F&&"fr-tile--download"),r.root,s),ref:m,style:te},oe),e.createElement("div",{className:i(a.cx("fr-tile__body"),r.body)},e.createElement("div",{className:i(a.cx("fr-tile__content"),r.content)},e.createElement(R,{className:i(a.cx("fr-tile__title"),r.title)},c!==void 0?e.createElement(re,Object.assign({},c,{href:_?void 0:c.href,className:i(r.link,c.className),"aria-disabled":_}),l):p!==void 0?e.createElement("button",Object.assign({},p,{className:i(r.button,p.className),disabled:_}),l):l),M!==void 0&&e.createElement("div",{className:i(a.cx("fr-tile__desc"),r.desc)},M),H!==void 0&&e.createElement("div",{className:i(a.cx("fr-tile__detail"),r.detail)},H),C!==void 0&&e.createElement("div",{className:i(a.cx("fr-tile__start"),r.start)},C))),(g!==void 0&&g.length>0||f!==void 0)&&e.createElement("div",{className:i(a.cx("fr-tile__header"),r.header)},X||f!==void 0?e.createElement("div",{className:i(a.cx("fr-tile__pictogram"),r.img)},f!==void 0?f:e.createElement("svg",{"aria-hidden":!0,className:i(a.cx("fr-artwork"),r.artwork),viewBox:"0 0 80 80",width:"80px",height:"80px",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},["artwork-decorative","artwork-minor","artwork-major"].map(z=>e.createElement("use",{key:z,className:a.cx(`fr-${z}`),xlinkHref:`${g}#${z}`})))):e.createElement("div",{className:i(a.cx("fr-tile__img"),r.img)},e.createElement("img",{className:i(a.cx("fr-responsive-img"),r.imgTag),src:g,alt:G,width:$,height:q}))))}));O.displayName=se({Tile:O});const j=""+new URL("city-hall-ClalL66X.svg",import.meta.url).href,{meta:ue,getStory:t}=ce({wrappedComponent:{Tile:O},defaultContainerWidth:360,description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/tile/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Tile.tsx)`,disabledProps:["lang"],argTypes:{className:{description:"CSS classes to override the style of the root wrapper",control:{type:"text"},type:"string"},title:{description:"Required. Title of the tile.",control:{type:"text"}},titleAs:{description:"Override HTML heading tag of the title",defaultValue:"h3",type:"string",control:{type:"radio"},options:(()=>{const n=["h2","h3","h4","h5","h6"];return U(),n})()},linkProps:{description:"The link props. The linkProps and buttonProps are mutually exclusive.",control:{type:"object"}},buttonProps:{description:"The button props. The linkProps and buttonProps are mutually exclusive.",control:{type:"object"}},enlargeLinkOrButton:{description:"Set to true if the whole tile should be clickable.",control:{type:"boolean"},type:"boolean"},downloadButton:{description:"Set to true if the button is a download button, indicated by the download icon. Only applicable if the Tile contains a button.",control:{type:"boolean"},type:"boolean"},desc:{description:"Short description of the Tile."},detail:{description:"More details of the Tile."},start:{description:"Another details zone that generally contains Tags or Badges."},imageUrl:{description:"URL of the image. Normally a pictogram as a SVG.",control:{type:"text"},type:"string"},imageAlt:{description:"Alternative text of the image.",control:{type:"text"},type:"string"},imageWidth:{description:"Width of the image. Not applicable to a SVG.",control:{type:"text"}},imageHeight:{description:"Height of the image. Not applicable to a SVG.",control:{type:"text"}},imageSvg:{description:"Set to true if the image is type of SVG [Pictogramme DSFR](https://www.systeme-de-design.gouv.fr/fondamentaux/pictogramme/) compliant.",defaultValue:!1,control:{type:"boolean"},type:"boolean"},pictogram:{description:"Instead of using an image with `imageUrl` and `imageSvg`, you can use [native DSFR pictogram components](/?path=/docs/🖼%EF%B8%8F-pictograms--page) or any other SVG component."},grey:{description:"Set to true if the background should be grey. Not applicable if noBackground is set true.",control:{type:"boolean"},type:"boolean"},classes:{description:"Override CSS classes of the different wrappers in the Tile component.",control:{type:"object"}},orientation:{description:"Orientation of the Tile.",control:{type:"radio"},type:"string",defaultValue:"vertical",options:["vertical","horizontal"]},small:{description:"Set to true if the Tile should be small.",control:{type:"boolean"},type:"boolean"},noIcon:{description:"Set to true if the Tile should not contain any icon.",control:{type:"boolean"},type:"boolean"},noBorder:{description:"Set to true if the Tile should not have any borders.",control:{type:"boolean"},type:"boolean"},noBackground:{description:"Set to true if the Tile should not have any background.",control:{type:"boolean"},type:"boolean"},disabled:{description:"Set to true if the Tile should be disabled.",control:{type:"boolean"},type:"boolean"},style:{description:"Override the style of the root wrapper.",control:{type:"object"}}}}),Se={...ue,title:"components/Tile"},o={title:"Intitulé de la tuile",linkProps:{href:"#"},imageUrl:j,imageSvg:!0,enlargeLinkOrButton:!0,small:!1,titleAs:"h3",noBorder:!1,noIcon:!1,noBackground:!1,grey:!1,disabled:!1,pictogram:void 0},h=t({...o}),y=t({...o,desc:"Lorem [...] elit ut."},{description:"Tuile avec description"}),T=t({...o,desc:"Lorem [...] elit ut.",detail:"Détail (optionel)"},{description:"Tuile avec description et détails"}),v=t({...o,start:e.createElement(le,null,"Tag")},{description:"Tuile avec Tag"}),S=t({...o,start:e.createElement(u,{severity:"success",noIcon:!0},"Badge")},{description:"Tuile avec Badge"}),b=t({...o,desc:"Lorem [...] elit ut.",detail:"Détail (optionel)",start:e.createElement(u,{severity:"success",noIcon:!0},"Badge")},{description:"Tuile avec description, détails et un Badge"}),B=t({...o,imageUrl:void 0},{description:"Tuile sans picto"}),w=t({...o,imageUrl:void 0,imageSvg:void 0,imageAlt:void 0,imageWidth:void 0,imageHeight:void 0,pictogram:e.createElement(de,null)},{description:"Tuile avec Pictogramme natif DSFR"}),k=t({...o},{description:"Tuile MD Verticale"}),P=t({...o,small:!0},{description:"Tuile SM Verticale"}),D=t({...o,orientation:"horizontal"},{description:"Tuile MD Horizontale",defaultContainerWidth:700}),x=t({...o,orientation:"horizontal",small:!0},{description:"Tuile SM Horizontale",defaultContainerWidth:700}),W=t({...o,orientation:"horizontal",start:e.createElement(u,{severity:"success",noIcon:!0},"Badge")},{description:"Tuile MD horizontale avec Badge",defaultContainerWidth:700}),N=t({...o,orientation:"horizontal",start:e.createElement(u,{severity:"success",noIcon:!0},"Badge"),downloadButton:!0},{description:"Tuile avec lien de téléchargement",defaultContainerWidth:700}),E=t({...o,orientation:"horizontal",start:e.createElement(u,{severity:"success",noIcon:!0},"Badge"),downloadButton:!0,linkProps:void 0,buttonProps:{}},{description:"Tuile avec bouton de téléchargement",defaultContainerWidth:700}),I=t({title:"Intitulé de la tuile",desc:"Lorem [...] elit ut.",detail:"Détail (optionel)",imageUrl:j},{description:"Tuile non cliquable"}),L=t({...o,desc:"Lorem [...] elit ut.",detail:"Détail (optionel)",enlargeLinkOrButton:!1},{description:"Tuile avec lien dans le titre"});h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps
})`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "desc": "Lorem [...] elit ut."
}, {
  "description": "Tuile avec description"
})`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "desc": "Lorem [...] elit ut.",
  "detail": "Détail (optionel)"
}, {
  "description": "Tuile avec description et détails"
})`,...T.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "start": <Tag>Tag</Tag>
}, {
  "description": "Tuile avec Tag"
})`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "start": <Badge severity="success" noIcon>
                Badge
            </Badge>
}, {
  "description": "Tuile avec Badge"
})`,...S.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "desc": "Lorem [...] elit ut.",
  "detail": "Détail (optionel)",
  "start": <Badge severity="success" noIcon>
                Badge
            </Badge>
}, {
  "description": "Tuile avec description, détails et un Badge"
})`,...b.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  imageUrl: undefined
}, {
  "description": "Tuile sans picto"
})`,...B.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  imageUrl: undefined,
  imageSvg: undefined,
  imageAlt: undefined,
  imageWidth: undefined,
  imageHeight: undefined,
  pictogram: <CityHall />
}, {
  "description": "Tuile avec Pictogramme natif DSFR"
})`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps
}, {
  "description": "Tuile MD Verticale"
})`,...k.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "small": true
}, {
  "description": "Tuile SM Verticale"
})`,...P.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "orientation": "horizontal"
}, {
  "description": "Tuile MD Horizontale",
  "defaultContainerWidth": 700
})`,...D.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "orientation": "horizontal",
  "small": true
}, {
  "description": "Tuile SM Horizontale",
  "defaultContainerWidth": 700
})`,...x.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "orientation": "horizontal",
  "start": <Badge severity="success" noIcon>
                Badge
            </Badge>
}, {
  "description": "Tuile MD horizontale avec Badge",
  "defaultContainerWidth": 700
})`,...W.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "orientation": "horizontal",
  "start": <Badge severity="success" noIcon>
                Badge
            </Badge>,
  "downloadButton": true
}, {
  "description": "Tuile avec lien de téléchargement",
  "defaultContainerWidth": 700
})`,...N.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "orientation": "horizontal",
  "start": <Badge severity="success" noIcon>
                Badge
            </Badge>,
  "downloadButton": true,
  "linkProps": undefined,
  "buttonProps": {}
}, {
  "description": "Tuile avec bouton de téléchargement",
  "defaultContainerWidth": 700
})`,...E.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`getStory({
  "title": "Intitulé de la tuile",
  "desc": "Lorem [...] elit ut.",
  "detail": "Détail (optionel)",
  "imageUrl": picto
}, {
  "description": "Tuile non cliquable"
})`,...I.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`getStory({
  ...defaultProps,
  "desc": "Lorem [...] elit ut.",
  "detail": "Détail (optionel)",
  enlargeLinkOrButton: false
}, {
  "description": "Tuile avec lien dans le titre"
})`,...L.parameters?.docs?.source}}};const be=["Default","TileWithDesc","TileWithDescAndDetail","TileWithTag","TileWithBadge","TileWithDescDetailAndBadge","TileWithoutImage","TileWithNativePictogram","TileMDVertical","TileSMVertical","TileMDHorizontal","TileSMHorizontal","TileMDHorizontalWithBadge","TileWithDownloadLink","TileWithDownloadButton","TileUnclickable","TileWithLinkInTitle"];export{h as Default,D as TileMDHorizontal,W as TileMDHorizontalWithBadge,k as TileMDVertical,x as TileSMHorizontal,P as TileSMVertical,I as TileUnclickable,S as TileWithBadge,y as TileWithDesc,T as TileWithDescAndDetail,b as TileWithDescDetailAndBadge,E as TileWithDownloadButton,N as TileWithDownloadLink,L as TileWithLinkInTitle,w as TileWithNativePictogram,v as TileWithTag,B as TileWithoutImage,be as __namedExportsOrder,Se as default};
