"use client";

import { Follow as BaseFollow } from "@codegouvfr/react-dsfr/Follow";
import { useState } from 'react'

export const Follow = () => {
    const [success, setSuccess] = useState(false)
    return <BaseFollow
        newsletter={{
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.",
            buttonProps: {
                onClick: () => setSuccess(true)
            },
            form: {
                formComponent: ({ children }) => <form action="#">{children}</form>,
                success,
            }
        }}
        social= {{
            buttons: [
                {
                    type: "facebook",
                    linkProps: {
                        href: "#facebook"
                    }
                },
                {
                    type: "twitter-x",
                    linkProps: {
                        href: "#twitter"
                    }
                },
                {
                    type: "linkedin",
                    linkProps: {
                        href: "#linkedin"
                    }
                },
                {
                    type: "instagram",
                    linkProps: {
                        href: "#instagram"
                    }
                },
                {
                    type: "youtube",
                    linkProps: {
                        href: "#youtube"
                    }
                }
            ]
        }}
    />
}