import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Components } from "react-markdown";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import diff from "react-syntax-highlighter/dist/cjs/languages/prism/diff";
import rangeParser from "parse-numeric-range";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import { createMakeAndWithStyles } from "tss-react";
import { useIsDark } from "../dist";
import { useConstCallback } from "../dist/lib/tools/powerhooks/useConstCallback";
import { memoize } from "../dist/lib/tools/memoize";

const { makeStyles } = createMakeAndWithStyles({
    "useTheme": () => useIsDark().isDark
});

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("diff", diff);

//SEE: https://amirardalan.com/blog/syntax-highlight-code-in-markdown

export type MarkdownProps = {
    className?: string;
    /** Default false */
    doShowLineNumber?: boolean;
    children: string;
};

export function Markdown(props: MarkdownProps) {
    const { className, doShowLineNumber = false, children } = props;

    const { Code } = createCode(doShowLineNumber);

    const components: Components = useMemo(() => ({ "code": Code }), [Code]);

    return (
        <ReactMarkdown className={className} components={components}>
            {children}
        </ReactMarkdown>
    );
}

export default Markdown;

const createCode = memoize((doShowLineNumber: boolean) => {
    const Code: Components["code"] = ({ node, className, ...props }) => {
        const match = /language-(\w+)/.exec(className || "");

        const hasMeta = !!node?.data?.meta;

        const applyHighlights = useConstCallback((applyHighlights: number) => {
            if (!hasMeta) {
                return {};
            }
            const RE = /{([\d,-]+)}/;
            const metadata = (node as any).data.meta?.replace(/\s/g, "");
            const strlineNumbers = RE?.test(metadata) ? (RE as any)?.exec(metadata)[1] : "0";
            const highlightLines = rangeParser(strlineNumbers);
            const highlight = highlightLines;
            const data = highlight.includes(applyHighlights) ? "highlight" : null;

            return { data };
        });

        const { theme: isDark, classes, cx } = useStyles();

        if (match === null) {
            return <code className={className} {...props} />;
        }

        return (
            <SyntaxHighlighter
                className={cx(classes.root, className)}
                style={isDark ? oneDark : (oneLight as any)}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true}
                wrapLines={hasMeta}
                useInlineStyles={true}
                lineProps={applyHighlights as any}
                {...(props as any)}
            />
        );
    };

    const useStyles = makeStyles({ "name": { Markdown } })(isDark => ({
        "root": {
            "& code": {
                "transform": "translateZ(0)",
                "minWidth": "100%",
                "float": "left",
                "& > span": {
                    "display": "block"
                }
            },
            "& pre code": {
                // Your code-block styles here
            },
            "& h3 code": {
                "color": "inherit"
            },
            "& span.linenumber": {
                "display": doShowLineNumber ? undefined : "none !important"
            },
            '& [data="highlight"]': {
                // Your custom line highlight styles here
                "background": isDark ? "#37394e" : "#efefef",
                "margin": "0 -1.5rem",
                "padding": "0 1.5rem"
            }
        }
    }));

    return { Code };
});
