declare module "@gouvfr/dsfr/dist/dsfr.module" {}

declare module "*.svg" {
    const _default: string | { src: string };
    export default _default;
}

declare module "*.png" {
    const _default: string | { src: string };
    export default _default;
}

declare module "*.ico" {
    const _default: string | { src: string };
    export default _default;
}

declare module "*.webmanifest" {
    const _default: string;
    export default _default;
}

declare module "*.woff2" {
    const _default: string;
    export default _default;
}
