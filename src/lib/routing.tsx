import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

interface AriaEnabled {
    [key: `aria-${string}`]: string | boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps extends AriaEnabled {
    className?: string;
    children?: ReactNode;
}

export type HTMLAnchorProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

const context = createContext<CreateLinkProviderPrams["Link"]>(props => <a {...props} />);

type CreateLinkProviderPrams = {
    Link: (props: LinkProps) => ReturnType<React.FC>;
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
    const Link = useContext(context);

    return { Link };
}
