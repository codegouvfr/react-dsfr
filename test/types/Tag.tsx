import React from "react";
import { Tag } from "../../src/Tag";

{
    <Tag>Label</Tag>;
}
{
    <Tag iconId="fr-icon-add-line">Label</Tag>;
}
{
    <Tag iconId="fr-icon-add-line" isSmall>
        Label
    </Tag>;
}
{
    <Tag iconId="fr-icon-add-line" onClick={() => console.log("clicked")}>
        Label
    </Tag>;
}
{
    <Tag
        linkProps={{
            "href": "https://www.example.com"
        }}
        iconId="fr-icon-add-line"
    >
        Label
    </Tag>;
}
{
    <Tag onClick={() => console.log("clicked")}>Label</Tag>;
}
{
    <Tag isDismissible onClick={() => console.log("clicked on my dismissible tag")}>
        Label
    </Tag>;
}
{
    <Tag isDismissible onClick={() => console.log("clicked")}>
        Label
    </Tag>;
}
{
    //@ts-expect-error: children is required
    <Tag></Tag>;
}
{
    //@ts-expect-error: nativeSpanProps and onClick are mutually exclusive
    <Tag
        onClick={() => console.log("clicked")}
        nativeSpanProps={{
            "id": "foo"
        }}
    >
        Label
    </Tag>;
}
{
    //@ts-expect-error: linkProps and onClick are mutually exclusive
    <Tag
        linkProps={{
            "href": "https://www.example.com"
        }}
        onClick={() => console.log("clicked")}
    >
        Label
    </Tag>;
}
{
    //@ts-expect-error: we shouldn't use Tag component as a span if it's dismissible
    <Tag
        isDismissible
        nativeSpanProps={{
            "id": "foo"
        }}
    >
        Label
    </Tag>;
}
{
    //@ts-expect-error: we shouldn't use Tag component as an anchor if it's dismissible
    <Tag
        isDismissible
        linkProps={{
            "href": "https://www.example.com"
        }}
    >
        Label
    </Tag>;
}
