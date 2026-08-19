import { defineMain } from "@storybook/react-vite/node";

export default defineMain({
    framework: "@storybook/react-vite",
    features: {
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
    staticDirs: ["../dist", "./static"],
    docs: {
        docsMode: true
    }
});
