import{r as e,f as s}from"./iframe-DCkbD6Ro.js";import{H as m,h as r}from"./Header-CwGYAvDm.js";import{F as i}from"./Footer-BV-Wgnkb.js";import{g as c}from"./getStory-JVSS1Wer.js";import"./preload-helper-PPVm8Dsz.js";import"./generateValidHtmlId-Bu5zDHjN.js";import"./Modal-aFyFqFph.js";import"./Button-DMub5GVd.js";import"./brandTopAndHomeLinkProps-OUsIpWwg.js";import"./SearchButton-BS3Oea2P.js";const{meta:p,getStory:n}=c({wrappedComponent:{Display:l},description:`
A button that opens a dialog to enable the user to select light or dark mode.  

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametre-d-affichage),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Display/Display.tsx)

Optionally, you can also use \`import { useIsDark } from "@codegouvfr/react-dsfr"\` to manually monitor and controls 
the theme state.

## Usage example 

\`\`\`tsx
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

function App(){

    return (
        <>
            <Header
                // other Header props...
                quickAccessItems={[
                    // other quick access items...
                    headerFooterDisplayItem
                ]}
            >
            {/* ... your app ...*/}
            <Footer
                // other Footer props...
                bottomItems={[
                    // other other bottom items...
                    headerFooterDisplayItem
                ]}
            />
        <>
    );

}
\`\`\`
`,disabledProps:["darkMode","containerWidth"]}),v={...p,title:"components/Display"},o=e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),a={href:"#",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"};function l(){return e.createElement(e.Fragment,null,e.createElement(m,{brandTop:o,serviceTitle:"Nom du site / service",homeLinkProps:a,quickAccessItems:[r]}),e.createElement(i,{className:s.cx("fr-mt-5v"),brandTop:o,homeLinkProps:a,accessibility:"fully compliant",bottomItems:[r]}))}const t=n({});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"getStory({})",...t.parameters?.docs?.source}}};const E=["Default"];export{t as Default,E as __namedExportsOrder,v as default};
