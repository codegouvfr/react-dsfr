import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { assert } from "tsafe/assert";

import type { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface

/*
export interface LinkProps extends React.AriaAttributes {
    className?: string;
    children?: ReactNode;
}
*/

export type HTMLAnchorProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterLink {
    // Link: typeof Link
}

export type RegisteredLinkProps = RegisterLink extends {
    Link: (props: infer LinkProps) => any;
}
    ? Omit<LinkProps, "children">
    : RegisterLink extends { Link: "a" }
    ? Omit<HTMLAnchorProps, "children">
    : React.AriaAttributes & { className?: string };

const context = createContext<CreateLinkProviderPrams["Link"] | undefined>(undefined);

type CreateLinkProviderPrams = {
    Link: ((props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>) | "a";
};

export function createDsfrLinkProvider(params: CreateLinkProviderPrams) {
    const { Link } = params;

    type Props = {
        children: ReactNode;
    };

    function DsfrLinkProvider(props: Props) {
        const { children } = props;

        return <context.Provider value={Link}>{children}</context.Provider>;
    }

    return { DsfrLinkProvider };
}

export function useLink() {
    let Link = useContext(context);

    assert(
        Link !== undefined,
        "You need to specify what routing library is in use in your project, see: https://react-dsfr.etalab.studio/routing"
    );

    if (Link === "a") {
        Link = props => <a {...props} />;
    }

    return { Link };
}
