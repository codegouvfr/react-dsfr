import { dirname as pathDirname, join as pathJoin } from "path";
import * as child_process from "child_process";
import { start as startRepl } from "repl";
import { assert } from "tsafe/assert";
import { Deferred } from "evt/tools/Deferred";
import * as fs from "fs";

export async function tsc(params: { tsconfigDirPath: string; doWatch: boolean }) {
    const { tsconfigDirPath, doWatch } = params;

    const tsconfigPath = pathJoin(tsconfigDirPath, "tsconfig.json");

    if (doWatch) {
        prepareForWatching();
        await tsc({
            tsconfigDirPath,
            "doWatch": false
        });
    }

    const tsprojectDirPath = pathJoin(
        tsconfigDirPath,
        (() => {
            const tsconfigExtends = JSON.parse(fs.readFileSync(tsconfigPath).toString("utf8"))[
                "extends"
            ];

            return tsconfigExtends !== undefined ? pathDirname(tsconfigExtends) : ".";
        })()
    );

    const pr = fork({
        "modulePath": pathJoin(tsprojectDirPath, "node_modules", "typescript", "bin", "tsc"),
        "args": ["-p", tsconfigPath, ...(!doWatch ? [] : ["-w"])],
        "options": {
            "cwd": tsprojectDirPath
        }
    });

    if (!doWatch) {
        await pr;
    }
}

const prepareForWatching = (() => {
    let isStarted = false;

    return () => {
        if (isStarted) {
            return;
        }

        isStarted = true;

        process.setMaxListeners(70);

        process.once("unhandledRejection", error => {
            throw error;
        });

        console.log("Enter exit for graceful termination");

        Object.defineProperty(
            startRepl({
                "terminal": true,
                "prompt": "> "
            }).context,
            "exit",
            { "get": () => process.exit(0) }
        );
    };
})();

function fork(params: {
    modulePath: string;
    args: string[];
    options?: child_process.ForkOptions;
    onStdoutData?: (data: Buffer) => void;
}): Promise<number> {
    const { modulePath, args, options, onStdoutData } = params;

    const dExitCode = new Deferred<number>();

    const childProcess = child_process.fork(modulePath, args, {
        ...options,
        ...(onStdoutData !== undefined && { "silent": true })
    });

    if (onStdoutData !== undefined) {
        const { stdout } = childProcess;

        assert(stdout !== null);

        stdout.on("data", (data: Buffer) => onStdoutData(data));
    }

    const onExit = () => childProcess.kill();

    process.once("exit", onExit);

    childProcess.once("exit", code => {
        process.removeListener("exit", onExit);

        if (code === 0) {
            dExitCode.resolve(0);
        } else {
            dExitCode.reject(new Error(`exited with ${code}`));
        }
    });

    return dExitCode.pr;
}
