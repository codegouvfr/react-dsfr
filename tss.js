export * from "tss-react";
import { useColors } from "./useColors";
import { createMakeAndWithStyles } from "tss-react";
/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    "useTheme": useColors
});
//# sourceMappingURL=tss.js.map