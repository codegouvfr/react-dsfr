import { createMakeAndWithStyles } from "tss-react";
import { useColors } from "../../dist/useColors";

export const { useStyles, makeStyles } = createMakeAndWithStyles({ "useTheme": useColors });
