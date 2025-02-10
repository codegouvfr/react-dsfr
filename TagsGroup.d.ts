import React, { CSSProperties } from "react";
import { TagProps } from "./Tag";
export type TagsGroupProps = TagsGroupProps.Common;
export declare namespace TagsGroupProps {
    type Common = {
        id?: string;
        className?: string;
        style?: CSSProperties;
        /** @default false */
        smallTags?: TagProps["small"];
        /** 6 tags should be the maximum.  */
        tags: [TagProps, ...TagProps[]];
    };
}
export declare const TagsGroup: React.MemoExoticComponent<React.ForwardRefExoticComponent<TagsGroupProps.Common & React.RefAttributes<HTMLUListElement>>>;
export default TagsGroup;
