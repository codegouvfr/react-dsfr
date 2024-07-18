/// <reference types="node" />
type TransformSourceCode = (params: {
    sourceCode: Buffer;
    filePath: string;
    fileRelativePath: string;
}) => {
    modifiedSourceCode: Buffer;
    newFileName?: string;
} | undefined;
/**
 * Apply a transformation function to every file of directory
 * If source and destination are the same this function can be used to apply the transformation in place
 * like filtering out some files or modifying them.
 * */
export declare function transformCodebase(params: {
    srcDirPath: string;
    destDirPath: string;
    transformSourceCode?: TransformSourceCode;
}): void;
export {};
