import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { withEmotionCache } from "./_app";


class Document extends NextDocument {
	render() {
		return (
			<Html data-fr-scheme="system">
				<Head>
					<link rel="stylesheet" href="gouvfr_dsfr_dist/dsfr.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}



export default withEmotionCache(Document);