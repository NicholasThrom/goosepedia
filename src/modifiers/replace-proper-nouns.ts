import stringHash = require("string-hash");
import { Meaning } from "./extract-meaning";
import { events, people, places, things } from "./replacements";

function pick(original: string, choices: string[]) {
    const hash = stringHash(original) % Math.floor(choices.length * 1.5);
    if (hash >= choices.length) {
        return original;
    } else {
        return `${original.slice(0, 1)}${choices[hash]}${original.slice(-1)}`;
    }
}

export function replaceProperNouns(text: string, meaning: Meaning) {
    const eventNameRegex = new RegExp(`[ >](${Array.from(meaning.nouns.eventNames).join("|")})[ <.?!"']`, "g");
    const personNameRegex = new RegExp(`[ >](${Array.from(meaning.nouns.personNames).join("|")})[ <.?!"']`, "g");
    const placeNameRegex = new RegExp(`[ >](${Array.from(meaning.nouns.placeNames).join("|")})[ <.?!"']`, "g");
    const thingNameRegex = new RegExp(`[ >](${Array.from(meaning.nouns.thingNames).join("|")})[ <.?!"']`, "g");

    return text
        .replace(
            eventNameRegex,
            (original) => pick(original, events),
        )
        .replace(
            personNameRegex,
            (original) => pick(original, people),
        )
        .replace(
            placeNameRegex,
            (original) => pick(original, places),
        )
        .replace(
            thingNameRegex,
            (original) => pick(original, things),
        );
}
