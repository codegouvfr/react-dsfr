export function generateValidHtmlId(params) {
    const { text, fallback } = params;
    if (typeof text !== "string" || text === "") {
        return fallback !== undefined ? `-${fallback}` : "";
    }
    // Remove any space characters
    let result = text.replace(/\s+/g, "");
    // Replace any non-alphanumeric characters with underscores
    result = result.replace(/[^a-zA-Z0-9]/g, "_");
    return `-${result}`;
}
//# sourceMappingURL=generateValidHtmlId.js.map