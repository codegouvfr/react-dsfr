import { readdir, lstat } from "fs/promises";
import { join as pathJoin, relative as pathRelative } from "path";
import { realpath as fsRealpath } from "fs/promises";

async function crawlRec(params: {
    dirPath: string;
    getDoCrawlInDir: (prams: { dirPath: string }) => boolean | Promise<boolean>;
}) {
    const { dirPath, getDoCrawlInDir } = params;

    const filePaths: string[] = [];

    const recursiveCallResults: string[][] = [];

    await Promise.all(
        (
            await readdir(await fsRealpath(dirPath))
        ).map(async fileOrDirectoryBasename => {
            const fileOrDirectoryPath = pathJoin(dirPath, fileOrDirectoryBasename);

            const fileOrDirectoryPath_realpath = await fsRealpath(fileOrDirectoryPath).catch(
                () => undefined
            );

            if (fileOrDirectoryPath_realpath === undefined) {
                // NOTE: Broken symlink
                return;
            }

            if ((await lstat(fileOrDirectoryPath_realpath)).isDirectory()) {
                const dirPath = fileOrDirectoryPath;

                if (!(await getDoCrawlInDir({ dirPath }))) {
                    return;
                }

                recursiveCallResults.push(
                    await crawlRec({
                        dirPath,
                        getDoCrawlInDir
                    })
                );

                return;
            }

            const filePath = fileOrDirectoryPath;

            filePaths.push(filePath);
        })
    );

    return [filePaths, ...recursiveCallResults].flat();
}

export async function crawl(params: {
    dirPath: string;
    getDoCrawlInDir?: (prams: { relativeDirPath: string }) => boolean | Promise<boolean>;
    returnedPathsType: "absolute" | "relative to dirPath";
}) {
    const { dirPath: rootDirPath, getDoCrawlInDir = () => true, returnedPathsType } = params;

    const filePaths = await crawlRec({
        "dirPath": rootDirPath,
        "getDoCrawlInDir": ({ dirPath }) =>
            getDoCrawlInDir({ "relativeDirPath": pathRelative(rootDirPath, dirPath) })
    });

    switch (returnedPathsType) {
        case "absolute":
            return filePaths;
        case "relative to dirPath":
            return filePaths.map(filePath => pathRelative(rootDirPath, filePath));
    }
}
