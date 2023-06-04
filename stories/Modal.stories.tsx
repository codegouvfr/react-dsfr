import React from "react";
import { createModal, type ModalProps } from "../dist/Modal";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { Button } from "../dist/Button";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { "Modal": Template },
    "description": `\`import { createModal } from "@codegouvfr/react-dsfr/Modal";\` (Click **show code** for usage details)

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Modal.tsx)

**Eg.:**  

\`\`\`tsx
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";

const modal = createModal({
    id: "foo-modal", 
    isOpenedByDefault: false
});

function Home(){
    return (
        <>
            {/* ... */}
            <modal.Component title="foo modal title">
                <h1>Foo modal content</h1>
            </modal.Component>
            <Button nativeButtonProps={fooModal.buttonProps}>Open foo modal</Button> {/* Use this if you are in a Server component (Next AppDir) and you don't want to add "use client"; just because of the the Modal */}
            <Button onClick={fooModal.open}>Open foo modal</Button> {/* ...otherwise this works just as well and is more versatile */}
            <Button onClick={fooModal.close}>Close foo modal</Button>
        </>
    );
);

\`\`\`

## The Modal component

`,
    "argTypes": {
        "title": {
            "description": `Required : The modal title`
        },
        "children": {
            "description": "Required : The modal content"
        },
        "iconId": {
            "description": "Optional : icon Id",
            "options": (() => {
                const options = ["fr-icon-checkbox-circle-line", "ri-ancient-gate-fill"] as const;

                assert<typeof options[number] extends ModalProps["iconId"] ? true : false>();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "size": {
            "options": (() => {
                const options = ["small", "medium", "large"] as const;

                assert<Equals<typeof options[number] | undefined, ModalProps["size"]>>();

                return options;
            })(),
            "description": ` 
                Default: "medium"
            `,
            "control": { "type": "select" }
        },
        "concealingBackdrop": {
            "control": "boolean",
            "description":
                "Default : true, make modal not closable by clicking on the bottom if false"
        },
        "topAnchor": {
            "control": "boolean",
            "description": "Default : false, make modal anchor to the top"
        },
        "buttons": {
            "control": { "type": null },
            "description": `The buttons at the bottom of the Modal, it's an array of ButtonProps objects.  
            If not stated otherwise all buttons are "secondary" except the last one that is "primary".  
            By default all buttons closes the modal, if you want it to be otherwise you can add \`doClosesModal: false\`
            `
        }
    },
    "doHideImportInstruction": true
});

export default meta;

const modal = createModal({
    "id": "my-modal",
    "isOpenedByDefault": false
});

function Template(args: ModalProps) {
    return (
        <>
            <Button nativeButtonProps={modal.buttonProps}>Open modal</Button>
            <modal.Component {...args} />
        </>
    );
}

export const Default = getStory({
    "children": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, 
sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris 
malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, 
tortor eros facilisis libero, vitae commodo nunc quam et ligula. Ut nec ipsum sapien. Interdum et 
malesuada fames ac ante ipsum primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu 
turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt sit amet sed orci.`,
    "title": "Accept terms",
    "iconId": "fr-icon-checkbox-circle-line",
    "buttons": [
        {
            "linkProps": { "href": "https://example.com", "target": "_blank" },
            "doClosesModal": false, //Default true, clicking a button close the modal.
            "children": "Learn more"
        },
        {
            "iconId": "ri-check-line",
            "children": "Ok",
            "onClick": () => console.log("terms accepted")
        }
    ]
});

Default.parameters = {
    "docs": {
        "source": {
            "code": `
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";

const modal = createModal({
    name: "terms-modal",
    isOpenedByDefault: false
});

function MyComponent(){

    return (
        <>
            <Button nativeButtonProps={modal.buttonProps}>Open modal</Button>
            <modal.Component
                title="Accept terms"
                iconId="fr-icon-checkbox-circle-line"
                buttons={
                    [
                        {
                            linkProps: { href: "https://example.com", target: "_blank" },
                            doClosesModal: false, //Default true, clicking a button close the modal.
                            children: "Learn more"
                        },
                        {
                            iconId: "ri-check-line",
                            onClick: ()=> console.log("terms accepted"),
                            children: "Ok"
                        }
                    ]
                }
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, 
                sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris 
                malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, 
                tortor eros facilisis libero, vitae commodo nunc quam et ligula. Ut nec ipsum sapien. Interdum et 
                malesuada fames ac ante ipsum primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu 
                turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt sit amet sed orci.
            </modal.Component>
        </>
    );

}
`
        }
    }
};
