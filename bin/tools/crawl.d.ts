export declare function crawl(params: {
    dirPath: string;
    getDoCrawlInDir?: (prams: {
        relativeDirPath: string;
    }) => boolean | Promise<boolean>;
    returnedPathsType: "absolute" | "relative to dirPath";
}): Promise<string[]>;
