import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";
import { optimize } from "svgo";
import Mustache from "mustache";
import { JSDOM } from "jsdom";

async function ensureDir(dir: string): Promise<void> {
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "EEXIST") {
            throw err;
        }
    }
}

function extractSvgInnerContent(svg: string): string {
    const match = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    if (!match) {
        throw new Error("Invalid SVG: cannot extract content");
    }
    return match[1].trim();
}

async function cleanSvgContent(svgData: string): Promise<string> {
    const result = optimize(svgData, {
        multipass: true,
        floatPrecision: 3,
        plugins: [
            "removeComments",
            "removeMetadata",
            "removeTitle",
            "removeDesc",
            "removeUselessDefs",
            "removeEmptyAttrs",
            "removeHiddenElems",
            "removeEmptyText",
            "convertShapeToPath",
            "convertColors",
            "cleanupAttrs",
            "minifyStyles"
        ]
    });

    if ("data" in result) {
        return result.data
            .replace(/fill-opacity=/g, "fillOpacity=")
            .replace(/clip-rule=/g, "clipRule=")
            .replace(/fill-rule=/g, "fillRule=")
            .replace(/stroke-linecap=/g, "strokeLinecap=")
            .replace(/stroke-linejoin=/g, "strokeLinejoin=")
            .replace(/stroke-width=/g, "strokeWidth=")
            .replace(/xlink:href=/g, "xlinkHref=");
    }

    throw new Error("SVGO optimization failed");
}

function pascalCaseName(filename: string): string {
    return filename
        .replace(/\.svg$/, "")
        .split(/[\s-_]+/)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");
}

function getSvgFragment(svg: string) {
    const dom = new JSDOM(`<svg>${svg}</svg>`, { contentType: "image/svg+xml" });
    const document = dom.window.document;

    const groupMap: Record<string, Element[]> = {
        "fr-artwork-decorative": [],
        "fr-artwork-minor": [],
        "fr-artwork-major": []
    };

    const fillToClass = {
        "#ececff": "fr-artwork-decorative",
        "#e1000f": "fr-artwork-minor",
        "#000091": "fr-artwork-major"
    };

    const allPaths = Array.from(document.querySelectorAll("path"));
    const used = new Set<Element>();

    for (const pathEl of allPaths) {
        const fill = pathEl.getAttribute("fill")?.toLowerCase() ?? "";
        const groupClass = fillToClass[fill as keyof typeof fillToClass];
        if (groupClass) {
            pathEl.removeAttribute("fill");
            groupMap[groupClass].push(pathEl);
            used.add(pathEl);
        }
    }

    const fragments: string[] = [];

    for (const [className, elements] of Object.entries(groupMap)) {
        if (elements.length > 0) {
            const groupHtml = elements.map(el => el.outerHTML).join("\n");
            fragments.push(`<g className="${className}">\n${groupHtml}\n</g>`);
        }
    }

    // Ajout des éléments restants (non groupés)
    const remaining = Array.from(document.querySelector("svg")!.childNodes)
        .filter(node => node.nodeType === 1 && !used.has(node as Element))
        .map(node => (node as Element).outerHTML)
        .join("\n");

    if (remaining) {
        fragments.push(remaining);
    }
    return fragments.join("\n");
}

async function generateComponent(svgPath: string, outputDir: string): Promise<string> {
    const svgName = path.basename(svgPath);
    const componentName = pascalCaseName(svgName);
    const outputFileName = svgName.replace(/\.svg$/, ".tsx");

    const svgData = await fs.readFile(svgPath, "utf8");
    const cleanedSvg = extractSvgInnerContent(await cleanSvgContent(svgData));

    const template = `import React from 'react';
import { createIcon } from './utils/IconWrapper';

export default createIcon(
    <>
        {{& svgContent }}
    </>,
    "{{componentName}}"
);
`;

    const componentCode = Mustache.render(template, {
        componentName,
        svgContent: getSvgFragment(cleanedSvg)
    });

    const outPath = path.join(outputDir, outputFileName);
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, componentCode, "utf8");
    return outPath;
}

async function generateIndex(outputDir: string): Promise<string> {
    const files = await glob(`${outputDir}/*.tsx`);
    const filePath = path.join(outputDir, "index.ts");

    const exports = files
        .map(f => {
            const base = path.basename(f, ".tsx");
            return `export { default as ${pascalCaseName(base)} } from './${base}';`;
        })
        .join("\n");

    await fs.writeFile(filePath, exports);
    return filePath;
}

async function generateTypes(outputDir: string): Promise<string> {
    const files = await glob(`${outputDir}/*.tsx`);
    const iconNames = files.map(f => pascalCaseName(path.basename(f, ".tsx")));
    const filePath = path.join(outputDir, "index.d.ts");

    const header = `import { IconWrapper } from './utils/IconWrapper';\n\ntype SvgIconComponent = typeof IconWrapper;\n\n`;
    const lines = iconNames.map(name => `export const ${name}: SvgIconComponent;`);

    const content = `${header}${lines.join("\n")}\n`;

    await fs.writeFile(filePath, content, "utf8");
    return filePath;
}

export async function build(srcDir: string, outDir: string): Promise<string[]> {
    await ensureDir(outDir);
    const files = [];

    const svgFiles = await glob(`${srcDir}/**/*.svg`);

    for (const svgPath of svgFiles) {
        files.push(await generateComponent(svgPath, outDir));
    }

    files.push(await generateIndex(outDir));
    files.push(await generateTypes(outDir));
    return files;
}

export async function main(argv: string[]) {
    if (argv.length < 2) {
        console.error("Usage: node build-icons.js <source-svg-folder> <output-icon-folder>");
        process.exit(1);
    }

    const [srcDir, outDir] = argv;

    try {
        await build(srcDir, outDir);
    } catch (err) {
        process.exit(1);
    }
}

if (require.main === module) {
    main(process.argv.slice(2));
}
