import{A as i}from"./Alert-BzwglT7K.js";import{g as n,l as c}from"./getStory-JVSS1Wer.js";import{a}from"./iframe-DCkbD6Ro.js";import"./preload-helper-PPVm8Dsz.js";const{meta:d,getStory:r}=n({wrappedComponent:{Alert:i},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Alert.tsx)

## Uncontrolled mode  

\`\`\`tsx
import { Alert } from "@codegouvfr/react-dsfr/Alert";

<Alert
    severity="success"
    title="Message successfully sent"
    description="Everything went well"
    closable
    onClose={()=> alert("The user clicked the close button on the modal")}
/>
\`\`\`

## Controlled mode

\`\`\`tsx
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";

const [ isClosed, setIsClosed ] = useState(false);

<Alert
    severity="success"
    title="Message successfully sent"
    description="Everything went well"
    isClosed={isClosed}
    // If the use should be able to close the modal manually
    closable
    // This is called only when the user clicks the close button
    onClose={()=> setIsClosed(true)}
/>
<button onClick={()=> setIsClosed(false)}>Open alert</button>
<button onClick={()=> setIsClosed(true)}>Close alert</button>
\`\`\`

`,argTypes:{severity:{options:(()=>{const l=["success","warning","info","error"];return a(),l})(),control:{type:"radio"}},title:{description:"Required when the `<Alert isSmall={false} />` \n            (which is the default if `isSmall` isn't specified)."},description:{description:"Required when the `<Alert isSmall />`"},closable:{description:"If the modal should have a close button"},onClose:{description:"Called when the user clicks the close button"},isClosed:{description:"If specified the `<Alert />` is in \n                [controlled mode](https://reactjs.org/docs/forms.html#controlled-components)\n                this means that when the close button is clicked\n                the `onClose()` callback will be called but you are responsible\n                for setting `isClosed` to `false`, the `<Alert />` wont close itself.",control:!1}},disabledProps:["lang"]}),f={...d,title:"components/Alert"},e=r({severity:"success",small:!1,title:"Message successfully sent",description:"Everything went well",closable:!0,isClosed:void 0,...c(["onClose"])}),t=r({severity:"info",small:!0,description:"This is the description"},{description:"Small info `Alert` with only a description"}),s=r({severity:"warning",title:"This is the title"},{description:"Warning `Alert` with only a title"}),o=r({severity:"error",title:"This is the title",description:"This is the description",closable:!0});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`getStory({
  "severity": "success",
  "small": false,
  "title": "Message successfully sent",
  "description": "Everything went well",
  "closable": true,
  "isClosed": undefined,
  ...logCallbacks(["onClose"])
})`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`getStory({
  "severity": "info",
  "small": true,
  "description": "This is the description"
}, {
  "description": "Small info \`Alert\` with only a description"
})`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`getStory({
  "severity": "warning",
  "title": "This is the title"
}, {
  "description": "Warning \`Alert\` with only a title"
})`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "severity": "error",
  "title": "This is the title",
  "description": "This is the description",
  "closable": true
})`,...o.parameters?.docs?.source}}};const y=["Default","SmallDescriptionOnlyInfo","TitleOnlyWarning","ClosableError"];export{o as ClosableError,e as Default,t as SmallDescriptionOnlyInfo,s as TitleOnlyWarning,y as __namedExportsOrder,f as default};
