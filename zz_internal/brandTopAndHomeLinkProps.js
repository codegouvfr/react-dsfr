let wrap = undefined;
export function setBrandTopAndHomeLinkProps(params) {
    wrap = params;
}
export function getBrandTopAndHomeLinkProps() {
    if (wrap === undefined) {
        throw new Error("The footer should be used in conjunction with the header.");
    }
    return wrap;
}
//# sourceMappingURL=brandTopAndHomeLinkProps.js.map