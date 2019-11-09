import { extractMeaning } from "./modifiers/extract-meaning";
import { fixImages } from "./modifiers/fix-images";
import { replaceOthers } from "./modifiers/replace-others";
import { replaceProperNouns } from "./modifiers/replace-proper-nouns";

export function modifyText(text: string) {
    let modifiedText = text;
    const meaning = extractMeaning(modifiedText);
    modifiedText = replaceProperNouns(modifiedText, meaning);
    modifiedText = replaceOthers(modifiedText);
    modifiedText = fixImages(modifiedText);
    return modifiedText;
}
