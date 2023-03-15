import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { RegisteredLinkProps } from "./link";
import { getLink } from "./link";
import { fr } from "./fr";
import { cx } from "./tools/cx";

//https://main--ds-gouv.netlify.app/example/component/tile/
export type SideMenuProps = {
    className?: string;
    title?: ReactNode;
    style?: CSSProperties;
    items: SideMenuProps.Item[];
};

export namespace SideMenuProps {
    export type Item = {
        text: string;
        linkProps: RegisteredLinkProps;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-tile> */
export const SideMenu = memo(
    forwardRef<HTMLDivElement, SideMenuProps>((props, ref) => {
        const { className, title, items, style, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        return (
            <nav
                {...rest}
                ref={ref}
                style={style}
                aria-labelledby="fr-sidemenu-title"
                className={cx(fr.cx("fr-sidemenu"), className)}
            >
                <div className={fr.cx("fr-sidemenu__inner")}>
                    {/* <button
                        hidden
                        aria-expanded="false"
                        aria-controls="fr-sidemenu-wrapper"
                        className={fr.cx("fr-sidemenu__btn")}
                    >
                        Dans cette rubrique
                    </button> */}
                    <div className={fr.cx("fr-collapse")} id="fr-sidemenu-wrapper">
                        {title !== undefined && (
                            <div className={fr.cx("fr-sidemenu__title")} id="fr-sidemenu-title">
                                {title}
                            </div>
                        )}
                        <ul className={fr.cx("fr-sidemenu__list")}>
                            {items.map(({ text, linkProps }, i) => (
                                // <li className={fr.cx("fr-sidemenu__item", "fr-sidemenu__item--active")}>
                                <li key={i} className={fr.cx("fr-sidemenu__item")}>
                                    <Link
                                        className={cx(fr.cx("fr-sidemenu__link"))}
                                        href={linkProps.href}
                                        target="_self"
                                    >
                                        {text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    })
);

SideMenu.displayName = symToStr({ SideMenu });

export default SideMenu;
