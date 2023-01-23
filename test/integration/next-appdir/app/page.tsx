import { ClientComponent } from "#/ui/ClientComponent";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { Summary } from "@codegouvfr/react-dsfr/Summary";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

const { SimpleModal, simpleModalButtonProps } = createModal("simple");

export default function Page() {

    return (
        <>
            <Summary
                links={[
                    {
                        linkProps: {
                            href: '#'
                        },
                        text: 'Titre de l’ancre'
                    },
                    {
                        linkProps: {
                            href: '#'
                        },
                        text: 'Titre de l’ancre'
                    },
                    {
                        linkProps: {
                            href: '#'
                        },
                        text: 'Titre de l’ancre'
                    }
                ]}
            />
            <Alert
                closable
                description="Everything went well"
                severity="success"
                title="Message successfully sent"
            />
            <Tabs
                label="Name of the tabs system"
                tabs={[
                    {
                        content: <p>Content of tab1</p>,
                        iconId: 'fr-icon-add-line',
                        label: 'Tab 1'
                    },
                    {
                        content: <p>Content of tab2</p>,
                        iconId: 'fr-icon-ball-pen-fill',
                        label: 'Tab 2'
                    },
                    {
                        content: <p>Content of tab3</p>,
                        label: 'Tab 3'
                    }
                ]}
            />
            <ClientComponent />

            <Button {...simpleModalButtonProps}>Open simple modal</Button>
            <SimpleModal
                title="simple modal title"
                buttons={
                    [
                        {
                            "children": "Cancel",
                            "linkProps": { "href": "#" }
                        },
                        {
                            "iconId": "fr-icon-git-commit-fill",
                            "children": "Ok",
                            "linkProps": { "href": "#" }
                        }
                    ]
                }

            >
                Modal content
            </SimpleModal>
        </>
    );

}
