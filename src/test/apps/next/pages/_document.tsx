import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { withEmotionCache } from "./_app";

class Document extends NextDocument {
	render() {

		return (
			<Html>
				<Head>
					<link rel="stylesheet" href="gouvfr_dsfr_dist/dsfr.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
					{/*<script type="module" src="gouvfr_dsfr_dist/dsfr.module.min.js"></script>*/}
					{/*<script type="text/javascript" noModule src="gouvfr_dsfr_dist/dsfr.nomodule.min.js"></script>*/}
				</body>
			</Html>
		)
	}
}



export default withEmotionCache(Document);