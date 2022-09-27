import * as crypto from "crypto";

export function multiReplace(params: { input: string; keyValues: Record<string, string> }) {
    const { input, keyValues } = params;

    let output = input;

    const keyByHash = new Map<string, string>();

    Object.keys(keyValues).forEach(key => {
        const hash = crypto.createHash("sha256").update(key).digest("hex");

        const newOutput = output.replace(new RegExp(key, "g"), hash);

        if (newOutput === output) {
            return;
        }

        keyByHash.set(hash, key);

        output = newOutput;
    });

    Array.from(keyByHash.entries()).forEach(
        ([hash, key]) => (output = output.replace(new RegExp(hash, "g"), keyValues[key]))
    );

    return output;
}
