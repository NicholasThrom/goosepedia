import { fixImages } from "./modifiers/fix-images";

export function modifyText(text: string) {
    let modifiedText = text;
    modifiedText = fixImages(text);
    return modifiedText;
}
