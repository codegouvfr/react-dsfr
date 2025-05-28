import * as fs from "fs/promises";
import * as path from "path";

function pascalCase(name: string): string {
    return name.replace(/(^\w|-\w)/g, m => m.replace("-", "").toUpperCase());
}

async function extractSvgContent(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath, "utf8");
    const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (!match) throw new Error(`SVG content not found in ${filePath}`);
    return match[1].trim();
}

async function generateIconFile(outDir: string, name: string, svgContent: string): Promise<void> {
    const componentName = pascalCase(name);
    const tab = " ".repeat(4); // 4 spaces for indentation
    const content = svgContent
        .replace(/"\/>/g, '" />')
        .replace(/(>\s+<)/g, `>\n${tab}<`)
        .replace(/^</, `${tab}<`)
        .replace(/fill-opacity=/g, "fillOpacity=")
        .replace(/xlink:href=/g, "xlinkHref=")
        .replace(/clip-rule=/g, "clipRule=")
        .replace(/fill-rule=/g, "fillRule=")
        .replace(/ clip-path=".+?"/g, "")
        .replace(/<clipPath.+?<\/clipPath>/g, "");
    const fileContent = `import React from 'react';
import { createIcon } from './IconWrapper';

export default createIcon(
    <>
${content}
    </>,
    "${componentName}"
);
	`;
    await fs.writeFile(path.join(outDir, `${componentName}.tsx`), fileContent, "utf8");
}

async function generateIndexFile(outDir: string, names: string[]): Promise<void> {
    const lines = names
        .map(name => {
            const componentName = pascalCase(name);
            return `export { default as ${componentName} } from './${componentName}';`;
        })
        .join("\n");

    await fs.writeFile(path.join(outDir, "index.ts"), lines, "utf8");
}

async function build(srcDir: string, outDir: string): Promise<void> {
    await fs.mkdir(outDir, { recursive: true });
    const files = await fs.readdir(srcDir);
    const svgFiles = files.filter(f => f.endsWith(".svg"));

    for (const file of svgFiles) {
        const svgPath = path.join(srcDir, file);
        const name = path.basename(file, ".svg");
        const svgContent = await extractSvgContent(svgPath);
        await generateIconFile(outDir, name, svgContent);
        console.log(`Generated: ${name}`);
    }

    await generateIndexFile(
        outDir,
        svgFiles.map(f => path.basename(f, ".svg"))
    );
    console.log("Index generated");
}

export async function main(argv: string[]): Promise<void> {
    if (argv.length < 2) {
        console.error("Usage: node build-icons.js <source-svg-folder> <output-icon-folder>");
        process.exit(1);
    }

    const [srcDir, outDir] = argv;

    await build(srcDir, outDir).catch(err => {
        console.error(err);
        process.exit(1);
    });
}

if (require.main === module) {
    main(process.argv.slice(2));
}
