import React, { CSSProperties, forwardRef, memo } from "react";
import { assert, Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import Tag, { TagProps } from "./Tag";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { cx } from "./tools/cx";

export type TagsGroupProps = TagsGroupProps.Common;

//https://main--ds-gouv.netlify.app/example/component/tag/#:~:text=Groupe%20de%20tags
export namespace TagsGroupProps {
    export type Common = {
        id?: string;
        className?: string;
        style?: CSSProperties;
        smallTags?: TagProps["small"];
        /** 6 tags should be the maximum.  */
        tags: [TagProps, ...TagProps[]];
    };
}

export const TagsGroup = memo(
    forwardRef<HTMLUListElement, TagsGroupProps>((props, ref) => {
        const { id: props_id, className, tags, smallTags = false, style, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-tags-group",
            "explicitlyProvidedId": props_id
        });

        return (
            <ul className={cx("fr-tags-group", className)} style={style} id={id} ref={ref}>
                {tags.map((tagProps, i) => (
                    <li key={i}>
                        <Tag small={smallTags} {...tagProps} />
                    </li>
                ))}
            </ul>
        );
    })
);

TagsGroup.displayName = symToStr({ TagsGroup });

export default TagsGroup;
