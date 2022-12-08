import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "../../lib";
import { cx } from "../../lib/tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { LinkProps } from "../../lib/routing";
import { useLink } from "../../lib/routing";

export type MenuProps = {
    className?: string;
    classes?: Partial<Record<"root" | "list", string>>;
    items: {
        text: ReactNode;
        linkProps: LinkProps;
        isActive?: boolean;
    }[];
};

export const Menu = memo(
    forwardRef<HTMLDivElement, MenuProps & { id: string }>((props, ref) => {
        const { className, id, classes = {}, items, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = useLink();

        return (
            <div
                className={cx(fr.cx("fr-menu"), classes.root, className)}
                id={id}
                ref={ref}
                {...rest}
            >
                <ul className={cx(fr.cx("fr-menu__list"), classes.list)}>
                    {items.map(({ text, linkProps, isActive = false }, i) => (
                        <li key={i}>
                            <Link
                                {...linkProps}
                                className={cx(fr.cx("fr-nav__link"), linkProps.className)}
                                {...(isActive && { ["aria-current"]: "page" })}
                            >
                                {text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    })
);

Menu.displayName = symToStr({ Menu });

export default Menu;
