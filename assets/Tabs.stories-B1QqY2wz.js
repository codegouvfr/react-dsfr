import{r as m,i as P,a as $,u as j,R as c,b as h,f as g,s as F}from"./iframe-DCkbD6Ro.js";import{g as z,l as w}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";function A(a,i){const e=new Map,{argsLength:t=a.length,max:b=1/0}=i??{};return((...u)=>{const s=JSON.stringify(u.slice(0,t).map(r=>{if(r===null)return"null";if(r===void 0)return"undefined";switch(typeof r){case"number":return`number-${r}`;case"string":return`string-${r}`;case"boolean":return`boolean-${r?"true":"false"}`}}).join("-sIs9sAslOdeWlEdIos3-"));if(e.has(s))return e.get(s);if(b===e.size)for(const r of e.keys()){e.delete(r);break}const p=a(...u);return e.set(s,p),p})}function L(a){const i=m.useRef(a);i.current=a;const e=m.useRef(void 0);return m.useState(()=>P((...t)=>(e.current===void 0&&(e.current=A((...b)=>(...u)=>i.current(b,u),{argsLength:t.length})),e.current(...t))))[0]}var W=function(a,i){var e={};for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&i.indexOf(t)<0&&(e[t]=a[t]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var b=0,t=Object.getOwnPropertySymbols(a);b<t.length;b++)i.indexOf(t[b])<0&&Object.prototype.propertyIsEnumerable.call(a,t[b])&&(e[t[b]]=a[t[b]]);return e};const k=m.memo(m.forwardRef((a,i)=>{const{id:e,className:t,label:b,classes:u={},tabs:s,selectedTabId:p,onTabChange:r,children:S,style:O}=a,N=W(a,["id","className","label","classes","tabs","selectedTabId","onTabChange","children","style"]);$();const x=j({defaultIdPrefix:"fr-tabs",explicitlyProvidedId:e}),d=m.useMemo(()=>{const l=s.findIndex(n=>{var f;return"content"in n?(f=n.isDefault)!==null&&f!==void 0?f:!1:n.tabId===p});return l===-1?0:l},[s,p]),C=c.useRef([]),R=L(([l])=>{p===void 0?r?.({tabIndex:l,tab:s[l]}):r(s[l].tabId)}),D=l=>{var n,f;if(p!==void 0){let o=d;switch(l.key){case"ArrowRight":o=d<s.length-1?d+1:0;break;case"ArrowLeft":o=d===0?s.length-1:d-1;break;case"Home":o=0;break;case"End":o=s.length-1;break}(n=C.current[o])===null||n===void 0||n.click(),(f=C.current[o])===null||f===void 0||f.focus()}},{getPanelId:_,getTabId:v}=(function(){const n=e??m.useId();return{getPanelId:T=>`tabpanel-${n}-${T}-panel`,getTabId:T=>`tabpanel-${n}-${T}`}})();return c.createElement("div",Object.assign({id:x,className:h(g.cx("fr-tabs"),t),ref:i,style:O},N),c.createElement("ul",{className:g.cx("fr-tabs__list"),role:"tablist","aria-label":b,onKeyDownCapture:l=>D(l)},s.map(({label:l,iconId:n,disabled:f},o)=>c.createElement("li",{key:o,role:"presentation"},c.createElement("button",{ref:T=>C.current[o]=T,id:v(o),type:"button",className:h(g.cx("fr-tabs__tab",n,"fr-tabs__tab--icon-left"),u.tab),tabIndex:o===d?0:-1,role:"tab","aria-selected":o===d,"aria-controls":_(o),onClick:R(o),disabled:f},l)))),p===void 0?s.map(({content:l},n)=>c.createElement("div",{key:n,id:_(n),className:h(g.cx("fr-tabs__panel",n===d&&"fr-tabs__panel--selected"),u.panel),role:"tabpanel","aria-labelledby":v(n),tabIndex:0},l)):c.createElement("div",{id:_(d),className:h(g.cx("fr-tabs__panel","fr-tabs__panel--selected"),u.panel),role:"tabpanel","aria-labelledby":v(d),tabIndex:0},S))}));k.displayName=F({Tabs:k});const{meta:B,getStory:E}=z({wrappedComponent:{Tabs:k},description:`- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglet)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Tabs.tsx)  

