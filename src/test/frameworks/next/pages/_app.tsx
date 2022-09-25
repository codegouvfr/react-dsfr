import DefaultApp from "next/app";
import "dsfr-react/dsfr/dsfr.css";
import { withAppDsfr } from "dsfr-react/lib/nextJs";

//export default withDsfr(DefaultApp);
export default withAppDsfr(DefaultApp, {
	"defaultColorScheme": "system",
	"preloadFonts": [
		//"Marianne-Light",
		//"Marianne-Light_Italic",
		"Marianne-Regular",
		//"Marianne-Regular_Italic",
		"Marianne-Medium",
		//"Marianne-Medium_Italic",
		"Marianne-Bold",
		//"Marianne-Bold_Italic",
		//"Spectral-Regular",
		//"Spectral-ExtraBold"
	]
});
