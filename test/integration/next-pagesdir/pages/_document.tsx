import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import { dsfrDocumentApi, augmentDocumentWithEmotionCache } from "./_app";

const { augmentDocumentForDsfr, getColorSchemeHtmlAttributes } = dsfrDocumentApi;

export default function Document(props: DocumentProps) {
    return (
        <Html {...getColorSchemeHtmlAttributes(props)}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

augmentDocumentForDsfr(Document);

augmentDocumentWithEmotionCache(Document);
