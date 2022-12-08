import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "../../lib";
import { cx } from "../../lib/tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

export type MegaMenuProps = {
    className?: string;
    classes?: Partial<Record<"root", string>>;
};

export const MegaMenu = memo(
    forwardRef<HTMLDivElement, MegaMenuProps & { id: string }>((props, ref) => {
        const { className, id, classes = {}, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <div
                className={cx(fr.cx("fr-mega-menu"), classes.root, className)}
                tabIndex={-1}
                id={id}
                ref={ref}
                {...rest}
            >
                TODO
            </div>
        );
    })
);

MegaMenu.displayName = symToStr({ MegaMenu });

export default MegaMenu;
