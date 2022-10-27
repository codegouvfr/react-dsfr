import DefaultDocument, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import { getColorSchemeSsrUtils } from "@codegouvfr/react-dsfr/lib/next";

const { readColorSchemeFromCookie, getColorSchemeHtmlAttributes } = getColorSchemeSsrUtils();

export default function Document() {
    return (
        <Html {...getColorSchemeHtmlAttributes()}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await DefaultDocument.getInitialProps(ctx);

    readColorSchemeFromCookie(ctx);

    return { ...initialProps };
};
