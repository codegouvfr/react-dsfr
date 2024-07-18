import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";

const crawlSyncRec = (dirPath: string, filePaths: string[]) => {
    for (const basename of fs.readdirSync(dirPath)) {
        const fileOrDirPath = pathJoin(dirPath, basename);

        if (fs.lstatSync(fileOrDirPath).isDirectory()) {
            crawlSyncRec(fileOrDirPath, filePaths);

            continue;
        }

        filePaths.push(fileOrDirPath);
    }
};

/** List all files in a given directory return paths relative to the dir_path */
export function crawlSync(params: {
    dirPath: string;
    returnedPathsType: "absolute" | "relative to dirPath";
}): string[] {
    const { dirPath, returnedPathsType } = params;

    const filePaths: string[] = [];

    crawlSyncRec(dirPath, filePaths);

    switch (returnedPathsType) {
        case "absolute":
            return filePaths;
        case "relative to dirPath":
            return filePaths.map(filePath => pathRelative(dirPath, filePath));
    }
}
