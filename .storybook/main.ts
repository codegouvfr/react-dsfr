import { StorybookConfig } from "@storybook/react-vite";

export default {
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    features: {
        controls: true,
        viewport: true,
        backgrounds: false
    },
    stories: [
        "../stories/*.mdx",
        "../stories/*.stories.@(ts|tsx)",
        "../stories/blocks/*.stories.@(ts|tsx)",
        "../stories/charts/*.stories.@(ts|tsx)"
    ],
    addons: [
        "@vueless/storybook-dark-mode",
        "@storybook/addon-links",
        "@storybook/addon-a11y",
        "@storybook/addon-docs"
    ],
    staticDirs: ["../dist", "./static"]
} satisfies StorybookConfig;
