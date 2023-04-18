/** List all files in a given directory return paths relative to the dirPath */
export declare function crawl(params: {
    dirPath: string;
    getDoCrawlInDir?: (prams: {
        relativeDirPath: string;
    }) => boolean | Promise<boolean>;
}): Promise<string[]>;
