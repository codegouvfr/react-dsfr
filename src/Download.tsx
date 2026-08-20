import React, { memo, forwardRef, type CSSProperties, type ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { getLink, type RegisteredLinkProps } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type DownloadProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    details: ReactNode;
    label: ReactNode;
    linkProps: RegisteredLinkProps;
    classes?: Partial<Record<"root" | "wrapper" | "link" | "details", string>>;
};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-download> */
export const Download = memo(
    forwardRef<HTMLDivElement, DownloadProps>((props, ref) => {
        const {
            className,
            style,
            details,
            label,
            linkProps,
            classes = {},
            id: props_id,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-download",
            "explicitlyProvidedId": props_id
        });

        const { Link } = getLink();

        return (
            <div
                id={id}
                className={cx(fr.cx("fr-download"), className, classes.root)}
                style={style}
                ref={ref}
            >
                <p className={cx(classes.wrapper)}>
                    <Link
                        {...linkProps}
                        download
                        className={cx(fr.cx("fr-download__link"), classes.link)}
                    >
                        {label}
                        <span className={fr.cx("fr-download__detail")}>{details}</span>
                    </Link>
                </p>
            </div>
        );
    })
);

Download.displayName = symToStr({ Download });

export default Download;
