import React from "react";
import { memo, useState } from "react";
import { useConstCallback } from "powerhooks";
import { keyframes, createMakeAndWithStyles } from "tss-react";
import keycloakifyLogoHeroMovingPngUrl from "./assets/logo-in.png";
import keycloakifyLogoHeroStillPngUrl from "./assets/logo-out.png";

const { makeStyles } = createMakeAndWithStyles({
    "useTheme": () => ({})
});

export type Props = {
    style?: React.CSSProperties;
    id?: string;
    onLoad?: () => void;
};

export const RotatingLogo = memo((props: Props) => {
    const { id, style, onLoad: onLoadProp } = props;

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const onLoad = useConstCallback(() => {
        setIsImageLoaded(true);
        onLoadProp?.();
    });

    const { classes } = useStyles({
        isImageLoaded
    });
    return (
        <div id={id} className={classes.root} style={style}>
            <img
                className={classes.rotatingImg}
                onLoad={onLoad}
                src={keycloakifyLogoHeroMovingPngUrl}
                alt={"Rotating react logo"}
            />
            <img
                className={classes.stillImg}
                src={keycloakifyLogoHeroStillPngUrl}
                alt={"keyhole"}
            />
        </div>
    );
});

const useStyles = makeStyles<{ isImageLoaded: boolean }>({
    "name": { RotatingLogo }
})((_theme, { isImageLoaded }) => ({
    "root": {
        "position": "relative"
    },
    "rotatingImg": {
        "animation": `${keyframes({
            "from": {
                "transform": "rotate(0deg)"
            },
            "to": {
                "transform": "rotate(360deg)"
            }
        })} infinite 20s linear`,
        "width": isImageLoaded ? "100%" : undefined,
        "height": isImageLoaded ? "auto" : undefined
    },
    "stillImg": {
        "position": "absolute",
        "top": "0",
        "left": "0",
        "width": isImageLoaded ? "100%" : undefined,
        "height": isImageLoaded ? "auto" : undefined
    }
}));
