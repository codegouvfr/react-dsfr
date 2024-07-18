export function modifyHtmlHrefs(params: {
    html: string;
    getModifiedHref: (href: string) => string;
}): { modifiedHtml: string } {
    const { html, getModifiedHref } = params;

    let modifiedHtml = html;

    (
        [
            [/href="([^"]+)"/g, '"'],
            [/href='([^']+)'/g, "'"]
        ] as const
    ).forEach(
        ([regex, quoteSymbol]) =>
            (modifiedHtml = modifiedHtml.replace(
                regex,
                (...[, href]) => `href=${quoteSymbol}${getModifiedHref(href)}${quoteSymbol}`
            ))
    );

    return { modifiedHtml };
}
