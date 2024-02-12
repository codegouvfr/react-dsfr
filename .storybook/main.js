module.exports = {
    "stories": [
        "../stories/*.stories.mdx",
        "../stories/*.stories.@(ts|tsx)",
        "../stories/blocks/*.stories.@(ts|tsx)"
    ],

    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-dark-mode",
        "@storybook/addon-a11y",
        "@storybook/addon-mdx-gfm"
    ],

    "staticDirs": ["../dist", "./static"],

    core: {
        builder: "@storybook/builder-vite"
    },

    docs: {
        autodocs: true
    }
};
