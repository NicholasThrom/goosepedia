import { extractMeaning } from "./modifiers/extract-meaning";
import { fixImages } from "./modifiers/fix-images";

export function modifyText(text: string) {
    let modifiedText = text;
    modifiedText = fixImages(text);
    const meaning = extractMeaning(text);
    return modifiedText;
}