## Uncontrolled

In this mode the \`Tab\` component is in charge for swapping the panel content.  

\`\`\`tsx
<Tabs
    tabs={[
        { label: "Tab 1", iconId: "fr-icon-add-line", content: <p>Content of tab1</p> },
        { label: "Tab 2", iconId: "fr-icon-ball-pen-fill", isDefault: true, content: <p>Content of tab2</p> },
        { label: "Tab 3", content: <p>Content of tab3</p> },
        { label: "Tab 4", content: null, disabled: true }
    ]}
/>
\`\`\`

## Controlled 

In this mode you are in charge of the behavior of the tabs.  
_NOTE: In controlled mode there is no animation transition when switching between tabs._

\`\`\`tsx
function ControlledTabs() {

    const [selectedTabId, setSelectedTabId] = useState("tab1");

    return (
        <Tabs
            selectedTabId={selectedTabId}
            tabs={[
                { tabId: "tab1", label: "Tab 1", iconId: "fr-icon-add-line" },
                { tabId: "tab2", label: "Tab 2", iconId: "fr-icon-ball-pen-fill" },
                { tabId: "tab3", label: "Tab 3" },
                { tabId: "tab4", label: "Tab 4", disabled: true },
            ]}
            onTabChange={setSelectedTabId}
        >
            <p>Content of {selectedTabId}</p>
        </Tabs>
    );

}
\`\`\`

`,disabledProps:["lang"]}),J={...B,title:"components/Tabs"},y=E({tabs:[{label:"Tab 1",iconId:"fr-icon-add-line",content:c.createElement("p",null,"Content of tab1")},{label:"Tab 2",iconId:"fr-icon-ball-pen-fill",content:c.createElement("p",null,"Content of tab2")},{label:"Tab 3",content:c.createElement("p",null,"Content of tab3")},{label:"Tab 4",content:null,disabled:!0}],label:"Name of the tabs system",...w(["onTabChange"])}),I=E({tabs:[{label:"Tab 1",iconId:"fr-icon-add-line",content:c.createElement("p",null,"Content of tab1")},{label:"Tab 2",iconId:"fr-icon-ball-pen-fill",isDefault:!0,content:c.createElement("p",null,"Content of tab2")},{label:"Tab 3",content:c.createElement("p",null,"Content of tab3")},{label:"Tab 4",content:null,disabled:!0}],label:"Name of the tabs system",...w(["onTabChange"])});y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`getStory({
  "tabs": [{
    "label": "Tab 1",
    "iconId": "fr-icon-add-line",
    "content": <p>Content of tab1</p>
  }, {
    "label": "Tab 2",
    "iconId": "fr-icon-ball-pen-fill",
    "content": <p>Content of tab2</p>
  }, {
    "label": "Tab 3",
    "content": <p>Content of tab3</p>
  }, {
    "label": "Tab 4",
    "content": null,
    disabled: true
  }],
  "label": "Name of the tabs system",
  ...logCallbacks(["onTabChange"])
})`,...y.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`getStory({
  "tabs": [{
    "label": "Tab 1",
    "iconId": "fr-icon-add-line",
    "content": <p>Content of tab1</p>
  }, {
    "label": "Tab 2",
    "iconId": "fr-icon-ball-pen-fill",
    "isDefault": true,
    "content": <p>Content of tab2</p>
  }, {
    "label": "Tab 3",
    "content": <p>Content of tab3</p>
  }, {
    "label": "Tab 4",
    "content": null,
    "disabled": true
  }],
  "label": "Name of the tabs system",
  ...logCallbacks(["onTabChange"])
})`,...I.parameters?.docs?.source}}};const U=["Default","WithTab2OpenedByDefault"];export{y as Default,I as WithTab2OpenedByDefault,U as __namedExportsOrder,J as default};
