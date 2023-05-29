import { useColors } from "./useColors";
import { createMakeAndWithStyles } from "tss-react";

/** @deprecated: Please use import { makeStyles } from "tss-react/dsfr"; instead. */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    "useTheme": useColors
});
