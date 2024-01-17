import { ClientComponent } from "#/ui/ClientComponent";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Range } from "@codegouvfr/react-dsfr/Range";
import { SegmentedControl } from "@codegouvfr/react-dsfr/SegmentedControl";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { Summary } from "@codegouvfr/react-dsfr/Summary";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";

const modal = createModal({
    "id": "simple-modal",
    "isOpenedByDefault": false
});

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
            <Button nativeButtonProps={modal.buttonProps}>Open simple modal (control button)</Button>
            <modal.Component
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
            </modal.Component>
            <SideMenu
                items={[

                    {
                        text: "Niveau 1",
                        items: [
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            }
                        ]
                    },
                    {
                        isActive: true,
                        text: "Entrée menu active",
                        items: [
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                isActive: true,
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                        ]
                    },
                    {
                        text: "Accès direct",
                        linkProps: { href: "#" }
                    },
                    {
                        text: "Accès direct",
                        linkProps: { href: "#" }
                    },
                    {
                        text: "Niveau 1",
                        items: [
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            },
                            {
                                text: "Accès direct niveau 2",
                                linkProps: { href: "#" }
                            }
                        ]
                    }

                ]}
                title="Titre de rubrique"
                burgerMenuButtonText="Dans cette rubrique"
            />
            <TableExample />
            <SegmentedControl legend="Légende" hideLegend segments={[
                {
                    label: "Libellé",
                },
                {
                    label: "Libellé",
                },
                {
                    label: "Libellé",
                },
            ]} />
            <Range label="Label" hintText="Texte de description additionnel, valeur de 0 à 100." min={0} max={100} double step={10} prefix="~" suffix=" %" />
        </>
    );

}

function TableExample() {
    return (
        <Table
            caption="Titre du tableau"
            colorVariant="green-emeraude"
            headers={["Titre", "Titre", "Titre", "Titre", "Titre"]}
            data={[
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
            ]}
        />
    );
}
