import DefaultDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from "next/document";
import { getDsfrDocumentApi } from "dsfr-react/lib/nextJs";

const { getDocumentDsfrInitialProps, getDsfrHtmlAttributes } = getDsfrDocumentApi();

export default class Document extends DefaultDocument {
	static async getInitialProps(ctx: DocumentContext) {

		const initialProps = await DefaultDocument.getInitialProps(ctx);

		const dsfrInitialProps = getDocumentDsfrInitialProps(ctx);

		console.log("(server) Document.getInitialProps we read colorScheme from cookie: ", dsfrInitialProps);

		return { ...initialProps, ...dsfrInitialProps };

	}

	render() {
		return (
			<Html {...getDsfrHtmlAttributes(this.props)}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}

}
