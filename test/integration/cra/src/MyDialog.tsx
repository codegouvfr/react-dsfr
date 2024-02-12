import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useIsModalOpen } from '@codegouvfr/react-dsfr/Modal/useIsModalOpen'
import { useState, useEffect, useId } from 'react'

type Props = {
    actions: {
        open?: (params: DialogParams) => Promise<DialogResponse>
    }
}

export type DialogParams = {
    title: string;
    body: string;
};

export type DialogResponse = {
    doProceed: boolean;
};

export function MyDialog(props: Props) {
    const { actions } = props

    const id = useId()

    const [modal] = useState(() =>
        createModal({
            id: `myDialog-${id}`,
            isOpenedByDefault: false,
        })
    );

    const [openState, setOpenState] = useState<
        | {
            dialogParams: DialogParams;
            resolve: (params: DialogResponse) => void
        }
        | undefined
    >(undefined)

    useEffect(() => {
        actions.open = dialogParams =>
            new Promise<DialogResponse>((resolve) => {
                setOpenState({
                    dialogParams,
                    resolve,
                })
                modal.open();
            })
    }, []);

    useIsModalOpen(modal, {
        onConceal: async () => {

            openState?.resolve({ doProceed: false });

            setOpenState(undefined);
        }
    });

    return (
        <modal.Component
            title={openState?.dialogParams.title}
            buttons={[
                {
                    children: 'Annuler',
                    onClick: () => {
                        openState?.resolve({ doProceed: false })

                        setOpenState(undefined)
                    },
                },
                {
                    children: 'Ok',
                    onClick: () => {

                        openState?.resolve({ 
                            doProceed: true
                        })

                        setOpenState(undefined)
                    },
                },
            ]}
            concealingBackdrop={true}
        >
            {openState?.dialogParams.body}
        </modal.Component>
    );
}
