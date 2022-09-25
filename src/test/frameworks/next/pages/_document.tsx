import DefaultDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from "next/document";
import { getColorSchemeSsrUtils } from "dsfr-react/lib/nextJs";

const { readColorSchemeFromCookie, getColorSchemeHtmlAttributes } = getColorSchemeSsrUtils();

export default class Document extends DefaultDocument {
	static async getInitialProps(ctx: DocumentContext) {

		const initialProps = await DefaultDocument.getInitialProps(ctx);

		readColorSchemeFromCookie(ctx);

		return { ...initialProps };

	}

	render() {
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

}
