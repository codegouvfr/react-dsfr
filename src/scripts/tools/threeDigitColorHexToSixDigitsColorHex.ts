export function threeDigitColorHexToSixDigitsColorHex(threeDigitColorHex: string) {
    let v = parseInt(threeDigitColorHex.substring(1), 16); // in rrggbb
    // nybble colors - fix to hex colors
    //  0x00000rgb              -> 0x000r0g0b
    //  0x000r0g0b | 0x00r0g0b0 -> 0x00rrggbb
    const w = ((v & 0xf00) << 8) | ((v & 0x0f0) << 4) | (v & 0x00f);
    v = w | (w << 4);
    return `#${v.toString(16)}`;
}
