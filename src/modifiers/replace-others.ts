import { replacements } from "./replacements/plain";

export function replaceOthers(text: string) {
    let modifiedText = text;

    replacements.forEach(([from, to]) => {
        modifiedText = modifiedText.replace(
            RegExp(`["> \\-]${from}["<.,\\- ]`, "g"),
            (original) => `${original.slice(0, 1)}${to}${original.slice(-1)}`,
        );
    });

    return modifiedText;
}
