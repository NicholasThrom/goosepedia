import { replacements } from "./replacements/plain";

export function replaceOthers(text: string) {
    let modifiedText = text;

    replacements.forEach(([from, to]) => {
        modifiedText = modifiedText.replace(from, to);
    });

    return modifiedText;
}
