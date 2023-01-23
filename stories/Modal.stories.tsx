import * as React from "react";
import { Modal, ModalProps } from "../dist/Modal";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { Button } from "../dist/Button";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { [symToStr({ Modal })]: Template },
    "description": `
A button that opens a modale
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Modal.tsx)`,
    "argTypes": {
        "id": {
            "description": "Required : This modal id (shared with button aria-controls)"
        },
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
        }
    }
});

export default meta;

function Template(args: ModalProps) {
    return (
        <>
            <Button
                onClick={() => console.log("onClick")}
                nativeButtonProps={{
                    "aria-controls": args.id,
                    "data-fr-opened": "false"
                }}
                wesh-morray={false}
            >
                Open Modal
            </Button>
            <Modal {...args} />
        </>
    );
}

export const ModalSimple = getStory({
    "id": "fr-modal-1",
    "children":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt sit amet sed orci.",
    "title": "Titre de la modale",
    "iconId": "fr-icon-checkbox-circle-line",
    "size": "medium",
    "concealingBackdrop": true,
    "topAnchor": false
});

ModalSimple.parameters = {
    docs: {
        source: {
            code: `
<>
    <Button onClick={() => console.log("onClick")} nativeButtonProps={{ "aria-controls": args.id, data-fr-opened="false"}} >
    Open Modal
    </Button>
    <Modal id="fr-modal-1" children="Lorem ipsum dolor sit amet" title="Titre de la modale" iconId="fr-icon-checkbox-circle-line" />
</>
`
        }
    }
};

export const ModalAction = getStory({
    "id": "fr-modal-2",
    "children":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt sit amet sed orci.",
    "title": "Titre de la modale",
    "iconId": "fr-icon-checkbox-circle-line",
    "size": "medium",
    "concealingBackdrop": true,
    "topAnchor": false,
    "actionArea": [
        {
            "linkProps": { "href": "#" },
            "iconId": "fr-icon-git-commit-fill",
            "children": "Button 1 label",
            "priority": "secondary"
        },
        {
            "priority": "secondary",
            "linkProps": { "href": "#" },
            "iconId": "fr-icon-chat-check-fill",
            "children": "Button 2 label (longer)"
        }
    ]
});
