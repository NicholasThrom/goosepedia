import { timingSafeEqual } from "crypto";

export interface Meaning {
    nouns: {
        eventNames: Set<string>;
        placeNames: Set<string>;
        thingNames: Set<string>;
        personNames: Set<string>;
    };
}

export function extractMeaning(text: string): Meaning {
    const filteredText = filterText(text);

    const nouns = properNouns(filteredText);
    return {
        nouns,
    };
}

function filterText(text: string) {
    return text
    .replace(
        /<style>.*<\/style>/gis,
        "",
    )
    .replace(
        /<[^>]*>/gis,
        "",
    );
}

function properNouns(text: string) {
    const eventNames: Set<string> = new Set();
    const placeNames: Set<string> = new Set();
    const personNames: Set<string> = new Set();
    const thingNames: Set<string> = new Set();

    const nounPhrases = text.match(/ [a-z]+ ([A-Z][a-z]*(?: [A-Z][a-z]*)*)(?: |\.)/g);

    if (nounPhrases) {
        nounPhrases.forEach((nounPhrase) => {
            const match = nounPhrase.match(/ [a-z]+ ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/);
            if (!match) { return; }
            const word = match[1];

            if (nounPhrase.match(/ (?:during) ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/)) {
                eventNames.add(word);
            } else if (nounPhrase.match(/ (?:of|in|from) ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/)) {
                placeNames.add(word);
            } else if (nounPhrase.match(/ [a-z]+ ([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*)/)) {
                thingNames.add(word);
            }
        });
    }

    eventNames.forEach((name) => {
        [placeNames, personNames, thingNames].forEach((set) => set.delete(name));
    });

    placeNames.forEach((name) => {
        [personNames, thingNames].forEach((set) => set.delete(name));
    });

    personNames.forEach((name) => {
        [thingNames].forEach((set) => set.delete(name));
    });

    console.log({
        eventNames,
        placeNames,
        personNames,
        thingNames,
    });

    return {
        eventNames,
        placeNames,
        thingNames,
        personNames,
    };
}
