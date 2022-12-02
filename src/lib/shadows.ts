export const shadowsOption = [
    "none",
    /** Light / SM */
    "0px 2px 6px 0px rgba(0,0,18,0.16)",
    /** Light / MD */
    "0px 4px 12px 0px rgba(0,0,18,0.16)",
    /** Light / LG */
    "0px 6px 18px 0px rgba(0,0,18,0.16)",
    /** Dark / SM */
    "0px 2px 6px 0px rgba(0,0,18,0.32)",
    /** Dark / MD */
    "0px 4px 12px 0px rgba(0,0,18,0.32)",
    /** Dark / LG */
    "0px 4px 18px 0px rgba(0,0,18,0.32)"
] as const;

// Shadows decisions (shadow applied to an usecase or a context)

/** Raised */
// Use Light or Dark / SM

/** Overlap */
// Use Light or Dark / MD

/** Lifted */
// Use Light or Dark / LG
