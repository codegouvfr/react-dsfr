export function getAssetUrl(componentOrUrl: { src: string } | string): string {
    return typeof componentOrUrl === "string" ? componentOrUrl : componentOrUrl.src;
}
